// we make sure the JavaScript file loads after our HTML by using a function test if the HTML is loaded

function docReady(fn) {
  // see if DOM is already available
  if (
    document.readyState === "complete" ||
    document.readyState === "interactive"
  ) {
    // call on next available tick
    setTimeout(fn, 1);
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}

docReady(function () {
  // functions
  // go
  // here
});

function toggleSidenote(id) {
  var sidenote = document.getElementById(id);

  // Check if the sidenote is hidden (display: none) or not set
  if (sidenote.style.display === "none" || sidenote.style.display === "") {
    sidenote.style.display = "block"; // Show the sidenote
  } else {
    sidenote.style.display = "none"; // Hide the sidenote
  }
}

// SMOOTH SCROLL

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// ACTIVE MENU LINK

document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll(".navigation a"); // All links in the navigation
  const sections = document.querySelectorAll("section"); // All sections

  // Function to check which section is in the viewport and add 'active' class
  function setActiveLink() {
    let found = false; // Flag to stop after the first section is found

    links.forEach((link) => {
      const targetSection = document.querySelector(link.getAttribute("href")); // Get the section linked by the anchor
      const rect = targetSection.getBoundingClientRect(); // Get the position of the section

      // Check if the section is in the viewport
      if (rect.top <= window.innerHeight && rect.bottom >= 0 && !found) {
        // Add 'active' class to the link
        link.classList.add("active");
        found = true; // Stop once we find the first section in the viewport
      } else {
        link.classList.remove("active"); // Remove 'active' from other links
      }
    });
  }

  // Listen for scroll events to update the active class
  window.addEventListener("scroll", setActiveLink);

  // Set the active link on initial load
  setActiveLink();
});
