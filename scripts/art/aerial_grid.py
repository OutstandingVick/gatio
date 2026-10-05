"""Aerial night view of a city grid: glowing streets, dark blocks, a lagoon edge. Portrait."""

import math

from PIL import Image, ImageDraw, ImageFilter

from common import GOLD, WARM, finish, rng, save

W, H = 1600, 2000
rnd = rng(53)


def main():
    img = Image.new("RGBA", (W, H), (4, 12, 18, 255))
    streets = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    s = ImageDraw.Draw(streets)
    blocks = ImageDraw.Draw(img)

    # Slightly rotated grid so it reads as a real city from above.
    angle = math.radians(-14)
    ca, sa = math.cos(angle), math.sin(angle)

    def rot(x, y):
        cx, cy = x - W / 2, y - H / 2
        return (cx * ca - cy * sa + W / 2, cx * sa + cy * ca + H / 2)

    step = 120
    for gx in range(-W, 2 * W, step):
        for gy in range(-H, 2 * H, step):
            pad = rnd.choice([10, 12, 16])
            quad = [rot(gx + pad, gy + pad), rot(gx + step - pad, gy + pad), rot(gx + step - pad, gy + step - pad), rot(gx + pad, gy + step - pad)]
            shade = rnd.randint(7, 14)
            blocks.polygon(quad, fill=(shade, shade + 10, shade + 16))
            # Rooftop lights inside some blocks.
            if rnd.random() < 0.35:
                for _ in range(rnd.randint(2, 8)):
                    px, py = rot(gx + rnd.randint(pad + 6, step - pad - 6), gy + rnd.randint(pad + 6, step - pad - 6))
                    s.ellipse([px - 2, py - 2, px + 2, py + 2], fill=(*WARM, rnd.randint(120, 255)))

    # Streets: every grid line, brighter on the main avenues.
    for k, g in enumerate(range(-W, 2 * W, step)):
        main = k % 4 == 0
        s.line([rot(g, -H), rot(g, 2 * H)], fill=(*GOLD, 230 if main else 130), width=5 if main else 2)
    for k, g in enumerate(range(-H, 2 * H, step)):
        main = k % 5 == 0
        s.line([rot(-W, g), rot(2 * W, g)], fill=(*GOLD, 230 if main else 130), width=5 if main else 2)

    img.alpha_composite(streets.filter(ImageFilter.GaussianBlur(14)))
    img.alpha_composite(streets.filter(ImageFilter.GaussianBlur(5)))
    img.alpha_composite(streets.filter(ImageFilter.GaussianBlur(1.2)))

    # Lagoon edge: a dark curved body of water in the lower-right with a soft shoreline glow.
    # Draw on a padded canvas so edge detection only finds the shoreline, not the image border.
    P = 200
    big = Image.new("L", (W + 2 * P, H + 2 * P), 0)
    ImageDraw.Draw(big).ellipse([int(W * 0.45) + P, int(H * 0.62) + P, int(W * 1.8) + P, int(H * 1.5) + P], fill=255)
    big = big.filter(ImageFilter.GaussianBlur(6))
    shore_big = big.filter(ImageFilter.FIND_EDGES).filter(ImageFilter.GaussianBlur(10))
    water = big.crop((P, P, P + W, P + H))
    img = Image.composite(Image.new("RGBA", (W, H), (10, 34, 46, 255)), img, water)
    shore = shore_big.crop((P, P, P + W, P + H))
    glow = Image.new("RGBA", (W, H), (*GOLD, 0))
    glow.putalpha(shore.point(lambda v: min(255, v * 6)))
    img.alpha_composite(glow)

    save(finish(img, vignette=260), "scene-aerial-grid.webp")


if __name__ == "__main__":
    main()
