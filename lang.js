(() => {
  let language = new URLSearchParams(location.search).get('lang');
  if (!['de', 'en'].includes(language)) { try { language = localStorage.getItem('stillsort_lang'); } catch (_) {} }
  if (!['de', 'en'].includes(language)) language = 'de';
  function apply() {
    document.documentElement.lang = language;
    document.querySelectorAll('.lang').forEach(button => {
      button.textContent = language === 'de' ? 'EN' : 'DE';
      button.setAttribute('aria-label', language === 'de' ? 'Switch to English' : 'Zu Deutsch wechseln');
    });
  }
  document.querySelectorAll('.lang').forEach(button => button.addEventListener('click', () => {
    language = language === 'de' ? 'en' : 'de';
    try { localStorage.setItem('stillsort_lang', language); } catch (_) {}
    const url = new URL(location.href); url.searchParams.set('lang', language); history.replaceState(null, '', url);
    apply();
  }));
  apply();
})();
