# Billy's Cocktails – Website

## Tech Stack
- Plain HTML5 + CSS3 + Vanilla JS (bewusst, kein Framework nötig)
- Statische Dateien, kein Build-Step

## Dateistruktur
- `css/style.css` – alle Styles (~58KB, unminifiziert)
- `js/main.js` – alle Scripts (~18KB, unminifiziert)
- `js/cookie-consent.js`, `js/i18n.js` – separate Funktionen
- `Website Bilder/` – Bilder (JPG + WebP vorhanden)
- `Website Video/` – Hero-Video (MP4 + MOV)
- `img/logos/` – Kundenlogos (SVG + PNG)

## Design-Regeln
- Nutze den frontend-design Skill für UI-Entscheidungen
- Keine generischen AI-Aesthetics
- Bold, distinctive Design-Choices
- Performance-optimiert (Core Web Vitals)

## Tracking & Cookies
- Jede Seite setzt im `<head>` Consent Mode auf "denied" und nur `window.BC_GTM_ID`
- Google Tag Manager (`GTM-NMH4QK2`) wird erst von `js/cookie-consent.js` nachgeladen,
  wenn der Besucher Analyse-Cookies erlaubt. Seiten ohne `BC_GTM_ID` laden gar kein GTM.
- Im GTM-Container hängt zusätzlich CookieYes als zweites Consent-Tool. Solange das
  drin ist, schreibt `syncCookieYes()` dessen Cookie mit, damit kein zweiter Banner erscheint.

## Seitenstruktur
- Vorlage für neue Seiten: Kopf, Header + Tube-Nav, Brotkrume (`.crumbs`) direkt unter dem
  `page-hero`, dann Abschnitte, Faktenkasten (`.fact-box`), FAQ (`.faq-item`), CTA, Footer
- Achtung: `.sec-white` ist im CSS **petrol**, nicht weiß. Heller Grund ist `.sec-warm`
- Neue Seiten seit August 2026: `preise`, `cocktail-catering-hamburg`, `ablauf`, `faq`
- Bei Änderungen an CSS oder JS den Versionsparameter `?v=JJJJMMTT` in allen HTML-Dateien
  hochzählen, sonst greifen die Caching-Regeln aus der `netlify.toml` zu lange

## Bekannte offene Punkte
- CookieYes-Tag im GTM-Container löschen (Tag "cookieyes-consent"), danach kann
  `syncCookieYes()` aus `js/cookie-consent.js` raus
- Hero-Video komprimieren (aktuell 6,2 MB, lädt nur noch auf Desktop). Braucht ffmpeg
- `referenzen.html` braucht echte Fallbeispiele, `about.html` persönliche Angaben zum Gründer
- `sameAs` im LocalBusiness-Schema kennt nur Instagram, Google-Unternehmensprofil fehlt
- GA4 ohne Zielvorhaben, Formularabsendungen werden nicht gemessen
- Calendly-Widget auf `kontakt.html` lädt ohne Einwilligung