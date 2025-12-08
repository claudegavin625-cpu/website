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

const sr = ScrollReveal({
    distance: '60px',
    duration: 2500,
    delay: 400,
    reset: true
})

sr.reveal('.text', {delay: 200, origin: 'top'})

sr.reveal('.form-container form', {delay: 800, origin: 'left'})
sr.reveal('.heading', {delay: 800, origin: 'top'})
sr.reveal('.ride-container .box', {delay: 600, origin: 'top'})
sr.reveal('.services-container .box', {delay: 600, origin: 'top'})

sr.reveal('.about-container .about-img', {delay: 600, origin: 'top'}) 
sr.reveal('.about-container .about-text', {delay: 600, origin: 'top'})
sr.reveal('.reviews-container', {delay: 600, origin: 'top'})
sr.reveal('.newsletter .box', {delay: 400, origin: 'bottom'})

    const form = document.getElementById("bookingForm");
    const message = document.getElementById("message");

    form.addEventListener("submit", function(e) {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const contact = document.getElementById("contact").value.trim();
        const email = document.getElementById("email").value.trim();
        const pickup = document.getElementById("pickup").value;
        const returnDate = document.getElementById("return").value;
        const car = document.getElementById("car").value;

        if (name === "" || contact === "" || email === "" || pickup === "" || returnDate === "" || car === "") {
            message.style.display = "block";
            message.className = "message error";
            message.innerHTML = "Please fill in all required fields.";
            return;
        }

        message.style.display = "block";
        message.className = "message success";
        message.innerHTML = "Booking Successful! (This is only a simulation.)";

        form.reset();
    });
