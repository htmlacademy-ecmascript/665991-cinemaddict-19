import { render } from '../framework/render.js';
import MovieListPresenter from './movie-list-presenter.js';
import UserRank from '../view/user-rank.js';
import Navigation from '../view/navigation.js';
import Filters from '../view/filters.js';
import FilmsContainer from '../view/films-container.js';
import EmptyListMessage from '../view/empty-list-message.js';

const headerContainer = document.querySelector('.header');

export default class Presenter {
  #commentModel = null;
  #filmModel = null;
  #comments = null;
  #films = null;
  #mainContainer = null;

  constructor(mainContainer, commentModel, filmModel) {
    this.#mainContainer = mainContainer;
    this.#commentModel = commentModel;
    this.#filmModel = filmModel;
  }

  init() {
    this.#comments = this.#commentModel.comments;
    this.#films = this.#filmModel.films;

    render(new UserRank(), headerContainer);
    render(new Navigation(), this.#mainContainer);
    render(new Filters(), this.#mainContainer);
    render(new FilmsContainer(), this.#mainContainer);
    const filmsList = document.querySelector('.films-list');

    if(this.#films.length === 0) {
      render(new EmptyListMessage(), filmsList);
    } else {
      const movieListPresenter = new MovieListPresenter(this.#comments, this.#films, filmsList);
      movieListPresenter.init();
    }
  }
}


