(function () {
  // Justified-rows layout: pack images into rows near the target height, then
  // scale each row to fill the track width exactly. Aspect ratios come from the
  // width/height attributes baked by tools/build_galleries.py. The flex rules
  // in site.css remain as a no-JS fallback.
  var GAP = 6;
  var MAX_PER_ROW = 4;

  function justifyTracks() {
    var mobile = window.matchMedia('(max-width: 760px)').matches;
    var target = window.matchMedia('(max-width: 980px)').matches ? 220 : 300;

    document.querySelectorAll('.gallery-track').forEach(function (track) {
      var figures = Array.from(track.querySelectorAll('.gallery-item'));
      if (!figures.length) return;

      if (mobile) {
        figures.forEach(function (f) {
          f.style.width = '';
          f.style.height = '';
          f.style.flex = '';
        });
        return;
      }

      var W = track.clientWidth - 1; // slack against subpixel rounding
      var row = [];
      var sum = 0;
      var closedRows = 0;
      var lastRowH = 0;

      function flush(justify) {
        if (!row.length) return;
        var h = (W - (row.length - 1) * GAP) / sum;
        if (!justify) h = Math.min(h, lastRowH || target);
        h = Math.min(h, target * 2.4);
        lastRowH = h;
        // Explicit width AND height: deriving the height from CSS aspect-ratio
        // is not interoperable (WebKit resolves aspect-ratio against the
        // content box), and any height mismatch makes object-fit crop.
        row.forEach(function (entry) {
          entry.el.style.flex = '0 0 auto';
          entry.el.style.width = entry.r * h + 'px';
          entry.el.style.height = h + 'px';
        });
        row = [];
        sum = 0;
      }

      figures.forEach(function (f) {
        var img = f.querySelector('img');
        var w = img ? parseInt(img.getAttribute('width') || '0', 10) : 0;
        var h = img ? parseInt(img.getAttribute('height') || '0', 10) : 0;
        var ratio = w > 0 && h > 0 ? w / h : 1.5;
        row.push({ el: f, r: ratio });
        sum += ratio;
        if (row.length >= MAX_PER_ROW || (W - (row.length - 1) * GAP) / sum <= target) {
          flush(true);
          closedRows += 1;
        }
      });

      // Remainder: a track that never filled a row is a curated single row and
      // gets justified; a leftover after full rows keeps the target height.
      flush(closedRows === 0);
    });
  }

  var resizeTimer = null;

  function watchResize() {
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(justifyTracks, 120);
    });
  }

  // PhotoSwipe 5 is distributed as ES modules; load them on demand so gallery.js
  // can stay a classic script and the grid renders without waiting on the CDN.
  var PSWP_VERSION = '5.4.4';
  var PSWP_BASE = 'https://unpkg.com/photoswipe@' + PSWP_VERSION + '/dist/';

  function ensureSize(item, done) {
    // Every image built by tools/build_galleries.py carries width/height, so
    // this is normally a no-op; it only measures an image added without a
    // rebuild, since PhotoSwipe needs dimensions to lay out a slide.
    if (item.width > 0 && item.height > 0) {
      done();
      return;
    }
    var probe = new Image();
    probe.onload = function () {
      item.width = probe.naturalWidth;
      item.height = probe.naturalHeight;
      done();
    };
    probe.onerror = done;
    probe.src = item.src;
  }

  function initLightbox() {
    var images = Array.from(document.querySelectorAll('.gallery-item img'));
    if (!images.length) return;

    var items = images.map(function (img) {
      return {
        src: img.dataset.full || img.currentSrc || img.src,
        msrc: img.currentSrc || img.src, // already-loaded thumbnail = placeholder
        width: parseInt(img.getAttribute('width') || img.dataset.pswpWidth || '0', 10),
        height: parseInt(img.getAttribute('height') || img.dataset.pswpHeight || '0', 10),
        alt: img.alt || ''
      };
    });

    Promise.all([
      import(PSWP_BASE + 'photoswipe-lightbox.esm.js'),
      import(PSWP_BASE + 'photoswipe.esm.js')
    ]).then(function (mods) {
      var PhotoSwipeLightbox = mods[0].default;
      var PhotoSwipe = mods[1].default;

      var lightbox = new PhotoSwipeLightbox({
        dataSource: items,
        pswpModule: PhotoSwipe,
        bgOpacity: 0.9
      });

      // Zoom the opening/closing animation from the clicked grid thumbnail.
      lightbox.addFilter('thumbBounds', function (thumbBounds, itemData, index) {
        var el = images[index];
        if (!el) return thumbBounds;
        var rect = el.getBoundingClientRect();
        return { x: rect.left, y: rect.top + window.scrollY, w: rect.width };
      });

      lightbox.init();

      images.forEach(function (img, index) {
        img.addEventListener('click', function (event) {
          event.preventDefault();
          ensureSize(items[index], function () {
            lightbox.loadAndOpen(index);
          });
        });
      });
    }).catch(function (err) {
      // CDN unreachable: the grid stays fully usable, just without the lightbox.
      console.error('PhotoSwipe failed to load', err);
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    justifyTracks();
    watchResize();
    initLightbox();
  });
})();
