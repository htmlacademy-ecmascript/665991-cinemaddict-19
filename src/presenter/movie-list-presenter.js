import { render, remove } from '../framework/render.js';
import { SortType, FilterType } from '../utils/const.js';
import SortView from '../view/sort-view.js';
import ShowMoreButton from '../view/show-more-button.js';
import MoviePresenter from './movie-presenter.js';
import FilmsContainer from '../view/films-container.js';
import { UserAction,UpdateType } from '../utils/const.js';
import { filter } from '../utils/filter.js';
import { sortByDate, sortByRating } from '../utils/utils.js';
export default class MovieListPresenter {
  #renderedFilmCount = 0;
  #showMoreButton = null;
  #filmsList = null;
  #currentPresenter = null;
  #mainContainer = null;
  #currentSortType = SortType.DEFAULT;
  #moviePresenterList = [];
  #originalFilmsList = [];
  #filmModel = null;
  #commentModel = null;
  #filterModel = null;
  #sortComponent = null;
  #filterType = FilterType.ALL;

  constructor(commentModel, filmModel, filterModel, mainContainer) {
    this.#commentModel = commentModel;
    this.#filmModel = filmModel;
    this.#mainContainer = mainContainer;
    this.#filterModel = filterModel;

    this.#filmModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get films() {
    this.#filterType = this.#filterModel.filter;
    const films = [...this.#filmModel.films];
    const filteredFilms = filter[this.#filterType](films);

    switch (this.#currentSortType) {
      case SortType.DEFAULT:
        return filteredFilms;
      case SortType.DATE:
        return filteredFilms.sort(sortByDate);
      case SortType.RATING:
        return filteredFilms.sort(sortByRating);
    }
    return this.#filmModel.films;
  }

  get comments() {
    return this.#commentModel.comments;
  }

  #sliceAndIterate = () => {
    this.films.slice(this.#renderedFilmCount,this.#renderedFilmCount + 5).forEach((film)=>{
      const moviePresenter = new MoviePresenter(this.#onOpenPopup, this.#onClosePopup, this.#handleViewAction);
      moviePresenter.init(film, this.comments);
      this.#moviePresenterList.push(moviePresenter);
      this.#renderedFilmCount++;
    });
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        this.#filmModel.updateFilm(updateType, update);
        break;
      case UserAction.ADD_COMMENT:
        this.#commentModel.addComment(updateType, update);
        break;
      case UserAction.DELETE_COMMENT:
        this.#commentModel.deleteComment(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.MINOR:
        this.#deleteAllMovies();
        this.#sliceAndIterate();
        break;
      case UpdateType.MAJOR:
        this.#deleteAllMovies();
        this.#currentSortType = SortType.DEFAULT;
        this.#sliceAndIterate();
        break;
    }
  };

  init() {
    this.#renderFilter();
    render(new FilmsContainer(), this.#mainContainer);
    this.#filmsList = document.querySelector('.films-list');

    this.#originalFilmsList = [...this.films];

    this.#sliceAndIterate();
    if (this.films.length > this.#renderedFilmCount) {
      this.#renderShowMoreButton();
    }
  }

  #renderShowMoreButton = () => {
    this.#showMoreButton = new ShowMoreButton(this.#processShowMoreButtonClick);
    render(this.#showMoreButton, this.#filmsList);
  };

  #processShowMoreButtonClick = () => {
    this.#sliceAndIterate();
    if (this.films.length === this.#renderedFilmCount) {
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
    this.#sortComponent = new SortView(this.#currentSortType, this.#sortTypeChangeHandler);
    render(this.#sortComponent, this.#mainContainer);
  };

  #sortTypeChangeHandler = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#deleteAllMovies();
    this.#renderFilter();
    this.#sliceAndIterate();
  };

  #deleteAllMovies = () => {
    this.#moviePresenterList.forEach((moviePresenter) => moviePresenter.delete());
    this.#renderedFilmCount = 0;
    remove(this.#sortComponent);
  };
}
