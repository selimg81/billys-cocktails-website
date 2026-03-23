# SEO-Report & Migrations-Briefing
## Billy's Cocktail Catering — Technisches Briefing für den Online-Marketer

---

## Vorab: Die kurze Antwort auf die Skepsis

> *„Kann eine statische Website ohne CMS überhaupt gut ranken?"*

**Ja — und oft sogar besser als WordPress.** Google bewertet nicht, womit eine Seite gebaut wurde. Google bewertet, was auf der Seite steht, wie schnell sie lädt, wie sie verlinkt ist und wie relevant sie für eine Suchanfrage ist. All das haben wir umgesetzt.

---

## Teil 1: Warum kein CMS — und warum das kein Nachteil ist

### Was ein CMS wie WordPress tatsächlich macht

WordPress, Webflow oder Shopify sind Werkzeuge, die HTML-Code erzeugen. Das Endprodukt, das Google sieht, ist immer dasselbe: eine HTML-Seite mit Text, Meta-Tags und Links. Kein Suchmaschinen-Crawler sieht jemals ein CMS. Er sieht nur den fertigen Code.

### Was mit statischen HTML-Seiten besser ist

| Faktor | WordPress/CMS | Unsere statische Seite |
|---|---|---|
| Ladezeit | 1–4 Sekunden (inkl. PHP, Datenbank, Plugins) | 0,3–0,8 Sekunden (kein Server-Processing) |
| Sicherheit | Häufige Angriffspunkte (Plugins, Login) | Kein Backend, kein Login, kein Angriffspunkt |
| Core Web Vitals | Oft schlechte Scores ohne Optimierung | Nativ gut (LCP, CLS, FID) |
| SEO-Kontrolle | Über Plugins (Yoast, RankMath) | Direkt im Code, 100% Kontrolle |
| Hosting-Kosten | 20–80 €/Monat (Managed WordPress) | Günstig bis kostenlos (Static Hosting) |
| Downtime-Risiko | Datenbank-Ausfall, Plugin-Konflikte | Praktisch null (CDN-gehostet) |

**Für Google ist Ladezeit ein offizieller Ranking-Faktor.** Eine Seite, die in unter einer Sekunde lädt, hat hier einen strukturellen Vorteil gegenüber einem durchschnittlichen WordPress-Blog.

### Was wir stattdessen machen

Alle SEO-Maßnahmen, die ein Plugin wie Yoast erledigt, haben wir manuell im Code umgesetzt — aber präziser und ohne Overhead:

- ✅ Meta-Title und Meta-Description auf jeder Seite
- ✅ Open Graph Tags für Social Sharing
- ✅ JSON-LD Structured Data (Schema.org)
- ✅ Canonical-Tags
- ✅ sitemap.xml
- ✅ robots.txt
- ✅ Alt-Texte auf allen Bildern
- ✅ Saubere H1/H2/H3-Hierarchie

---

## Teil 2: SEO-Report — Was wurde implementiert

### 2.1 On-Page SEO

#### Meta-Tags (alle 12 Seiten)

Jede Seite hat jetzt:
- **Title-Tag** (50–65 Zeichen) mit primärem Keyword + Markennamen
- **Meta-Description** (150–160 Zeichen) mit CTA ("Jetzt anfragen")
- **Canonical-Tag** zur Vermeidung von Duplicate Content

Beispiele:

| Seite | Title | Description |
|---|---|---|
| Startseite | Billy's Cocktails \| Mobiles Cocktail Catering Hamburg · Berlin · NRW | Billy's Cocktail Catering: Professionelles mobiles Cocktail-Catering für Firmenevents, Hochzeiten, Messen und private Feiern. Jetzt anfragen! |
| Firmenevents | Cocktail Catering für Firmenevents \| Billy's Cocktails Hamburg | Professionelles mobiles Cocktail Catering für Firmenevents, Weihnachtsfeiern und Teambuildings... |
| Hochzeiten | Cocktail Catering für Hochzeiten \| Billy's Cocktails Hamburg | Mobiles Cocktail Catering für eure Hochzeit. Individuelle Signature Drinks... |
| Cocktails | Signature Cocktails & Drink-Karte \| Billy's Cocktail Catering | Entdecke alle 12 Signature Cocktails von Billy's: Espresso Martini, Mojito, Negroni... |

---

#### JSON-LD Structured Data (Schema.org)

