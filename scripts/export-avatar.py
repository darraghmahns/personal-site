#!/usr/bin/env python3
"""Square-crop and export home avatar from assets/brand/avatar-source-2026.jpg."""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "assets" / "brand" / "avatar-source-2026.jpg"
OUT_JPG = ROOT / "static" / "images" / "profile.jpg"
OUT_WEBP = ROOT / "static" / "images" / "profile.webp"

# Face center in the 683x1024 portrait reference frame used when framing the crop.
REF_W, REF_H = 683, 1024
FACE_X, FACE_Y = 370, 390
OUTPUT_SIZE = 600
TORSO_BIAS_Y = 70
JPEG_QUALITY = 88
WEBP_QUALITY = 82


def main() -> None:
    im = ImageOps.exif_transpose(Image.open(SOURCE))
    w, h = im.size
    cx = int(FACE_X * w / REF_W)
    cy = int(FACE_Y * h / REF_H) + TORSO_BIAS_Y
    left = max(0, min(cx - OUTPUT_SIZE // 2, w - OUTPUT_SIZE))
    top = max(0, min(cy - OUTPUT_SIZE // 2, h - OUTPUT_SIZE))
    crop = im.crop((left, top, left + OUTPUT_SIZE, top + OUTPUT_SIZE))

    OUT_JPG.parent.mkdir(parents=True, exist_ok=True)
    crop.save(OUT_JPG, format="JPEG", quality=JPEG_QUALITY, optimize=True, progressive=True)
    crop.save(OUT_WEBP, format="WEBP", quality=WEBP_QUALITY, method=6)

    jpg_kb = OUT_JPG.stat().st_size / 1024
    webp_kb = OUT_WEBP.stat().st_size / 1024
    print(f"Wrote {OUT_JPG} ({jpg_kb:.1f} KB)")
    print(f"Wrote {OUT_WEBP} ({webp_kb:.1f} KB)")
    if jpg_kb > 150:
        raise SystemExit(f"profile.jpg exceeds 150 KB ({jpg_kb:.1f} KB)")


if __name__ == "__main__":
    main()