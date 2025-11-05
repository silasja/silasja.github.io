// Lightbox FLIP animation (open/close)
// ANIM_DURATION (ms) can be adjusted to change speed.
(function () {
  const ANIM_DURATION = 360; // ms; change to speed up/slow down
  const EASING = 'cubic-bezier(.2,.8,.2,1)';

  const lightbox = document.getElementById('lightbox');
  const lbImage = document.getElementById('lbImage');
  const lbClose = document.getElementById('lbClose');

  let lastThumb = null; // store the thumbnail to animate back to

  function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function openOverlay(src, alt) {
    if (!lbImage || !lightbox) return;
    lbImage.src = src;
    lbImage.alt = alt || '';
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (lbClose) lbClose.focus();
  }

  function closeOverlayInstant() {
    if (!lightbox || !lbImage) return;
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    lbImage.src = '';
    document.body.style.overflow = '';
    if (lastThumb) lastThumb.focus();
    lastThumb = null;
  }

  function createCloneFromElement(el) {
    const rect = el.getBoundingClientRect();
    const clone = document.createElement('img');
    clone.src = el.currentSrc || el.src || (el.dataset && el.dataset.full) || '';
    clone.alt = el.alt || '';
    Object.assign(clone.style, {
      position: 'fixed',
      left: rect.left + 'px',
      top: rect.top + 'px',
      width: rect.width + 'px',
      height: rect.height + 'px',
      margin: '0',
      transition: `transform ${ANIM_DURATION}ms ${EASING}, opacity ${Math.round(ANIM_DURATION/2)}ms ${EASING}`,
      transformOrigin: 'center center',
      zIndex: 3000,
      willChange: 'transform',
      borderRadius: getComputedStyle(el).borderRadius || '2px',
    });
    document.body.appendChild(clone);
    return { clone, rect };
  }

  function animateOpen(thumbnail) {
    if (!thumbnail) return;
    if (prefersReducedMotion()) {
      const full = thumbnail.dataset && thumbnail.dataset.full ? thumbnail.dataset.full : thumbnail.src;
      lastThumb = thumbnail;
      openOverlay(full, thumbnail.alt);
      return;
    }

    lastThumb = thumbnail;
    const fullSrc = thumbnail.dataset && thumbnail.dataset.full ? thumbnail.dataset.full : thumbnail.src;

    const { clone, rect: fromRect } = createCloneFromElement(thumbnail);

    const padding = 40; // matches CSS padding in lightbox
    const targetH = Math.min(window.innerHeight - padding, (thumbnail.naturalHeight || fromRect.height) || (window.innerHeight - padding));
    const aspect = (thumbnail.naturalWidth && thumbnail.naturalHeight) ? (thumbnail.naturalWidth / thumbnail.naturalHeight) : (fromRect.width / fromRect.height);
    const targetW = Math.min(window.innerWidth - padding, targetH * aspect);

    const targetLeft = Math.round((window.innerWidth - targetW) / 2);
    const targetTop = Math.round((window.innerHeight - targetH) / 2);

    const tx = targetLeft - fromRect.left;
    const ty = targetTop - fromRect.top;
    const sx = targetW / fromRect.width;
    const sy = targetH / fromRect.height;

    requestAnimationFrame(() => {
      clone.style.transform = `translate(${tx}px, ${ty}px) scale(${sx}, ${sy})`;
    });

    const cleanupAndOpen = () => {
      if (clone && clone.parentNode) clone.parentNode.removeChild(clone);
      openOverlay(fullSrc, thumbnail.alt || '');
    };

    clone.addEventListener('transitionend', cleanupAndOpen, { once: true });
    setTimeout(() => {
      if (document.body.contains(clone)) cleanupAndOpen();
    }, ANIM_DURATION + 150);
  }

  function animateClose() {
    if (!lastThumb) {
      closeOverlayInstant();
      return;
    }

    if (prefersReducedMotion()) {
      closeOverlayInstant();
      return;
    }

    const fromRect = lbImage.getBoundingClientRect();
    const targetRect = lastThumb.getBoundingClientRect();

    if (targetRect.width === 0 || targetRect.height === 0) {
      closeOverlayInstant();
      return;
    }

    const clone = document.createElement('img');
    clone.src = lbImage.currentSrc || lbImage.src || '';
    clone.alt = lbImage.alt || '';
    Object.assign(clone.style, {
      position: 'fixed',
      left: fromRect.left + 'px',
      top: fromRect.top + 'px',
      width: fromRect.width + 'px',
      height: fromRect.height + 'px',
      margin: '0',
      transition: `transform ${ANIM_DURATION}ms ${EASING}, opacity ${Math.round(ANIM_DURATION/2)}ms ${EASING}`,
      transformOrigin: 'center center',
      zIndex: 3000,
      willChange: 'transform',
      borderRadius: getComputedStyle(lastThumb).borderRadius || '2px',
    });
    document.body.appendChild(clone);

    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');

    const tx = targetRect.left - fromRect.left;
    const ty = targetRect.top - fromRect.top;
    const sx = targetRect.width / fromRect.width;
    const sy = targetRect.height / fromRect.height;

    requestAnimationFrame(() => {
      clone.style.transform = `translate(${tx}px, ${ty}px) scale(${sx}, ${sy})`;
      clone.style.opacity = '1';
    });

    const cleanup = () => {
      if (clone && clone.parentNode) clone.parentNode.removeChild(clone);
      lbImage.src = '';
      document.body.style.overflow = '';
      if (lastThumb) lastThumb.focus();
      lastThumb = null;
    };

    clone.addEventListener('transitionend', cleanup, { once: true });
    setTimeout(() => {
      if (document.body.contains(clone)) cleanup();
    }, ANIM_DURATION + 170);
  }

  function init() {
    document.querySelectorAll('main .photo img, main .panorama img').forEach(img => {
      img.style.touchAction = 'manipulation';
      img.addEventListener('click', (e) => {
        animateOpen(e.currentTarget);
      });
    });

    if (lbClose) lbClose.addEventListener('click', () => animateClose());
    if (lightbox) {
      lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) animateClose();
      });
    }
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox && lightbox.classList.contains('open')) {
        animateClose();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
