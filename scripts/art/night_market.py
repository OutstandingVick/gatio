"""Night market: lantern bokeh above stall awnings, silhouetted shoppers. Portrait."""

from PIL import Image, ImageDraw, ImageFilter

from common import finish, radial_glow, rng, save, vertical_gradient

W, H = 1600, 2000
rnd = rng(37)
AMBER = (255, 176, 92)
ROSE = (220, 96, 120)


def bokeh(size, count, r_range, colours, blur):
    layer = Image.new("RGBA", size, (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    for _ in range(count):
        x = rnd.randint(-50, size[0] + 50)
        y = int(rnd.random() ** 1.3 * size[1] * 0.62)
        r = rnd.randint(*r_range)
        c = rnd.choice(colours)
        d.ellipse([x - r, y - r, x + r, y + r], fill=(*c, rnd.randint(25, 85)))
        d.ellipse([x - r + 3, y - r + 3, x + r - 3, y + r - 3], outline=(*c, 40), width=2)
    return layer.filter(ImageFilter.GaussianBlur(blur))


def main():
    img = Image.new("RGBA", (W, H), (0, 0, 0, 255))
    img.paste(vertical_gradient((W, H), [(0.0, (10, 6, 10)), (0.5, (34, 16, 22)), (0.8, (20, 10, 12)), (1.0, (6, 4, 6))]), (0, 0))
    img.alpha_composite(radial_glow((W, H), (int(W * 0.5), int(H * 0.5)), 800, AMBER, strength=60, squash=1.2))

    # Out-of-focus lanterns: big soft far ones, smaller sharper near ones.
    img.alpha_composite(bokeh((W, H), 26, (50, 120), [AMBER, ROSE, (255, 214, 150)], 8))
    img.alpha_composite(bokeh((W, H), 45, (10, 30), [AMBER, (255, 214, 150)], 1.5))

    d = ImageDraw.Draw(img)
    # Strings of lights.
    for k in range(4):
        y0 = int(H * (0.08 + k * 0.1))
        pts = [(x, y0 + int(60 * ((x / W - 0.5) ** 2) * 4)) for x in range(0, W + 1, 20)]
        d.line(pts, fill=(30, 20, 20), width=2)
        glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
        g = ImageDraw.Draw(glow)
        for x, y in pts[::3]:
            g.ellipse([x - 5, y - 2, x + 5, y + 8], fill=(*AMBER, 255))
        img.alpha_composite(glow.filter(ImageFilter.GaussianBlur(5)))
        img.alpha_composite(glow)

    # Stall awnings (scalloped) across the lower third.
    top = int(H * 0.62)
    x = -40
    while x < W:
        aw = rnd.randint(260, 420)
        col = rnd.choice([(70, 24, 30), (60, 40, 20), (30, 30, 40)])
        d.polygon([(x, top), (x + aw, top - 30), (x + aw, top + 60), (x, top + 90)], fill=col)
        for sx in range(x, x + aw, 40):
            d.pieslice([sx, top + 60, sx + 40, top + 110], 0, 180, fill=col)
        # Warm stall interior light below the awning.
        img.alpha_composite(radial_glow((W, H), (x + aw // 2, top + 220), aw * 0.7, AMBER, strength=110, squash=1.4, blur=30))
        x += aw + rnd.randint(10, 60)
    d = ImageDraw.Draw(img)

    # Silhouetted shoppers in the foreground.
    for _ in range(14):
        cx = rnd.randint(0, W)
        h = rnd.randint(420, 640)
        base = H + rnd.randint(0, 80)
        w = h * 0.28
        col = (6, 5, 7)
        d.ellipse([cx - w * 0.22, base - h, cx + w * 0.22, base - h + w * 0.44], fill=col)  # head
        d.rounded_rectangle([cx - w / 2, base - h + w * 0.4, cx + w / 2, base], radius=int(w * 0.3), fill=col)  # body

    save(finish(img, grain=0.14), "scene-night-market.webp")


if __name__ == "__main__":
    main()
