#!/usr/bin/env bash
# Builds the demo video from two time-aligned simulator recordings.
#
#   tools/demo/make_video.sh <raw-A.mp4> <raw-B.mp4> <captions.txt> <out.mp4> [url]
#
# captions.txt has one caption per line:  <start-seconds>|<end-seconds>|<text>
# The two recordings are shown side by side, captions are burned in at the
# bottom, and an end card with a QR code for the web app is appended.
set -euo pipefail

A="$1"; B="$2"; CAPTIONS="$3"; OUT="$4"
URL="${5:-https://sync-draft.serverpod.space}"
HERE="$(cd "$(dirname "$0")" && pwd)"
WORK="$(mktemp -d)"
H=1280

# 1. Side by side, equal height, even dimensions.
ffmpeg -y -loglevel error -i "$A" -i "$B" -filter_complex \
  "[0:v]scale=-2:$H[a];[1:v]scale=-2:$H[b];[a][b]hstack=inputs=2,setsar=1,fps=30,format=yuv420p" \
  -c:v libx264 -preset veryfast -crf 20 -an "$WORK/base.mp4"

W=$(ffprobe -v error -select_streams v:0 -show_entries stream=width -of csv=p=0 "$WORK/base.mp4")
H=$(ffprobe -v error -select_streams v:0 -show_entries stream=height -of csv=p=0 "$WORK/base.mp4")

# 2. Burn in captions (PNG overlays, since this ffmpeg has no text filter).
INPUTS=(-i "$WORK/base.mp4")
FILTER=""
LAST="[0:v]"
N=0
while IFS='|' read -r START END TEXT; do
  [[ -z "${START// }" || "$START" == \#* ]] && continue
  N=$((N + 1))
  swift "$HERE/overlay.swift" caption "$WORK/cap$N.png" "$((W * 9 / 10))" "$TEXT" >/dev/null
  INPUTS+=(-i "$WORK/cap$N.png")
  FILTER+="${LAST}[$N:v]overlay=x=(W-w)/2:y=H-h-60:enable='between(t,$START,$END)'[v$N];"
  LAST="[v$N]"
done < "$CAPTIONS"

if [[ $N -gt 0 ]]; then
  ffmpeg -y -loglevel error "${INPUTS[@]}" -filter_complex "${FILTER%;}" -map "$LAST" \
    -c:v libx264 -preset veryfast -crf 20 -pix_fmt yuv420p "$WORK/captioned.mp4"
else
  cp "$WORK/base.mp4" "$WORK/captioned.mp4"
fi

# 3. End card: works on the web too, with a QR code.
swift "$HERE/overlay.swift" endcard "$WORK/end.png" "$W" "$H" "$URL" "FieldNotes" \
  "Offline-first notes with photos" "Works on iPhone and on the web" >/dev/null
ffmpeg -y -loglevel error -loop 1 -framerate 30 -t 5 -i "$WORK/end.png" \
  -c:v libx264 -preset veryfast -crf 20 -pix_fmt yuv420p "$WORK/end.mp4"

# 4. Join.
ffmpeg -y -loglevel error -i "$WORK/captioned.mp4" -i "$WORK/end.mp4" -filter_complex \
  "[0:v]setsar=1[c0];[1:v]setsar=1[c1];[c0][c1]concat=n=2:v=1:a=0[v]" -map "[v]" -c:v libx264 -preset medium -crf 20 \
  -pix_fmt yuv420p -movflags +faststart "$OUT"

DURATION=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$OUT")
echo "Wrote $OUT (${DURATION}s, ${W}x${H})"
awk -v d="$DURATION" 'BEGIN { if (d >= 120) { print "WARNING: video is 2 minutes or longer; the rules require under 2:00"; exit 1 } }'
