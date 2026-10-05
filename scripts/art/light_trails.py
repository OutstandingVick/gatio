"""Long-exposure light trails on a curving expressway at night. Portrait."""

import math

from PIL import Image, ImageDraw, ImageFilter

from common import GOLD, finish, radial_glow, rng, save, vertical_gradient

W, H = 1600, 2000
rnd = rng(23)


def curve(t, lane):
    """Point on a sweeping S-curve from bottom-left to the vanishing point, offset by lane."""
    x = W * (0.05 + 0.6 * t) + math.sin(t * math.pi * 1.2) * W * 0.18
    y = H * (1.02 - 0.62 * t)
    spread = (1 - t) ** 1.4 * 260
    return x + lane * spread, y + lane * spread * 0.25


def main():
    img = Image.new("RGBA", (W, H), (0, 0, 0, 255))
    img.paste(vertical_gradient((W, H), [(0.0, (4, 12, 18)), (0.4, (12, 34, 48)), (0.6, (20, 56, 76)), (1.0, (6, 16, 22))]), (0, 0))
    img.alpha_composite(radial_glow((W, H), (int(W * 0.7), int(H * 0.38)), 600, (90, 160, 196), strength=70, squash=1.6))

    d = ImageDraw.Draw(img)
    # Distant towers on the skyline.
    x = 0
    while x < W:
        bw, bh = rnd.randint(40, 120), rnd.randint(80, 420)
        d.rectangle([x, H * 0.4 - bh, x + bw, H * 0.42], fill=(10, 24, 32))
        for wy in range(int(H * 0.4 - bh) + 10, int(H * 0.41), 14):
            for wx in range(x + 6, x + bw - 6, 11):
                if rnd.random() < 0.08:
                    d.rectangle([wx, wy, wx + 3, wy + 5], fill=(*GOLD, 255))
        x += bw + rnd.randint(2, 30)

    # Road surface between the outer lanes.
    road = [curve(t / 100, -1.2) for t in range(101)] + [curve(t / 100, 1.2) for t in range(100, -1, -1)]
    d.polygon(road, fill=(6, 18, 24))

    trails = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    td = ImageDraw.Draw(trails)
    # Warm head-light trails on one side, red tail-lights on the other.
    for lane, colour in [(-0.9, (236, 246, 252)), (-0.5, (190, 222, 240)), (0.5, (110, 176, 214)), (0.9, (49, 126, 166))]:
        for strand in range(6):
            jitter = rnd.uniform(-0.06, 0.06)
            pts = [curve(t / 300, lane + jitter) for t in range(301)]
            for i in range(len(pts) - 1):
                t = i / 300
                width = max(1, int(7 * (1 - t)))
                td.line([pts[i], pts[i + 1]], fill=(*colour, int(200 * (1 - t * 0.6))), width=width)
    img.alpha_composite(trails.filter(ImageFilter.GaussianBlur(10)))
    img.alpha_composite(trails.filter(ImageFilter.GaussianBlur(2)))
    img.alpha_composite(trails)

    # Street lamps along the inner edge.
    lamps = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    lp = ImageDraw.Draw(lamps)
    for k in range(18):
        t = (k / 18) ** 0.8
        x, y = curve(t, -1.35)
        h = 220 * (1 - t) + 20
        lp.line([(x, y), (x, y - h)], fill=(10, 22, 28, 255), width=max(1, int(6 * (1 - t))))
        r = max(2, 10 * (1 - t))
        lp.ellipse([x - r * 4, y - h - r * 4, x + r * 4, y - h + r * 4], fill=(140, 195, 224, 50))
        lp.ellipse([x - r, y - h - r, x + r, y - h + r], fill=(214, 233, 244, 255))
    img.alpha_composite(lamps.filter(ImageFilter.GaussianBlur(1.5)))

    save(finish(img), "scene-light-trails.webp")


if __name__ == "__main__":
    main()
