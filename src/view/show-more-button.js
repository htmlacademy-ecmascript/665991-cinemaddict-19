import AbstractView from '../framework/view/abstract-view.js';


function getShowMoreButton () {
  return '<button class="films-list__show-more">Show more</button>';
}
export default class ShowMoreButton extends AbstractView{
  #showMoreButtonOnClickHandler = null;

  constructor(showMoreButtonOnClickHandler) {
    super();
    this.#showMoreButtonOnClickHandler = showMoreButtonOnClickHandler;
    this.element.addEventListener('click', this.#showMoreButtonOnClickHandler);
  }

  get template(){
    return(getShowMoreButton());
  }

}

