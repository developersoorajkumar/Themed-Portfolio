/**
 * Sooraj Kumar Portfolio — Main JavaScript
 */

(function () {
  'use strict';

  /* --- DOM References --- */
  const header = document.getElementById('header');
  const themeToggle = document.getElementById('theme-toggle');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav__link');
  const contactForm = document.getElementById('contact-form');
  const contactSuccess = document.getElementById('contact-success');
  const fadeElements = document.querySelectorAll('.fade-in');
  const skillBars = document.querySelectorAll('.skill-bar');
  const languageRings = document.querySelectorAll('.lang-ring__fill');
  const typingText = document.querySelector('.hero__tagline');
  const sectionElements = document.querySelectorAll('section[id]');
  const backToTopButton = document.getElementById('back-to-top');

  function applyTheme(isDark) {
    document.body.classList.toggle('dark-mode', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }

  function initTheme() {
    var saved = localStorage.getItem('theme');
    if (saved === 'dark') {
      applyTheme(true);
    } else if (saved === 'light') {
      applyTheme(false);
    } else {
      var hour = new Date().getHours();
      var isDark = hour >= 19 || hour < 7;
      applyTheme(isDark);
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      applyTheme(!document.body.classList.contains('dark-mode'));
    });
  }

  initTheme();

  /* --- Sticky Nav: solid background on scroll --- */
  function handleScroll() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    if (backToTopButton) {
      backToTopButton.classList.toggle('visible', window.scrollY > 300);
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  /* --- Mobile Hamburger Menu --- */
  function toggleMenu() {
    const isOpen = navMenu.classList.toggle('open');
    navToggle.classList.toggle('active', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  }

  navToggle.addEventListener('click', toggleMenu);

  if (backToTopButton) {
    backToTopButton.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      navMenu.classList.remove('open');
      navToggle.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* --- Smooth scroll for anchor links --- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  /* --- Intersection Observer: fade-in sections --- */
  const fadeObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  fadeElements.forEach(function (el) {
    fadeObserver.observe(el);
  });

  /* --- Intersection Observer: stagger cert-card reveal --- */
  const certificationsSection = document.getElementById('certifications');
  const certCards = document.querySelectorAll('.cert-card');

  if (certificationsSection && certCards.length) {
    const certObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            certCards.forEach(function (card, index) {
              setTimeout(function () {
                card.classList.add('visible');
              }, index * 100);
            });
            certObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    certObserver.observe(certificationsSection);
  }

  /* --- Hero element fade-in sequence on load --- */
  const heroTitle = document.querySelector('.hero__title');
  const heroTagline = document.querySelector('.hero__tagline');
  const heroButtons = document.querySelector('.hero__buttons');

  function revealHeroElement(element, delay) {
    if (!element) return;

    element.classList.add('fade-in');
    setTimeout(function () {
      element.classList.add('visible');
    }, delay);
  }

  window.addEventListener('load', function () {
    revealHeroElement(heroTitle, 100);
    revealHeroElement(heroTagline, 300);
    revealHeroElement(heroButtons, 700);
  });

  /* --- Typing effect for hero text --- */
  const typingLines = [
    'Customer Support & Web Development Professional',
    'Multilingual Communicator | 6 Languages',
    'Web Developer | HTML, CSS & JavaScript'
  ];

  function typeText(lineIndex, charIndex, isDeleting) {
    if (!typingText) return;

    const currentLine = typingLines[lineIndex];

    if (!isDeleting && charIndex <= currentLine.length) {
      typingText.textContent = currentLine.slice(0, charIndex);
      setTimeout(function () {
        typeText(lineIndex, charIndex + 1, false);
      }, 60);
      return;
    }

    if (!isDeleting && charIndex > currentLine.length) {
      setTimeout(function () {
        typeText(lineIndex, currentLine.length, true);
      }, 2000);
      return;
    }

    if (isDeleting && charIndex >= 0) {
      typingText.textContent = currentLine.slice(0, charIndex);
      setTimeout(function () {
        typeText(lineIndex, charIndex - 1, true);
      }, 30);
      return;
    }

    setTimeout(function () {
      const nextLineIndex = (lineIndex + 1) % typingLines.length;
      typeText(nextLineIndex, 0, false);
    }, 400);
  }

  if (typingText) {
    typeText(0, 0, false);
  }

  /* --- Intersection Observer: animate skill progress bars --- */
  skillBars.forEach(function (bar) {
    const level = bar.getAttribute('data-level');
    bar.style.setProperty('--fill-width', level + '%');
  });

  /* --- Skills tab switcher --- */
  const skillTabs = document.querySelectorAll('.skills-tab');
  const skillCards = document.querySelectorAll('.skill-card');

  function animateSkillBars(card) {
    const bars = card.querySelectorAll('.skill-bar');
    bars.forEach(function (bar, index) {
      const level = bar.getAttribute('data-level');
      bar.style.setProperty('--fill-width', level + '%');
      setTimeout(function () {
        bar.classList.add('animated');
      }, index * 80);
    });
  }

  function resetSkillBars(card) {
    const bars = card.querySelectorAll('.skill-bar');
    bars.forEach(function (bar) {
      bar.classList.remove('animated');
    });
  }

  skillTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      skillTabs.forEach(function (item) {
        item.classList.remove('active');
      });

      tab.classList.add('active');
      const selectedTab = tab.getAttribute('data-tab');

      skillCards.forEach(function (card) {
        const category = card.getAttribute('data-category');

        if (category === selectedTab) {
          card.classList.remove('hidden');
          animateSkillBars(card);
        } else {
          card.classList.add('hidden');
          resetSkillBars(card);
        }
      });
    });
  });

  /* --- Language ring progress --- */
  languageRings.forEach(function (ring) {
    const percent = parseInt(ring.getAttribute('data-percent') || '0', 10);
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference * (1 - percent / 100);

    ring.style.strokeDasharray = circumference;
    ring.style.strokeDashoffset = circumference;

    requestAnimationFrame(function () {
      ring.style.strokeDashoffset = offset;
    });
  });

  /* --- Scroll Spy for navigation --- */
  const navObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          navLinks.forEach(function (link) {
            link.classList.remove('active');
          });

          const activeLink = document.querySelector('.nav__link[href="#' + entry.target.id + '"]');
          if (activeLink) {
            activeLink.classList.add('active');
          }
        }
      });
    },
    { threshold: 0.35 }
  );

  sectionElements.forEach(function (section) {
    navObserver.observe(section);
  });

  const skillsSection = document.getElementById('skills');

  if (skillsSection) {
    const barObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            skillBars.forEach(function (bar) {
              bar.classList.add('animated');
            });
            barObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    barObserver.observe(skillsSection);
  }

  /* --- Contact Form Submit --- */
  if (contactForm && contactSuccess) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }

      contactForm.hidden = true;
      contactSuccess.hidden = false;
    });
  }
})();
