import AbstractView from '../framework/view/abstract-view.js';
import { formatFilmDuration, getYear } from '../utils/utils.js';
import { FilterType } from '../utils/const.js';

const DESCRIPTION_TEXT_LIMIT = 140;

function getMovieCard (film) {
  const {comments} = film;
  const {title, totalRating, poster, duration, genre, description} = film.filmInfo;
  const userDetails = film.userDetails;
  const {date} = film.filmInfo.release;
  const isAddedActive = userDetails.watchlist ? 'film-card__controls-item--active' : '';
  const isWatchedActive = userDetails.alreadyWatched ? 'film-card__controls-item--active' : '';
  const isFavoriteActive = userDetails.favorite ? 'film-card__controls-item--active' : '';
  return (`<article class="film-card">
  <a class="film-card__link">
    <h3 class="film-card__title">${title}</h3>
    <p class="film-card__rating">${totalRating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${getYear(date)}</span>
      <span class="film-card__duration">${formatFilmDuration(duration)}</span>
      <span class="film-card__genre">${genre.join(', ')}</span>
    </p>
    <img src="${poster}" alt="" class="film-card__poster">
    <p class="film-card__description">${description.length < DESCRIPTION_TEXT_LIMIT ? description : `${description.slice(0, DESCRIPTION_TEXT_LIMIT)}...`}</p>
    <span class="film-card__comments">${comments.length}</span>
  </a>
  <div class="film-card__controls">
    <button class="film-card__controls-item ${isAddedActive} film-card__controls-item--add-to-watchlist"
      data-user-detail="watchlist" data-filter="${FilterType.WATCHLIST}" type="button">Add to watchlist</button>
    <button class="film-card__controls-item ${isWatchedActive} film-card__controls-item--mark-as-watched"
      data-user-detail="alreadyWatched" data-filter="${FilterType.HISTORY}" type="button">Mark as watched</button>
    <button class="film-card__controls-item ${isFavoriteActive} film-card__controls-item--favorite"
    data-user-detail="favorite" data-filter="${FilterType.FAVORITE}" type="button">Mark as favorite</button>
  </div>
</article>`);
}


export default class MovieCard extends AbstractView{
  #film = null;
  #movieCardClickHandler = null;
  #handleControlButtonClick = null;

  constructor({film, onClick, onControlButtonClick}) {
    super();
    this.#film = film;

    this.#movieCardClickHandler = onClick;
    this.#handleControlButtonClick = onControlButtonClick;

    this.element.querySelector('.film-card__link').addEventListener('click', this.#clickHandler);
    this.element.querySelector('.film-card__controls').addEventListener('click', this.#controlButtonsClickHandler);
  }

  #clickHandler = () => {
    this.#movieCardClickHandler();
  };

  get template(){
    return(getMovieCard(this.#film));
  }

  #controlButtonsClickHandler = (evt) => {
    if (evt.target.classList.contains('film-card__controls-item')) {
      const updatedUserDetails = {
        ...this.#film.userDetails,
        [evt.target.dataset.userDetail]: !this.#film.userDetails[evt.target.dataset.userDetail],
      };
      this.#handleControlButtonClick(updatedUserDetails, evt.target.dataset.filter);
    }
  };

}
