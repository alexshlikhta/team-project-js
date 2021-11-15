import devListMarkup from '../templates/modalDevMarkup.hbs';

import * as basicLightbox from 'basiclightbox';

const devModalBtn = document.getElementById('open-dev-modal');
// const devListMarkup = document.getElementById('modal-devs')


devModalBtn.addEventListener('click', openDevModal);

function openDevModal(event) {
    event.preventDefault();

    const devMarkup = devListMarkup();
    const modalDevMarkup = basicLightbox.create(devMarkup);

    modalDevMarkup.show();
    window.addEventListener('keydown', closeModalHandler);

    function closeModalHandler(event) {
        if (event.code === 'Escape') {
            modalDevMarkup.close();
            window.removeEventListener('keydown', closeModalHandler);
        }
    }

    const closeDevModalBtn = document.getElementById('modal-devs__close-btn');
        closeDevModalBtn.addEventListener('click', onCloseModal);
        function onCloseModal() {
        return modalDevMarkup.close();
    }
    
}

