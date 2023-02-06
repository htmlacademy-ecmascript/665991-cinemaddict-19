import AbstractView from '../framework/view/abstract-view.js';


function getFilmsContainer () {
  return '<section class="films"><section class="films-list"><h2 class="films-list__title visually-hidden">All movies. Upcoming</h2><div class="films-list__container"></div></section></section>';
}
export default class FilmsContainer extends AbstractView{

  get template(){
    return(getFilmsContainer());
  }
}
