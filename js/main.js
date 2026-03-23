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

  // ── TUBE NAV ──
  (function() {
    var path = window.location.pathname;
    var page = path === '/' || path.endsWith('index.html') ? 'index'
      : path.endsWith('leistungen.html') ? 'leistungen'
      : path.endsWith('cocktails.html') ? 'cocktails'
      : path.endsWith('about.html') ? 'about'
      : path.endsWith('referenzen.html') ? 'referenzen'
      : path.endsWith('kontakt.html') || path.endsWith('firmenevents.html') || path.endsWith('hochzeiten.html') ? 'kontakt'
      : 'index';

    function initTube(innerEl, pillEl) {
      if (!innerEl || !pillEl) return;
      var items = innerEl.querySelectorAll('.tube-item');
      items.forEach(function(item) {
        item.classList.toggle('active', item.dataset.tube === page);
      });
      function movePill() {
        var active = innerEl.querySelector('.tube-item.active');
        if (!active) return;
        var innerRect = innerEl.getBoundingClientRect();
        var activeRect = active.getBoundingClientRect();
        pillEl.style.left = (activeRect.left - innerRect.left) + 'px';
        pillEl.style.width = activeRect.width + 'px';
      }
      // Delay to let layout settle
      setTimeout(movePill, 60);
      window.addEventListener('resize', movePill);
    }

    initTube(document.getElementById('tube-inner'), document.getElementById('tube-pill'));
    initTube(document.getElementById('tube-inner-mob'), document.getElementById('tube-pill-mob'));
  })();

  // ── FAN GALLERY ──
  const fanGallery = document.getElementById('fan-gallery');
  if (fanGallery) {
    const pool = [
      ['Website Bilder/BilderWebsiteEvents/cocktail-catering-firmenevent-hamburg.jpg', 'Cocktail Catering Firmenevent Hamburg'],
      ['Website Bilder/BilderWebsiteEvents/bartender-mieten-hamburg.jpg', 'Barkeeper mieten Hamburg'],
      ['Website Bilder/BilderWebsiteEvents/cocktails-anstossen-vogelperspektive-event-catering.jpg', 'Cocktails anstoßen Event Catering'],
      ['Website Bilder/BilderWebsiteEvents/mobile-bar-mieten-firmenevent-nrw.jpg', 'Mobile Bar Firmenevent NRW'],
      ['Website Bilder/BilderWebsiteEvents/bartender-serviert-brautpaar-cocktail-catering-hochzeit.jpg', 'Barkeeper Hochzeit Catering'],
      ['Website Bilder/BilderWebsiteEvents/brautpaar-teilt-cocktail-hochzeit-catering-hamburg.jpg', 'Brautpaar Cocktail Hochzeit Hamburg'],
      ['Website Bilder/BilderWebsiteEvents/cocktail-trolley-hochzeit-catering-outdoor-hamburg.jpg', 'Cocktail Trolley Outdoor Hochzeit'],
      ['Website Bilder/BilderWebsiteEvents/mobile-bar-mieten-hochzeit-nrw.jpg', 'Mobile Bar Hochzeit NRW'],
      ['Website Bilder/BilderWebsiteEvents/signature-drink-hochzeit-billys-cocktail-catering.jpg', 'Signature Drink Hochzeit'],
      ['Website Bilder/Bilder 3eins/Cocktail Catering Mobile Bar Hamburg 3eins-3.jpg', 'Cocktail Catering Mobile Bar Hamburg'],
      ['Website Bilder/Bilder 3eins/Cocktail Catering Mobile Bar Hamburg 3eins-4.jpg', 'Mobile Bar Hamburg Event'],
      ['Website Bilder/Bilder 3eins/Cocktail Catering Mobile Bar Hamburg 3eins-5.jpg', 'Mobile Cocktailbar Hamburg'],
      ['Website Bilder/Bilder 3eins/Cocktail Catering Mobile Bar Hamburg 3eins-6.jpg', 'Event Catering Hamburg'],
      ['Website Bilder/Bilder 3eins/Cocktail Catering Mobile Bar Hamburg 3eins-7.jpg', 'Cocktail Event Hamburg'],
      ['Website Bilder/Bilder 3eins/Cocktail Catering Mobile Bar Hamburg 3eins-8.jpg', 'Billy\'s Cocktail Catering Hamburg'],
      ['Website Bilder/Bilder 3eins/Cocktail Catering Mobile Bar Hamburg 3eins-9.jpg', 'Barkeeper Hamburg'],
    ];
    // Random pick of 5 on each page load
    const shuffled = pool.slice().sort(() => Math.random() - 0.5);
    fanGallery.querySelectorAll('.fan-photo img').forEach((img, i) => {
      if (shuffled[i]) { img.src = shuffled[i][0]; img.alt = shuffled[i][1]; }
    });
    // Trigger fan-out when scrolled into view
    const fanIO = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => fanGallery.classList.add('loaded'), 80);
        fanIO.unobserve(fanGallery);
      }
    }, { threshold: 0.2 });
    fanIO.observe(fanGallery);
  }

  // ── DARK MODE (deaktiviert) ──
  localStorage.removeItem('billys-dark');
  document.documentElement.classList.remove('dark');

  // ── BAR COMPARISON SLIDER ──
  const barCompare = document.getElementById('bar-compare');
  if (barCompare) {
    const inner = barCompare.querySelector('.bar-compare-inner');
    const afterImg = barCompare.querySelector('.bar-compare-after');
    const handle = barCompare.querySelector('.bar-compare-handle');
    let dragging = false;
    let animated = false;

    const setPos = (p) => {
      p = Math.min(100, Math.max(0, p));
      afterImg.style.clipPath = `inset(0 0 0 ${p}%)`;
      handle.style.left = `${p}%`;
    };
    setPos(50);

    const animateIntro = () => {
      if (animated) return;
      animated = true;
      const dur1 = 1600, dur2 = 1000;
      // phase 1: center → right (100)
      const t1 = performance.now();
      const phase1 = (now) => {
        const p = Math.min((now - t1) / dur1, 1);
        const e = p < 0.5 ? 2*p*p : -1+(4-2*p)*p;
        setPos(50 + e * 50);
        if (p < 1) requestAnimationFrame(phase1);
        else {
          // phase 2: right (100) → center (50)
          const t2 = performance.now();
          const phase2 = (now2) => {
            const p2 = Math.min((now2 - t2) / dur2, 1);
            const e2 = 1 - Math.pow(1 - p2, 3);
            setPos(100 - e2 * 50);
            if (p2 < 1) requestAnimationFrame(phase2);
          };
          requestAnimationFrame(phase2);
        }
      };
      requestAnimationFrame(phase1);
    };

    const ioCompare = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setTimeout(animateIntro, 400); ioCompare.unobserve(barCompare); }
    }, { threshold: 0.3 });
    ioCompare.observe(barCompare);

    const getP = (clientX) => {
      const rect = inner.getBoundingClientRect();
      return ((clientX - rect.left) / rect.width) * 100;
    };
    inner.addEventListener('mousedown', (e) => { dragging = true; setPos(getP(e.clientX)); });
    window.addEventListener('mousemove', (e) => { if (dragging) setPos(getP(e.clientX)); });
    window.addEventListener('mouseup', () => { dragging = false; });
    inner.addEventListener('touchstart', (e) => { setPos(getP(e.touches[0].clientX)); }, { passive: true });
    inner.addEventListener('touchmove', (e) => { e.preventDefault(); setPos(getP(e.touches[0].clientX)); }, { passive: false });
  }

});

// ── NEWSLETTER SUBMIT ──
function handleNewsletter(e) {
  e.preventDefault();
  const form = e.target;
  const input = form.querySelector('.footer-newsletter-input');
  const btn = form.querySelector('.footer-newsletter-btn');
  if (!input.value) return;
  btn.innerHTML = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
  btn.style.background = '#2a9d8f';
  input.value = '';
  input.placeholder = 'Danke! Wir melden uns.';
  input.disabled = true;
  setTimeout(() => {
    btn.innerHTML = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>';
    btn.style.background = '';
    input.placeholder = 'Deine E-Mail-Adresse';
    input.disabled = false;
  }, 3000);
}
