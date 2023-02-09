import { render, remove } from '../framework/render.js';
import MovieCard from '../view/movie-cards.js';
import MovieDetailsPopUp from '../view/movie-details-pop-up.js';

export default class MoviePresenter {
  #popup = null;
  #body = null;
  #film = null;
  #movieCard = null;
  #onOpenPopUp = null;
  #onClosePopUp = null;

  constructor(onOpenPopUp, onClosePopUp) {
    this.#onOpenPopUp = onOpenPopUp;
    this.#onClosePopUp = onClosePopUp;
  }

  init(film, comments) {
    this.#film = film;
    const commentsCount = comments.filter((comment) => (comment.id === film.id)).length;
    this.#movieCard = new MovieCard(film, commentsCount, this.#processMovieCardClick, this.#processAddToWatchListClick, this.#processMarkAsWatchedClick, this.#processMarkAsFavorite);
    this.#popup = new MovieDetailsPopUp(comments, this.#film, this.#processMovieDetailsPopUpCloseButtonClick, this.#processAddToWatchListClick, this.#processMarkAsWatchedClick, this.#processMarkAsFavorite);

    const filmsListContainer = document.querySelector('.films-list__container');
    this.#body = document.querySelector('body');

    render(this.#movieCard, filmsListContainer);
  }

  delete = () => {
    remove(this.#movieCard);
  };

  #processMovieCardClick = () => {
    render(this.#popup, this.#body);
    this.#onOpenPopUp(this);
    this.#body.classList.add('hide-overflow');
    document.addEventListener('keydown', (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        this.closePopUp();
      }
    });
  };

  closePopUp = () => {
    this.#popup.element.remove();
    this.#body.classList.remove('hide-overflow');
    this.#onClosePopUp();
  };

  #processMovieDetailsPopUpCloseButtonClick = () => {
    this.closePopUp();
  };

  #processAddToWatchListClick = () => {
    if (this.#film.isAdded === false) {
      this.#film.isAdded = true;
    } else {
      this.#film.isAdded = false;
    }
    this.#movieCard.element.querySelector('.film-card__controls-item--add-to-watchlist').classList.toggle('film-card__controls-item--active');
    this.#popup.element.querySelector('.film-details__control-button--watchlist').classList.toggle('film-details__control-button--active');
  };

  #processMarkAsWatchedClick = () => {
    if (this.#film.isWatched === false) {
      this.#film.isWatched = true;
    } else {
      this.#film.isWatched = false;
    }
    this.#movieCard.element.querySelector('.film-card__controls-item--mark-as-watched').classList.toggle('film-card__controls-item--active');
    this.#popup.element.querySelector('.film-details__control-button--watched').classList.toggle('film-details__control-button--active');
  };

  #processMarkAsFavorite = () => {
    if (this.#film.isFavorite === false) {
      this.#film.isFavorite = true;
    } else {
      this.#film.isFavorite = false;
    }
    this.#movieCard.element.querySelector('.film-card__controls-item--favorite').classList.toggle('film-card__controls-item--active');
    this.#popup.element.querySelector('.film-details__control-button--favorite').classList.toggle('film-details__control-button--active');
  };
}

