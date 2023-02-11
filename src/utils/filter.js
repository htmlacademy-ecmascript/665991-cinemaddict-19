import { FilterType } from './const.js';

const filter = {
  [FilterType.ALL]: (films) => films,
  [FilterType.WATCHLIST]: (films) => films.filter((film) => film.userDetails.watchList),
  [FilterType.HISTORY]: (films) => films.filter((film) => film.userDetails.alreadyWatched),
  [FilterType.FAVORITE]: (films) => films.filter((film) => film.userDetails.favorite),
};

export {filter};
