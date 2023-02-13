import CommentModel from './model/comments-model.js';
import FilmModel from './model/film-model.js';
import FilterModel from './model/filter-model.js';
import MovieListPresenter from './presenter/movie-list-presenter.js';
import FilmApiService from './service/films-api-service.js';
import CommentsApiService from './service/comments-api-service.js';

const AUTHORIZATION = 'Basic nm3K04lSVy7';
const ENDPOINT = 'https://19.ecmascript.pages.academy/cinemaddict';

const mainContainerElement = document.querySelector('.main');
const headerContainerElement = document.querySelector('.header');
const footerContainerElement = document.querySelector('.footer__statistics');

const filmModel = new FilmModel({
  filmApiService: new FilmApiService(ENDPOINT, AUTHORIZATION)
});
const commentModel = new CommentModel({
  filmModel,
  commentsApiService: new CommentsApiService(ENDPOINT, AUTHORIZATION)
});
const filterModel = new FilterModel();
const presenter = new MovieListPresenter({
  footer: footerContainerElement,
  commentModel,
  filmModel,
  filterModel,
  mainContainer: mainContainerElement,
  header: headerContainerElement
});

presenter.init();
filmModel.init();
