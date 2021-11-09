import * as basicLightbox from 'basiclightbox';

const markup = `<div class="sk-chase">
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
  </div>`;

const loader = basicLightbox.create(markup);
export default { loader };

// console.log(loader);
loader.show();

// document.addEventListener('DOMContentLoaded', () => {
//   loader.close();
// });

setTimeout(() => {
  loader.close();
}, 1000);

// ОТОБРАЗИТЬ спиннер - loader.show();
// СКРЫТЬ спиннер - loader.close();
