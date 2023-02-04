import {createElement} from '../render.js';

function getEmptyListMessage () {
  return '<h2 class="films-list__title">There are no movies in our database</h2>';
}
export default class EmptyListMessage {
  #element = null;

  get template(){
    return(getEmptyListMessage());
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }
}
