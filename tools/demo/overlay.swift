// Renders overlay images for the demo video using only macOS frameworks
// (this ffmpeg build has no text or subtitle filters).
//
//   swift overlay.swift caption <out.png> <width> "<text>"
//   swift overlay.swift endcard <out.png> <width> <height> <url> "<title>" "<line 1>" "<line 2>"
import AppKit
import CoreImage

func render(width: Int, height: Int, _ draw: (CGRect) -> Void) -> Data {
  let rep = NSBitmapImageRep(
    bitmapDataPlanes: nil, pixelsWide: width, pixelsHigh: height, bitsPerSample: 8,
    samplesPerPixel: 4, hasAlpha: true, isPlanar: false, colorSpaceName: .deviceRGB,
    bytesPerRow: 0, bitsPerPixel: 0)!
  NSGraphicsContext.saveGraphicsState()
  NSGraphicsContext.current = NSGraphicsContext(bitmapImageRep: rep)
  draw(CGRect(x: 0, y: 0, width: width, height: height))
  NSGraphicsContext.restoreGraphicsState()
  return rep.representation(using: .png, properties: [:])!
}

func drawText(_ text: String, in rect: CGRect, size: CGFloat, weight: NSFont.Weight,
              color: NSColor) {
  let style = NSMutableParagraphStyle()
  style.alignment = .center
  style.lineBreakMode = .byWordWrapping
  let attrs: [NSAttributedString.Key: Any] = [
    .font: NSFont.systemFont(ofSize: size, weight: weight),
    .foregroundColor: color,
    .paragraphStyle: style,
  ]
  NSString(string: text).draw(
    with: rect, options: [.usesLineFragmentOrigin], attributes: attrs)
}

func textHeight(_ text: String, width: CGFloat, size: CGFloat, weight: NSFont.Weight) -> CGFloat {
  let attrs: [NSAttributedString.Key: Any] = [.font: NSFont.systemFont(ofSize: size, weight: weight)]
  return ceil(NSString(string: text).boundingRect(
    with: CGSize(width: width, height: 10_000), options: [.usesLineFragmentOrigin],
    attributes: attrs).height)
}

func qrImage(_ url: String, side: Int) -> CGImage {
  let filter = CIFilter(name: "CIQRCodeGenerator")!
  filter.setValue(Data(url.utf8), forKey: "inputMessage")
  filter.setValue("M", forKey: "inputCorrectionLevel")
  let raw = filter.outputImage!
  let scale = CGFloat(side) / raw.extent.width
  let scaled = raw.transformed(by: CGAffineTransform(scaleX: scale, y: scale))
  return CIContext().createCGImage(scaled, from: scaled.extent)!
}

let args = CommandLine.arguments
guard args.count >= 4 else { fatalError("see usage at the top of this file") }
let mode = args[1]
let out = URL(fileURLWithPath: args[2])

switch mode {
case "caption":
  let width = Int(args[3])!
  let text = args[4]
  let font: CGFloat = CGFloat(width) / 26
  let inner = CGFloat(width) - font * 3
  let h = textHeight(text, width: inner, size: font, weight: .semibold)
  let height = Int(h + font * 1.4)
  try render(width: width, height: height) { rect in
    NSColor.black.withAlphaComponent(0.74).setFill()
    NSBezierPath(roundedRect: rect.insetBy(dx: 4, dy: 4), xRadius: font, yRadius: font).fill()
    drawText(
      text, in: CGRect(x: font * 1.5, y: font * 0.7, width: inner, height: h), size: font,
      weight: .semibold, color: .white)
  }.write(to: out)
  print("\(width)x\(height)")

case "endcard":
  let width = Int(args[3])!, height = Int(args[4])!
  let url = args[5], title = args[6], line1 = args[7], line2 = args.count > 8 ? args[8] : ""
  let w = CGFloat(width), h = CGFloat(height)
  try render(width: width, height: height) { rect in
    let gradient = NSGradient(
      starting: NSColor(red: 0.05, green: 0.55, blue: 0.52, alpha: 1),
      ending: NSColor(red: 0.06, green: 0.09, blue: 0.09, alpha: 1))!
    gradient.draw(in: rect, angle: -60)
    let unit = h / 100
    drawText(title, in: CGRect(x: 0, y: h - unit * 17, width: w, height: unit * 12),
             size: unit * 8.5, weight: .heavy, color: .white)
    drawText(line1, in: CGRect(x: 0, y: h - unit * 25, width: w, height: unit * 6),
             size: unit * 3.6, weight: .medium, color: NSColor.white.withAlphaComponent(0.92))
    drawText(line2, in: CGRect(x: 0, y: h - unit * 31, width: w, height: unit * 6),
             size: unit * 3.6, weight: .semibold, color: NSColor(red: 0.6, green: 1, blue: 0.9, alpha: 1))
    let side = unit * 38
    let card = CGRect(x: (w - side) / 2 - unit * 2, y: unit * 17 - unit * 2,
                      width: side + unit * 4, height: side + unit * 4)
    NSColor.white.setFill()
    NSBezierPath(roundedRect: card, xRadius: unit * 3, yRadius: unit * 3).fill()
    let qr = qrImage(url, side: Int(side * 3))
    let ctx = NSGraphicsContext.current!.cgContext
    ctx.interpolationQuality = .none
    ctx.draw(qr, in: CGRect(x: (w - side) / 2, y: unit * 17, width: side, height: side))
    drawText(url.replacingOccurrences(of: "https://", with: ""),
             in: CGRect(x: 0, y: unit * 9, width: w, height: unit * 6),
             size: unit * 3.4, weight: .semibold, color: .white)
    drawText("Scan to open the web app", in: CGRect(x: 0, y: unit * 4, width: w, height: unit * 5),
             size: unit * 2.6, weight: .regular, color: NSColor.white.withAlphaComponent(0.8))
  }.write(to: out)
  print("\(width)x\(height)")

default:
  fatalError("unknown mode \(mode)")
}
