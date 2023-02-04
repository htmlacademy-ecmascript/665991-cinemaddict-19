import {createElement} from '../render.js';

function getShowMoreButton () {
  return '<button class="films-list__show-more">Show more</button>';
}
export default class ShowMoreButton {
  #element = null;

  get template(){
    return(getShowMoreButton());
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }
}
