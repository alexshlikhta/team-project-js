const body = document.querySelector('body');
const check = document.querySelector('#theme-switch-toggle');
const footer = document.querySelector('.footer');
const footerText = document.querySelector('.footer__text');
const footerBtn = document.querySelector('.footer__btn');
const filmsName = document.querySelector('.films__name');

check.addEventListener('change', onChangeTheme);

const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};
const light = Theme.LIGHT;
const dark = Theme.DARK;
const saveLocalStorage = localStorage.getItem('Theme');

if (saveLocalStorage === 'dark-theme') {
  check.checked = true;
  body.classList.add('dark-theme');
  footer.classList.add('dark-theme');
  footerText.classList.add('dark-theme');
  footerBtn.classList.add('dark-theme');
  // filmsName.classList.add('dark-theme');
}
function onChangeTheme() {
  if (check.checked) {
    localStorage.setItem('Theme', dark);
    body.classList.add('dark-theme');
    body.classList.remove('light-theme');
    footer.classList.add('dark-theme');
    footer.classList.remove('light-theme');
    footerText.classList.add('dark-theme');
    footerBtn.classList.add('dark-theme');
    filmsName.classList.add('dark-theme');
  } else {
    localStorage.setItem('Theme', light);
    body.classList.add('light-theme');
    body.classList.remove('dark-theme');
    footer.classList.add('light-theme');
    footer.classList.remove('dark-theme');
    footerText.classList.remove('dark-theme');
    footerBtn.classList.remove('dark-theme');
    filmsName.classList.remove('dark-theme');
  }
}
