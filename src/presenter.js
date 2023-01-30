import { render } from './render.js';
import UserRank from './view/user-rank.js';
import ShowMoreButton from './view/show-more-button.js';
import Navigation from './view/navigation.js';
import Filters from './view/filters.js';
import FilmsList from './view/films-container.js';
import MovieCard from './view/movie-cards.js';
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
    render(new FilmsList(), this.container);
    const filmsListContainer = document.querySelector('.films-list__container');
    for (let i = 0; i < 5; i++) {
      render(new MovieCard(), filmsListContainer);
    }
    const filmsList = document.querySelector('.films-list');
    render(new ShowMoreButton(), filmsList);
    const body = document.querySelector('body');
    // render(new MovieDetailsPopUp(), body);
  }
}
