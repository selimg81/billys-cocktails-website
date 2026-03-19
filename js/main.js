/* =============================================
   BILLY'S COCKTAILS — MAIN JS 2026
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  // ── HEADER ──
  const header = document.querySelector('.hdr');
  const hero = document.querySelector('.hero');
  const burger = document.querySelector('.hdr-burger');
  const mobMenu = document.querySelector('.mob-menu');
  const burgerLines = document.querySelectorAll('.burger-line');

  const updateHeader = () => {
    const scrolled = window.scrollY > 60;
    header?.classList.toggle('solid', scrolled);
    // On mobile hero, keep logo/nav white until scrolled
    if (hero && window.innerWidth <= 768) {
      header?.classList.toggle('hero-transparent', !scrolled);
    }
  };
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  // ── MOBILE MENU ──
  let menuOpen = false;
  burger?.addEventListener('click', () => {
    menuOpen = !menuOpen;
    burger.classList.toggle('open', menuOpen);
    mobMenu?.classList.toggle('open', menuOpen);
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    burgerLines.forEach(l => l.classList.toggle('w', !menuOpen && !document.querySelector('.hdr.solid')));
  });

  // Stagger mob links
  document.querySelectorAll('.mob-link').forEach((link, i) => {
    link.style.transitionDelay = menuOpen ? `${i * 60 + 120}ms` : '0ms';
  });

  mobMenu?.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('click', () => {
      menuOpen = false;
      burger?.classList.remove('open');
      mobMenu?.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && menuOpen) {
      menuOpen = false;
      burger?.classList.remove('open');
      mobMenu?.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

  // ── FIXED CTA ──
  const fab = document.querySelector('.fixed-cta');
  const showFab = () => fab?.classList.toggle('show', window.scrollY > window.innerHeight * 0.5);
  window.addEventListener('scroll', showFab, { passive: true });

  // ── SCROLL REVEAL ──
  const revealEls = document.querySelectorAll('.rv, .rv-stagger, .rv-clip, .rv-line');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('visible'));
  }

  // ── PARALLAX ──
  const parallaxImgs = document.querySelectorAll('.parallax-img');
  if (parallaxImgs.length) {
    const onScroll = () => {
      parallaxImgs.forEach(img => {
        const rect = img.closest('.parallax-wrap')?.getBoundingClientRect();
        if (!rect) return;
        const center = rect.top + rect.height / 2 - window.innerHeight / 2;
        img.style.transform = `translateY(${center * 0.12}px)`;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ── ACTIVE NAV ──
  const current = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link[href]').forEach(link => {
    const href = link.getAttribute('href').split('/').pop();
    if (href === current || (current === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ── REVIEW CARDS: tap to expand on mobile ──
  document.querySelectorAll('.rev-card').forEach(card => {
    card.addEventListener('click', () => {
      if (window.innerWidth <= 768) card.classList.toggle('expanded');
    });
  });

  // ── SMOOTH ANCHORS ──
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + scrollY - 90;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // ── COUNTER ANIMATION ──
  document.querySelectorAll('.counter').forEach(el => {
    const end = parseInt(el.dataset.end, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 2000;
    let started = false;

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started) {
        started = true;
        const startTime = performance.now();
        const tick = (now) => {
          const p = Math.min((now - startTime) / duration, 1);
          const ease = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(ease * end) + suffix;
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        io.unobserve(el);
      }
    }, { threshold: 0.5 });
    io.observe(el);
  });

  // ── MAGNETIC BUTTONS ──
  document.querySelectorAll('.btn-mag').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r = btn.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * 0.15;
      const y = (e.clientY - r.top - r.height / 2) * 0.15;
      btn.style.transform = `translate(${x}px, ${y}px)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
  });

  // ── CONTACT FORM ──
  document.querySelectorAll('.js-form').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('[type="submit"]');
      const orig = btn.innerHTML;
      btn.innerHTML = '✓ Gesendet!';
      btn.disabled = true;
      btn.style.background = '#2d8a6e';
      setTimeout(() => {
        btn.innerHTML = orig;
        btn.disabled = false;
        btn.style.background = '';
        form.reset();
      }, 4000);
    });
  });

  // ── GALLERY LIGHTBOX ──
  const galleryItems = document.querySelectorAll('.gallery-item');
  if (galleryItems.length) {
    const lb = document.createElement('div');
    lb.style.cssText = 'position:fixed;inset:0;z-index:9999;background:rgba(20,18,14,0.95);display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity 0.3s;pointer-events:none;padding:2rem;';
    lb.innerHTML = `
      <button style="position:absolute;top:1.5rem;right:1.5rem;background:none;border:none;color:#fff;font-size:1.8rem;cursor:pointer;line-height:1;padding:0.5rem;" id="lb-close">✕</button>
      <button style="position:absolute;left:1.5rem;font-size:2.5rem;background:none;border:none;color:rgba(255,255,255,0.7);cursor:pointer;padding:1rem;" id="lb-prev">‹</button>
      <img id="lb-img" style="max-width:90vw;max-height:85vh;object-fit:contain;border-radius:8px;" />
      <button style="position:absolute;right:1.5rem;font-size:2.5rem;background:none;border:none;color:rgba(255,255,255,0.7);cursor:pointer;padding:1rem;" id="lb-next">›</button>
    `;
    document.body.appendChild(lb);
    let idx = 0;
    const items = Array.from(galleryItems);
    const open = (i) => { idx = i; lb.querySelector('#lb-img').src = items[i].querySelector('img').src; lb.style.opacity='1'; lb.style.pointerEvents='all'; };
    const close = () => { lb.style.opacity='0'; lb.style.pointerEvents='none'; };
    items.forEach((item, i) => item.addEventListener('click', () => open(i)));
    lb.querySelector('#lb-close').addEventListener('click', close);
    lb.querySelector('#lb-prev').addEventListener('click', () => open((idx - 1 + items.length) % items.length));
    lb.querySelector('#lb-next').addEventListener('click', () => open((idx + 1) % items.length));
    lb.addEventListener('click', e => { if (e.target === lb) close(); });
    document.addEventListener('keydown', e => {
      if (lb.style.pointerEvents === 'all') {
        if (e.key === 'Escape') close();
        if (e.key === 'ArrowLeft') open((idx - 1 + items.length) % items.length);
        if (e.key === 'ArrowRight') open((idx + 1) % items.length);
      }
    });
  }

  // ── MOB LINK STAGGER ──
  const mobLinks = document.querySelectorAll('.mob-link');
  const triggerMobStagger = (open) => {
    mobLinks.forEach((link, i) => {
      link.style.transitionDelay = open ? `${i * 60 + 100}ms` : '0ms';
    });
  };
  burger?.addEventListener('click', () => triggerMobStagger(menuOpen));

});
