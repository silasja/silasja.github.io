(function () {
  function loadSharedHeader() {
    return fetch('header.html', { cache: 'no-store' })
      .then(function (response) {
        if (!response.ok) {
          throw new Error('Failed to load shared header');
        }
        return response.text();
      })
      .then(function (html) {
        var parser = new DOMParser();
        var doc = parser.parseFromString(html, 'text/html');
        var sharedHeader = doc.querySelector('.site-header');
        var currentHeader = document.querySelector('.site-header');
        if (!sharedHeader || !currentHeader) return;

        currentHeader.className = sharedHeader.className;
        currentHeader.innerHTML = sharedHeader.innerHTML;
      })
      .catch(function (error) {
        // Keep inline header markup as fallback when the shared file is unavailable.
        console.warn('Shared header could not be loaded:', error);
      });
  }

  function getCurrentNavHref() {
    var page = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
    var photoPages = {
      'landscapes.html': true,
      'seascapes.html': true,
      'icescapes.html': true,
      'cityscapes.html': true,
      'nightscapes.html': true,
      'lightscapes.html': true
    };

    if (page === 'index.html' || page === '') return 'index.html';
    if (page === 'research.html') return 'research.html';
    if (page === 'about.html') return 'about.html';
    if (page === 'photography.html' || photoPages[page]) return 'photography.html';
    return '';
  }

  function setActiveNavLink() {
    var currentHref = getCurrentNavHref();
    if (!currentHref) return;

    var links = document.querySelectorAll('.site-nav a');
    links.forEach(function (link) {
      if (link.getAttribute('href') === currentHref) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }

  function initHeader() {
    setActiveNavLink();
    updateHeaderHeight();
    initMobileNav();
  }

  function updateHeaderHeight() {
    var header = document.querySelector('.site-header');
    if (!header) return;
    document.documentElement.style.setProperty('--header-h', header.offsetHeight + 'px');
  }

  function initMobileNav() {
    var toggle = document.querySelector('.nav-toggle');
    var nav = document.querySelector('.site-nav');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', function () {
      var nextState = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', nextState ? 'true' : 'false');
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  function initReveal() {
    var targets = document.querySelectorAll('.reveal');
    if (!targets.length) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.24 }
    );

    targets.forEach(function (target) {
      observer.observe(target);
    });
  }

  function setYear() {
    var yearNodes = document.querySelectorAll('[data-year]');
    yearNodes.forEach(function (node) {
      node.textContent = String(new Date().getFullYear());
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    loadSharedHeader().then(initHeader);
    initReveal();
    setYear();
  });

  window.addEventListener('resize', updateHeaderHeight);
})();
