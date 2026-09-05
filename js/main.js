// Existing Site Functionality
(function ($) {
    "use strict";
    
    // // Initialize WOW.js animations
    new WOW().init();


    $(window).scroll(function () {
        // Sticky Navbar
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').addClass('shadow-sm').css('top', '0px'); //sticky navbar
            $('.back-to-top').fadeIn('slow'); // back to top button
        } else {
            $('.sticky-top').removeClass('shadow-sm').css('top', '-100px'); // sticky navbar
            $('.back-to-top').fadeOut('slow'); // back to top button
        }
    });
    
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });
    
})(jQuery);

// Load a reusable HTML component into a placeholder
async function loadComponent(placeholderId, componentPath) {
    const placeholder = document.getElementById(placeholderId);

    if (!placeholder) return;

    try {
        const response = await fetch(componentPath);

        if (!response.ok) {
            throw new Error(`Failed to load ${componentPath}`);
        }

        placeholder.innerHTML = await response.text();
    } catch (error) {
        console.error(error);
    }
}

// Highlight the navigation link for the current page
function setActiveNavLink() {
    let currentPage = window.location.pathname.split("/").pop();

    if (!currentPage) {
        currentPage = "index.html";
    }

    const navLinks = document.querySelectorAll(".navbar .nav-link");

    navLinks.forEach(link => {
        const linkPage = link.getAttribute("href");

        if (linkPage === currentPage) {
            link.classList.add("active");
        }
    });
}

/*async function loadPageHeader() {
    const placeholder = document.getElementById("page-header-placeholder");

    if (!placeholder) return;

    const title = placeholder.dataset.title;
    const image = placeholder.dataset.image;
    const layout = placeholder.dataset.layout || "overlay";

    const response = await fetch("components/page-header.html");
    placeholder.innerHTML = await response.text();

    const header = placeholder.querySelector(".page-header");

    header.classList.add(`page-header--${layout}`);

    header.querySelector(".page-header-title").textContent = title;
    header.querySelector(".page-header-image").src = image;
}*/

// Initialization
document.addEventListener("DOMContentLoaded", async () => {
    await loadComponent("navbar-placeholder", "components/navbar.html");
    setActiveNavLink();
    
    await loadComponent("footer-placeholder", "components/footer.html");
    
    //await loadPageHeader();
});