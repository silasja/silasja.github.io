#!/usr/bin/env python3
"""Generate gallery thumbnails and bake image metadata into the HTML pages.

Workflow for adding a photo: drop the file into images/<gallery>/, add a plain
    <figure class="gallery-item"><img src="images/<gallery>/photo.jpeg" alt="..." /></figure>
line to the page, then run:
    python3 tools/build_galleries.py

The script (idempotent, safe to re-run):
  * creates images/<gallery>/thumbs/<name>.jpg (max 1200 px long edge) for
    every referenced image whose long edge exceeds that,
  * rewrites the <img> tags: src -> thumbnail, data-full -> original,
    width/height -> full-size pixel dimensions,
  * sets style="--ratio: <w/h>" on gallery <figure>s so the justified-row
    CSS layout knows each image's shape before it loads.

Uses macOS `sips` for resizing; no third-party dependencies.
Animated GIFs are left untouched.
"""

import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
THUMB_EDGE = 1400
# Panoramas render at full page width (up to ~1880 CSS px on retina screens),
# so they get a much larger thumbnail than grid images.
PANO_RATIO = 1.7
PANO_EDGE = 3200
JPEG_QUALITY = 75

# Pages whose images get thumbnail + dimension treatment.
PAGES = [
    "icescapes.html",
    "cityscapes.html",
    "landscapes.html",
    "lightscapes.html",
    "nightscapes.html",
    "seascapes.html",
    "bohemians.html",
    "photography.html",
    "index.html",
]

IMG_TAG_RE = re.compile(r"<img\b[^>]*?/?>", re.IGNORECASE)
FIGURE_RE = re.compile(
    r'(<figure\b[^>]*class="[^"]*gallery-item[^"]*"[^>]*>)(\s*)(<img\b[^>]*?/?>)(\s*)(</figure>)',
    re.IGNORECASE | re.DOTALL,
)
ATTR_RE = re.compile(r'([a-zA-Z][-\w]*)\s*=\s*"([^"]*)"')

_dims_cache = {}


def image_dims(path):
    if path not in _dims_cache:
        out = subprocess.run(
            ["sips", "-g", "pixelWidth", "-g", "pixelHeight", str(path)],
            capture_output=True, text=True, check=True,
        ).stdout
        w = int(re.search(r"pixelWidth:\s*(\d+)", out).group(1))
        h = int(re.search(r"pixelHeight:\s*(\d+)", out).group(1))
        _dims_cache[path] = (w, h)
    return _dims_cache[path]


def thumb_for(src_rel):
    """Return the thumbnail's repo-relative path, generating it if needed.

    Returns src_rel unchanged when the original is already small enough or is
    an animated GIF.
    """
    src_abs = ROOT / src_rel
    if src_abs.suffix.lower() == ".gif":
        return src_rel

    w, h = image_dims(src_abs)
    edge = PANO_EDGE if w / h >= PANO_RATIO else THUMB_EDGE
    if max(w, h) <= edge:
        return src_rel

    thumb_rel = str(Path(src_rel).parent / "thumbs" / (Path(src_rel).stem + ".jpg"))
    thumb_abs = ROOT / thumb_rel

    # Regenerate when missing, older than the source, or built with a
    # different edge setting.
    stale = (
        not thumb_abs.exists()
        or thumb_abs.stat().st_mtime < src_abs.stat().st_mtime
        or max(image_dims(thumb_abs)) != edge
    )
    if stale:
        thumb_abs.parent.mkdir(parents=True, exist_ok=True)
        _dims_cache.pop(thumb_abs, None)
        subprocess.run(
            ["sips", "-s", "format", "jpeg", "-s", "formatOptions", str(JPEG_QUALITY),
             "-Z", str(edge), str(src_abs), "--out", str(thumb_abs)],
            capture_output=True, check=True,
        )
        print(f"  thumb: {thumb_rel} ({edge}px)")
    return thumb_rel


def rewrite_img(tag):
    """Rewrite one <img> tag; returns (new_tag, ratio) or (tag, None) to skip."""
    attrs = dict(ATTR_RE.findall(tag))
    src = attrs.get("data-full") or attrs.get("src", "")
    if not src.startswith("images/") or not (ROOT / src).exists():
        return tag, None

    w, h = image_dims(ROOT / src)
    thumb = thumb_for(src)

    out = dict(attrs)
    out["src"] = thumb
    if thumb != src:
        out["data-full"] = src
    else:
        out.pop("data-full", None)
    out["width"] = str(w)
    out["height"] = str(h)
    out.setdefault("loading", "lazy")
    out.setdefault("decoding", "async")

    order = ["src", "data-full", "width", "height", "alt", "class", "loading", "decoding"]
    keys = [k for k in order if k in out] + [k for k in out if k not in order]
    new_tag = "<img " + " ".join(f'{k}="{out[k]}"' for k in keys) + " />"
    return new_tag, round(w / h, 4)


def rewrite_figure(match):
    open_tag, ws1, img_tag, ws2, close_tag = match.groups()
    new_img, ratio = rewrite_img(img_tag)
    if ratio is None:
        return match.group(0)
    # Refresh the --ratio custom property on the figure.
    open_tag = re.sub(r'\s*style="--ratio:[^"]*"', "", open_tag)
    open_tag = open_tag[:-1].rstrip() + f' style="--ratio: {ratio}">'
    return f"{open_tag}{ws1}{new_img}{ws2}{close_tag}"


def process_page(name):
    path = ROOT / name
    html = path.read_text()
    print(f"{name}:")

    # Gallery figures: img rewrite + --ratio on the figure.
    html = FIGURE_RE.sub(rewrite_figure, html)

    # Any remaining local images (covers, hero, bohemian figures): img rewrite only.
    def img_only(match):
        return rewrite_img(match.group(0))[0]

    parts = []
    last = 0
    for m in IMG_TAG_RE.finditer(html):
        parts.append(html[last:m.start()])
        parts.append(img_only(m))
        last = m.end()
    parts.append(html[last:])
    path.write_text("".join(parts))


def main():
    for name in PAGES:
        if (ROOT / name).exists():
            process_page(name)
        else:
            print(f"skipping missing page {name}", file=sys.stderr)


if __name__ == "__main__":
    main()