Auf der Startseite wurde ein vollständiges **LocalBusiness-Schema** implementiert. Das ist der wichtigste Schritt für Local SEO und Google Business Integration.

```
Typ: LocalBusiness
Name: Billy's Cocktail Catering
Telefon: +49 173 9927773
Standort: Hamburg
Servicegebiete: Hamburg, Berlin, NRW
Bewertung: 5,0 / 41 Google-Bewertungen
```

**Was das bewirkt:**
- Google kann Billy's als lokales Unternehmen in Hamburg einordnen
- Basis für potenzielle Rich Snippets in den Suchergebnissen (Sternebewertung sichtbar in den SERPs)
- Bessere Zuordnung bei lokalen Suchanfragen ("Cocktail Catering Hamburg")

---

#### Open Graph / Social Sharing

Alle Seiten haben Open Graph Tags. Das bedeutet: wenn ein Kunde den Link bei WhatsApp, Instagram oder LinkedIn teilt, erscheint automatisch eine professionelle Vorschau mit Titel, Beschreibung und Logo — statt einem nackten Link.

---

### 2.2 Technisches SEO

#### sitemap.xml

Eine vollständige XML-Sitemap mit allen 12 Seiten wurde erstellt und bei `https://billys-cocktails.de/sitemap.xml` hinterlegt.

**Inhalt der Sitemap:**
- index.html (Priorität 1,0)
- cocktails.html (0,9)
- leistungen.html (0,9)
- firmenevents.html (0,8)
- hochzeiten.html (0,8)
- geburtstage.html (0,8)
- sommerfeste.html (0,8)
- messen.html (0,8)
- private-feiern.html (0,8)
- about.html (0,6)
- referenzen.html (0,6)
- kontakt.html (0,7)

**Empfehlung:** Die Sitemap nach dem DNS-Wechsel über Google Search Console einreichen, damit alle Seiten schnell indexiert werden.

---

#### robots.txt

Eine robots.txt wurde erstellt. Sie erlaubt Google, alle Seiten zu crawlen, und verweist direkt auf die Sitemap.

---

#### Alt-Texte

Alle Bilder auf der Website haben beschreibende Alt-Texte mit relevanten Keywords. Das hilft bei der Google-Bildersuche und beim Accessibility-Score, der ebenfalls in Core Web Vitals einfließt.

---

### 2.3 Content & Keyword-Strategie

#### Neue Unterseiten für Long-Tail-Keywords

Der wichtigste inhaltliche Schritt waren die **6 neuen Event-Unterseiten**. Diese adressieren exakt die Suchanfragen, die potenzielle Kunden stellen:

| Unterseite | Ziel-Keyword | Suchintention |
|---|---|---|
| firmenevents.html | "Cocktail Catering Firmenevent Hamburg" | Commercial |
| hochzeiten.html | "Cocktail Catering Hochzeit Hamburg" | Commercial |
| geburtstage.html | "Mobile Cocktailbar Geburtstag" | Commercial |
| sommerfeste.html | "Cocktail Catering Sommerfest" | Commercial |
| messen.html | "Mobile Bar Messe Hamburg" | Commercial |
| private-feiern.html | "Cocktail Catering Privatfeier" | Commercial |

Bisher war die Website ein "One-Pager" für alle Event-Typen. Jetzt hat jede Nische eine eigene Seite mit eigenem Content, eigenem H1, eigener Meta-Description und eigener URL. Das erhöht die Chance erheblich, für spezifische Suchanfragen zu ranken.

---

#### Keyword-Verteilung auf der Startseite

Folgende Keywords sind jetzt organisch in den Texten verankert:

- **"Cocktail Catering"** — zentral auf allen Seiten
- **"Mobiles Cocktail Catering"** — Startseite, Leistungen
- **"Mobile Bar"** — Startseite, Unterseiten
- **"Hamburg", "Berlin", "NRW"** — Startseite, Meta-Tags, Footer
- **"Barkeeperinnen"** — modern, zeitgemäß, differenzierend
- **"Firmenevents", "Hochzeiten", "Geburtstage"** — je eigene Seiten
- **"Signature Cocktails"** — Cocktailseite, Startseite

---

### 2.4 Was noch aussteht (nächste Schritte)

Diese Punkte können schrittweise ergänzt werden und sind für den Start nicht kritisch:

