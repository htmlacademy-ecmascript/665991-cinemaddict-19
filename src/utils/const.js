const SortType = {
  DEFAULT: 'default',
  DATE: 'date',
  RATING: 'rating',
};

const UserAction = {
  UPDATE_FILM: 'UPDATE_FILM',
  ADD_COMMENT: 'ADD_COMMENT',
  DELETE_COMMENT: 'DELETE_COMMENT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT'
};

const FilterType = {
  ALL: 'all',
  WATCHLIST: 'watchlist',
  HISTORY: 'history',
  FAVORITE: 'favorites'
};

const COMMENTS_EMOTIONS = [
  'smile',
  'sleeping',
  'puke',
  'angry'
];

const DateFormat = {
  FILM_CARD: 'YYYY',
  FILM_POPUP: 'D MMM YYYY'
};

const SHAKE_CLASS_NAME = 'shake';
const SHAKE_ANIMATION_TIMEOUT = 600;

export {SortType, UserAction, UpdateType, FilterType, COMMENTS_EMOTIONS, DateFormat, SHAKE_CLASS_NAME, SHAKE_ANIMATION_TIMEOUT};
