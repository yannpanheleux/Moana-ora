// ===========================================
//  MOANA ORA — Menu hamburger + i18n (FR/EN)
//  Refactor: mêmes comportements/esthétique
// ===========================================
(() => {
  const btn = document.querySelector(".nav-toggle");
  const menu = document.getElementById("mobile-menu");
  if (!btn || !menu) return;

  const mqDesktop = window.matchMedia("(min-width: 1201px)");

  const placeMenu = () => {
    const r = btn.getBoundingClientRect();
    const gap = 8;
    menu.style.position = "fixed";
    menu.style.top = Math.round(r.bottom + gap) + "px";
    menu.style.left = Math.round(r.left) + "px";
    menu.style.maxWidth = "";
  };

  const onDocPointer = (e) => {
    if (!menu.contains(e.target) && !btn.contains(e.target)) closeMenu();
  };
  const onDocKey = (e) => {
    if (e.key === "Escape") {
      closeMenu();
      btn.focus?.();
    }
  };
  const onWinChange = () => {
    if (!menu.hidden) placeMenu();
  };

  const openMenu = () => {
    placeMenu();
    menu.hidden = false;
    requestAnimationFrame(() => menu.classList.add("is-open"));
    btn.setAttribute("aria-expanded", "true");
    menu.setAttribute("aria-hidden", "false");

    document.addEventListener("pointerdown", onDocPointer, true);
    document.addEventListener("keydown", onDocKey, true);
    window.addEventListener("resize", onWinChange, { passive: true });
    window.addEventListener("orientationchange", onWinChange, {
      passive: true,
    });
  };

  const closeMenu = () => {
    menu.classList.remove("is-open");
    menu.hidden = true;
    btn.setAttribute("aria-expanded", "false");
    menu.setAttribute("aria-hidden", "true");

    document.removeEventListener("pointerdown", onDocPointer, true);
    document.removeEventListener("keydown", onDocKey, true);
    window.removeEventListener("resize", onWinChange);
    window.removeEventListener("orientationchange", onWinChange);
  };

  const toggleMenu = () => {
    const open = btn.getAttribute("aria-expanded") === "true";
    open ? closeMenu() : openMenu();
  };

  // Passage en desktop => ferme le menu
  const onMQ = (e) => e.matches && closeMenu();
  if (mqDesktop?.addEventListener) mqDesktop.addEventListener("change", onMQ);
  else if (mqDesktop?.addListener) mqDesktop.addListener(onMQ); // iOS ancien

  // Click + fallback iOS
  btn.addEventListener("click", toggleMenu);
  btn.addEventListener(
    "touchend",
    (e) => {
      e.preventDefault();
      toggleMenu();
    },
    { passive: false }
  );

  // État initial
  if (mqDesktop?.matches) closeMenu();
  else menu.hidden = true;

  // Fermer le menu après clic sur un lien + toast
  menu.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (!a) return;
    e.preventDefault();
    closeMenu();

    const toast = document.getElementById("coming-soon");
    if (!toast) return;
    const msg =
      window.__i18n?.current === "en"
        ? "Coming soon!"
        : "Bientôt disponible&nbsp;!";
    toast.innerHTML = msg;
    toast.hidden = false;
    toast.classList.add("is-open");
    setTimeout(() => toast.classList.remove("is-open"), 1500);
    setTimeout(() => (toast.hidden = true), 1700);
  });
})();

