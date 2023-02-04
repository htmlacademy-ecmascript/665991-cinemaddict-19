import CommentModel from './model/comments-model.js';
import FilmModel from './model/film-model.js';
import Presenter from './presenter.js';

const mainContainer = document.querySelector('.main');
const commentModel = new CommentModel();
const filmModel = new FilmModel();
const presenter = new Presenter(mainContainer, commentModel, filmModel);

presenter.init();
