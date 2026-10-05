"""Shared helpers for the code-painted images in public/images (PIL only, no numpy)."""

import random
from pathlib import Path

from PIL import Image, ImageChops, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parents[2]
OUT_DIR = ROOT / "public" / "images"

# Brand palette (LinusBio): deep blue-teal #164258, steel blue #317EA6, white.
DEEP = (22, 66, 88)
STEEL = (49, 126, 166)
# Light tones used for lights, glints and reflections. Names kept so scenes read the same.
GOLD = (140, 195, 224)  # light steel
WARM = (214, 233, 244)  # pale blue-white


def lerp(a, b, t):
    return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(len(a)))


def vertical_gradient(size, stops):
    """stops: list of (position 0..1, rgb)."""
    w, h = size
    img = Image.new("RGB", size)
    d = ImageDraw.Draw(img)
    for y in range(h):
        t = y / max(h - 1, 1)
        for (p0, c0), (p1, c1) in zip(stops, stops[1:]):
            if p0 <= t <= p1:
                d.line([(0, y), (w, y)], fill=lerp(c0, c1, (t - p0) / max(p1 - p0, 1e-6)))
                break
    return img


def radial_glow(size, centre, radius, colour, strength=80, squash=1.0, blur=40):
    """RGBA layer with a soft elliptical glow."""
    w, h = size
    mask = Image.new("L", size, 0)
    m = ImageDraw.Draw(mask)
    cx, cy = centre
    for r in range(int(radius), 0, -6):
        a = int(strength * (1 - r / radius) ** 1.6)
        m.ellipse([cx - r * squash, cy - r, cx + r * squash, cy + r], fill=a)
    mask = mask.filter(ImageFilter.GaussianBlur(blur))
    layer = Image.new("RGBA", size, (*colour, 0))
    layer.putalpha(mask)
    return layer


def finish(img, vignette=220, grain=0.12):
    """Vignette + film grain for a photographic finish. Returns RGB."""
    w, h = img.size
    img = img.convert("RGBA")
    mask = Image.new("L", (w, h), 0)
    ImageDraw.Draw(mask).ellipse([-w * 0.25, -h * 0.35, w * 1.25, h * 1.25], fill=255)
    mask = mask.filter(ImageFilter.GaussianBlur(vignette))
    img = Image.composite(img, Image.new("RGBA", (w, h), (0, 0, 0, 255)), mask)
    rgb = img.convert("RGB")
    noise = Image.effect_noise((w, h), 40).convert("RGB")
    return Image.blend(rgb, ImageChops.overlay(rgb, noise), grain)


def save(img, name, quality=82):
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    out = OUT_DIR / name
    img.save(out, "WEBP", quality=quality, method=6)
    print(f"wrote {out.relative_to(ROOT)} ({out.stat().st_size // 1024} KB)")
    return out


def rng(seed):
    return random.Random(seed)
