# Demo video tooling

Builds the hackathon demo video from two simulator recordings.

```bash
# record each simulator (stop with Ctrl-C / kill -INT)
xcrun simctl io <udid-A> recordVideo --codec=h264 raw-A.mp4
xcrun simctl io <udid-B> recordVideo --codec=h264 raw-B.mp4

# captions.txt: one "start-seconds|end-seconds|text" per line
tools/demo/make_video.sh raw-A.mp4 raw-B.mp4 captions.txt fieldnotes-demo.mp4
```

The script stacks the two recordings side by side, burns the captions in, and
appends a 5 second end card with a QR code for the web app. It only needs
macOS, ffmpeg and the Swift toolchain (`overlay.swift` renders the caption and
QR images because this ffmpeg has no text filter). It warns if the result is
not shorter than the 2 minutes the contest rules allow.
