import AbstractView from '../framework/view/abstract-view.js';

const getUserRank = (watchedFilmsQuantity) => {
  if (watchedFilmsQuantity > 0 && watchedFilmsQuantity <= 10) {
    return 'novice';
  }
  if (watchedFilmsQuantity > 10 && watchedFilmsQuantity <= 20) {
    return 'fan';
  }
  if (watchedFilmsQuantity > 20) {
    return 'movie buff';
  }
};

const createUserRankTemplate = (watchedFilmsQuantity) => (
  `<section class="header__profile profile">
      <p class="profile__rating">${getUserRank(watchedFilmsQuantity)}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
);

export default class UserRankView extends AbstractView{
  #watchedFilmsQuantity = null;

  constructor({watchedFilmsQuantity}) {
    super();
    this.#watchedFilmsQuantity = watchedFilmsQuantity;
  }

  get template() {
    return createUserRankTemplate(this.#watchedFilmsQuantity);
  }

}
