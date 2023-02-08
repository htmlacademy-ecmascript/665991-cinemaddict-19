import { render, remove } from '../framework/render.js';
import ShowMoreButton from '../view/show-more-button.js';
import MoviePresenter from './movie-presenter.js';

export default class MovieListPresenter {
  #comments = null;
  #films = null;
  #renderedFilmCount = 0;
  #showMoreButton = null;
  #filmsList = null;
  #currentPresenter = null;


  constructor(comments, films, filmsList) {
    this.#comments = comments;
    this.#films = films;
    this.#filmsList = filmsList;
  }

  #sliceAndIterate = () => {
    this.#films.slice(this.#renderedFilmCount,this.#renderedFilmCount + 5).forEach((film)=>{
      const moviePresenter = new MoviePresenter(this.#onOpenPopup, this.#onClosePopup);
      moviePresenter.init(film, this.#comments);
      this.#renderedFilmCount++;
    });
  };

  init() {
    this.#showMoreButton = new ShowMoreButton(this.#processShowMoreButtonClick);

    this.#sliceAndIterate();
    if (this.#films.length > this.#renderedFilmCount) {
      render(this.#showMoreButton, this.#filmsList);
    }
  }

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

}
