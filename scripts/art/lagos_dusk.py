"""
Generate the hero image: an original, painted-in-code dusk view of a Lagos-style
skyline across the lagoon, with a long low bridge and gold reflections.

Usage:  python3 scripts/art/lagos_dusk.py  ->  public/images/hero-lagos-dusk.webp
Deterministic (seeded), so the output only changes when this script does.
"""

from PIL import Image, ImageChops, ImageDraw, ImageFilter

from common import GOLD, OUT_DIR, WARM, lerp, rng, vertical_gradient

W, H = 2400, 1400
HORIZON = int(H * 0.62)  # waterline
SEED = 7
OUT = OUT_DIR / "hero-lagos-dusk.webp"

rnd = rng(SEED)


def sky():
    img = vertical_gradient(
        (W, HORIZON),
        [
            (0.0, (6, 18, 26)),
            (0.45, (14, 44, 60)),
            (0.78, (30, 84, 110)),
            (0.9, (60, 130, 166)),
            (1.0, (150, 200, 226)),
        ],
    )
    # Soft sun glow sitting just under the horizon, right of centre.
    glow = Image.new("L", (W, HORIZON), 0)
    g = ImageDraw.Draw(glow)
    cx, cy = int(W * 0.68), HORIZON + 40
    for r in range(520, 0, -8):
        g.ellipse([cx - r * 1.6, cy - r, cx + r * 1.6, cy + r], fill=int(70 * (1 - r / 520) ** 1.6))
    glow = glow.filter(ImageFilter.GaussianBlur(40))
    warm = Image.new("RGB", (W, HORIZON), WARM)
    img = Image.composite(warm, img, glow)
    # A few thin cloud streaks.
    clouds = Image.new("L", (W, HORIZON), 0)
    c = ImageDraw.Draw(clouds)
    for _ in range(14):
        y = rnd.randint(int(HORIZON * 0.35), int(HORIZON * 0.85))
        x = rnd.randint(-200, W)
        c.ellipse([x, y, x + rnd.randint(300, 900), y + rnd.randint(8, 22)], fill=rnd.randint(30, 70))
    clouds = clouds.filter(ImageFilter.GaussianBlur(10))
    img = Image.composite(Image.new("RGB", img.size, (64, 112, 140)), img, clouds)
    return img


