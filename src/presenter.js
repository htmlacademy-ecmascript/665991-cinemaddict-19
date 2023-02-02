import { render } from './render.js';
import FilmModel from './model/film-model.js';
import UserRank from './view/user-rank.js';
import ShowMoreButton from './view/show-more-button.js';
import Navigation from './view/navigation.js';
import Filters from './view/filters.js';
import FilmsContainer from './view/films-container.js';
import MovieCard from './view/movie-cards.js';
import CommentModel from './model/comments-model.js';
import MovieDetailsPopUp from './view/movie-details-pop-up.js';

const headerContainer = document.querySelector('.header');

export default class Presenter {
  constructor(container) {
    this.container = container;
  }

  init() {
    render(new UserRank(), headerContainer);
    render(new Navigation(), this.container);
    render(new Filters(), this.container);
    render(new FilmsContainer(), this.container);
    const filmsListContainer = document.querySelector('.films-list__container');
    const filmsList = document.querySelector('.films-list');
    render(new ShowMoreButton(), filmsList);
    const body = document.querySelector('body');
    const tits = new CommentModel();
    const comments = tits.getComments();
    render(new MovieDetailsPopUp(comments), body);
    const jopa = new FilmModel();
    const films = jopa.getFilms();
    films.forEach((film)=>{
      const commentsCount = comments.filter((comment) => (comment.id === film.id)).length;
      render(new MovieCard(film, commentsCount), filmsListContainer);
    });
  }
}
