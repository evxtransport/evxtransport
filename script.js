// EVX Transport — Motion System v2

document.addEventListener('DOMContentLoaded', () => {

  // Enable entrance motion only when the browser supports the required API.
  const fadeElements = document.querySelectorAll('.fade-in');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if ('IntersectionObserver' in window && !reducedMotion) {
    document.documentElement.classList.add('has-scroll-animations');

    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    fadeElements.forEach((el) => fadeObserver.observe(el));
  }

  // --- 2. Mobile menu toggle ---
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('nav-open');
      navToggle.classList.toggle('active');
      navToggle.setAttribute('aria-expanded', isOpen);
      document.body.classList.toggle('nav-menu-open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    
    // Close menu on link click
    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('nav-open');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('nav-menu-open');
        document.body.style.overflow = '';
      });
    });
  }

  // --- 3. Contextual CTAs ---
  const desktopCta = document.getElementById('desktop-cta');
  const mobileCta = document.querySelector('.mobile-cta');
  const nav = document.getElementById('evx-nav');
  const contacto = document.getElementById('contacto');

  if ('IntersectionObserver' in window && desktopCta && nav) {
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        desktopCta.classList.toggle('cta-visible', !entry.isIntersecting);
      });
    }, {
      threshold: 0
    });
    navObserver.observe(nav);
  }

  if ('IntersectionObserver' in window && contacto) {
    const contactObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        desktopCta?.classList.toggle('cta-hidden', entry.isIntersecting);
        mobileCta?.classList.toggle('cta-hidden', entry.isIntersecting);
      });
    }, { threshold: 0.2 });
    contactObserver.observe(contacto);
  }

  // --- 4. Smooth scroll for nav links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
