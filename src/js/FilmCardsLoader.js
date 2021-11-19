export default class CardsLoader{
    constructor() {}
move = async (films__item, index) => {
    setTimeout(function() {
        films__item.classList.toggle('loaded');
    }, 100 * index);
  };
loading = async () => {
    const cards = [].slice.call(document.querySelectorAll('.films__item'));
    cards.forEach(this.move);
  }
}
