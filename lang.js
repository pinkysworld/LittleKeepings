(() => {
  let language = new URLSearchParams(location.search).get('lang');
  if (!['de', 'en'].includes(language)) { try { language = localStorage.getItem('little_keepings_lang'); } catch (_) {} }
  if (!['de', 'en'].includes(language)) language = 'en';
  const home = /\/$|\/index\.html$/.test(location.pathname);
  const support = /\/support\.html$/.test(location.pathname);
  function apply() {
    document.documentElement.lang = language;
    document.querySelectorAll('.lang').forEach(button => {
      button.textContent = language === 'de' ? 'EN' : 'DE';
      button.setAttribute('aria-label', language === 'de' ? 'Switch to English' : 'Zu Deutsch wechseln');
    });
    document.querySelectorAll('[data-alt-de]').forEach(element => {
      element.setAttribute(element.tagName === 'IMG' ? 'alt' : 'aria-label', element.dataset[language === 'de' ? 'altDe' : 'altEn']);
    });
    document.querySelectorAll('a[href]').forEach(link => {
      const url = new URL(link.getAttribute('href'), location.href);
      if (url.origin === location.origin && /\/$|\.html$/.test(url.pathname) && !link.classList.contains('skip') && !link.getAttribute('href').startsWith('#')) {
        url.searchParams.set('lang', language);
        link.setAttribute('href', url.pathname + url.search + url.hash);
      }
    });
    if (home || support) {
      const title = home ? (language === 'de' ? 'Little Keepings — Ruhiges Sortierpuzzle' : 'Little Keepings — Calm sorting puzzle') : 'Support — Little Keepings';
      const description = home ? (language === 'de' ? 'Ein ruhiges Sortierpuzzle: 25 Aufgaben, fünf Kapitel, sichtbare Regeln und passende Fäden. Ohne Timer, mit Rückgängig und Platz für kleine Fundstücke.' : 'A calm sorting puzzle: 25 puzzles, five chapters, visible rules and matching threads. Take your time, undo moves and find a place for little keepsakes.') : (language === 'de' ? 'Hilfe und Kontakt für Little Keepings.' : 'Help and contact for Little Keepings.');
      document.title = title;
      document.querySelectorAll('meta[name="description"], meta[property="og:description"]').forEach(meta => meta.content = description);
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.content = title;
    }
  }
  document.querySelectorAll('.lang').forEach(button => button.addEventListener('click', () => {
    language = language === 'de' ? 'en' : 'de';
    try { localStorage.setItem('little_keepings_lang', language); } catch (_) {}
    const url = new URL(location.href); url.searchParams.set('lang', language); history.replaceState(null, '', url);
    apply();
  }));
  apply();
})();
