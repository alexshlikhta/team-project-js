export default function storeIdFunction(nameOfList, filmId) {
  const queryListData = localStorage.getItem(nameOfList);
  if (queryListData !== null) {
    let queryList = queryListData.split(',');
    if (queryList.includes(filmId)) {
      queryList.splice(queryList.indexOf(filmId), 1);
      localStorage.setItem(nameOfList, queryList);
    } else {
      queryList.push(filmId);
      localStorage.setItem(nameOfList, queryList);
    }
    if (queryList[0] === '') {
      queryList.splice(0, 1);
      localStorage.setItem(nameOfList, queryList);
    }
  } else {
    localStorage.setItem(nameOfList, filmId);
  }

  const nameOfListMirror = nameOfList === 'watched' ? 'queue' : 'watched';
  const queryMirrorListData = localStorage.getItem(nameOfListMirror);
  if (queryMirrorListData !== null) {
    let queryMirrorList = queryMirrorListData.split(',');
    if (queryMirrorList.includes(filmId)) {
      queryMirrorList.splice(queryMirrorList.indexOf(filmId), 1);
      localStorage.setItem(nameOfListMirror, queryMirrorList);
    }
  }
}
