(function () {
  'use strict';

  var STORAGE_KEY = 'bc_cookie_consent';

  function getConsent() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)); } catch (e) { return null; }
  }

  function setConsent(obj) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(obj)); } catch (e) {}
  }

  function hideBanner() {
    var b = document.getElementById('bc-cookie-banner');
    if (b) { b.classList.add('bc-hide'); setTimeout(function () { b.remove(); }, 400); }
  }

  function hideModal() {
    var m = document.getElementById('bc-cookie-modal');
    if (m) { m.classList.remove('bc-modal-open'); }
  }

  function openModal() {
    var m = document.getElementById('bc-cookie-modal');
    if (m) { m.classList.add('bc-modal-open'); }
  }

  function applyConsent(consent) {
    // Future: load analytics scripts here if consent.analytics === true
    setConsent(consent);
  }

  function acceptAll() {
    applyConsent({ necessary: true, analytics: true, ts: Date.now() });
    hideBanner(); hideModal();
  }

  function rejectAll() {
    applyConsent({ necessary: true, analytics: false, ts: Date.now() });
    hideBanner(); hideModal();
  }

  function saveSettings() {
    var cb = document.getElementById('bc-analytics-toggle');
    applyConsent({ necessary: true, analytics: cb ? cb.checked : false, ts: Date.now() });
    hideBanner(); hideModal();
  }

  function injectBanner() {
    var banner = document.createElement('div');
    banner.id = 'bc-cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-modal', 'true');
    banner.setAttribute('aria-label', 'Cookie-Einstellungen');
    banner.innerHTML = [
      '<div class="bc-inner">',
        '<div class="bc-text">',
          '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 8v4m0 4h.01"/></svg>',
          '<div>',
            '<strong>Wir verwenden Cookies</strong>',
            '<p>Diese Website nutzt Cookies für grundlegende Funktionen (z.&thinsp;B. Spracheinstellung). Mit deiner Zustimmung setzen wir auch Analyse-Cookies ein, um unser Angebot zu verbessern.</p>',
          '</div>',
        '</div>',
        '<div class="bc-actions">',
          '<button class="bc-btn bc-btn-text" id="bc-settings-btn">Einstellungen</button>',
          '<button class="bc-btn bc-btn-outline" id="bc-reject-btn">Nur notwendige</button>',
          '<button class="bc-btn bc-btn-primary" id="bc-accept-btn">Alle akzeptieren</button>',
        '</div>',
      '</div>'
    ].join('');
    document.body.appendChild(banner);

    document.getElementById('bc-accept-btn').addEventListener('click', acceptAll);
    document.getElementById('bc-reject-btn').addEventListener('click', rejectAll);
    document.getElementById('bc-settings-btn').addEventListener('click', openModal);

    // Animate in
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { banner.classList.add('bc-visible'); });
    });
  }

  function injectModal() {
    var modal = document.createElement('div');
    modal.id = 'bc-cookie-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-label', 'Cookie-Kategorien');

    var consent = getConsent();
    var analyticsChecked = consent && consent.analytics ? 'checked' : '';

    modal.innerHTML = [
      '<div class="bc-modal-box">',
        '<div class="bc-modal-head">',
          '<h3>Cookie-Einstellungen</h3>',
          '<button class="bc-modal-close" id="bc-modal-close" aria-label="Schließen">',
            '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
          '</button>',
        '</div>',
        '<p class="bc-modal-intro">Hier kannst du entscheiden, welche Cookies du zulässt. Du kannst deine Einstellungen jederzeit ändern.</p>',

        '<div class="bc-category">',
          '<div class="bc-cat-row">',
            '<div class="bc-cat-label">',
              '<strong>Notwendige Cookies</strong>',
              '<span>Immer aktiv</span>',
            '</div>',
            '<div class="bc-toggle-wrap bc-always-on">',
              '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
            '</div>',
          '</div>',
          '<p>Ermöglichen grundlegende Funktionen wie Spracheinstellungen. Die Website kann ohne diese Cookies nicht korrekt funktionieren.</p>',
        '</div>',

        '<div class="bc-category">',
          '<div class="bc-cat-row">',
            '<div class="bc-cat-label">',
              '<strong>Statistik &amp; Analyse</strong>',
              '<span>Optional</span>',
            '</div>',
            '<label class="bc-toggle" aria-label="Statistik-Cookies aktivieren">',
              '<input type="checkbox" id="bc-analytics-toggle" ' + analyticsChecked + ' />',
              '<span class="bc-toggle-track"><span class="bc-toggle-thumb"></span></span>',
            '</label>',
          '</div>',
          '<p>Helfen uns zu verstehen, wie Besucher unsere Website nutzen, damit wir sie verbessern können. Daten werden anonym erhoben.</p>',
        '</div>',

        '<div class="bc-modal-actions">',
          '<button class="bc-btn bc-btn-outline" id="bc-save-btn">Auswahl speichern</button>',
          '<button class="bc-btn bc-btn-primary" id="bc-accept-all-modal">Alle akzeptieren</button>',
        '</div>',
      '</div>'
    ].join('');

    document.body.appendChild(modal);

    document.getElementById('bc-modal-close').addEventListener('click', hideModal);
    document.getElementById('bc-save-btn').addEventListener('click', saveSettings);
    document.getElementById('bc-accept-all-modal').addEventListener('click', acceptAll);
    modal.addEventListener('click', function (e) { if (e.target === modal) hideModal(); });
  }

  function init() {
    var consent = getConsent();

    // Inject modal always (needed for footer "Cookie-Einstellungen" link)
    injectModal();

    if (!consent) {
      // No decision yet → show banner
      injectBanner();
    } else {
      // Already decided → apply silently
      applyConsent(consent);
    }

    // Wire up any "Cookie-Einstellungen" footer link
    document.querySelectorAll('[data-cookie-settings]').forEach(function (el) {
      el.addEventListener('click', function (e) { e.preventDefault(); openModal(); });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
