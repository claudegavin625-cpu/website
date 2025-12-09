/* ==============================================================
   1. GLOBAL SETTINGS
   ============================================================== */
// Set Date for Admin Dashboard
if (document.getElementById("adminDate")) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById("adminDate").innerText = new Date().toLocaleDateString("en-US", options);
}

/* ==============================================================
   2.    NAVBAR & MENU
   ============================================================== */
let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

if (menu && navbar) {
    menu.onclick = () => {
        menu.classList.toggle('bx-x');
        navbar.classList.toggle('active');
    }
}
window.onscroll = () => {
    if (menu && navbar) {
        menu.classList.remove('bx-x');
        navbar.classList.remove('active');
    }
}

/* ==============================================================
   3. BOOKING LOGIC (USER SIDE)
   ============================================================== */
const bookingForm = document.getElementById("bookingForm");
const message = document.getElementById("message");

if (bookingForm) {
    bookingForm.addEventListener("submit", function(e) {
        e.preventDefault();

        // 1. Check if user is logged in (Optional: remove if you want guests to book)
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if (!currentUser) {
            alert("Please Login to book a car.");
            window.location.href = "login.html";
            return;
        }

        // 2. Get Values from HTML Inputs
        const name = document.getElementById("name").value.trim();
        const contact = document.getElementById("contact").value.trim();
        const email = document.getElementById("email").value.trim();
        const pickup = document.getElementById("pickup").value;
        const returnDate = document.getElementById("return").value;
        const car = document.getElementById("car").value;

        // 3. Create Booking Object
        const newBooking = {
            id: Date.now(), // Unique ID
            name: name,
            contact: contact,
            email: email,
            pickup: pickup,
            returnDate: returnDate,
            car: car,
            status: "Pending",
            price: 2000 // Placeholder price
        };

        // 4. Save to Local Storage ("Database")
        let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
        bookings.push(newBooking);
        localStorage.setItem("bookings", JSON.stringify(bookings));

        // 5. Show Success Message
        if (message) {
            message.style.display = "block";
            message.className = "message success";
            message.innerHTML = "Booking sent to Admin! Check dashboard.";
        }
        
        bookingForm.reset();
    });
}

/* ==============================================================
   4. ADMIN DASHBOARD LOGIC (ADMIN SIDE)
   ============================================================== */
// Only run if we are on the Admin Page
if (window.location.pathname.includes("admin.html")) {
    
    // Check if Admin is logged in
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser || currentUser.role !== "admin") {
        alert("Access Denied. Admins only.");
        window.location.href = "login.html";
    }

    // Load Data
    renderAdminDashboard();

    // Logout Button
    document.getElementById("adminLogout").addEventListener("click", () => {
        localStorage.removeItem("currentUser");
        window.location.href = "login.html";
    });
}

function renderAdminDashboard() {
    // 1. Get Data from Local Storage
    const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // 2. Update Stats Boxes
    document.getElementById("totalBookings").innerText = bookings.length;
    document.getElementById("totalUsers").innerText = users.length;
    document.getElementById("pendingBookings").innerText = bookings.filter(b => b.status === "Pending").length;
    
    // Revenue Calculation (Confirmed * 2000)
    const confirmedCount = bookings.filter(b => b.status === "Confirmed").length;
    document.getElementById("totalRevenue").innerText = (confirmedCount * 2000).toLocaleString();

    // 3. Populate Booking Table
    const tableBody = document.getElementById("bookingTableBody");
    tableBody.innerHTML = ""; // Clear current table

    // Loop through bookings (Newest first)
    bookings.slice().reverse().forEach(booking => {
        const row = document.createElement("tr");

        // Set status color
        let statusClass = "status-pending";
        if (booking.status === "Confirmed") statusClass = "status-confirmed";
        if (booking.status === "Cancelled") statusClass = "status-cancelled";

        row.innerHTML = `
            <td>
                <strong>${booking.name}</strong><br>
                <small>${booking.contact}</small>
            </td>
            <td>${booking.car}</td>
            <td>${booking.pickup} to ${booking.returnDate}</td>
            <td><span class="${statusClass}">${booking.status}</span></td>
            <td>
                ${booking.status === 'Pending' ? `
                <button class="action-btn btn-confirm" onclick="updateStatus(${booking.id}, 'Confirmed')">Confirm</button>
                <button class="action-btn btn-cancel" onclick="updateStatus(${booking.id}, 'Cancelled')">Cancel</button>
                ` : ''}
                <button class="action-btn btn-cancel" onclick="deleteBooking(${booking.id})">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Global Functions for Admin Buttons
window.updateStatus = function(id, newStatus) {
    let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    const index = bookings.findIndex(b => b.id === id);
    if (index !== -1) {
        bookings[index].status = newStatus;
        localStorage.setItem("bookings", JSON.stringify(bookings));
        renderAdminDashboard(); // Refresh UI
    }
};

window.deleteBooking = function(id) {
    if (confirm("Are you sure?")) {
        let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
        bookings = bookings.filter(b => b.id !== id);
        localStorage.setItem("bookings", JSON.stringify(bookings));
        renderAdminDashboard(); // Refresh UI
    }
};

/* ==============================================================
   5. LOGIN LOGIC (HARDCODED CREDENTIALS)
   ============================================================== */
const loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", function(e) {
        e.preventDefault();
        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value;

        // ADMIN HARDCODED LOGIN
        if (email === "admin@gmail.com" && password === "admin123") {
            const adminUser = { name: "Owner", email: "admin@gmail.com", role: "admin" };
            localStorage.setItem("currentUser", JSON.stringify(adminUser));
            window.location.href = "admin.html";
            return;
        }

        // USER HARDCODED LOGIN
        if (email === "user@gmail.com" && password === "user123") {
            const user = { name: "User", email: "user@gmail.com", role: "user" };
            localStorage.setItem("currentUser", JSON.stringify(user));
            window.location.href = "home.html";
            return;
        }

        // Check Registered Users
        let users = JSON.parse(localStorage.getItem("users")) || [];
        const validUser = users.find(u => u.email === email && u.password === password);

        if (validUser) {
            localStorage.setItem("currentUser", JSON.stringify(validUser));
            window.location.href = "home.html";
        } else {
            alert("Invalid Login");
        }
    });
}

/* ==============================================================
   6. HEADER USER CHECK (Displays "Hi, User" or "Logout")
   ============================================================== */
const headerBtnDiv = document.querySelector('.header-btn');
const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (headerBtnDiv && !window.location.pathname.includes("admin.html")) {
    if (currentUser) {
        headerBtnDiv.innerHTML = `
            <span style="font-weight:500; margin-right:15px; color:#333;">Hi, ${currentUser.name}</span>
            <a href="#" id="logoutBtn" class="sign-in" style="background:#333;">Logout</a>
        `;
        document.getElementById("logoutBtn").addEventListener("click", () => {
            localStorage.removeItem("currentUser");
            window.location.href = "login.html";
        });
    }
}