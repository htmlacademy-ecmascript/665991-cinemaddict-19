import { render } from './render.js';
import UserRank from './view/user-rank.js';
import ShowMoreButton from './view/show-more-button.js';
import Navigation from './view/navigation.js';
import Filters from './view/filters.js';
import FilmsContainer from './view/films-container.js';
import MovieCard from './view/movie-cards.js';
import MovieDetailsPopUp from './view/movie-details-pop-up.js';
import EmptyListMessage from './view/empty-list-message.js';

const headerContainer = document.querySelector('.header');

export default class Presenter {
  #commentModel = null;
  #filmModel = null;
  #comments = null;
  #films = null;
  #mainContainer = null;
  #renderedFilmCount = 0;

  constructor(mainContainer, commentModel, filmModel) {
    this.#mainContainer = mainContainer;
    this.#commentModel = commentModel;
    this.#filmModel = filmModel;
  }

  #filmInformationRender = (film) => {
    const commentsCount = this.#comments.filter((comment) => (comment.id === film.id)).length;
    const movieCard = new MovieCard(film, commentsCount);
    const popup = new MovieDetailsPopUp(this.#comments);

    const movieCardLink = movieCard.element.querySelector('.film-card__link');
    const closePopupButton = popup.element.querySelector('.film-details__close-btn');
    const filmsListContainer = document.querySelector('.films-list__container');
    const body = document.querySelector('body');

    movieCardLink.addEventListener('click', () => {
      render(popup, body);
      body.classList.add('hide-overflow');
      document.addEventListener('keydown', (evt) => {
        if (evt.key === 'Escape' || evt.key === 'Esc') {
          evt.preventDefault();
          popup.element.remove();
          body.classList.remove('hide-overflow');
        }
      });
    });
    closePopupButton.addEventListener('click', () => {
      popup.element.remove();
      body.classList.remove('hide-overflow');
    });
    render(movieCard, filmsListContainer);
  };

  #sliceAndIterate = () => {
    this.#films.slice(this.#renderedFilmCount,this.#renderedFilmCount + 5).forEach((film)=>{
      this.#filmInformationRender(film);
      this.#renderedFilmCount++;
    });
  };

  init() {
    this.#comments = this.#commentModel.comments;
    this.#films = this.#filmModel.films;

    render(new UserRank(), headerContainer);
    render(new Navigation(), this.#mainContainer);
    render(new Filters(), this.#mainContainer);
    render(new FilmsContainer(), this.#mainContainer);
    const filmsList = document.querySelector('.films-list');
    const showMoreButton = new ShowMoreButton();

    if(this.#films.length === 0) {
      render(new EmptyListMessage(), filmsList);
    } else {
      this.#sliceAndIterate();
      if (this.#films.length > this.#renderedFilmCount) {
        render(showMoreButton, filmsList);
      }
      showMoreButton.element.addEventListener('click', () => {
        this.#sliceAndIterate();
        if (this.#films.length === this.#renderedFilmCount) {
          showMoreButton.element.remove();
        }
      });
    }
  }
}
