import Presenter from './presenter.js';
const mainContainer = document.querySelector('.main');
const presenter = new Presenter(mainContainer);

presenter.init();
