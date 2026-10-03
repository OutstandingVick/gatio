"""Port at dusk: gantry cranes over stacked containers, teal sky, still water. Portrait."""

from PIL import Image, ImageDraw, ImageFilter

from common import GOLD, finish, lerp, radial_glow, rng, save, vertical_gradient

W, H = 1600, 2000
HORIZON = int(H * 0.66)
rnd = rng(11)


def crane(d, x, base, h, reach, colour):
    """A ship-to-shore gantry crane: two legs, a deck, and a long boom."""
    leg_w = 10
    span = int(h * 0.42)
    d.rectangle([x, base - h, x + leg_w, base], fill=colour)
    d.rectangle([x + span, base - h, x + span + leg_w, base], fill=colour)
    d.rectangle([x - 20, base - h - 26, x + span + 30, base - h], fill=colour)  # machinery house
    # Bracing.
    for k in range(4):
        y0 = base - h + k * h // 4
        d.line([(x, y0), (x + span, y0 + h // 4)], fill=colour, width=3)
        d.line([(x + span, y0), (x, y0 + h // 4)], fill=colour, width=3)
    # Boom out over the water, with an A-frame and stays.
    boom_y = base - int(h * 0.82)
    d.rectangle([x - reach, boom_y, x + span + 60, boom_y + 12], fill=colour)
    apex = (x + span // 2, base - h - 160)
    d.line([(x, base - h), apex], fill=colour, width=6)
    d.line([(x + span, base - h), apex], fill=colour, width=6)
    d.line([apex, (x - reach, boom_y)], fill=colour, width=2)
    d.line([apex, (x + span + 60, boom_y)], fill=colour, width=2)
    return apex


def main():
    img = Image.new("RGBA", (W, H), (0, 0, 0, 255))
    sky = vertical_gradient(
        (W, HORIZON),
        [(0.0, (6, 14, 18)), (0.5, (14, 40, 46)), (0.85, (44, 92, 92)), (1.0, (150, 140, 104))],
    )
    img.paste(sky, (0, 0))
    img.alpha_composite(radial_glow((W, H), (int(W * 0.3), HORIZON + 20), 700, (230, 180, 110), strength=90, squash=1.4))

    d = ImageDraw.Draw(img)
    # Containers along the quay, in muted colours.
    palette = [(80, 44, 36), (36, 58, 70), (90, 76, 40), (40, 40, 44), (64, 30, 30)]
    quay = HORIZON
    x = -20
    while x < W:
        stack = rnd.randint(1, 5)
        cw = rnd.choice([120, 120, 240])
        for k in range(stack):
            col = lerp(rnd.choice(palette), (8, 10, 12), 0.55)
            y1 = quay - k * 44
            d.rectangle([x, y1 - 42, x + cw - 4, y1], fill=col)
            for rx in range(x + 8, x + cw - 8, 10):
                d.line([(rx, y1 - 40), (rx, y1 - 2)], fill=lerp(col, (0, 0, 0), 0.3), width=1)
        x += cw

    lights = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    ld = ImageDraw.Draw(lights)
    for cx, h, reach in [(140, 760, 220), (720, 900, 300), (1250, 680, 200)]:
        apex = crane(d, cx, quay, h, reach, (10, 12, 14))
        ld.ellipse([apex[0] - 6, apex[1] - 6, apex[0] + 6, apex[1] + 6], fill=(255, 80, 60, 255))
        for k in range(3):  # deck floodlights
            lx = cx - 10 + k * 120
            ld.ellipse([lx - 5, quay - h - 20, lx + 5, quay - h - 10], fill=(*GOLD, 255))
    img.alpha_composite(lights.filter(ImageFilter.GaussianBlur(1)))
    img.alpha_composite(lights.filter(ImageFilter.GaussianBlur(10)))

    # Water: mirrored, blurred, darkened, with broken gold trails under the lights.
    mirror = img.crop((0, 0, W, HORIZON)).transpose(Image.FLIP_TOP_BOTTOM).resize((W, H - HORIZON))
    mirror = mirror.filter(ImageFilter.GaussianBlur(6))
    mirror.alpha_composite(Image.new("RGBA", mirror.size, (4, 10, 12, 170)))
    t = ImageDraw.Draw(mirror)
    for _ in range(700):
        x = rnd.randint(0, W)
        y = int((rnd.random() ** 1.7) * (H - HORIZON))
        t.line([(x, y), (x + rnd.randint(10, 90), y)], fill=(*GOLD, rnd.randint(15, 70)), width=1)
    img.paste(mirror, (0, HORIZON))

    save(finish(img), "scene-harbour.webp")


if __name__ == "__main__":
    main()
