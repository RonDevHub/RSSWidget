# RSS Feed Embed Widget
![rssfeed local_ (1)](https://github.com/user-attachments/assets/7793e2cf-552d-470a-a02d-65bb9b86427c)


A simple, customizable, and themeable RSS/Atom feed widget for your website.  
Ein einfaches, anpassbares und themefähiges RSS/Atom-Feed-Widget für deine Webseite.

---

## Features / Funktionen

- Supports RSS 2.0 and Atom feeds  
  Unterstützt RSS 2.0 und Atom-Feeds
- Multiple themes (light, dark, green, blue, red, github)  
  Mehrere Themes (light, dark, green, blue, red, github)
- Language support: English, German, Italian, French, Ukrainian  
  Sprachunterstützung: Englisch, Deutsch, Italienisch, Französisch, Ukrainisch
- Show/hide favicon, header, footer, scrollbar  
  Favicon, Header, Footer, Scrollbar ein-/ausblendbar
- Responsive and easy to integrate  
  Responsiv und einfach einzubinden
- "Powered by" footer with GitHub link  
  "Powered by"-Footer mit GitHub-Link
- Pulsing SVG loader and error messages  
  Pulsierender SVG-Loader und Fehlermeldungen

---

## Quick Start / Schnellstart

**1. Download or clone this repository.**  
1. Lade dieses Repository herunter oder klone es.

**2. Include the files in your HTML:**  
2. Binde die Dateien in dein HTML ein:

```html
<link rel="stylesheet" href="rss-widget.css" />
<div id="rss-widget"></div>
<script src="rss-widget.js"></script>
```

**3. Initialize the widget:**  
3. Initialisiere das Widget:

```js
RSSWidget.init({
  target: "#rss-widget", // CSS selector for the widget container / CSS-Selektor für das Widget-Element
  title: "My Feed", // Widget title / Widget-Titel
  feedUrl: "https://example.com/feed.xml", // RSS/Atom feed URL / RSS/Atom Feed-URL
  showFavicon: true, // Show favicon in header (true) or hide (false) / Favicon im Header anzeigen (true) oder ausblenden (false)
  limit: 5, // Maximum number of feed items to display / Maximale Anzahl der Feed-Einträge
  height: "500px", // Widget height / Widget-Höhe
  width: "400px", // Widget width / Widget-Breite
  scrollbar: false, // Show scrollbar (true) or hide (false) / Scrollbar anzeigen (true) oder ausblenden (false)
  refreshMinutes: 10, // Refresh interval in minutes / Aktualisierungsintervall in Minuten
  header: true, // Show header (true) or hide (false) / Header anzeigen (true) oder ausblenden (false)
  footer: true, // Show footer (true) or hide (false) / Footer anzeigen (true) oder ausblenden (false)
  lang: "en", // Language: "de", "en", "it", "fr", "uk" / Sprache: "de", "en", "it", "fr", "uk"
  theme: "light", // Theme: "light", "dark", "green", "blue", "red", "github" / Theme: "light", "dark", "green", "blue", "red", "github"
});
```

**4. Use the included PHP proxy for CORS and feed parsing:**  
4. Nutze das mitgelieferte PHP-Proxy-Skript für CORS und Feed-Parsing:

- Place `rss-proxy.php` on your server  
  Lege `rss-proxy.php` auf deinen Server

---

## Options / Optionen

| Option         | Type     | Default   | Description (EN)                                   | Beschreibung (DE)                                  |
| -------------- | -------- | --------- | -------------------------------------------------- | -------------------------------------------------- |
| target         | string   | "#rss-widget" | CSS selector for widget container                  | CSS-Selektor für das Widget-Element                |
| title          | string   | ""        | Widget title                                       | Widget-Titel                                       |
| feedUrl        | string   | ""        | RSS/Atom feed URL                                  | RSS/Atom Feed-URL                                  |
| showFavicon    | boolean  | true      | Show favicon in header                             | Favicon im Header anzeigen                         |
| limit          | number   | 5         | Max. number of feed items                          | Maximale Anzahl der Feed-Einträge                  |
| height         | string   | "500px"   | Widget height (e.g. "500px" or "100%")             | Widget-Höhe (z.B. "500px" oder "100%")             |
| width          | string   | "400px"   | Widget width (e.g. "400px" or "100%")              | Widget-Breite (z.B. "400px" oder "100%")           |
| scrollbar      | boolean  | false     | Show scrollbar (true) or hide (false)              | Scrollbar anzeigen (true) oder ausblenden (false)  |
| refreshMinutes | number   | 10        | Refresh interval in minutes                        | Aktualisierungsintervall in Minuten                |
| header         | boolean  | true      | Show header (true) or hide (false)                 | Header anzeigen (true) oder ausblenden (false)     |
| footer         | boolean  | true      | Show footer (true) or hide (false)                 | Footer anzeigen (true) oder ausblenden (false)     |
| lang           | string   | "en"      | Language: "de", "en", "it", "fr", "uk"             | Sprache: "de", "en", "it", "fr", "uk"              |
| theme          | string   | "light"   | Theme: "light", "dark", "green", "blue", "red", "github" | Theme: "light", "dark", "green", "blue", "red", "github" |

---

## License / Lizenz

MIT License  
MIT-Lizenz

---

## Author / Autor

[RonDevHub](https://github.com/RonDevHub)

<a href="https://www.buymeacoffee.com/RonDev" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>   <a href='https://ko-fi.com/U6U31EV2VS' target='_blank'><img height='60' style='border:0px;height:60px;' src='https://storage.ko-fi.com/cdn/kofi6.png?v=6' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>

