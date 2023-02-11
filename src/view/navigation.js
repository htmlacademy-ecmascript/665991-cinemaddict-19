import AbstractView from '../framework/view/abstract-view.js';


function createFilterItemTemplate (filter, currentFilterType) {
  return `
  <a href="#${filter.name}"
  class="main-navigation__item ${filter.type === currentFilterType ? 'main-navigation__item--active' : ''}"
  value = "${filter.type}">
  ${filter.name === 'All' ? 'All movies' : filter.name}
  <span class="main-navigation__item-count">${filter.count}</span>
  </a>`;
}

function createFilterTemplate(filterItems, currentFilterType) {
  const filterItemsTemplate = filterItems
    .map((filter) => createFilterItemTemplate(filter, currentFilterType))
    .join('');

  return (
    `<nav class="main-navigation">
      ${filterItemsTemplate}
    </nav>`
  );
}

export default class Navigation extends AbstractView{
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
    evt.preventDefault();
    this.#handleFilterTypeClick(evt.target.attributes.value.nodeValue);
  };
}