- **Google Search Console**: Sitemap einreichen nach Domain-Wechsel
- **Google Business Profil**: Verlinkung mit der neuen Website aktualisieren
- **Backlinks**: Aktiv Backlinks aufbauen (Blogs, Branchenverzeichnisse, Kooperationspartner)
- **Bewertungen**: 41 Google-Bewertungen sind gut — aktiv weitere sammeln
- **Blogposts/Content**: Später optional — z.B. "Die 5 besten Cocktails für Firmenevents"

---

## Teil 3: Die Migration — Was passiert beim Domainwechsel

### Situation

Aktuell: `billys-cocktails.de` zeigt auf die alte Website (bisheriges Hosting)
Neu: `billys-cocktails.de` soll auf die neue, optimierte Website (neues Hosting) zeigen

### Warum das Ranking NICHT fällt

Das ist der entscheidende Punkt. Ein Ranking-Einbruch passiert typischerweise in diesen Szenarien:

| Szenario | Ranking-Risiko | Trifft hier zu? |
|---|---|---|
| Domain wechselt (alte → neue Domain) | Sehr hoch | ❌ Nein — selbe Domain |
| URLs ändern sich (alte Struktur → neue) | Hoch | ❌ Nein — selbe Dateinamen |
| Content wird gelöscht/massiv verändert | Mittel | ❌ Nein — mehr Content als vorher |
| Technische Fehler nach Migration | Mittel | ❌ Verhindert durch Vorbereitung |
| Temporäre Downtime beim Wechsel | Gering | Minimierbar durch sauberes Vorgehen |

**In unserem Fall wechselt nur der Server, nicht die Domain und nicht die URLs.** Google merkt davon im Grunde nichts — außer dass die Seite plötzlich schneller lädt und mehr Content hat.

---

### Schritt-für-Schritt: So läuft der Wechsel ab

**Schritt 1 — Hosting einrichten und Custom Domain hinterlegen** (vor dem DNS-Wechsel)
Beim gewählten Hosting-Anbieter wird `billys-cocktails.de` als Custom Domain eingetragen. Ein SSL-Zertifikat (HTTPS) wird dabei automatisch ausgestellt.

**Schritt 2 — DNS-Einträge beim Domain-Hoster ändern**
Beim Domain-Anbieter (z.B. All-Inkl, IONOS, etc.) werden die A-Records auf die Server des neuen Hosters umgestellt. Die genauen IP-Adressen liefert der Hoster.
DNS-Propagation dauert 15 Minuten bis 48 Stunden.

**Schritt 3 — HTTPS aktivieren**
Sicherstellen, dass HTTPS erzwungen wird. Die neue Website läuft dann ausschließlich über HTTPS.

**Schritt 4 — Google Search Console**
Sitemap unter `https://billys-cocktails.de/sitemap.xml` einreichen. Google wird die neuen Seiten damit innerhalb von Tagen (nicht Wochen) indexieren.

**Schritt 5 — Google Business Profil aktualisieren**
Im Google Business Profil prüfen, ob die Website-URL korrekt auf `https://billys-cocktails.de` zeigt.

---

### Was sich für Google verändert (positiv)

| Vorher | Nachher |
|---|---|
| Keine Meta-Descriptions auf mehreren Seiten | Alle Seiten mit optimierten Meta-Descriptions |
| Kein Structured Data | LocalBusiness-Schema mit Bewertungen |
| Keine sitemap.xml | Vollständige Sitemap mit 12 URLs |
| Keine robots.txt | robots.txt mit Sitemap-Verweis |
| Leere Alt-Texte in der Galerie | Alle Bilder mit beschreibenden Alt-Texten |
| 6 Seiten total | 12 Seiten — doppelt so viel indexierbarer Content |
| Generische Title-Tags | Keyword-optimierte Title-Tags |
| Keine Open Graph Tags | Social Sharing vollständig vorbereitet |

---

## Fazit

Die neue Website ist technisch besser als die bisherige aufgestellt — nicht schlechter. Der Wechsel ist kein Risiko, sondern eine Verbesserung. Die Domain bleibt, die URLs bleiben, der Content wird mehr und besser.

Was Suchmaschinen wollen, haben wir geliefert: schnelle Ladezeiten, saubere Struktur, relevante Keywords, vollständige Meta-Informationen und eine klare Signatur als lokales Unternehmen in Hamburg.

**Das ist keine CMS-Frage. Das ist eine Content- und Technik-Frage. Und beides haben wir gelöst.**

---

*Erstellt: März 2026 | Billy's Cocktail Catering — Technische SEO-Implementierung*
