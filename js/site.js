(function () {
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
    updateHeaderHeight();
    initMobileNav();
    initReveal();
    setYear();
  });

  window.addEventListener('resize', updateHeaderHeight);
})();