def skyline(layer_y, count, h_range, w_range, colour, window_chance, x_span=(0, W), win=(5, 8, 14, 18), gap=(4, 40)):
    """Return (rgba image, list of window rects) for one depth layer of towers."""
    img = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    lights = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    ld = ImageDraw.Draw(lights)
    x = x_span[0]
    while x < x_span[1] and count > 0:
        bw = rnd.randint(*w_range)
        bh = rnd.randint(*h_range)
        top = layer_y - bh
        d.rectangle([x, top, x + bw, layer_y], fill=colour)
        # Occasional stepped crown or mast.
        if rnd.random() < 0.35:
            inset = bw // 4
            d.rectangle([x + inset, top - bh // 8, x + bw - inset, top], fill=colour)
        if rnd.random() < 0.2:
            mx = x + bw // 2
            d.line([(mx, top - bh // 8), (mx, top - bh // 8 - rnd.randint(30, 90))], fill=colour, width=3)
            ld.ellipse([mx - 4, top - bh // 8 - 94, mx + 4, top - bh // 8 - 86], fill=(255, 90, 70, 230))
        # Windows.
        ww, wh, sx, sy = win
        floor_lit = window_chance * rnd.uniform(0.3, 1.6)  # some towers busier than others
        for wy in range(top + sy, layer_y - 10, sy):
            row_on = rnd.random() < 0.75
            for wx in range(x + 6, x + bw - 6, sx):
                if row_on and rnd.random() < floor_lit:
                    a = rnd.randint(110, 255)
                    ld.rectangle([wx, wy, wx + ww, wy + wh], fill=(*lerp(GOLD, WARM, rnd.random()), a))
        x += bw + rnd.randint(*gap)
        count -= 1
    return img, lights


def bridge(img):
    """Long low bridge sweeping from the left foreground into the distance, with sodium lamps."""
    d = ImageDraw.Draw(img)
    x0, y0 = -60, HORIZON + 210  # near end (bottom-left)
    x1, y1 = int(W * 0.78), HORIZON + 18  # far end, near the horizon
    steps = 140
    glow = Image.new("RGBA", img.size, (0, 0, 0, 0))
    g = ImageDraw.Draw(glow)
    for i in range(steps):
        t0, t1 = i / steps, (i + 1) / steps
        # Ease so the near end is long and the far end compresses.
        e0, e1 = 1 - (1 - t0) ** 1.8, 1 - (1 - t1) ** 1.8
        ax, ay = x0 + (x1 - x0) * e0, y0 + (y1 - y0) * e0
        bx, by = x0 + (x1 - x0) * e1, y0 + (y1 - y0) * e1
        thick = max(2, int(26 * (1 - e0)))
        d.polygon([(ax, ay), (bx, by), (bx, by + thick), (ax, ay + thick)], fill=(8, 18, 24))
        if i % 6 == 0:
            pier_h = int(160 * (1 - e0)) + 8
            pw = max(2, int(14 * (1 - e0)))
            d.rectangle([ax, ay + thick, ax + pw, ay + thick + pier_h], fill=(6, 16, 22))
        if i % 4 == 0:
            size = max(1.5, 9 * (1 - e0))
            post = max(4, int(46 * (1 - e0)))
            g.line([(ax, ay), (ax, ay - post)], fill=(10, 20, 26, 255), width=max(1, int(3 * (1 - e0))))
            g.ellipse([ax - size * 3, ay - post - size * 3, ax + size * 3, ay - post + size * 3], fill=(140, 195, 224, 60))
            g.ellipse([ax - size, ay - post - size, ax + size, ay - post + size], fill=(214, 233, 244, 255))
    img.alpha_composite(glow.filter(ImageFilter.GaussianBlur(1.5)))


def main():
    canvas = Image.new("RGBA", (W, H), (0, 0, 0, 255))
    canvas.paste(sky(), (0, 0))

    # Depth layers, far to near. Far layers are paler, hazier and slightly blurred.
    layers = [
        dict(n=70, hr=(60, 200), wr=(30, 90), col=(40, 72, 92, 255), wc=0.04, win=(3, 4, 9, 11), gap=(0, 18), blur=1.6, haze=120),
        dict(n=48, hr=(120, 340), wr=(50, 130), col=(20, 42, 56, 255), wc=0.10, win=(4, 6, 11, 14), gap=(6, 60), blur=0.6, haze=55),
        dict(n=18, hr=(180, 470), wr=(70, 160), col=(8, 18, 26, 255), wc=0.14, win=(5, 8, 14, 18), gap=(60, 260), blur=0, haze=0),
    ]
    all_lights = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    for L in layers:
        towers, lights = skyline(HORIZON, L["n"], L["hr"], L["wr"], L["col"], L["wc"], x_span=(rnd.randint(-80, 0), W + 80), win=L["win"], gap=L["gap"])
        if L["blur"]:
            towers = towers.filter(ImageFilter.GaussianBlur(L["blur"]))
        canvas.alpha_composite(towers)
        canvas.alpha_composite(lights.filter(ImageFilter.GaussianBlur(0.5)))
        canvas.alpha_composite(lights.filter(ImageFilter.GaussianBlur(5)))
        all_lights.alpha_composite(lights)
        if L["haze"]:
            haze = vertical_gradient((W, HORIZON), [(0.0, (0, 0, 0)), (0.7, (0, 0, 0)), (1.0, (150, 150, 150))]).convert("L")
            haze = haze.point(lambda v: int(v / 150 * L["haze"]))
            hz = Image.new("RGBA", (W, H), (0, 0, 0, 0))
            hz.paste(Image.new("RGBA", (W, HORIZON), (90, 150, 182, 255)), (0, 0), haze)
            canvas.alpha_composite(hz)

    # Water: mirrored, blurred, darkened copy of the scene with gold ripples.
    above = canvas.crop((0, 0, W, HORIZON))
    mirror = above.transpose(Image.FLIP_TOP_BOTTOM).resize((W, H - HORIZON))
    mirror = mirror.filter(ImageFilter.GaussianBlur(5))
    dark = Image.new("RGBA", mirror.size, (4, 20, 30, 170))
    mirror.alpha_composite(dark)
    trails = Image.new("RGBA", mirror.size, (0, 0, 0, 0))
    t = ImageDraw.Draw(trails)
    # Columns of broken light under the brightest parts of the skyline.
    col_strength = [0] * W
    lp = all_lights.crop((0, 0, W, HORIZON)).split()[3].resize((W, 1), Image.BOX)
    for x in range(W):
        col_strength[x] = lp.getpixel((x, 0))
    for x in range(0, W, 3):
        s_ = col_strength[x]
        if s_ < 6 or rnd.random() > 0.55:
            continue
        y = 4
        while y < (H - HORIZON) * min(1, 0.25 + s_ / 30):
            seg = rnd.randint(2, 9)
            t.line([(x + rnd.randint(-6, 6), y), (x + rnd.randint(-6, 6) + rnd.randint(4, 30), y)], fill=(*lerp(GOLD, WARM, rnd.random()), rnd.randint(40, 150)), width=1)
            y += seg + rnd.randint(2, 14)
    for _ in range(500):  # fine surface glints
        x = rnd.randint(0, W)
        y = int((rnd.random() ** 1.6) * (H - HORIZON))
        t.line([(x, y), (x + rnd.randint(10, 70), y)], fill=(*GOLD, rnd.randint(10, 50)), width=1)
    mirror.alpha_composite(trails.filter(ImageFilter.GaussianBlur(0.8)))
    canvas.paste(mirror, (0, HORIZON))

    bridge(canvas)

    # Vignette + film grain for a photographic finish.
    vignette = Image.new("L", (W, H), 0)
    v = ImageDraw.Draw(vignette)
    v.ellipse([-W * 0.25, -H * 0.35, W * 1.25, H * 1.25], fill=255)
    vignette = vignette.filter(ImageFilter.GaussianBlur(220))
    canvas = Image.composite(canvas, Image.new("RGBA", (W, H), (0, 0, 0, 255)), vignette)

    noise = Image.effect_noise((W, H), 40).convert("RGBA")
    rgb = canvas.convert("RGB")
    grain = ImageChops.overlay(rgb, noise.convert("RGB"))
    final = Image.blend(rgb, grain, 0.12)

    OUT.parent.mkdir(parents=True, exist_ok=True)
    final.save(OUT, "WEBP", quality=82, method=6)
    print(f"wrote {OUT} ({OUT.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    main()
