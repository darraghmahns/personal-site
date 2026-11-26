#!/usr/bin/env python3
"""Side-by-side source JPG vs rendered logo-cream SVG."""

from __future__ import annotations

import io
from pathlib import Path

import cairosvg
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "assets/brand/logo-sunset-d-source.jpg"
SVG = ROOT / "static/logo-cream.svg"
OUT = Path("/opt/cursor/artifacts/logo-source-vs-svg.png")


def main() -> None:
    source = Image.open(SOURCE).convert("RGB")
    size = source.width
    png_bytes = cairosvg.svg2png(url=str(SVG), output_width=size, output_height=size)
    rendered = Image.open(io.BytesIO(png_bytes)).convert("RGB")
    gap = 24
    label_h = 40
    canvas = Image.new("RGB", (size * 2 + gap, size + label_h), "#f0f0f0")
    canvas.paste(source, (0, label_h))
    canvas.paste(rendered, (size + gap, label_h))
    OUT.parent.mkdir(parents=True, exist_ok=True)
    canvas.save(OUT)
    print(f"Wrote {OUT}")


if __name__ == "__main__":
    main()