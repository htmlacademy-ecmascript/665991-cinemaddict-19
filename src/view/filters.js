import AbstractView from '../framework/view/abstract-view.js';


function getFilters () {
  return `<ul class="sort">
            <li><a href="#" class="sort__button sort__button--active sort__button--default">Sort by default</a></li>
            <li><a href="#" class="sort__button sort__button--date">Sort by date</a></li>
            <li><a href="#" class="sort__button sort__button--rating">Sort by rating</a></li>
          </ul>`;
}
export default class Filters extends AbstractView{
  #filterSortButtonDefaultHandler = null;
  #filterSortButtonDateHandler = null;
  #filterSortButtonRatingHandler = null;

  constructor(filterSortButtonDefaultHandler, filterSortButtonDateHandler, filterSortButtonRatingHandler) {
    super();

    this.#filterSortButtonDefaultHandler = filterSortButtonDefaultHandler;
    this.#filterSortButtonDateHandler = filterSortButtonDateHandler;
    this.#filterSortButtonRatingHandler = filterSortButtonRatingHandler;

    this.element.querySelector('.sort__button--default').addEventListener('click', this.#filterSortButtonDefault);
    this.element.querySelector('.sort__button--date').addEventListener('click', this.#filterSortButtonDate);
    this.element.querySelector('.sort__button--rating').addEventListener('click', this.#filterSortButtonRating);
  }

  #filterSortButtonDefault = () => {
    this.#filterSortButtonDefaultHandler();
    this.element.querySelector('.sort__button--default').classList.add('sort__button--active');
    this.element.querySelector('.sort__button--date').classList.remove('sort__button--active');
    this.element.querySelector('.sort__button--rating').classList.remove('sort__button--active');
  };

  #filterSortButtonDate = () => {
    this.#filterSortButtonDateHandler();
    this.element.querySelector('.sort__button--default').classList.remove('sort__button--active');
    this.element.querySelector('.sort__button--date').classList.add('sort__button--active');
    this.element.querySelector('.sort__button--rating').classList.remove('sort__button--active');
  };

  #filterSortButtonRating = () => {
    this.#filterSortButtonRatingHandler();
    this.element.querySelector('.sort__button--default').classList.remove('sort__button--active');
    this.element.querySelector('.sort__button--date').classList.remove('sort__button--active');
    this.element.querySelector('.sort__button--rating').classList.add('sort__button--active');
  };

  get template(){
    return(getFilters());
  }
}
