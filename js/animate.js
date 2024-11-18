const sections = document.querySelectorAll('.H, .O, .L, .A, .top, #what-i-do, #certificates .flexbox, #projects figure, #footer');
const screenImg = document.getElementById('screen'); 
const navbar = document.querySelector('nav');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav_links');
const toTop = document.querySelector('#to-top');
let lastScrollY = window.scrollY;   

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.classList.add('show')
        }
    });
});

sections.forEach(section => {
    observer.observe(section);
});

if(screenImg) {
    setInterval(() => {
    screenImg.classList.add('show');
    }, 100)
} 

// navbar animation
window.addEventListener("scroll", () => {
    if(lastScrollY < window.scrollY) {
        navbar.classList.remove('show')
        hamburger.classList.remove('open')
        navLinks.classList.remove('open')
        toTop.classList.add('show')
    } else {
        navbar.classList.add('show')
        toTop.classList.remove('show')
    }

    lastScrollY = window.scrollY
})
