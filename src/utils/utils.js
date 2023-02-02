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
