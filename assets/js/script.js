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

// mobilerat
const mobilerat = document.getElementById("mobilerat");

// Variables to store the initial position and flag for dragging
let isDragging = false;
let offsetX = 0;
let offsetY = 0;

// Handle the start of a touch or mouse event (when user clicks or touches the screen)
function startDrag(e) {
  e.preventDefault();

  // If it's a mouse event, we get the mouse position; if it's a touch event, we get the touch position
  const clientX = e.touches ? e.touches[0].clientX : e.clientX;
  const clientY = e.touches ? e.touches[0].clientY : e.clientY;

  // If it's the first click, place the image at the click position
  if (!isDragging) {
    mobilerat.style.left = `${
      clientX - mobilerat.width / 2 + window.pageXOffset
    }px`; // Adjust for image center and scroll
    mobilerat.style.top = `${
      clientY - mobilerat.height / 2 + window.pageYOffset
    }px`; // Adjust for image center and scroll
    isDragging = true; // Set dragging flag to true
  }

  // Set the offset from the image's current position
  offsetX = clientX - mobilerat.offsetLeft;
  offsetY = clientY - mobilerat.offsetTop;

  // Add the move event listener to follow the mouse/touch while dragging
  document.addEventListener("mousemove", moveDrag, false);
  document.addEventListener("touchmove", moveDrag, false);
}

// Handle the movement of the mouse or touch
function moveDrag(e) {
  e.preventDefault();

  // Get the current position of the mouse or touch
  const clientX = e.touches ? e.touches[0].clientX : e.clientX;
  const clientY = e.touches ? e.touches[0].clientY : e.clientY;

  // Update the image position based on the movement, accounting for scroll
  mobilerat.style.left = `${clientX - offsetX + window.pageXOffset}px`;
  mobilerat.style.top = `${clientY - offsetY + window.pageYOffset}px`;
}

// Handle the end of the touch or mouse event (when the user releases the mouse or finger)
function stopDrag() {
  // Remove the move event listeners to stop following the mouse/touch
  document.removeEventListener("mousemove", moveDrag);
  document.removeEventListener("touchmove", moveDrag);
  isDragging = false; // Reset dragging flag
}

// Add event listeners for touch or mouse events
document.addEventListener("mousedown", startDrag, false); // For mouse
document.addEventListener("touchstart", startDrag, false); // For touch
document.addEventListener("mouseup", stopDrag, false); // For mouse
document.addEventListener("touchend", stopDrag, false); // For touch
