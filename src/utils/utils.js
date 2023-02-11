import duration from 'dayjs/plugin/duration';
import dayjs from 'dayjs';
dayjs.extend(duration);

export const formatFilmDuration = (filmDuration) => dayjs.duration(filmDuration, 'minutes').format('H[h] mm[m]');

export const getYear = (date) => dayjs(date).format('YYYY');

export const formatCommentDate = (commentDate) => dayjs(commentDate).format('YYYY/MM/DD HH:mm');

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

export const getMockFilms = (filmCount, filmCards)=> {
  const getRandomFilm = () => getRandomArrayElement(filmCards);
  const randomList = Array.from({length: filmCount}, getRandomFilm);
  return randomList;
};

export const getMockComments = (CommentCount, comments)=> {
  const getRandomComment = () => getRandomArrayElement(comments);
  const randomList = Array.from({length: CommentCount}, getRandomComment);
  comments.forEach((comment)=>{
    comment.id = Math.floor(Math.random() * 5);
  });
  return randomList;
};

export const sortByDate = (a,b) => dayjs(b.year).diff(dayjs(a.year));
export const sortByRating = (a,b) => b.rating - a.rating;
