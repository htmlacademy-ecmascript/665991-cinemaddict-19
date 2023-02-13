import { render, replace, remove } from '../framework/render.js';
import FilterView from '../view/filter-view.js';
import { FilterType, UpdateType } from '../utils/const.js';
import {filter} from '../utils/filter.js';
import UserRankView from '../view/user-rank-view.js';

export default class FilterPresenter {
  #mainContainer = null;
  #filterComponent = null;
  #userRankComponent = null;
  #userRankContainer = null;
  #filterModel = null;
  #filmModel = null;

  constructor({mainContainer, filterModel, filmModel, userRankContainer}) {
    this.#mainContainer = mainContainer;
    this.#filterModel = filterModel;
    this.#filmModel = filmModel;
    this.#userRankContainer = userRankContainer;

    this.#filmModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  init() {
    const filters = this.filters;
    const previousFilterComponent = this.#filterComponent;
    const previousUserRankComponent = this.#userRankComponent;

    const filmsWatchedCount = filters.history.filteredFilms.length;

    this.#userRankComponent = new UserRankView({
      watchedFilmsQuantity: filmsWatchedCount
    });

    this.#filterComponent = new FilterView({
      filters,
      currentFilterType: this.#filterModel.filter,
      onFilterTypeClick: this.#handleFilterTypeClick
    });

    if (previousUserRankComponent === null) {
      render(this.#userRankComponent, this.#userRankContainer);
    } else {
      replace(this.#userRankComponent, previousUserRankComponent);
      remove(previousUserRankComponent);
    }

    if (previousFilterComponent === null) {
      render(this.#filterComponent, this.#mainContainer);
      return;
    } else {
      replace(this.#filterComponent, previousFilterComponent);
      remove(previousFilterComponent);
    }

    if (filmsWatchedCount === 0) {
      remove(this.#userRankComponent);
      this.#userRankComponent = null;
    }
  }

  get filters() {
    const films = this.#filmModel.films;

    const filters = {
      all: {
        type: FilterType.ALL,
        name: 'All',
        count: filter[FilterType.ALL](films).length,
        emptyFilmsMessage: 'There are no movies in our database',
        filteredFilms: [...films]
      },
      watchlist: {
        type: FilterType.WATCHLIST,
        name: 'Watchlist',
        count: filter[FilterType.WATCHLIST](films).length,
        emptyFilmsMessage: 'There are no movies to watch now',
        filteredFilms: filter[FilterType.WATCHLIST](films)
      },
      history: {
        type: FilterType.HISTORY,
        name: 'History',
        count: filter[FilterType.HISTORY](films).length,
        emptyFilmsMessage: 'There are no watched movies now',
        filteredFilms: filter[FilterType.HISTORY](films)
      },
      favorites: {
        type: FilterType.FAVORITE,
        name: 'Favorites',
        count: filter[FilterType.FAVORITE](films).length,
        emptyFilmsMessage: 'There are no favorite movies now',
        filteredFilms: filter[FilterType.FAVORITE](films)
      }
    };

    return filters;
  }

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterTypeClick = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  };

}
