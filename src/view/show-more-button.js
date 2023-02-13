import AbstractView from '../framework/view/abstract-view.js';


function getShowMoreButton () {
  return '<button class="films-list__show-more">Show more</button>';
}
export default class ShowMoreButton extends AbstractView{
  #showMoreButtonOnClickHandler = null;

  constructor({onClick}) {
    super();
    this.#showMoreButtonOnClickHandler = onClick;
    this.element.addEventListener('click', this.#clickHandler);
  }

  get template(){
    return(getShowMoreButton());
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    this.#showMoreButtonOnClickHandler();
  };

}

