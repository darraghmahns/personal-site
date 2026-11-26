#!/usr/bin/env python3
"""Drop cream/white counter fills from traced logo.svg (keep logo-cream.svg intact)."""

from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
LOGO = ROOT / "static" / "logo.svg"

COUNTER_HEX = {
    "#fff",
    "#ffffff",
    "#fefefe",
    "#fefef8",
    "#fef7e8",
    "#fff7ea",
    "#fff7e8",
    "#fffeff",
    "#f8f8f8",
}

COUNTER_PREFIXES = ("#fef", "#fff", "#ffef", "#fffe", "#f9f", "#faf", "#f8f8")


def luminance(hex_color: str) -> float:
    h = hex_color.lstrip("#")
    if len(h) != 6:
        return 0.0
    r, g, b = int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16)
    return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255.0


def is_counter_fill(fill: str) -> bool:
    if not fill:
        return False
    f = fill.lower().strip()
    if f in COUNTER_HEX:
        return True
    if f.startswith(COUNTER_PREFIXES):
        return True
    if f.startswith("#") and len(f) == 7 and luminance(f) > 0.92:
        return True
    return False


def main() -> None:
    text = LOGO.read_text(encoding="utf-8")
    pattern = re.compile(r"<path\b([^>]*)/>", re.IGNORECASE)

    def repl(match: re.Match[str]) -> str:
        attrs = match.group(1)
        m = re.search(r'fill="([^"]+)"', attrs, re.IGNORECASE)
        if m and is_counter_fill(m.group(1)):
            return ""
        return match.group(0)

    cleaned = pattern.sub(repl, text)
    LOGO.write_text(cleaned, encoding="utf-8")
    print(f"Stripped counter/background paths from {LOGO}")


if __name__ == "__main__":
    main()