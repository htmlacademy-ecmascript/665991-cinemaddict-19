import CommentModel from './model/comments-model.js';
import FilmModel from './model/film-model.js';
import FilterModel from './model/filter-model.js';
import Presenter from './presenter/main-presenter.js';

const mainContainer = document.querySelector('.main');
const commentModel = new CommentModel();
const filmModel = new FilmModel();
const filterModel = new FilterModel();
const presenter = new Presenter(mainContainer, commentModel, filmModel, filterModel);

presenter.init();
