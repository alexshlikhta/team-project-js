
import LocalService from './localStorage.js'
import ApiServices from './ApiServices.js'

const refs = {
    watchedBtn: document.querySelector('#js-watched'),
    queueBtn: document.querySelector('#js-queue'),
    filmsList: document.querySelector('.js-films'),
}


const LocalService = new LocalService();
const api = new ApiServices();





// function onWatched() {
//     refs.filmsList.innerHTML = '';

//     const localData = LocalService.onGet('watched')
//     console.log(localData);

//     if(!localData || localData.length === 0) {
//         console.log('no fils added yet');
//     }
//     else {
//         for (let id of localData) {
//             api.fetchFilmById(id).then(data => {
//                 cardTemplate(filmCardTransformData(results))
//             })
//         }
//     }
// }



function onQueue() {

}

//=====далі буду писати з іншого місця тому сейвлю все через коміт...