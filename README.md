# silasja.github.io

Personal site with photography galleries, hosted on GitHub Pages.

## Adding photos to a gallery

1. Drop the image into `images/<gallery>/` (e.g. `images/icescapes/`).
2. Add a line to the gallery page:

   ```html
   <figure class="gallery-item"><img src="images/icescapes/newphoto.jpeg" alt="Description" /></figure>
   ```

3. Run the build script (macOS, no dependencies):

   ```sh
   python3 tools/build_galleries.py
   ```

   It generates a downscaled thumbnail in `images/<gallery>/thumbs/` and rewrites
   the `<img>` tag with the thumbnail as `src`, the original as `data-full`, and
   the pixel dimensions the layout and lightbox need. Commit the generated
   thumbnails together with the HTML changes.

The gallery grid (`js/gallery.js`) lays the images out in justified rows using
the baked dimensions and opens the full-resolution original in PhotoSwipe.
Rows hold at most 4 images (`MAX_PER_ROW`) and aim for a 300px row height
(`target` in `justifyTracks`). Each `.gallery-track` section is packed
independently, so grouping images into separate tracks controls which photos
share rows.
