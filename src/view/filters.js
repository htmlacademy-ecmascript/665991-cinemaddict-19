import {createElement} from '../render.js';

function getFilters () {
  return '<ul class="sort"><li><a href="#" class="sort__button sort__button--active">Sort by default</a></li><li><a href="#" class="sort__button">Sort by date</a></li><li><a href="#" class="sort__button">Sort by rating</a></li></ul>';
}
export default class Filters {
  #element = null;

  get template(){
    return(getFilters());
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }
}
