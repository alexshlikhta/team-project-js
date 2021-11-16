import LazyLinePainter from 'lazy-line-painter';

(function () {
  document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
      const filmoptim = document.querySelector('#filmoptim');
      const animationFilmoptim = new LazyLinePainter(filmoptim, {
        ease: 'easeLinear',
        strokeWidth: 2,
        strokeOpacity: 1,
        strokeColor: '#FF6B08',
        delay: 200,
        repeat: 10000,
      });
      animationFilmoptim.paint();

      const switchTheme = document.querySelector('#switch');
      const animationSwitch = new LazyLinePainter(switchTheme, {
        ease: 'easeLinear',
        strokeWidth: 15,
        strokeOpacity: 1,
        strokeColor: '#FF6B08',
        delay: 200,
        repeat: 10000,
      });

      animationSwitch.paint();
      const heart = document.querySelector('#heart');
      const animationHaert = new LazyLinePainter(heart, {
        ease: 'easeLinear',
        strokeWidth: 1,
        strokeOpacity: 2,
        strokeColor: '#FF6B08',
        strokeCap: 'round',
        repeat: 10000,
      });

      animationHaert.paint();
    }
  };
})();
