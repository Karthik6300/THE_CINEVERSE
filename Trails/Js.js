// Wait for DOM content to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Add hover effects to feature boxes
  const featureBoxes = document.querySelectorAll(".feature-box");

  featureBoxes.forEach((box) => {
    box.addEventListener("mouseenter", function () {
      this.style.backgroundColor = "rgba(30, 30, 50, 0.7)";
      const icon = this.querySelector(".feature-icon i");
      if (icon) {
        icon.style.transform = "scale(1.2)";
        icon.style.transition = "transform 0.3s ease";
      }
    });

    box.addEventListener("mouseleave", function () {
      this.style.backgroundColor = "rgba(20, 20, 35, 0.5)";
      const icon = this.querySelector(".feature-icon i");
      if (icon) {
        icon.style.transform = "scale(1)";
      }
    });
  });

  // Add entrance animations
  function addEntranceAnimations() {
    // Animate left side elements
    const leftSideElements = document.querySelectorAll(
      ".about-image, .section-title, .tagline, .about-description"
    );
    leftSideElements.forEach((el, index) => {
      el.style.opacity = "0";
      el.style.transform = "translateX(-20px)";
      el.style.transition = `opacity 0.5s ease ${
        index * 0.1
      }s, transform 0.5s ease ${index * 0.1}s`;

      setTimeout(() => {
        el.style.opacity = "1";
        el.style.transform = "translateX(0)";
      }, 100);
    });

    // Animate feature boxes
    featureBoxes.forEach((box, index) => {
      box.style.opacity = "0";
      box.style.transform = "translateY(20px)";
      box.style.transition = `opacity 0.5s ease ${
        0.3 + index * 0.1
      }s, transform 0.5s ease ${0.3 + index * 0.1}s`;

      setTimeout(() => {
        box.style.opacity = "1";
        box.style.transform = "translateY(0)";
      }, 100);
    });

    // Animate stats and CTA
    const statsAndCTA = document.querySelectorAll(
      ".stats-container, .cta-container"
    );
    statsAndCTA.forEach((el, index) => {
      el.style.opacity = "0";
      el.style.transition = `opacity 0.5s ease ${0.7 + index * 0.1}s`;

      setTimeout(() => {
        el.style.opacity = "1";
      }, 100);
    });
  }

  // Run entrance animations
  addEntranceAnimations();

  // Set height based on viewport if needed
  function adjustHeight() {
    const aboutSection = document.querySelector(".about-us-section");
    const viewportHeight = window.innerHeight;

    // For smaller screens, we might need to add padding
    if (window.innerWidth <= 767) {
      aboutSection.style.height = "auto";
      aboutSection.style.minHeight = "100vh";
      aboutSection.style.padding = "40px 0";
    } else {
      aboutSection.style.height = "100vh";
      aboutSection.style.padding = "0";
    }
  }

  // Run on load and resize
  adjustHeight();
  window.addEventListener("resize", adjustHeight);

  // Check for dependencies
  if (typeof bootstrap === "undefined") {
    console.warn("Bootstrap is recommended for better responsiveness.");
  }

  if (
    !document.querySelector('link[href*="font-awesome"]') &&
    !document.querySelector('link[href*="fontawesome"]')
  ) {
    console.warn("Font Awesome is needed for icons.");
  }
});
