/* =============================================
   BILLY'S COCKTAILS — MAIN JAVASCRIPT
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  // ── HEADER SCROLL BEHAVIOUR ──
  const header = document.querySelector('.header');
  const heroSection = document.querySelector('.hero');

  const handleHeaderScroll = () => {
    const scrolled = window.scrollY > 40;
    header?.classList.toggle('scrolled', scrolled);

    // On hero pages: switch from transparent dark to scrolled light
    if (heroSection && header?.classList.contains('header--dark')) {
      if (scrolled) {
        header.classList.remove('header--dark');
      }
    }
  };

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();


  // ── MOBILE NAVIGATION ──
  const hamburger = document.querySelector('.hamburger');
  const drawer = document.querySelector('.nav__drawer');

  hamburger?.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    drawer?.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close drawer on link click
  drawer?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger?.classList.remove('open');
      drawer?.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Close on ESC
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      hamburger?.classList.remove('open');
      drawer?.classList.remove('open');
      document.body.style.overflow = '';
    }
  });


  // ── FIXED CTA BUTTON ──
  const fab = document.querySelector('.cta-fab');

  const handleFabVisibility = () => {
    if (!fab) return;
    const threshold = window.innerHeight * 0.5;
    fab.classList.toggle('visible', window.scrollY > threshold);
  };

  window.addEventListener('scroll', handleFabVisibility, { passive: true });
  handleFabVisibility();


  // ── SCROLL REVEAL ANIMATIONS ──
  const revealElements = document.querySelectorAll('.reveal, .reveal--left, .reveal--right');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -60px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback: show all immediately
    revealElements.forEach(el => el.classList.add('visible'));
  }


  // ── ACTIVE NAV LINK ──
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__link').forEach(link => {
    const href = link.getAttribute('href')?.split('/').pop();
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });


  // ── PARALLAX HERO IMAGE (subtle) ──
  const heroBg = document.querySelector('.hero__bg img');

  if (heroBg) {
    const handleParallax = () => {
      const scrolled = window.scrollY;
      const rate = scrolled * 0.25;
      heroBg.style.transform = `scale(1) translateY(${rate}px)`;
    };

    window.addEventListener('scroll', handleParallax, { passive: true });
  }


  // ── SMOOTH ANCHOR LINKS ──
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const headerH = parseInt(getComputedStyle(document.documentElement)
          .getPropertyValue('--header-h'));
        const top = target.getBoundingClientRect().top + window.scrollY - headerH - 20;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });


  // ── CONTACT FORM ──
  const form = document.querySelector('.js-contact-form');

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('[type="submit"]');
    const originalText = btn.innerHTML;

    btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Gesendet!';
    btn.disabled = true;
    btn.style.backgroundColor = '#2d8a6e';

    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.disabled = false;
      btn.style.backgroundColor = '';
      form.reset();
    }, 4000);
  });


  // ── GALLERY LIGHTBOX (simple) ──
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (galleryItems.length > 0) {
    const lightbox = createLightbox();

    galleryItems.forEach((item, i) => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        if (img) openLightbox(lightbox, img.src, img.alt, i, galleryItems);
      });
    });
  }

  function createLightbox() {
    const lb = document.createElement('div');
    lb.style.cssText = `
      position: fixed; inset: 0; z-index: 9999;
      background: rgba(20,18,14,0.95);
      display: flex; align-items: center; justify-content: center;
      opacity: 0; transition: opacity 0.3s ease;
      pointer-events: none;
      padding: 2rem;
    `;
    lb.innerHTML = `
      <button class="lb-close" style="position:absolute;top:1.5rem;right:1.5rem;background:none;border:none;color:white;cursor:pointer;font-size:1.5rem;line-height:1;padding:0.5rem;">✕</button>
      <button class="lb-prev" style="position:absolute;left:1.5rem;background:none;border:none;color:white;cursor:pointer;font-size:2rem;padding:1rem;line-height:1;opacity:0.7;">‹</button>
      <img class="lb-img" style="max-width:90vw;max-height:85vh;object-fit:contain;border-radius:4px;" />
      <button class="lb-next" style="position:absolute;right:1.5rem;background:none;border:none;color:white;cursor:pointer;font-size:2rem;padding:1rem;line-height:1;opacity:0.7;">›</button>
    `;
    document.body.appendChild(lb);

    let currentIndex = 0;
    let allItems = [];

    lb.querySelector('.lb-close').addEventListener('click', closeLightbox);
    lb.addEventListener('click', e => { if (e.target === lb) closeLightbox(); });
    lb.querySelector('.lb-prev').addEventListener('click', () => navigate(-1));
    lb.querySelector('.lb-next').addEventListener('click', () => navigate(1));

    document.addEventListener('keydown', e => {
      if (!lb.style.pointerEvents === 'all') return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navigate(-1);
      if (e.key === 'ArrowRight') navigate(1);
    });

    function navigate(dir) {
      currentIndex = (currentIndex + dir + allItems.length) % allItems.length;
      const img = allItems[currentIndex].querySelector('img');
      if (img) lb.querySelector('.lb-img').src = img.src;
    }

    function closeLightbox() {
      lb.style.opacity = '0';
      lb.style.pointerEvents = 'none';
    }

    lb._open = (src, alt, index, items) => {
      currentIndex = index;
      allItems = Array.from(items);
      lb.querySelector('.lb-img').src = src;
      lb.querySelector('.lb-img').alt = alt || '';
      lb.style.pointerEvents = 'all';
      lb.style.opacity = '1';
    };

    return lb;
  }

  function openLightbox(lb, src, alt, index, items) {
    lb._open(src, alt, index, items);
  }


  // ── STAGGER CHILDREN ──
  // Auto-stagger direct children of stagger containers
  document.querySelectorAll('.stagger').forEach(container => {
    Array.from(container.children).forEach((child, i) => {
      child.classList.add('reveal');
      child.classList.add(`reveal--delay-${Math.min(i + 1, 5)}`);
    });
  });

});
