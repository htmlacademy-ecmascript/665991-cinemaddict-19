import {createElement} from '../render.js';

function getShowMoreButton () {
  return '<button class="films-list__show-more">Show more</button>';
}
export default class ShowMoreButton {
  getElement() {
    return createElement (getShowMoreButton());
  }
}
