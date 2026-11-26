#!/usr/bin/env python3
"""Render logo SVGs into favicons, PWA icons, and default OG image.

Run scripts/trace-brand-logo.py first when the source JPG changes.
"""

from __future__ import annotations

import io
from pathlib import Path

import cairosvg
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
STATIC = ROOT / "static"
IMAGES = STATIC / "images"
CREAM = "#FFF7EA"


def svg_to_png(svg_path: Path, size: int) -> Image.Image:
    png_bytes = cairosvg.svg2png(
        url=str(svg_path),
        output_width=size,
        output_height=size,
    )
    return Image.open(io.BytesIO(png_bytes)).convert("RGBA")


def save_ico(sizes: list[int], src_svg: Path, dest: Path) -> None:
    icons = [svg_to_png(src_svg, s) for s in sizes]
    dest.parent.mkdir(parents=True, exist_ok=True)
    icons[0].save(dest, format="ICO", sizes=[(s, s) for s in sizes], append_images=icons[1:])


def main() -> None:
    logo = STATIC / "logo.svg"
    logo_cream = STATIC / "logo-cream.svg"

    IMAGES.mkdir(parents=True, exist_ok=True)

    for size, name in ((32, "favicon-32x32.png"), (16, "favicon-16x16.png")):
        svg_to_png(logo, size).save(IMAGES / name)

    for size, name in ((32, "favicon-32x32-cream.png"), (16, "favicon-16x16-cream.png")):
        svg_to_png(logo_cream, size).save(IMAGES / name)

    save_ico([16, 32, 48], logo, STATIC / "favicon.ico")
    save_ico([16, 32, 48], logo, IMAGES / "favicon.ico")

    svg_to_png(logo_cream, 180).save(IMAGES / "apple-touch-icon.png")
    svg_to_png(logo_cream, 192).save(STATIC / "android-chrome-192x192.png")
    svg_to_png(logo_cream, 512).save(STATIC / "android-chrome-512x512.png")

    og_w, og_h = 1200, 630
    canvas = Image.new("RGB", (og_w, og_h), CREAM)
    logo_img = svg_to_png(logo_cream, 420)
    canvas.paste(logo_img, (72, (og_h - logo_img.height) // 2), logo_img)

    draw = ImageDraw.Draw(canvas)
    try:
        title_font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 64)
        sub_font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 38)
    except OSError:
        title_font = ImageFont.load_default()
        sub_font = title_font

    text_x = 560
    draw.text((text_x, 220), "Darragh Mahns", fill="#1a1a1a", font=title_font)
    draw.text((text_x, 310), "Forward deployed engineer", fill="#3d3d3d", font=sub_font)

    IMAGES.mkdir(parents=True, exist_ok=True)
    canvas.save(IMAGES / "og-default.png", optimize=True)
    print("Wrote brand assets under static/")


if __name__ == "__main__":
    main()