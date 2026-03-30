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

## Bekannte offene Punkte
- Web3Forms API Key fehlt noch in `kontakt.html` (Platzhalter: `DEIN-WEB3FORMS-KEY-HIER`)
- GTM-ID in `index.html` ist noch Platzhalter (`GTM-XXXXXXX`) – echte ID eintragen oder GTM entfernen
- OG-Image-URL hat Leerzeichen im Pfad – URL-Encoding oder Pfad umbenennen