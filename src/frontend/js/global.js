window.sr = ScrollReveal({
    duration: 250,
    delay: 2
});
    sr.reveal('*');
    sr.reveal('.container', {duration: 0});

// On click add class active to language

const lang =  document.getElementsByClassName('header__lang');

lang[1].addEventListener('click', function() {

    if (lang[1].classList.contains('active')) {
    } else {
        lang[1].classList.add('active');
        lang[0].classList.remove('active');
    }
});

lang[0].addEventListener('click', function() {

  if (lang[0].classList.contains('active')) {
  } else {
      lang[0].classList.add('active');
      lang[1].classList.remove('active');
  }
});