import AbstractView from '../framework/view/abstract-view.js';
import { SortType } from '../utils/const.js';


const createSortTemplate = (currentSortType) => (
  `<ul class="sort">
      ${Object.values(SortType).map((sortType) => `
        <li>
          <a href="#" class="sort__button ${currentSortType === sortType ? 'sort__button--active' : ''}" data-sort-type="${sortType}">
            Sort by ${sortType}
          </a>
        </li>
    `).join('')}
   </ul>`
);
export default class SortView extends AbstractView{
  #currentSortType = null;
  #handleSortTypeChange = null;

  constructor({currentSortType, onSortTypeChange}) {
    super();
    this.#currentSortType = currentSortType;
    this.#handleSortTypeChange = onSortTypeChange;

    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSortTemplate(this.#currentSortType);
  }

  #sortTypeChangeHandler = (evt) => {
    evt.preventDefault();
    if (evt.target.classList.contains('sort__button') && !evt.target.classList.contains('sort__button--active')) {
      this.#handleSortTypeChange(evt.target.dataset.sortType, evt.target);
    }
  };
}
