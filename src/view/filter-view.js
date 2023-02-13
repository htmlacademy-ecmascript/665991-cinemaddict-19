import AbstractView from '../framework/view/abstract-view.js';
import { FilterType } from '../utils/const.js';

const createFilterItemTemplate = (filter, currentFilterType) => {
  const {type, name, filteredFilms} = filter;

  return (
    `
    <a href="#${type}" data-filter-type="${type}"
    class="main-navigation__item ${type === currentFilterType ? 'main-navigation__item--active' : ''}">
      ${name}
      <span class="main-navigation__item-count">${filteredFilms.length}</span>
    </a>
    `
  );
};

const createFilterTemplate = (filters, currentFilterType) => (
  `<nav class="main-navigation">
      <a href="#all" data-filter-type="${FilterType.ALL}"
      class="main-navigation__item ${currentFilterType === FilterType.ALL ? 'main-navigation__item--active' : ''}">
        All movies
      </a>
      ${Object.keys(filters).slice(1).map((filter) => `
        ${createFilterItemTemplate(filters[filter], currentFilterType)}
      `).join('')}
   </nav>`
);

export default class FilterView extends AbstractView{
  #filters = null;
  #currentFilter = null;
  #handleFilterTypeClick = null;

  constructor({filters, currentFilterType, onFilterTypeClick}) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilterType;
    this.#handleFilterTypeClick = onFilterTypeClick;

    this.element.addEventListener('click', this.#filterTypeClickHandler);
  }

  get template() {
    return createFilterTemplate(this.#filters, this.#currentFilter);
  }

  #filterTypeClickHandler = (evt) => {
    const filter = evt.target.closest('.main-navigation__item');
    if (filter && !filter.classList.contains('main-navigation__item--active')) {
      this.#handleFilterTypeClick(filter.dataset.filterType);
    }
  };

}
