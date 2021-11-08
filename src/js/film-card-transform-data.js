import { genresObj } from '../app.js';

export function filmCardTransformData(data) {
  // console.log(genresObj);
  return data.map(film => {
    film.year = film.release_date ? film.release_date.split('-')[0] : 'No information';

    const genresNamesArr = film.genre_ids.map(
      id => genresObj.genres.find(item => item.id === id).name,
    );

    if (genresNamesArr.length === 0) {
      film.genres = 'No information';
    } else if (genresNamesArr.length <= 3) {
      film.genres = genresNamesArr.join(', ');
    } else {
      film.genres = `${genresNamesArr[0]}, ${genresNamesArr[1]}, Other`;
    }
    return film;
  });
}
