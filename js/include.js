document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  const headerTarget = document.getElementById('site-header');
  const footerTarget = document.getElementById('site-footer');

  function setActiveNavLink() {
    const navLinks = document.querySelectorAll('.nav__link');
    const currentPath = new URL(window.location.href).pathname.split('/').pop() || 'index.html';

    navLinks.forEach(function (link) {
      const href = link.getAttribute('href');
      if (!href) return;

      const linkPath = new URL(href, window.location.href).pathname.split('/').pop() || 'index.html';
      const isActive = linkPath === currentPath || (currentPath === '' && linkPath === 'index.html');

      link.classList.toggle('nav__link--active', isActive);
      if (isActive) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }

  function injectPartials() {
    const headerPromise = headerTarget
      ? fetch('partials/header.html').then(function (response) {
          if (!response.ok) {
            throw new Error('Unable to load header partial');
          }
          return response.text();
        })
      : Promise.resolve('');

    const footerPromise = footerTarget
      ? fetch('partials/footer.html').then(function (response) {
          if (!response.ok) {
            throw new Error('Unable to load footer partial');
          }
          return response.text();
        })
      : Promise.resolve('');

    Promise.all([headerPromise, footerPromise])
      .then(function (values) {
        if (headerTarget && values[0]) {
          headerTarget.innerHTML = values[0];
        }
        if (footerTarget && values[1]) {
          footerTarget.innerHTML = values[1];
        }

        setActiveNavLink();

        if (window.initPortfolioNav) {
          window.initPortfolioNav();
        }
      })
      .catch(function (error) {
        console.warn('Portfolio partials could not be loaded:', error);
      });
  }

  injectPartials();
});
