/* */
let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

window.onscroll = () => {
    menu.classList.remove('bx-x');
    navbar.classList.remove('active');
}

// FIX: Changed variable 'er' to 'sr' and capitalized ScrollReveal constructor
const sr = ScrollReveal({
    distance: '60px',
    duration: 2500,
    delay: 400,
    reset: true
})

// FIX: Fixed typo 'scrollrevealreveal' to 'reveal'
sr.reveal('.text', {delay: 200, origin: 'top'})

sr.reveal('.form-container form', {delay: 800, origin: 'left'})
sr.reveal('.heading', {delay: 800, origin: 'top'})
sr.reveal('.ride-container .box', {delay: 600, origin: 'top'})
sr.reveal('.services-container .box', {delay: 600, origin: 'top'})

// FIX: Added missing '.' to class selectors below
sr.reveal('.about-container .about-img', {delay: 600, origin: 'top'}) // Note: I adjusted this selector to match your HTML structure better
sr.reveal('.about-container .about-text', {delay: 600, origin: 'top'})
sr.reveal('.reviews-container', {delay: 600, origin: 'top'})
sr.reveal('.newsletter .box', {delay: 400, origin: 'bottom'})

