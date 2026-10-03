# Code-painted images

Every photo-like image on the site is painted in Python with Pillow. There's no stock photography and nothing to license. Composition is seeded, so scenes keep their layout between runs; only the fine film grain differs each time.

| Script | Output | Used for |
| --- | --- | --- |
| `lagos_dusk.py` | `hero-lagos-dusk.webp` | Home hero, page headers |
| `harbour_cranes.py` | `scene-harbour.webp` | Services (briefings), About |
| `light_trails.py` | `scene-light-trails.webp` | Services (data & analytics) |
| `night_market.py` | `scene-night-market.webp` | Services (market research), consumer topics |
| `aerial_grid.py` | `scene-aerial-grid.webp` | Services (strategy), Research header |

```bash
pip install pillow
python3 scripts/art/make_all.py
```
