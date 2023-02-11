import AbstractView from '../framework/view/abstract-view.js';
import { SortType } from '../utils/const.js';


function createSortTemplate (currentSortType) {
  return `<ul class="sort">
            <li><a href="#" class="sort__button ${currentSortType === SortType.DEFAULT ? 'sort__button--active' : ''} sort__button--active sort__button--default">Sort by default</a></li>
            <li><a href="#" class="sort__button ${currentSortType === SortType.DATE ? 'sort__button--active' : ''} sort__button--date">Sort by date</a></li>
            <li><a href="#" class="sort__button ${currentSortType === SortType.RATING ? 'sort__button--active' : ''} sort__button--rating">Sort by rating</a></li>
          </ul>`;
}
export default class SortView extends AbstractView{
  #currentSortType = null;
  #handleSortTypeChange = null;

  constructor(currentSortType, onSortTypeChange) {
    super();
    this.#currentSortType = currentSortType;
    this.#handleSortTypeChange = onSortTypeChange;

    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSortTemplate(this.#currentSortType);
  }

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'A') {
      return;
    }

    evt.preventDefault();
    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };
}
