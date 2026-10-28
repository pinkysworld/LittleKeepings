(() => {
  let language = new URLSearchParams(location.search).get('lang');
  if (!['de', 'en'].includes(language)) { try { language = localStorage.getItem('stillsort_lang'); } catch (_) {} }
  if (!['de', 'en'].includes(language)) language = 'de';
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
      const title = home ? (language === 'de' ? 'Stillsort — In Ruhe sortieren' : 'Stillsort — Find your quiet order') : 'Support — Stillsort';
      const description = home ? (language === 'de' ? 'Ein ruhiges Puzzle- und Aufräumspiel für kleine Pausen.' : 'A calm sorting puzzle for little breaks from the everyday.') : (language === 'de' ? 'Hilfe und Kontakt für Stillsort.' : 'Help and contact for Stillsort.');
      document.title = title;
      document.querySelectorAll('meta[name="description"], meta[property="og:description"]').forEach(meta => meta.content = description);
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.content = title;
    }
  }
  document.querySelectorAll('.lang').forEach(button => button.addEventListener('click', () => {
    language = language === 'de' ? 'en' : 'de';
    try { localStorage.setItem('stillsort_lang', language); } catch (_) {}
    const url = new URL(location.href); url.searchParams.set('lang', language); history.replaceState(null, '', url);
    apply();
  }));
  apply();
})();
