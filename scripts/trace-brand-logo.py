#!/usr/bin/env python3
"""Trace assets/brand/logo-sunset-d-source.jpg into logo SVGs via VTracer."""

from __future__ import annotations

import re
import subprocess
import sys
from pathlib import Path

import numpy as np
import vtracer
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "assets/brand/logo-sunset-d-source.jpg"
STATIC = ROOT / "static"
LOGO = STATIC / "logo.svg"
LOGO_CREAM = STATIC / "logo-cream.svg"
WORK = ROOT / ".cache" / "brand-trace"
CREAM_RGB = np.array([255, 247, 234], dtype=np.int16)
CREAM_HEX = "#FFF7EA"
CREAM_TOL = 80
VIEW = 1024
PAD = 8


def cream_mask(rgb: np.ndarray) -> np.ndarray:
    dist = np.abs(rgb.astype(np.int16) - CREAM_RGB).sum(axis=2)
    return dist < CREAM_TOL


def prepare_raster() -> Path:
    WORK.mkdir(parents=True, exist_ok=True)
    img = Image.open(SOURCE).convert("RGBA")
    arr = np.array(img)
    arr[cream_mask(arr[:, :, :3]), 3] = 0
    alpha = arr[:, :, 3] > 0
    ys, xs = np.where(alpha)
    if ys.size == 0:
        raise SystemExit("No opaque pixels after cream removal")
    x0, x1, y0, y1 = xs.min(), xs.max(), ys.min(), ys.max()
    x0, y0 = max(0, x0 - PAD), max(0, y0 - PAD)
    x1, y1 = min(arr.shape[1] - 1, x1 + PAD), min(arr.shape[0] - 1, y1 + PAD)
    cropped = arr[y0 : y1 + 1, x0 : x1 + 1]
    ch, cw = cropped.shape[:2]
    side = max(ch, cw)
    canvas = np.zeros((side, side, 4), dtype=np.uint8)
    oy, ox = (side - ch) // 2, (side - cw) // 2
    canvas[oy : oy + ch, ox : ox + cw] = cropped
    out_path = WORK / "logo-trim.png"
    Image.fromarray(canvas).resize((VIEW, VIEW), Image.Resampling.LANCZOS).save(out_path)
    Image.fromarray(arr).save(WORK / "logo-nobg-full.png")
    return out_path


def trace(png_path: Path) -> str:
    raw_svg = WORK / "logo-traced-raw.svg"
    vtracer.convert_image_to_svg_py(
        str(png_path),
        str(raw_svg),
        colormode="color",
        hierarchical="stacked",
        mode="spline",
        filter_speckle=8,
        color_precision=6,
        layer_difference=16,
        corner_threshold=60,
        length_threshold=4.0,
        max_iterations=10,
        splice_threshold=45,
        path_precision=8,
    )
    return raw_svg.read_text(encoding="utf-8")


def strip_cream_paths(svg: str) -> str:
    """Remove any traced cream fills that survived raster prep."""
    cream_re = re.compile(
        r'<path[^>]*fill="(?:#(?:FFF7EA|FEF7E8|FFF[EF][0-9A-F]{3}))"[^/]*/>',
        re.IGNORECASE,
    )
    svg = cream_re.sub("", svg)
    return svg


def normalize_svg(svg: str, transparent: bool) -> str:
    svg = strip_cream_paths(svg)
    svg = re.sub(
        r"<svg([^>]*)>",
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" role="img" '
        'aria-label="Darragh Mahns logo">',
        svg,
        count=1,
    )
    svg = re.sub(r'width="[^"]*"', "", svg, count=1)
    svg = re.sub(r'height="[^"]*"', "", svg, count=1)
    if transparent:
        return svg
    insert = f'  <rect width="{VIEW}" height="{VIEW}" fill="{CREAM_HEX}"/>\n'
    return re.sub(r"(<svg[^>]*>)", r"\1\n" + insert, svg, count=1)


def scour_optimize(svg: str, dest: Path) -> None:
    tmp_in = WORK / "in.svg"
    tmp_in.write_text(svg, encoding="utf-8")
    dest.parent.mkdir(parents=True, exist_ok=True)
    cmd = [
        "scour",
        "-i",
        str(tmp_in),
        "-o",
        str(dest),
        "--enable-viewboxing",
        "--strip-xml-space",
        "--indent=none",
    ]
    try:
        subprocess.run(cmd, check=True, capture_output=True, text=True)
    except FileNotFoundError:
        subprocess.run(
            [str(Path.home() / ".local/bin/scour"), *cmd[1:]],
            check=True,
            capture_output=True,
            text=True,
        )


def main() -> None:
    png = prepare_raster()
    raw = trace(png)
    scour_optimize(normalize_svg(raw, transparent=True), LOGO)
    scour_optimize(normalize_svg(raw, transparent=False), LOGO_CREAM)
    print(f"Wrote {LOGO} ({LOGO.stat().st_size} bytes)")
    print(f"Wrote {LOGO_CREAM} ({LOGO_CREAM.stat().st_size} bytes)")


if __name__ == "__main__":
    main()