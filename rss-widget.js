const RSSWidget = (() => {
  const locales = {
    de: "de-DE",
    en: "en-US",
    it: "it-IT",
    fr: "fr-FR",
    uk: "uk-UA",
  };

  const i18n = {
    loader: {
      de: "Feeds laden...",
      en: "Loading feeds...",
      it: "Caricamento feed...",
      fr: "Chargement des flux...",
      uk: "Завантаження стрічок...",
    },
    error: {
      de: "Fehler: ",
      en: "Error: ",
      it: "Errore: ",
      fr: "Erreur : ",
      uk: "Помилка: ",
    },
    noFeed: {
      de: "Keine Feed-Einträge gefunden.",
      en: "No feed items found.",
      it: "Nessun elemento del feed trovato.",
      fr: "Aucun élément de flux trouvé.",
      uk: "Не знайдено жодного елемента стрічки.",
    },
    failed: {
      de: "Feed konnte nicht geladen werden.",
      en: "Failed to load feed.",
      it: "Impossibile caricare il feed.",
      fr: "Impossible de charger le flux.",
      uk: "Не вдалося завантажити стрічку.",
    },
    powered: {
      de: 'Powered by <a href="https://github.com/RonDevHub/RSSWidget" class="rss-widget-powered-link" target="_blank" rel="noopener">RSSWidget</a>',
      en: 'Powered by <a href="https://github.com/RonDevHub/RSSWidget" class="rss-widget-powered-link" target="_blank" rel="noopener">RSSWidget</a>',
      it: 'Realizzato con <a href="https://github.com/RonDevHub/RSSWidget" class="rss-widget-powered-link" target="_blank" rel="noopener">RSSWidget</a>',
      fr: 'Propulsé par <a href="https://github.com/RonDevHub/RSSWidget" class="rss-widget-powered-link" target="_blank" rel="noopener">RSSWidget</a>',
      uk: 'Працює на <a href="https://github.com/RonDevHub/RSSWidget" class="rss-widget-powered-link" target="_blank" rel="noopener">RSSWidget</a>',
    },
  };

  let config = {
    target: "#rss-widget",
    feedUrl: "",
    limit: 5,
    refreshMinutes: 0,
    lang: "en",
    theme: "light",
    showFavicon: true,
  };

  let lastFeedIds = new Set();

  function escapeHTML(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  function formatDate(dateStr) {
    try {
      const date = new Date(dateStr);
      const locale = locales[config.lang] || "en-US";
      return date.toLocaleDateString(locale, {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return dateStr;
    }
  }

  function parseDescription(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const text = doc.body.textContent || "";
    const img = doc.querySelector("img");
    return {
      text: text.trim(),
      imgSrc: img ? img.src : null,
    };
  }

  function getFaviconUrl(feedUrl) {
    try {
      const url = new URL(feedUrl);
      return url.origin + "/favicon.ico";
    } catch {
      return null;
    }
  }

  const loaderSVG = `<svg class="rss-widget-loader-svg" width="48" height="48" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 333333 333333" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd"><path d="M166667 0c46023 0 87690 18655 117851 48816s48816 71828 48816 117851-18655 87690-48816 117851-71828 48816-117851 48816-87690-18655-117851-48816S0 212690 0 166667 18655 78977 48816 48816 120644 0 166667 0zm-50267 202221c-11193 0-20290 9126-20290 20250 0 11180 9096 20211 20290 20211 11228 0 20318-9032 20318-20211 0-11124-9087-20250-20318-20250zm-20270-59981v29214c19024 0 36901 7440 50367 20917 13452 13438 20880 31402 20880 50500h29339c0-55480-45142-100622-100586-100622v-9zm37-51776v29219c67839 0 123046 55264 123046 123179l29299 3c0-84011-68354-152398-152342-152398l-3-3zm177128-30425c-27287-27287-64987-44165-106628-44165-41642 0-79341 16878-106628 44165s-44165 64987-44165 106628c0 41642 16878 79341 44165 106628s64987 44165 106628 44165c41642 0 79341-16878 106628-44165s44165-64987 44165-106628c0-41642-16878-79341-44165-106628z" fill="#f26522" fill-rule="nonzero"/></svg>
  `;

  function render(items, faviconFromFeed) {
    const container = document.querySelector(config.target);
    if (!container) return;
    if (!items.length) {
      container.innerHTML = `<div class="error">No feed items found.</div>`;
      return;
    }
    container.className = `rss-widget ${config.theme}`;
    let html = "";
    let faviconUrl =
      faviconFromFeed ||
      (config.feedUrl ? getFaviconUrl(config.feedUrl) : null);
    if (config.header && config.title) {
      html += `<div class="rss-widget-header">`;
      if (config.showFavicon && faviconUrl) {
        html += `<img src="${faviconUrl}" alt="Favicon" class="rss-widget-favicon" onerror="this.style.display='none'"> `;
      }
      html += `${escapeHTML(config.title)}</div>`;
    }
    const bodyClass =
      typeof config.scrollbar !== "undefined" && !config.scrollbar
        ? "rss-widget-body rss-widget-hide-scrollbar"
        : "rss-widget-body";
    html += `<div class="${bodyClass}">`;
    html += items
      .map((item) => {
        const { text, imgSrc } = parseDescription(item.description || "");
        return `
        <div class="rss-item">
          <a href="${
            item.link
          }" class="title" target="_blank" rel="noopener noreferrer">${escapeHTML(
          item.title
        )}</a>
          <div class="pub-date">${formatDate(item.pubDate)}</div>
          <div class="description">${escapeHTML(text)}</div>
          ${
            imgSrc
              ? `<img src="${imgSrc}" alt="Bild zum Beitrag" loading="lazy"/>`
              : ""
          }
        </div>`;
      })
      .join("");
    html += `</div>`;
    if (config.footer) {
      const lang = i18n.powered[config.lang] ? config.lang : "en";
      html += `<div class="rss-widget-footer">${i18n.powered[lang]}</div>`;
    }
    container.innerHTML = html;
  }

  async function loadFeed() {
    const container = document.querySelector(config.target);
    if (!container) return;
    const lang = i18n.loader[config.lang] ? config.lang : "en";
    let loaderText = i18n.loader[lang];
    container.innerHTML = `
      <div class="rss-widget-loader-wrapper">
        ${loaderSVG}
        <div class="rss-widget-loader-text">${loaderText}</div>
      </div>
    `;
    try {
      const proxyUrl =
        `/rss-proxy.php?url=` + encodeURIComponent(config.feedUrl);
      const res = await fetch(proxyUrl);
      const data = await res.json();
      const errorText = i18n.error[lang];
      const noFeedText = i18n.noFeed[lang];
      const failedText = i18n.failed[lang];
      if (data.error) {
        container.innerHTML = `<div class="error">${errorText}${escapeHTML(
          data.error
        )}</div>`;
        return;
      }
      const items = data.items || [];
      lastFeedIds = new Set(items.map((i) => i.link));
      if (!items.length) {
        container.innerHTML = `<div class="error">${noFeedText}</div>`;
        return;
      }
      render(items.slice(0, config.limit), data.favicon);
    } catch (e) {
      const lang = i18n.failed[config.lang] ? config.lang : "en";
      const failedText = i18n.failed[lang];
      container.innerHTML = `<div class="error">${failedText}</div>`;
    }
  }

  function init(userConfig) {
    config = { ...config, ...userConfig };
    if (!config.lang || !locales[config.lang]) config.lang = "en";
    const container = document.querySelector(config.target);
    if (container && config.theme) {
      container.parentElement.setAttribute("data-theme", config.theme);
    }
    if (container) {
      if (config.width) container.style.width = config.width;
      if (config.height) container.style.height = config.height;
    }
    loadFeed();
    if (config.refreshMinutes > 0) {
      setInterval(() => {
        loadFeed();
      }, config.refreshMinutes * 60 * 1000);
    }
  }

  return { init };
})();
