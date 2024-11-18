const btnHamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav_links');

btnHamburger.addEventListener('click', () => {
  if (!btnHamburger.classList.contains('open')) {
    addOpen();
    return;
  }
  removeOpen();
});

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