import { render, remove, replace } from '../framework/render.js';
import MovieCard from '../view/movie-cards.js';
import PopupPresenter from './popup-presenter.js';
import { UserAction, UpdateType } from '../utils/const.js';

export default class MoviePresenter {
  #filmListContainer = null;
  #commentsModel = null;
  #currentFilterType = null;
  #handleDataChange = null;
  #film = null;
  #movieCard = null;
  #popupPresenter = null;

  constructor({filmListContainer, commentsModel, currentFilterType, onDataChange}) {
    this.#filmListContainer = filmListContainer;
    this.#commentsModel = commentsModel;
    this.#currentFilterType = currentFilterType;
    this.#handleDataChange = onDataChange;
  }

  init(film) {
    this.#film = film;
    this.#popupPresenter = new PopupPresenter({
      film,
      commentsModel: this.#commentsModel,
      controlButtonHandler: this.#handleControlButton,
      addCommentHandler: this.#handleAddComment,
      deleteCommentHandler: this.#handleDeleteComment
    });

    const openedPopup = this.#popupPresenter.getOpenedPopup();

    if (openedPopup) {
      this.#popupPresenter.resetPopupComponent(openedPopup.filmPopupComponent, film);
    }

    const previousMovieCard = this.#movieCard;

    this.#movieCard = new MovieCard({
      film,
      onClick: this.#handleClick,
      onControlButtonClick: this.#handleControlButton
    });

    if (previousMovieCard === null) {
      render(this.#movieCard, this.#filmListContainer);
      return;
    }

    if (this.#filmListContainer.contains(previousMovieCard.element)) {
      replace(this.#movieCard, previousMovieCard);
    }

    remove(previousMovieCard);
  }

  #handleClick = () => {
    this.#popupPresenter.showPopup();
  };

  destroy() {
    remove(this.#movieCard);
  }

  #handleControlButton = (updatedUserDetails, controlFilter) => {
    if (controlFilter === this.#currentFilterType) {
      this.destroy();
    }
    this.#handleDataChange(
      UserAction.UPDATE_FILM,
      UpdateType.PATCH,
      {...this.#film, userDetails: updatedUserDetails}
    );
  };

  #handleAddComment = (filmId, commentToAdd) => {
    this.#handleDataChange(
      UserAction.ADD_COMMENT,
      UpdateType.PATCH,
      { filmId, commentToAdd }
    );
  };

  #handleDeleteComment = (updatedFilm) => {
    this.#handleDataChange(
      UserAction.DELETE_COMMENT,
      UpdateType.PATCH,
      updatedFilm
    );
  };

  setAborting(actionType) {
    const openedPopup = this.#popupPresenter.getOpenedPopup();
    if (openedPopup) {
      openedPopup.filmPopupComponent.errShake(actionType);
      return;
    }
    this.#movieCard.shake();
  }

}
