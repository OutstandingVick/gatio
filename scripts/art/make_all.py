"""Regenerate every code-painted image in public/images.

Usage:  python3 scripts/art/make_all.py   (needs Pillow: pip install pillow)
"""

import importlib
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
os.chdir(HERE)

SCENES = ["lagos_dusk", "harbour_cranes", "light_trails", "night_market", "aerial_grid"]

for name in SCENES:
    importlib.import_module(name).main()
