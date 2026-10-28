(() => {
  const button = document.getElementById('language');
  let language = 'de';
  function apply() {
    document.documentElement.lang = language;
    document.body.classList.toggle('english', language === 'en');
    if (button) button.textContent = language === 'de' ? 'EN' : 'DE';
  }
  if (button) button.addEventListener('click', () => {
    language = language === 'de' ? 'en' : 'de';
    apply();
  });
  apply();
})();
