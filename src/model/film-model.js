import { filmCards } from '../mock/mock.js';
import { getMockFilms } from '../utils/utils.js';

const FILM_COUNT = 5;

export default class FilmModel {
  #films = getMockFilms(FILM_COUNT, filmCards);

  get films() {
    return this.#films;
  }
}
