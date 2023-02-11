import { render, replace, remove } from '../framework/render.js';
import Navigation from '../view/navigation.js';
import { FilterType, UpdateType } from '../utils/const.js';
import {filter} from '../utils/filter.js';

export default class FilterPresenter {
  #mainContainer = null;
  #filterModel = null;
  #filmModel = null;

  #filterComponent = null;

  constructor(mainContainer, filterModel, filmModel) {
    this.#mainContainer = mainContainer;
    this.#filterModel = filterModel;
    this.#filmModel = filmModel;

    this.#filmModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get filters() {
    const films = this.#filmModel.films;
    return [
      {
        type: FilterType.ALL,
        name: 'All',
        count: filter[FilterType.ALL](films).length,
      },
      {
        type: FilterType.WATCHLIST,
        name: 'Watchlist',
        count: filter[FilterType.WATCHLIST](films).length,
      },
      {
        type: FilterType.HISTORY,
        name: 'History',
        count: filter[FilterType.HISTORY](films).length,
      },
      {
        type: FilterType.FAVORITE,
        name: 'Favorite',
        count: filter[FilterType.FAVORITE](films).length,
      }
    ];
  }

  init() {
    const filters = this.filters;
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new Navigation({
      filters,
      currentFilterType: this.#filterModel.filter,
      onFilterTypeClick: this.#handleFilterTypeClick
    });

    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#mainContainer);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterTypeClick = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      console.log(44);
      return;
    }
      console.log(22);
    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  };
}
