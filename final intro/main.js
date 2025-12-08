/* ==============================================================
   1. Menu & Navbar Toggle
   ============================================================== */
let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

// Toggle menu on click
if (menu && navbar) {
    menu.onclick = () => {
        menu.classList.toggle('bx-x');
        navbar.classList.toggle('active');
    }
}

// Close menu on scroll
window.onscroll = () => {
    if (menu && navbar) {
        menu.classList.remove('bx-x');
        navbar.classList.remove('active');
    }
}

/* ==============================================================
   2. Scroll Reveal Animation
   ============================================================== */
// Ensure ScrollReveal is loaded before running
if (typeof ScrollReveal !== 'undefined') {
    const sr = ScrollReveal({
        distance: '60px',
        duration: 2500,
        delay: 400,
        reset: true
    });

    sr.reveal('.text', {delay: 200, origin: 'top'});
    sr.reveal('.form-container form', {delay: 800, origin: 'left'});
    sr.reveal('.heading', {delay: 800, origin: 'top'});
    sr.reveal('.ride-container .box', {delay: 600, origin: 'top'});
    sr.reveal('.services-container .box', {delay: 600, origin: 'top'});
    sr.reveal('.about-container .about-img', {delay: 600, origin: 'top'}); 
    sr.reveal('.about-container .about-text', {delay: 600, origin: 'top'});
    sr.reveal('.reviews-container', {delay: 600, origin: 'top'});
    sr.reveal('.newsletter .box', {delay: 400, origin: 'bottom'});
}

/* ==============================================================
   3. Booking Form Logic
   ============================================================== */
const form = document.getElementById("bookingForm");
const message = document.getElementById("message");

// Only run this code if the form exists (i.e., on the Book page)
if (form) {
    form.addEventListener("submit", function(e) {
        e.preventDefault();

        // Get values
        const name = document.getElementById("name").value.trim();
        const contact = document.getElementById("contact").value.trim();
        const email = document.getElementById("email").value.trim();
        const pickup = document.getElementById("pickup").value;
        const returnDate = document.getElementById("return").value;
        const car = document.getElementById("car").value;

        // Validation
        if (name === "" || contact === "" || email === "" || pickup === "" || returnDate === "" || car === "") {
            if (message) {
                message.style.display = "block";
                message.className = "message error";
                message.innerHTML = "Please fill in all required fields.";
            }
            return;
        }

        // Success Simulation
        if (message) {
            message.style.display = "block";
            message.className = "message success";
            message.innerHTML = "Booking Successful! (This is only a simulation.)";
        }

        form.reset();
    });
}

/* ==============================================================
   4. Founders Carousel Logic (Infinite Slide)
   ============================================================== */
const track = document.querySelector('.carousel-track');

// Only run this code if the carousel exists (i.e., on the About page)
if (track) {
    const slideOne = () => {
        // Check if there are items to slide
        if (track.children.length === 0) return;

        // Calculate width of one card + the gap
        const firstCard = track.firstElementChild;
        const itemWidth = firstCard.getBoundingClientRect().width;
        // The gap must match your CSS .carousel-track gap (20px)
        const gap = 20; 
        const moveAmount = itemWidth + gap;

        // Apply smooth transition to move left
        track.style.transition = 'transform 0.5s ease-in-out';
        track.style.transform = `translateX(-${moveAmount}px)`;

        // Listen for when the transition finishes
        track.addEventListener('transitionend', function() {
            // Move the first item to the very end of the list
            track.appendChild(firstCard);
            
            // Instantly remove the transition and reset position to 0
            // This creates the illusion of an infinite loop
            track.style.transition = 'none';
            track.style.transform = 'translateX(0)';
            
            // Clean up the event listener so it doesn't stack
        }, { once: true });
    };

    // Auto-slide every 2000ms (2 seconds)
    setInterval(slideOne, 2000);
}