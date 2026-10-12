document.addEventListener('DOMContentLoaded', () => {

/*  1. DARK / LIGHT MODE TOGGLE */
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = themeToggle.querySelector('.theme-icon');
  const htmlElement = document.documentElement;

  const savedTheme = localStorage.getItem('theme') || 'dark';
  htmlElement.setAttribute('data-theme', savedTheme);
  themeIcon.textContent = savedTheme === 'dark' ? 'Day' : 'Night';

  themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    themeIcon.textContent = newTheme === 'dark' ? 'Day' : 'Night';
  });
/* 2. ACTIVE NAVBAR HIGHLIGHT */
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html')) {
      link.classList.add('active');
    }
  });


/*  3. MOBILE HAMBURGER MENU */
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('is-open');
      navToggle.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    // Auto close saat link diklik (mobile)
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (mainNav.classList.contains('is-open')) {
          mainNav.classList.remove('is-open');
          navToggle.classList.remove('is-open');
          navToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }


/* 4. STAT COUNTER ANIMATION (IntersectionObserver) */
  const statNumbers = document.querySelectorAll('.stat-number');

  const animateCounter = (el) => {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1800;
    const startTime = performance.now();

    const update = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(target * eased);
      el.textContent = value + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target + suffix;
      }
    };
    requestAnimationFrame(update);
  };

  if (statNumbers.length > 0) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    statNumbers.forEach(num => observer.observe(num));
  }


  /*  5. HEADER SCROLL EFFECT */
  const siteHeader = document.getElementById('siteHeader');

  if (siteHeader) {
    window.addEventListener('scroll', () => {
      siteHeader.classList.toggle('is-scrolled', window.scrollY > 20);
    });
  }

});
