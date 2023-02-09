import { movieDetailsPopUp } from '../mock/mock.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';


const {
  poster,
  age,
  title,
  rating,
  originalTitle,
  directorNames,
  writersNames,
  acttorsNames,
  releaseDate,
  duration,
  country,
  genre,
  description
} = movieDetailsPopUp;

const addEmojiLabel = (emoji) => {
  if (emoji !== '') {
    return `<img src="./images/emoji/${emoji}.png" width="55" height="55" alt="emoji-${emoji}">`;
  } else {
    return '';
  }
};

const createComments = (comments) => comments.map((comment)=>
  `<li class="film-details__comment">
  <span class="film-details__comment-emoji">
    <img src="${comment.emoji}" width="55" height="55" alt="emoji-smile">
  </span>
  <div>
    <p class="film-details__comment-text">${comment.text}</p>
    <p class="film-details__comment-info">
      <span class="film-details__comment-author">${comment.author}</span>
      <span class="film-details__comment-day">${comment.day}</span>
      <button class="film-details__comment-delete">Delete</button>
    </p>
  </div>
  </li>`).join('');

function getMovieDetailsPopUp (comments, state) {
  return `<section class="film-details">
  <div class="film-details__inner">
    <div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="${poster}" alt="">

          <p class="film-details__age">${age}</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${title}</h3>
              <p class="film-details__title-original">${originalTitle}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${rating}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${directorNames}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${writersNames}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${acttorsNames}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${releaseDate}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Duration</td>
              <td class="film-details__cell">${duration}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${country}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Genres</td>
              <td class="film-details__cell">
                <span class="film-details__genre">${genre}</span>
              </td>
            </tr>
          </table>

          <p class="film-details__film-description">
            ${description}
          </p>
        </div>
      </div>

      <section class="film-details__controls">
        <button type="button" class="film-details__control-button film-details__control-button--watchlist" id="watchlist" name="watchlist">Add to watchlist</button>
        <button type="button" class="film-details__control-button  film-details__control-button--watched" id="watched" name="watched">Already watched</button>
        <button type="button" class="film-details__control-button film-details__control-button--favorite" id="favorite" name="favorite">Add to favorites</button>
      </section>
    </div>

    <div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

        <ul class="film-details__comments-list">
          ${createComments(comments)}
        </ul>

        <form class="film-details__new-comment" action="" method="get">
          <div class="film-details__add-emoji-label">
          ${addEmojiLabel(state.emoji)}
          </div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
          </label>

          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile"
            ${state.emoji === 'smile' ? 'checked' : ''}>
            <label class="film-details__emoji-label" for="emoji-smile">
              <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping"
            ${state.emoji === 'sleeping' ? 'checked' : ''}>
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke"
            ${state.emoji === 'puke' ? 'checked' : ''}>
            <label class="film-details__emoji-label" for="emoji-puke">
              <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry"
            ${state.emoji === 'angry' ? 'checked' : ''}>
            <label class="film-details__emoji-label" for="emoji-angry">
              <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
            </label>
          </div>
        </form>
      </section>
    </div>
  </div>
</section>`;
}

export default class MovieDetailsPopUp extends AbstractStatefulView{
  #comments = null;
  #movieDetailsPopUpCloseButtonClickHandler = null;
  #filmDetailsControlsWatchlistHandler = null;
  #filmDetailsControlsWatchedHandler = null;
  #filmDetailsControlsFavoriteHandler = null;

  constructor(comments, movie, movieDetailsPopUpCloseButtonClickHandler, filmDetailsControlsWatchlistHandler, filmDetailsControlsWatchedHandler, filmDetailsControlsFavoriteHandler) {
    super();

    this._setState(MovieDetailsPopUp.parseMovieToState(movie));

    this.#comments = comments;
    this.#movieDetailsPopUpCloseButtonClickHandler = movieDetailsPopUpCloseButtonClickHandler;
    this.#filmDetailsControlsWatchlistHandler = filmDetailsControlsWatchlistHandler;
    this.#filmDetailsControlsWatchedHandler = filmDetailsControlsWatchedHandler;
    this.#filmDetailsControlsFavoriteHandler = filmDetailsControlsFavoriteHandler;

    this._restoreHandlers();
  }

  static parseMovieToState(movie) {
    return {
      ...movie,
      emoji: ''
    };
  }

  _restoreHandlers() {
    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#movieDetailsPopUpCloseButtonClickHandler);
    this.element.querySelector('.film-details__control-button--watchlist').addEventListener('click', this.#filmDetailsControlsWatchlistHandler);
    this.element.querySelector('.film-details__control-button--watched').addEventListener('click', this.#filmDetailsControlsWatchedHandler);
    this.element.querySelector('.film-details__control-button--favorite').addEventListener('click', this.#filmDetailsControlsFavoriteHandler);
    this.element.querySelector('.film-details__emoji-list').addEventListener('change', this.#emojiChangeHandler);
  }

  #emojiChangeHandler = (evt) => {
    this.updateElement({
      ...this._state,
      emoji: evt.target.value,
      scrollPosition: this.element.scrollTop
    });
    this.element.scrollTo(0, this._state.scrollPosition);
  };

  get template(){
    return(getMovieDetailsPopUp(this.#comments, this._state));
  }

}
