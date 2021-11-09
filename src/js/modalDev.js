(() => {
  const refs = {
    openModalBtn: document.querySelector('[data-modal-open]'),
    closeModalBtn: document.querySelector('[data-modal-close]'),
    modal: document.querySelector('[data-modal]'),
  };

  window.addEventListener('keydown', onEscKeyPress);
  refs.modal.addEventListener('click', onCloseModalOverlayClick);
  refs.openModalBtn.addEventListener('click', toggleModal);
  refs.closeModalBtn.addEventListener('click', toggleModal);

  function toggleModal() {
    document.body.classList.toggle('modal-open');
    refs.modal.classList.toggle('is-hidden');
    window.addEventListener('keydown', onEscKeyPress);
    document.body.classList.add('stop-scrolling');
  }

  function onCloseModalOverlayClick(e) {
    if (e.currentTarget === e.target) {
      onCloseModal();
    }
  }

  function onEscKeyPress(e) {
    if (e.code === 'Escape') {
      onCloseModal();
    }
  }

  function onCloseModal() {
    window.removeEventListener('keydown', onEscKeyPress);
    document.body.classList.toggle('modal-close');
    refs.modal.classList.toggle('is-hidden');
    document.body.classList.remove('stop-scrolling');
  }
})();
