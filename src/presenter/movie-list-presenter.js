import { render, remove } from '../framework/render.js';
import { SortType } from '../utils/const.js';
import Filters from '../view/filters.js';
import ShowMoreButton from '../view/show-more-button.js';
import MoviePresenter from './movie-presenter.js';
import FilmsContainer from '../view/films-container.js';
export default class MovieListPresenter {
  #comments = null;
  #films = null;
  #renderedFilmCount = 0;
  #showMoreButton = null;
  #filmsList = null;
  #currentPresenter = null;
  #mainContainer = null;
  #currentSortType = SortType.DEFAULT;
  #moviePresenterList = [];
  #originalFilmsList = [];

  constructor(comments, films, mainContainer) {
    this.#comments = comments;
    this.#films = films;
    this.#mainContainer = mainContainer;
  }

  #sliceAndIterate = () => {
    this.#films.slice(this.#renderedFilmCount,this.#renderedFilmCount + 5).forEach((film)=>{
      const moviePresenter = new MoviePresenter(this.#onOpenPopup, this.#onClosePopup);
      moviePresenter.init(film, this.#comments);
      this.#moviePresenterList.push(moviePresenter);
      this.#renderedFilmCount++;
    });
  };

  init() {
    this.#renderFilter();
    render(new FilmsContainer(), this.#mainContainer);
    this.#filmsList = document.querySelector('.films-list');

    this.#originalFilmsList = [...this.#films];

    this.#sliceAndIterate();
    if (this.#films.length > this.#renderedFilmCount) {
      this.#renderShowMoreButton();
    }
  }

  #renderShowMoreButton = () => {
    this.#showMoreButton = new ShowMoreButton(this.#processShowMoreButtonClick);
    render(this.#showMoreButton, this.#filmsList);
  };

  #processShowMoreButtonClick = () => {
    this.#sliceAndIterate();
    if (this.#films.length === this.#renderedFilmCount) {
      remove(this.#showMoreButton);
    }
  };

  #onClosePopup = () => {
    this.#currentPresenter = null;
  };

  #onOpenPopup = (moviePresenter) => {
    if (moviePresenter === this.#currentPresenter) {
      return;
    }
    if (this.#currentPresenter) {
      this.#currentPresenter.closePopUp();
    }
    this.#currentPresenter = moviePresenter;
  };

  #renderFilter = () => {
    const filterComponent = new Filters(this.#filterSortButtonDefaultHandler, this.#filterSortButtonDateHandler, this.#filterSortButtonRatingHandler);
    render(filterComponent, this.#mainContainer);
  };

  #filterSortButtonDefaultHandler = () => {
    if (this.#currentSortType === SortType.DEFAULT) {
      return;
    }
    this.#deleteAllMovies();
    this.#films = this.#originalFilmsList;
    this.#sliceAndIterate();
    this.#currentSortType = SortType.DEFAULT;

    if (this.#films.length !== this.#renderedFilmCount && !this.#mainContainer.contains(this.#showMoreButton.element)) {
      this.#renderShowMoreButton();
    }
  };

  #filterSortButtonDateHandler = () => {
    if (this.#currentSortType === SortType.DATE) {
      return;
    }
    this.#deleteAllMovies();
    this.#films.sort((a, b) => b.year - a.year);
    this.#sliceAndIterate();
    this.#currentSortType = SortType.DATE;

    if (this.#films.length !== this.#renderedFilmCount && !this.#mainContainer.contains(this.#showMoreButton.element)) {
      this.#renderShowMoreButton();
    }
  };

  #filterSortButtonRatingHandler = () => {
    if (this.#currentSortType === SortType.RATING) {
      return;
    }
    this.#deleteAllMovies();
    this.#films.sort((a, b) => b.rating - a.rating);
    this.#sliceAndIterate();
    this.#currentSortType = SortType.RATING;

    if (this.#films.length !== this.#renderedFilmCount && !this.#mainContainer.contains(this.#showMoreButton.element)) {
      this.#renderShowMoreButton();
    }
  };

  #deleteAllMovies = () => {
    this.#moviePresenterList.forEach((moviePresenter) => moviePresenter.delete());
    this.#renderedFilmCount = 0;
  };
}
