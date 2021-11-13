const upButton = document.querySelector('#upbutton');

upButton.addEventListener('click', smoothJumpUp);

function smoothJumpUp() {
  if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
    window.scrollBy(0, -50);
    setTimeout(smoothJumpUp, 5);
  }
}

window.onscroll = function () {
  let scrolled = window.pageYOffset || document.documentElement.scrollTop;
  if (scrolled > 100) {
    document.getElementById('upbutton').style.display = 'block'; //показуєм кнопку
  } else {
    document.getElementById('upbutton').style.display = 'none'; //приховуєм кнопку
  }
};
