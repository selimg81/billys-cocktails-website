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

## Bekannte offene Punkte
- Web3Forms API Key fehlt noch in `kontakt.html` (Platzhalter: `DEIN-WEB3FORMS-KEY-HIER`)
- CookieYes-Tag im GTM-Container löschen (Tag "cookieyes-consent"), danach kann
  `syncCookieYes()` aus `js/cookie-consent.js` raus
- `datenschutz.html` hat keinen Abschnitt zu Google Analytics / Tag Manager, obwohl GA4 läuft
- Calendly-Widget auf `kontakt.html` lädt ohne Einwilligung
- OG-Image-URL hat Leerzeichen im Pfad – URL-Encoding oder Pfad umbenennen