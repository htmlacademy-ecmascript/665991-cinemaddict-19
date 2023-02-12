import Observable from '../framework/observable.js';
import { adaptToClient } from '../service/adapter.js';
import { UpdateType } from '../utils/const.js';

export default class FilmModel extends Observable{
  #films = [];
  #filmApiService = null;

  constructor({filmApiService}) {
    super();
    this.#filmApiService = filmApiService;
  }

  get films() {
    return this.#films;
  }

  async init() {
    try {
      const films = await this.#filmApiService.films;
      this.#films = films.map(adaptToClient);
    } catch (err) {
      this.#films = [];
    }

    this._notify(UpdateType.INIT);
  }

  async updateFilm(updateType, update) {
    try {
      const response = await this.#filmApiService.updateFilm(update);
      const updatedFilm = adaptToClient(response);
      this.updateFilmOnClient(updateType, updatedFilm);
    } catch (err) {
      throw new Error('Can\'t update film');
    }
  }

  updateFilmOnClient(updateType, updatedFilm) {
    const index = this.#films.findIndex((film) => film.id === updatedFilm.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting film');
    }

    this.#films = [
      ...this.#films.slice(0, index),
      updatedFilm,
      ...this.#films.slice(index + 1),
    ];

    this._notify(updateType, updatedFilm);
  }

}
