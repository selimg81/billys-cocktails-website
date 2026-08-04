/* =============================================
   BILLY'S COCKTAILS — MAIN JS 2026
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  // ── HEADER ──
  const header = document.querySelector('.hdr');
  const hero = document.querySelector('.hero');
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

  // ── MOBILE HAMBURGER MENU ──
  const hdrActions = document.querySelector('.hdr-actions');
  if (hdrActions) {
    // Inject hamburger button
    const menuBtn = document.createElement('button');
    menuBtn.className = 'mob-menu-btn';
    menuBtn.id = 'mob-menu-btn';
    menuBtn.setAttribute('aria-label', 'Menü öffnen');
    menuBtn.innerHTML = '<span></span><span></span><span></span>';
    hdrActions.prepend(menuBtn);

    // Detect active page
    const path = window.location.pathname.split('/').pop() || 'index.html';

    // Nav items
    const navItems = [
      { href: 'index.html', label: 'Home', icon: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>' },
      { href: 'leistungen.html', label: 'Leistungen', icon: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>' },
      { href: 'cocktails.html', label: 'Cocktails', icon: '<path d="M8 22h8m-4 0v-8m-7-10h18l-9 9-9-9z"/>' },
      { href: 'ablauf.html', label: 'So läuft es ab', icon: '<polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>' },
      { href: 'champagner-tower.html', label: 'Champagner Tower', icon: '<path d="M7 3h10l-2 8H9L7 3z"/><path d="M12 11v7"/><path d="M8 22h8"/><circle cx="10" cy="6" r="0.5" fill="currentColor" stroke="none"/><circle cx="14" cy="5" r="0.5" fill="currentColor" stroke="none"/>' },
      { href: 'about.html', label: 'Über uns', icon: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>' },
      { href: 'referenzen.html', label: 'Referenzen', icon: '<circle cx="12" cy="8" r="6"/><path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"/>' },
    ];

    // Build drawer HTML
    const logoSrc = document.querySelector('.hdr-logo')?.src || 'Website Bilder/Logo/billys-logo-petrol.png';
    const overlay = document.createElement('div');
    overlay.className = 'mob-menu-overlay';
    overlay.id = 'mob-menu-overlay';

    const drawer = document.createElement('div');
    drawer.className = 'mob-menu-drawer';
    drawer.id = 'mob-menu-drawer';
    drawer.innerHTML = `
      <div class="mob-menu-head">
        <img src="${logoSrc}" alt="Billy's Cocktails" class="mob-menu-logo" />
        <button class="mob-menu-close" id="mob-menu-close" aria-label="Menü schließen">✕</button>
      </div>
      <nav class="mob-menu-nav">
        ${navItems.map(item => `
          <a href="${item.href}" ${path === item.href ? 'class="active"' : ''}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${item.icon}</svg>
            ${item.label}
          </a>`).join('')}
        <a href="faq.html"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>FAQ</a>
        <div class="mob-menu-divider"></div>
        <a href="cocktail-catering-hamburg.html"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>Hamburg</a>
        <a href="cocktail-catering-berlin.html"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>Berlin</a>
        <a href="cocktail-catering-nrw.html"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>NRW</a>
        <div class="mob-menu-divider"></div>
        <a href="impressum.html"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>Impressum</a>
        <a href="datenschutz.html"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>Datenschutz</a>
      </nav>
      <div class="mob-menu-cta"><a href="kontakt.html">Jetzt anfragen</a></div>`;

    document.body.appendChild(overlay);
    document.body.appendChild(drawer);

    const openMenu = () => {
      menuBtn.classList.add('open');
      overlay.classList.add('open');
      drawer.classList.add('open');
      document.body.style.overflow = 'hidden';
    };
    const closeMenu = () => {
      menuBtn.classList.remove('open');
      overlay.classList.remove('open');
      drawer.classList.remove('open');
      document.body.style.overflow = '';
    };

    menuBtn.addEventListener('click', openMenu);
    overlay.addEventListener('click', closeMenu);
    document.getElementById('mob-menu-close').addEventListener('click', closeMenu);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
  }

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

  // ── CONTACT FORM (Web3Forms) ──
  document.querySelectorAll('.js-form').forEach(form => {
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const btn = form.querySelector('[type="submit"]');
      const result = form.querySelector('#form-result');
      const origText = btn.innerHTML;

      // Validate required fields
      const required = form.querySelectorAll('[required]');
      let valid = true;
      required.forEach(field => {
        field.style.borderColor = '';
        if (!field.value.trim()) {
          field.style.borderColor = '#e55';
          valid = false;
        }
      });
      if (!valid) return;

      btn.innerHTML = '⏳ Wird gesendet…';
      btn.disabled = true;

      try {
        const data = new FormData(form);
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: data
        });
        const json = await response.json();

        if (json.success) {
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({ event: 'contact_form_submit' });
          btn.innerHTML = '✓ Erfolgreich gesendet!';
          btn.style.background = '#2d8a6e';
          if (result) {
            result.style.display = 'block';
            result.style.background = 'rgba(45,138,110,0.15)';
            result.style.color = '#2d8a6e';
            result.textContent = 'Vielen Dank! Wir melden uns so schnell wie möglich bei dir.';
          }
          form.reset();
          const redirectInput = form.querySelector('input[name="redirect"]');
          const redirectUrl = redirectInput ? redirectInput.value : 'danke.html';
          setTimeout(() => { window.location.href = redirectUrl; }, 1500);
        } else {
          throw new Error(json.message || 'Fehler beim Senden');
        }
      } catch (err) {
        btn.innerHTML = origText;
        btn.disabled = false;
        if (result) {
          result.style.display = 'block';
          result.style.background = 'rgba(229,85,85,0.15)';
          result.style.color = '#e55';
          result.textContent = 'Fehler beim Senden. Bitte ruf uns direkt an: +49 173 9927773';
        }
      }
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

  // ── TUBE NAV ──
  (function() {
    var path = window.location.pathname.replace(/\.html$/, '').replace(/\/$/, '') || '/';
    var page = (path === '/' || path === '/index') ? 'index'
      : path.endsWith('/leistungen') ? 'leistungen'
      : path.endsWith('/cocktails') ? 'cocktails'
      : path.endsWith('/champagner-tower') ? 'champagner-tower'
      : path.endsWith('/about') ? 'about'
      : path.endsWith('/referenzen') ? 'referenzen'
      : path.endsWith('/kontakt') || path.endsWith('/firmenevents') || path.endsWith('/hochzeiten') || path.endsWith('/barkeeper-mieten') ? 'kontakt'
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

  // ── GOOGLE REVIEWS: pick 5 random on each page load ──
  (function() {
    var cards = Array.from(document.querySelectorAll('.rev-scroll-track .rev-card'));
    if (!cards.length) return;
    var shuffled = cards.slice().sort(function() { return Math.random() - 0.5; });
    cards.forEach(function(c) { c.classList.add('rev-hidden'); });
    shuffled.slice(0, 5).forEach(function(c) { c.classList.remove('rev-hidden'); });
  })();

  // ── BENTO GALLERY: clip-path wipe reveal + 3D tilt ──
  (function() {
    var items = document.querySelectorAll('.gal-item');
    if (!items.length) return;

    // Clip-path wipe: add .gal-on when in view
    var wipeIO = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          e.target.classList.add('gal-on');
          wipeIO.unobserve(e.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
    items.forEach(function(el) { wipeIO.observe(el); });

    // 3D tilt on hover (desktop only)
    if (window.matchMedia('(hover: hover)').matches) {
      items.forEach(function(item) {
        item.addEventListener('mousemove', function(e) {
          var r = item.getBoundingClientRect();
          var x = (e.clientX - r.left) / r.width  - 0.5;
          var y = (e.clientY - r.top)  / r.height - 0.5;
          item.style.transform = 'perspective(700px) rotateY(' + (x * 7) + 'deg) rotateX(' + (-y * 7) + 'deg) scale(1.02)';
        });
        item.addEventListener('mouseleave', function() {
          item.style.transform = '';
        });
      });
    }
  })();

  // ── HERO VIDEO: autoplay retry (iOS Low Data Mode / background tab) ──
  (function() {
    var v = document.querySelector('.hero-video');
    if (!v) return;
    var tryPlay = function() { v.play().catch(function(){}); };
    tryPlay();
    document.addEventListener('visibilitychange', function() {
      if (!document.hidden) tryPlay();
    });
    v.addEventListener('pause', function() {
      if (!document.hidden) tryPlay();
    });
  })();

  // ── DARK MODE (deaktiviert) ──
  localStorage.removeItem('billys-dark');
  document.documentElement.classList.remove('dark');

  // ── BAR COMPARISON SLIDER ──
  (function() {
    var bc = document.getElementById('bar-compare');
    if (!bc) return;
    var inner   = bc.querySelector('.bar-compare-inner');
    var before  = bc.querySelector('.bar-compare-before'); // image 2 — top layer
    var handle  = bc.querySelector('.bar-compare-handle');
    var dragging = false, animated = false;

    // pos = 0: before (img2) fully visible; pos = 100: before hidden, img1 shows
    function setPos(pos) {
      pos = Math.max(0, Math.min(100, pos));
      before.style.clipPath = 'inset(0 0 0 ' + pos + '%)';
      handle.style.left     = pos + '%';
    }
    setPos(0);

    // Auto-animation: sweep 0→100→50
    function runAnim() {
      if (animated) return;
      animated = true;
      var dur1 = 1800, dur2 = 900, t0 = null;
      function ph1(ts) {
        if (!t0) t0 = ts;
        var p = Math.min((ts - t0) / dur1, 1);
        var e = p < 0.5 ? 2*p*p : -1+(4-2*p)*p;
        setPos(e * 100);
        if (p < 1) { requestAnimationFrame(ph1); }
        else {
          var t1 = null;
          requestAnimationFrame(function ph2(ts) {
            if (!t1) t1 = ts;
            var p2 = Math.min((ts - t1) / dur2, 1);
            var e2 = 1 - Math.pow(1 - p2, 3);
            setPos(100 - e2 * 50);
            if (p2 < 1) requestAnimationFrame(ph2);
          });
        }
      }
      requestAnimationFrame(ph1);
    }

    var io = new IntersectionObserver(function(entries) {
      if (entries[0].isIntersecting) { setTimeout(runAnim, 350); io.disconnect(); }
    }, { threshold: 0.25 });
    io.observe(bc);

    function posFromEvent(clientX) {
      var r = inner.getBoundingClientRect();
      return ((clientX - r.left) / r.width) * 100;
    }

    // Mouse
    bc.addEventListener('mousedown', function(e) {
      e.preventDefault();
      dragging = true;
      setPos(posFromEvent(e.clientX));
    });
    document.addEventListener('mousemove', function(e) {
      if (dragging) setPos(posFromEvent(e.clientX));
    });
    document.addEventListener('mouseup', function() { dragging = false; });

    // Touch
    bc.addEventListener('touchstart', function(e) {
      setPos(posFromEvent(e.touches[0].clientX));
    }, { passive: true });
    bc.addEventListener('touchmove', function(e) {
      e.preventDefault();
      setPos(posFromEvent(e.touches[0].clientX));
    }, { passive: false });
  })();

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
