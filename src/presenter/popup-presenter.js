import MovieDetailsPopUp from '../view/movie-details-pop-up.js';

let openedPopup null;

export default class PopupPresenter {
  #film = null;
  #commentsModel = null;
  #controlButtonHandler = null;
  #addCommentHandler = null;
  #deleteCommentHandler = null;
  filmPopupComponent = null;

  constructor({film, commentsModel, controlButtonHandler, addCommentHandler, deleteCommentHandler}) {
    this.#film = film;
    this.#commentsModel = commentsModel;
    this.#controlButtonHandler = controlButtonHandler;
    this.#addCommentHandler = addCommentHandler;
    this.deleteCommentHandler = deleteCommentHandler;
  }

  showPopup() {
    this.#commentsModel.getCommentsToFilm(this.#film.id).then((comments) => {
      if (openedPopup) {
        openedPopup.closePopup();
      }
      this.filmPopupComponent = new MovieDetailsPopUp(
        film: {...this.#film, comments},
        onClose: this.#handleCloseClick,
        onControlButtonClick: this.#controlButtonHandler,
        onAddComment: this.#handleAddComment,
        onDeleteComment: this.#handleDeleteComment
      );
      document.body.classList.add('hide-overflow');
      document.body.appendChild(this.filmPopupComponent.element);
      document.addEventListener('keydown', this.#closePopupKeydownHandler);
      openedPopup = this;
    });
  }

  closePopup() {
    document.body.classList.remove('hide-overflow');
    document.body.removeChild(this.filmPopupComponent.element);
    document.removeEventListener('keydown', this.#closePopupKeydownHandler);
    openedPopup = null;
  }

  getOpenedPopup() {
    return openedPopup;
  }

  resetPopupComponent(popupComponent, film) {
    this.#commentsModel.getCommentsToFilm(this.#film.id).then((comments) => {
      popupComponent.reset({...film, comments});
    });
  }

  #handleCloseClick = () => {
    this.closePopup();
  };

  #closePopupKeydownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.closePopup();
    }
  };

}
