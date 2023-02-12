import { render, remove } from '../framework/render.js';
import { SortType } from '../utils/const.js';
import SortView from '../view/sort-view.js';
import ShowMoreButton from '../view/show-more-button.js';
import MoviePresenter from './movie-presenter.js';
import FilmsContainer from '../view/films-container.js';
import { UserAction,UpdateType } from '../utils/const.js';
import { sortByDate, sortByRating } from '../utils/utils.js';
import FilterPresenter from './filter-presenter.js';
import FilmSectionView from '../view/film-section-view.js';
import FilmListView from '../view/film-list-view.js';
import FilmListContainerView from '../view/film-list-container-view.js';
import AwardFilmPresenter from './award-film-presenter.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import StatisticsView from '../view/statistics-view.js';

const DEFAULT_RENDERED_FILMS_QUANTITY = 5;
const FILMS_TO_RENDER_QUANTITY = 5;
const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export default class MovieListPresenter {
  #footer = null;
  #showMoreButton = null;
  #mainContainer = null;
  #currentSortType = SortType.DEFAULT;
  #moviePresenter = new Map();
  #filmModel = null;
  #commentModel = null;
  #filterModel = null;
  #sortComponent = null;
  #emptyListComponent = null;
  #header = null;
  #filmSectionComponent = new FilmSectionView();
  #filmListComponent = new FilmListView();
  #filmListContainerComponent = new FilmListContainerView();
  #loadingMessageComponent = new LoadingMessageView();
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });
  #filterPresenter = null;
  #statisticsContainer = this.#footer;

  constructor({footer, commentModel, filmModel, filterModel, mainContainer, header}) {
    this.#footer = footer;
    this.#commentModel = commentModel;
    this.#filmModel = filmModel;
    this.#filterModel = filterModel;
    this.#mainContainer = mainContainer;
    this.#header = header;

    this.#filmModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
    this.#commentModel.addObserver(this.#handleModelEvent);
  }

  init() {
    this.#renderFilter();
    this.#renderSorting();
    this.#renderFilmList();
    this.#renderLoadingMessage();
    this.#renderAwardSection();
  }

  get films() {
    const filterType = this.#filterModel.filter;
    const filteredFilms = this.#filterPresenter.filters[filterType].filteredFilms;

    switch (this.#currentSortType) {
      case SortType.DEFAULT:
        return filteredFilms.sort(sortByDate);
      case SortType.RATING:
        return filteredFilms.sort(sortByRating);
      default:
        return filteredFilms;
    }
  }

  get comments() {
    return this.#commentModel.comments;
  }

  #renderFilter = () => {
    this.#filterPresenter = new FilterPresenter({
      mainContainer: this.#mainContainer,
      filterModel: this.#filterModel,
      filmModel: this.#filmModel,
      userRankContainer: this.#header
    });

    this.#filterPresenter.init();
  };

  #renderSorting = () => {
    this.#sortComponent = new SortView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#sortTypeChangeHandler
    });

    render(this.#sortComponent, this.#mainContainer);
  };

  #renderFilmList = () => {
    render(this.#filmSectionComponent, this.#mainContainer);
    render(this.#filmListComponent, this.#filmSectionComponent.element);
    render(this.#filmListContainerComponent, this.#filmListComponent.element);
  };

  #renderLoadingMessage = () => {
    render(this.#loadingMessageComponent, this.#filmListComponent.element, RenderPosition.AFTERBEGIN);
  };

  #renderAwardSection = () => {
    const awardFilmPresenter = new AwardFilmPresenter({
      awardFilmContainer: this.#filmSectionComponent.element,
      films: this.films
    });
    awardFilmPresenter.init();
  };

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        try {
          await this.#filmModel.updateFilm(updateType, update);
          if (this.films.length === 0) {
            this.#renderEmptyFilmList();
          }
        } catch (err) {
          this.#moviePresenter.get(update.id).setAborting(actionType);
        }
        break;
      case UserAction.ADD_COMMENT:
        try {
          await this.#commentModel.addComment(updateType, update);
        } catch (error) {
          this.#moviePresenter.get(update.filmId).setAborting(actionType);
        }
        break;
      case UserAction.DELETE_COMMENT:
        try {
          await this.#commentModel.deleteComment(updateType, update);
        } catch (error) {
          this.#moviePresenter.get(update.id).setAborting(actionType);
        }
        break;
      default:
        throw new Error(`Unknown action type: ${actionType}`);
    }

    this.#uiBlocker.unblock();
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#moviePresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#deleteAllMovies();
        this.#renderFilms(DEFAULT_RENDERED_FILMS_QUANTITY);
        break;
      case UpdateType.MAJOR:
        this.#deleteAllMovies({resetSortType: true});
        this.#renderFilms(DEFAULT_RENDERED_FILMS_QUANTITY);
        break;
      case UpdateType.INIT:
        remove(this.#loadingMessageComponent);
        this.#renderStatistics();
        if (this.films.length === 0) {
          this.#renderEmptyFilmList();
          return;
        }
        this.#renderFilms(DEFAULT_RENDERED_FILMS_QUANTITY);
        this.#renderShowMoreButton();
      default:
        throw new Error(`Unknown update type: ${updateType}`);
    }
  };

  #renderFilm = (film) => {
    const moviePresenter = new MoviePresenter({
      filmListContainer: this.#filmListContainerComponent.element,
      commentsModel: this.#commentModel,
      currentFilterType: this.#filterModel.filter,
      onDataChange: this.#handleViewAction
    });
    moviePresenter.init(film);
    this.#moviePresenter.set(film.id, moviePresenter);
  };

  #renderFilms = (renderQuantity) => {
    const filmsToRender = this.films;
    const renderedFilmsQuantity = this.#filmListContainerComponent.element.children.length;
    if (filmsToRender.length === 0) {
      this.#renderEmptyFilmList();
      return;
    }
    for (let i = renderedFilmsQuantity; i < renderedFilmsQuantity + renderQuantity; i++) {
      this.#renderFilm(filmsToRender[i]);
      const isLastFilm = filmsToRender[i] === filmsToRender[filmsToRender.length - 1];
      if (isLastFilm) {
        remove(this.#showMoreButton);
        return;
      }
    }
  };

  #renderShowMoreButton = () => {
    this.#showMoreButton = new ShowMoreButton({
      onClick: this.#processShowMoreButtonClick
    });
    render(this.#showMoreButton, this.#filmListComponent.element);
  };


  #processShowMoreButtonClick = () => {
    this.#renderFilms(FILMS_TO_RENDER_QUANTITY);
  };

  #renderStatistics = () => {
    render(new StatisticsView({
      quantity: this.#filmModel.films.length
    }), this.#statisticsContainer);
  };

  #sortTypeChangeHandler = (sortType, button) => {
    this.#deleteAllMovies();
    this.#currentSortType = sortType;
    this.#setActiveSortButton(button);
    this.#renderFilms(DEFAULT_RENDERED_FILMS_QUANTITY);
  };

  #deleteAllMovies = ({resetSortType = false} = {}) => {
    this.#moviePresent.forEach((presenter) => presenter.delete());
    this.#moviePresenter.clear();

    this.#sortComponent.element.style.display = 'flex';

    remove(this.#showMoreButton);
    this.#renderShowMoreButton();

    remove(this.#emptyListComponent);
    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
      this.#setActiveSortButton(this.#sortComponent.element.querySelector('.sort__button[data-sort-type="default"]'));
    }
  };

  #setActiveSortButton(button) {
    this.#sortComponent.element.querySelector('.sort__button--active').classList.remove('sort__button--active');
    button.classList.add('sort__button--active');
  };

  #renderEmptyFilmList = () => {
    this.#sortComponent.element.style.display = 'none';
    remove(this.#showMoreButton);
    this.#emptyListComponent = new EmptyFilmListView({
      filters: this.#filtersPresenter.filters,
      activeFilter: this.#filterModel.filter
    });
    render(this.#emptyListComponent, this.#filmListComponent.element);
  };

}
