import AbstractView from '../framework/view/abstract-view.js';

const createEmptyFilmListTemplate = (filters, activeFilter) => `<h2 class="films-list__title">${filters[activeFilter].emptyFilmsMessage}</h2>`;

export default class EmptyFilmListView extends AbstractView {
  #filters = null;
  #activeFilter = null;

  constructor({filters, activeFilter}) {
    super();
    this.#filters = filters;
    this.#activeFilter = activeFilter;
  }

  get template() {
    return createEmptyFilmListTemplate(this.#filters, this.#activeFilter);
  }

}