// ===========================================
//  i18n — FR/EN toggle (titres H1/H2 non traduits)
//  Refactor: mapping clair + même rendu
// ===========================================
(() => {
  const translations = {
    fr: {
      "nav.menu": "Menu",
      "aria.openMenu": "Ouvrir le menu",
      "aria.toggleLang": "Basculer la langue",
      "mobile.team": "Notre équipe",
      "mobile.missions": "Nos missions",
      "mobile.actions": "Nos actions",
      "pill.team": "Notre équipe",
      "pill.missions": "Nos missions",
      "pill.actions": "Nos actions",
      "hero.welcome": "Bienvenue",
      "announcement.html":
        "Retrouvez-nous à partir du mois de&nbsp;<span>mars 2026&nbsp;!</span>",
      "p1.html":
        "<strong>MOANA ORA</strong>, <strong>O</strong>cean <strong>R</strong>esearch <strong>A</strong>lliance, est une <strong>association loi 1901</strong> à but non lucratif située à Haapiti, sur l’île de Moorea, en Polynésie française.<br/> Née de la volonté d’approfondir et de renouveler la relation entre l’humain et le vivant marin, elle a pour mission première de veiller à la continuité du bien-être de Hina et Kuokoa, deux grands dauphins vivant dans une partie du lagon de Moorea depuis 1997.",
      "p2.html":
        "<strong>MOANA ORA</strong> développera également des activités éducatives, culturelles et scientifiques destinées à tous les publics :<br />Ateliers créatifs, parcours pédagogiques, expositions et initiatives artistiques célébrant la mer et la vie océanique sous toutes ses formes !",
      "moreinfo.html":
        "Pour plus d’informations : <a href='mailto:contact@moana-ora.org'>contact@moana-ora.org</a>",
      footer: "© 2025 Moana Ora – Tous droits réservés<br> Crédit photo: Toby Matthews / Ocean Image Bank",
      toast: "Bientôt disponible&nbsp;!",
      comingSoon: "Bientôt disponible",
    },
    en: {
      "nav.menu": "Menu",
      "aria.openMenu": "Open menu",
      "aria.toggleLang": "Toggle language",
      "mobile.team": "Our team",
      "mobile.missions": "Our missions",
      "mobile.actions": "Our actions",
      "pill.team": "Our team",
      "pill.missions": "Our missions",
      "pill.actions": "Our actions",
      "hero.welcome": "Welcome",
      "announcement.html": "We'll be welcoming you from&nbsp;<span>March 2026&nbsp;!</span>",
      "p1.html":
        "<strong>MOANA ORA</strong>, <strong>O</strong>cean <strong>R</strong>esearch <strong>A</strong>lliance, is a <strong>non-profit organization</strong> (under French law 1901) located on the island of Moorea, French Polynesia.<br/> Born from the desire to deepen and renew our relationship with marine life, its primary mission is to continue to ensure the well-being of Hina and Kuokoa, two bottlenose dolphins living in a section of Moorea's lagoon since 1997.",
      "p2.html":
        "<strong>MOANA ORA</strong> will also develop educational, cultural and scientific activities for all audiences:<br />Creative workshops, educational programs, exhibitions, and artistic initiatives celebrating the ocean and marine life in all its forms!",
      "moreinfo.html":
        "For more information: <a href='mailto:contact@moana-ora.org'>contact@moana-ora.org</a>",
      footer: "© 2025 Moana Ora – All rights reserved<br>Photo credit: Toby Matthews / Ocean Image Bank",
      toast: "Coming soon!",
      comingSoon: "Coming soon",
    },
  };

  const FLAG_SVG = {
    fr: `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="16" viewBox="0 0 3 2" aria-hidden="true" focusable="false">
        <rect width="3" height="2" fill="#ED2939"/><rect width="2" height="2" fill="#fff"/><rect width="1" height="2" fill="#002395"/>
      </svg>`,
    us: `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="16" viewBox="0 0 247 130" aria-hidden="true" focusable="false">
        <rect width="247" height="130" fill="#b22234"/>
        <g fill="#fff">
          <rect y="10" width="247" height="10"/><rect y="30" width="247" height="10"/><rect y="50" width="247" height="10"/>
          <rect y="70" width="247" height="10"/><rect y="90" width="247" height="10"/><rect y="110" width="247" height="10"/>
        </g>
        <rect width="99" height="70" fill="#3c3b6e"/>
        <g fill="#fff">
          ${Array.from({ length: 9 })
            .map((_, r) =>
              Array.from({ length: r % 2 ? 5 : 6 })
                .map(
                  (_, c) =>
                    `<circle cx="${8 + c * 18}" cy="${8 + r * 8}" r="2"/>`
                )
                .join("")
            )
            .join("")}
        </g>
      </svg>`,
  };
  const nextFlag = (current) => (current === "fr" ? FLAG_SVG.us : FLAG_SVG.fr);

  // État courant
  window.__i18n = {
    current:
      localStorage.getItem("lang") || document.documentElement.lang || "fr",
  };

  const $ = (sel, root = document) => root.querySelector(sel);

  const textMap = [
    { key: "nav.menu", sel: '[data-i18n="nav.menu"]' },
    { key: "mobile.team", sel: '[data-i18n="mobile.team"]' },
    { key: "mobile.missions", sel: '[data-i18n="mobile.missions"]' },
    { key: "mobile.actions", sel: '[data-i18n="mobile.actions"]' },
    { key: "pill.team", sel: '[data-i18n="pill.team"]' },
    { key: "pill.missions", sel: '[data-i18n="pill.missions"]' },
    { key: "pill.actions", sel: '[data-i18n="pill.actions"]' },
    { key: "hero.welcome", sel: '[data-i18n="hero.welcome"]' },
    { key: "moreinfo.html", sel: '[data-i18n="moreinfo.html"]', html: true },
    {
      key: "announcement.html",
      sel: '[data-i18n="announcement.html"]',
      html: true,
    },
    { key: "p1.html", sel: '[data-i18n="p1.html"]', html: true },
    { key: "p2.html", sel: '[data-i18n="p2.html"]', html: true },
    { key: "footer", sel: '[data-i18n="footer"]', html: true },
    { key: "toast", sel: '[data-i18n="toast"]' },
  ];
  const ariaMap = [
    {
      key: "aria.openMenu",
      sel: '[data-i18n-aria="aria.openMenu"]',
      attr: "aria-label",
    },
    {
      key: "aria.toggleLang",
      sel: '[data-i18n-aria="aria.toggleLang"]',
      attr: "aria-label",
    },
  ];

  function applyLang(lang) {
    const dict = translations[lang] || translations.fr;

    // Textes & HTML
    for (const m of textMap) {
      const el = $(m.sel);
      if (!el) continue;
      m.html ? (el.innerHTML = dict[m.key]) : (el.textContent = dict[m.key]);
    }

    // ARIA
    for (const m of ariaMap) {
      const el = $(m.sel);
      if (el) el.setAttribute(m.attr, dict[m.key]);
    }

    // Drapeau du bouton = langue cible
    const langBtn = $(".lang-toggle");
    if (langBtn) {
      langBtn.innerHTML = nextFlag(lang);
      langBtn.setAttribute("aria-pressed", lang === "en" ? "true" : "false");
    }

    document.documentElement.setAttribute("lang", lang);
    window.__i18n.current = lang;
    localStorage.setItem("lang", lang);
  }

  // Init
  applyLang(window.__i18n.current === "en" ? "en" : "fr");

  // Toggle au clic
  const langBtn = document.querySelector(".lang-toggle");
  langBtn?.addEventListener("click", () => {
    const next = window.__i18n.current === "fr" ? "en" : "fr";
    applyLang(next);
  });
})();

// ===========================================
//  Pills desktop : flash "Bientôt disponible"
// ===========================================
(() => {
  const mqDesktop = window.matchMedia("(min-width: 1201px)");
  const pills = document.querySelectorAll(".pill-nav a");
  if (!pills.length) return;

  const msg = () =>
    window.__i18n?.current === "en" ? "Coming soon" : "Bientôt disponible";

  const flashLabel = (a) => {
    const restore = a.textContent;
    a.dataset.restore = restore;
    a.textContent = msg();
    setTimeout(() => {
      a.textContent = a.dataset.restore || restore;
      a.removeAttribute("data-restore");
    }, 1400);
  };

  pills.forEach((a) => {
    a.addEventListener("click", (e) => {
      if (!mqDesktop.matches) return;
      e.preventDefault();
      flashLabel(a);
    });
  });
})();
