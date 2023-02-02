import { comments } from '../mock/mock.js';
import { getMockComments } from '../utils/utils.js';

const COMMENT_COUNT = 30;

export default class CommentModel {
  comments = getMockComments(COMMENT_COUNT, comments);
  getComments () {
    return this.comments;
  }
}
