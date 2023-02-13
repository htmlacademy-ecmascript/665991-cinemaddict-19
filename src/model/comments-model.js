import Observable from '../framework/observable.js';
import { adaptToClient } from '../service/adapter.js';

export default class CommentModel extends Observable {
  #commentsApiService = null;
  #filmModel = null;

  constructor({filmModel, commentsApiService}) {
    super();
    this.#filmModel = filmModel;
    this.#commentsApiService = commentsApiService;
  }

  async getCommentsToFilm(filmId) {
    return await this.#commentsApiService.getFilmComments(filmId);
  }

  async addComment(updateType, update) {
    try {
      const response = await this.#commentsApiService.addComment(update.filmId, update.commentToAdd);
      const updatedFilm = adaptToClient(response.movie);
      this.#filmModel.updateFilmOnClient(updateType, updatedFilm);
    } catch (err) {
      throw new Error('Can\'t add comment');
    }
  }

  async deleteComment(updateType, update) {
    try {
      await this.#commentsApiService.deleteComment(update.commentToDelete.id);
      delete update.commentToDelete;
      this.#filmModel.updateFilmOnClient(updateType, update);
    } catch (err) {
      throw new Error('Can\'t delete comment');
    }
  }

}
