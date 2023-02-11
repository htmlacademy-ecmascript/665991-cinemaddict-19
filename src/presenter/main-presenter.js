import { render } from '../framework/render.js';
import MovieListPresenter from './movie-list-presenter.js';
import UserRank from '../view/user-rank.js';
import FilmsContainer from '../view/films-container.js';
import EmptyListMessage from '../view/empty-list-message.js';
import FilterPresenter from './filter-presenter.js';

const headerContainer = document.querySelector('.header');

export default class Presenter {
  #commentModel = null;
  #filmModel = null;
  #mainContainer = null;
  #filterModel = null;

  constructor(mainContainer, commentModel, filmModel, filterModel) {
    this.#mainContainer = mainContainer;
    this.#commentModel = commentModel;
    this.#filmModel = filmModel;
    this.#filterModel = filterModel;
  }

  init() {

    render(new UserRank(), headerContainer);
    const filtersPresenter = new FilterPresenter(this.#mainContainer, this.#filterModel, this.#filmModel);
    filtersPresenter.init();

    if(this.#filmModel.films.length === 0) {
      render(new FilmsContainer(), this.#mainContainer);
      const filmsList = document.querySelector('.films-list');
      render(new EmptyListMessage(), filmsList);
    } else {
      const movieListPresenter = new MovieListPresenter(this.#commentModel, this.#filmModel, this.#filterModel, this.#mainContainer);
      movieListPresenter.init();
    }
  }
}


