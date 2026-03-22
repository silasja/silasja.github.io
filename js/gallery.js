(function () {
  function ensurePswpRoot() {
    if (document.querySelector('.pswp')) return;

    var root = document.createElement('div');
    root.className = 'pswp';
    root.tabIndex = -1;
    root.setAttribute('role', 'dialog');
    root.setAttribute('aria-hidden', 'true');

    root.innerHTML = '' +
      '<div class="pswp__bg"></div>' +
      '<div class="pswp__scroll-wrap">' +
      '<div class="pswp__container">' +
      '<div class="pswp__item"></div>' +
      '<div class="pswp__item"></div>' +
      '<div class="pswp__item"></div>' +
      '</div>' +
      '<div class="pswp__ui pswp__ui--hidden">' +
      '<div class="pswp__top-bar">' +
      '<div class="pswp__counter"></div>' +
      '<button class="pswp__button pswp__button--close" title="Close (Esc)"></button>' +
      '<button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>' +
      '<div class="pswp__preloader">' +
      '<div class="pswp__preloader__icn">' +
      '<div class="pswp__preloader__cut"><div class="pswp__preloader__donut"></div></div>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '<div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">' +
      '<div class="pswp__share-tooltip"></div>' +
      '</div>' +
      '<button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"></button>' +
      '<button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"></button>' +
      '<div class="pswp__caption"><div class="pswp__caption__center"></div></div>' +
      '</div>' +
      '</div>';

    document.body.appendChild(root);
  }

  function classifyItem(item, img) {
    if (!img.naturalWidth || !img.naturalHeight) return;
    var ratio = img.naturalWidth / img.naturalHeight;
    item.classList.remove('panorama', 'landscape', 'portrait');
    if (ratio >= 2) {
      item.classList.add('panorama');
      return;
    }

    if (ratio >= 1) {
      item.classList.add('landscape');
    } else {
      item.classList.add('portrait');
    }
  }

  function buildGallery() {
    var images = Array.from(document.querySelectorAll('.gallery-item img'));
    if (!images.length || typeof PhotoSwipe === 'undefined' || typeof PhotoSwipeUI_Default === 'undefined') {
      return;
    }

    ensurePswpRoot();

    var items = images.map(function (img) {
      return {
        src: img.dataset.full || img.currentSrc || img.src,
        w: parseInt(img.dataset.pswpWidth || '0', 10),
        h: parseInt(img.dataset.pswpHeight || '0', 10),
        title: img.alt || ''
      };
    });

    function ensureSize(index, done) {
      var item = items[index];
      if (item.w > 0 && item.h > 0) {
        done();
        return;
      }

      var probe = new Image();
      probe.onload = function () {
        item.w = probe.naturalWidth;
        item.h = probe.naturalHeight;
        done();
      };
      probe.onerror = done;
      probe.src = item.src;
    }

    function openAt(index) {
      ensureSize(index, function () {
        var pswpElement = document.querySelector('.pswp');
        var options = {
          index: index,
          bgOpacity: 0.9,
          showHideOpacity: true,
          history: false
        };

        var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
        gallery.init();
      });
    }

    images.forEach(function (img, index) {
      var item = img.closest('.gallery-item');
      if (item) {
        if (img.complete) {
          classifyItem(item, img);
        } else {
          img.addEventListener('load', function () {
            classifyItem(item, img);
          }, { once: true });
        }
      }

      img.addEventListener('click', function (event) {
        event.preventDefault();
        openAt(index);
      });
    });
  }

  document.addEventListener('DOMContentLoaded', buildGallery);
})();
