// Functions are declared at the bottom
const btnHamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav_links');
const ctfSection = document.getElementById('certificates');
const closeButton = document.querySelector('.close');
const carouselOverlay = document.querySelector('.overlay');
const nextButton = document.querySelector('.carousel__button--next');
const prevButton = document.querySelector('.carousel__button--prev');
const track = document.querySelector('.carousel__track');
const slides = Array.from(track.children);
const carouselNav = document.querySelector('.carousel__nav');
let slideWidth = slides[0].getBoundingClientRect().width;
const certificates = [
  {
    title: 'frontend',
    description: 'nanodegree program: Front-End Web Development',
    provider: 'udacity',
    url: 'Assets/31788c93-cc52-4b6d-b9c2-bbd0aab17b88.svg'
  },
  {
    title: 'fullstack',
    description: 'Nanodegree Program: Advanced Full-Stack Developement',
    provider: 'udacity',
    url: 'Assets/Angular Certificate'
  },
  {
    title: 'user-interface',
    description: 'Web Design: Figma & Webflow Development',
    provider: 'udemy',
    url: 'Assets/UC-90e83a62-c7b1-4cb4-aeb0-c6fdd27969ec.jpg'
  },
];

// Listen to click on navbar burger menue
btnHamburger.addEventListener('click', () => {
  if (!btnHamburger.classList.contains('open')) {
    addOpen();
    return;
  }
  removeOpen();
});

// Add indicator for each iamge
let fragement = new DocumentFragment();

certificates.forEach(button => {
  const span = document.createElement('span');
  span.innerHTML = '<span></span>';
  span.classList.add('carousel__indicator');
  fragement.appendChild(span);
});

carouselNav.appendChild(fragement);
carouselNav.firstElementChild.classList.add('current-slide');
slides.forEach(setSlidePosition);
const indicaotrs = Array.from(carouselNav.children);

// Adjust carousel Width on screen resize
window.addEventListener('resize', () => {
  slideWidth = slides[0].getBoundingClientRect().width;
  slides.forEach(setSlidePosition);
  const currentSlide = track.querySelector('.current-slide');

  moveToSlide(track, currentSlide, currentSlide);
});

// If click happened out side of navbar or escape button; navbar closes. Overlay effect
document.addEventListener('click', e => {
  // if the target is the menue, break
  if (
    e.target.classList.contains('hamburger') ||
    e.target.classList.contains('hamburger_line')
  )
    return;

  // if the target outside of menue, remove open class
  removeOpen();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    carouselOverlay.classList.add('is-hidden');
    removeOpen();
  } else if (e.key === 'ArrowRight') {
    if (!nextButton.classList.contains("is-hidden")) {
      handleNextButtonClick();
    }
  } else if (e.key === 'ArrowLeft') {
    if (!prevButton.classList.contains("is-hidden")) {
      handlePrevButtonClick();
    }
  }
});

// When clicked on carousel-overlay, this saves huge amount of event listeners
ctfSection.addEventListener('click', e => {
  if (e.target.closest('.button-secondary')) {
    // When clicked on project's button
    handleCtfSectionClick(e);
  } else if (
    e.target.classList.contains('overlay') ||
    e.target.closest('.close')
  ) {
    carouselOverlay.classList.add('is-hidden');
  } else if (e.target.closest('.carousel__button--next')) {
    // When nextButton is clicked
    handleNextButtonClick();
  } else if (e.target.closest('.carousel__button--prev')) {
    // When click prev button, slides go left
    handlePrevButtonClick();
  } else if (e.target.closest('.carousel__nav')) {
    // When an indicator is clicked
    handleIndicatorClick(e);
  }
});

/******************** Functions ********************/

// Add open class to navbar elements
function addOpen() {
  btnHamburger.classList.add('open');
  navMenu.classList.add('open');
}

// Remove open class from navbar elements
function removeOpen() {
  btnHamburger.classList.remove('open');
  navMenu.classList.remove('open');
}

// Aragne slides next to each other
function setSlidePosition(slide, index) {
  slide.style.left = slideWidth * index + 'px';
}

// Move to target slide
function moveToSlide(track, currentSlide, targetSlide) {
  track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
  currentSlide.classList.remove('current-slide');
  targetSlide.classList.add('current-slide');
}

function updateIndicators(currentIndicator, targetIndicator) {
  currentIndicator.classList.remove('current-slide');
  targetIndicator.classList.add('current-slide');
}

// Toggle carousel buttons on and of
function toggleCarouselButton(targetIndex) {
  if (targetIndex === 0) {
    prevButton.classList.add('is-hidden');
    nextButton.classList.remove('is-hidden');
  } else if (targetIndex === slides.length - 1) {
    nextButton.classList.add('is-hidden');
    prevButton.classList.remove('is-hidden');
  } else {
    prevButton.classList.remove('is-hidden');
    nextButton.classList.remove('is-hidden');
  }
}

// When nextButton is clicked
function handleNextButtonClick() {
  slideWidth = slides[0].getBoundingClientRect().width;
  const currentSlide = document.querySelector('.current-slide');
  const currentIndicator = carouselNav.querySelector('.current-slide');
  const nextSlide = currentSlide.nextElementSibling;
  const nextIndicator = currentIndicator.nextElementSibling;
  const nextIndex = slides.findIndex(slide => slide === nextSlide);

  moveToSlide(track, currentSlide, nextSlide);
  updateIndicators(currentIndicator, nextIndicator);
  toggleCarouselButton(nextIndex);
}

// When prevButton is clicked
function handlePrevButtonClick() {
  slideWidth = slides[0].getBoundingClientRect().width;
  const currentSlide = document.querySelector('.current-slide');
  const currentIndicator = carouselNav.querySelector('.current-slide');
  const prevSlide = currentSlide.previousElementSibling;
  const prevIndicator = currentIndicator.previousElementSibling;
  const prevIndex = slides.findIndex(slide => slide === prevSlide);

  moveToSlide(track, currentSlide, prevSlide);
  updateIndicators(currentIndicator, prevIndicator);
  toggleCarouselButton(prevIndex);
}

// When indicators are clicked, move to target slide
function handleIndicatorClick(e) {
  slideWidth = slides[0].getBoundingClientRect().width;
  const targetIndicator = e.target.closest('.carousel__indicator');

  if (!targetIndicator) return;

  const currentSlide = track.querySelector('.current-slide');
  const currentIndicator = carouselNav.querySelector('.current-slide');
  const targetIndex = indicaotrs.findIndex(
    indicaotr => indicaotr === targetIndicator
  );
  const targetSlide = slides[targetIndex];

  moveToSlide(track, currentSlide, targetSlide);
  updateIndicators(currentIndicator, targetIndicator);
  toggleCarouselButton(targetIndex);
}

// When ctf section clicked
function handleCtfSectionClick(e) {
  const target = e.target.closest('.button-secondary');

  if (!target) return;

  carouselOverlay.classList.remove('is-hidden');
  slideWidth = slides[0].getBoundingClientRect().width;

  slides.forEach(setSlidePosition);

  const currentSlide = track.querySelector('.current-slide');
  const currentIndicator = carouselNav.querySelector('.current-slide');
  const targetIndex = certificates.findIndex(
    ctf => ctf['title'] === target.classList[1]
  );
  const targetSlide = slides[targetIndex];
  const targetIndicator = indicaotrs[targetIndex];

  moveToSlide(track, currentSlide, targetSlide);
  updateIndicators(currentIndicator, targetIndicator);
  toggleCarouselButton(targetIndex);
}
