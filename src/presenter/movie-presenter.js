import { render, remove } from '../framework/render.js';
import MovieCard from '../view/movie-cards.js';
import MovieDetailsPopUp from '../view/movie-details-pop-up.js';
import { UserAction, UpdateType } from '../utils/const.js';

export default class MoviePresenter {
  #popup = null;
  #body = null;
  #film = null;
  #movieCard = null;
  #onOpenPopUp = null;
  #onClosePopUp = null;
  #handleDataChange = null;

  constructor(onOpenPopUp, onClosePopUp, handleViewAction) {
    this.#onOpenPopUp = onOpenPopUp;
    this.#onClosePopUp = onClosePopUp;
    this.#handleDataChange = handleViewAction;
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
    this.#handleDataChange(
      UserAction.UPDATE_FILM,
      UpdateType.MINOR,
      {
        ...this.#film,
        userDetails: {
          watchlist: !this.#film.userDetails.watchlist,
          alreadyWatched: this.#film.userDetails.alreadyWatched,
          favorite: this.#film.userDetails.favorite
        }
      },
    );
  };

  #processMarkAsWatchedClick = () => {
    this.#handleDataChange(
      UserAction.UPDATE_FILM,
      UpdateType.MINOR,
      {
        ...this.#film,
        userDetails: {
          watchlist: this.#film.userDetails.watchlist,
          alreadyWatched: !this.#film.userDetails.alreadyWatched,
          favorite: this.#film.userDetails.favorite
        }
      },
    );
  };

  #processMarkAsFavorite = () => {
    this.#handleDataChange(
      UserAction.UPDATE_FILM,
      UpdateType.MINOR,
      {
        ...this.#film,
        userDetails: {
          watchlist: this.#film.userDetails.watchlist,
          alreadyWatched: this.#film.userDetails.alreadyWatched,
          favorite: !this.#film.userDetails.favorite
        }
      },
    );
  };
}

