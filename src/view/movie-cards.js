import AbstractView from '../framework/view/abstract-view.js';
import { formatFilmDuration, getYear } from '../utils/utils.js';


function getMovieCard ({comments, title, rating, year, duration, description, genre, poster, userDetails}) {
  const isAddedActive = userDetails.watchlist ? 'film-card__controls-item--active' : '';
  const isWatchedActive = userDetails.alreadyWatched ? 'film-card__controls-item--active' : '';
  const isFavoriteActive = userDetails.favorite ? 'film-card__controls-item--active' : '';
  return (`<article class="film-card">
  <a class="film-card__link">
    <h3 class="film-card__title">${title}</h3>
    <p class="film-card__rating">${rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${getYear(year)}</span>
      <span class="film-card__duration">${formatFilmDuration(duration)}</span>
      <span class="film-card__genre">${genre}</span>
    </p>
    <img src="${poster}" alt="" class="film-card__poster">
    <p class="film-card__description">${description}</p>
    <span class="film-card__comments">${comments}</span>
  </a>
  <div class="film-card__controls">
    <button class="film-card__controls-item ${isAddedActive} film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
    <button class="film-card__controls-item ${isWatchedActive} film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
    <button class="film-card__controls-item ${isFavoriteActive} film-card__controls-item--favorite" type="button">Mark as favorite</button>
  </div>
</article>`);
}


export default class MovieCard extends AbstractView{
  #film = null;
  #movieCardClickHandler = null;
  #filmCardControlsItemAddToWatchlistHandler = null;
  #filmCardControlsItemMarkAsWatchedHandler = null;
  #filmCardControlsItemFavoriteHandler = null;

  constructor(film, commentsCount, movieCardClickHandler, filmCardControlsItemAddToWatchlistHandler, filmCardControlsItemMarkAsWatchedHandler, filmCardControlsItemFavoriteHandler) {
    super();
    this.#film = film;
    this.#film.comments = commentsCount;
    this.#movieCardClickHandler = movieCardClickHandler;
    this.#filmCardControlsItemAddToWatchlistHandler = filmCardControlsItemAddToWatchlistHandler;
    this.#filmCardControlsItemMarkAsWatchedHandler = filmCardControlsItemMarkAsWatchedHandler;
    this.#filmCardControlsItemFavoriteHandler = filmCardControlsItemFavoriteHandler;

    this.element.querySelector('.film-card__link').addEventListener('click', this.#movieCardClickHandler);
    this.element.querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this.#filmCardControlsItemAddToWatchlistHandler);
    this.element.querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this.#filmCardControlsItemMarkAsWatchedHandler);
    this.element.querySelector('.film-card__controls-item--favorite').addEventListener('click', this.#filmCardControlsItemFavoriteHandler);
  }

  get template(){
    return(getMovieCard(this.#film));
  }

}
