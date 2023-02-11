import Observable from '../framework/observable.js';
import { filmCards } from '../mock/mock.js';
import { getMockFilms } from '../utils/utils.js';

const FILM_COUNT = 23;

export default class FilmModel extends Observable{
  #films = getMockFilms(FILM_COUNT, filmCards);

  get films() {
    return this.#films;
  }

  updateFilm(updateType, update) {
    const index = this.#films.findIndex((film) => film.id === update.id);
    if (index === -1) {
      throw new Error('Can\'t update unexisting film');
    }

    this.#films = [
      ...this.#films.slice(0, index),
      update,
      ...this.#films.slice(index + 1),
    ];

    this._notify(updateType, update);
  }
}
