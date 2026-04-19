// ============================================================
// White Tiger Technology Drivers — Main JavaScript
// ============================================================

(function () {
  'use strict';

  /* ── Hamburger nav ────────────────────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      })
    );
  }

  /* ── Active nav link on scroll ────────────────────────── */
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-links a[href^="#"]');
  let sectionOffsets = [];

  function cacheSectionOffsets() {
    sectionOffsets = Array.from(sections).map(s => ({
      id: s.id,
      top: s.offsetTop,
    }));
  }

  function updateActiveNav() {
    let current = '';
    sectionOffsets.forEach(s => {
      if (window.scrollY >= s.top - 120) current = s.id;
    });
    navItems.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  }

  cacheSectionOffsets();
  window.addEventListener('scroll', updateActiveNav, { passive: true });
  window.addEventListener('resize', cacheSectionOffsets, { passive: true });
  updateActiveNav();

  /* ── Sticky header shadow ─────────────────────────────── */
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header.style.boxShadow = window.scrollY > 10
      ? '0 2px 20px rgba(0,0,0,0.5)' : 'none';
  }, { passive: true });

  /* ── Scroll-to-top ────────────────────────────────────── */
  const scrollTop = document.getElementById('scroll-top');
  window.addEventListener('scroll', () => {
    scrollTop.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
  scrollTop.addEventListener('click', () =>
    window.scrollTo({ top: 0, behavior: 'smooth' })
  );

  /* ── Fleet tabs ───────────────────────────────────────── */
  const tabBtns = document.querySelectorAll('.tab-btn');
  const vehicleCards = document.querySelectorAll('.vehicle-card');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.cat;
      vehicleCards.forEach(card => {
        const show = cat === 'all' || card.dataset.cat === cat;
        card.style.display = show ? '' : 'none';
      });
    });
  });

  /* ── Booking form ─────────────────────────────────────── */
  const bookingForm = document.getElementById('booking-form');
  if (bookingForm) {
    bookingForm.addEventListener('submit', e => {
      e.preventDefault();
      showToast('🚗 Booking request received! We will contact you shortly.');
      bookingForm.reset();
    });
  }

  /* ── Contact form ─────────────────────────────────────── */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      showToast('✅ Message sent! Our team will respond within 24 hours.');
      contactForm.reset();
    });
  }

  /* ── Book button ──────────────────────────────────────── */
  document.querySelectorAll('.btn-book').forEach(btn => {
    btn.addEventListener('click', () => {
      document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
    });
  });

  /* ── Toast ────────────────────────────────────────────── */
  function showToast(msg) {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 4000);
  }

  /* ── Animated counter ─────────────────────────────────── */
  function animateCount(el, target) {
    const animationDurationMs = 1800;
    const frameIntervalMs = 16;
    const steps = animationDurationMs / frameIntervalMs;
    let current = 0;
    const inc = target / steps;
    const timer = setInterval(() => {
      current = Math.min(current + inc, target);
      el.textContent = Math.floor(current).toLocaleString('en-IN') +
        (el.dataset.suffix || '');
      if (current >= target) clearInterval(timer);
    }, frameIntervalMs);
  }
  const counters = document.querySelectorAll('[data-count]');
  const counterObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        animateCount(el, +el.dataset.count);
        counterObs.unobserve(el);
      }
    });
  }, { threshold: 0.4 });
  counters.forEach(el => counterObs.observe(el));

  /* ── Fade-in on scroll ────────────────────────────────── */
  const fadeEls = document.querySelectorAll('.fade-in');
  const fadeObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        fadeObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  fadeEls.forEach(el => fadeObs.observe(el));

  /* ── Set min date for date inputs ─────────────────────── */
  const dateInputs = document.querySelectorAll('input[type="date"]');
  const today = new Date().toISOString().split('T')[0];
  dateInputs.forEach(d => { d.min = today; d.value = today; });

  /* ── Year in footer ───────────────────────────────────── */
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
