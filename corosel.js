document.addEventListener("DOMContentLoaded", function () {
  const mainCarousel = document.getElementById("mainCarousel");
  if (mainCarousel) {
    const carousel = new bootstrap.Carousel(mainCarousel, {
      interval: 3000,
      wrap: true,
      keyboard: true,
      pause: "hover",
    });
  }

  let moviesData;

  fetch("./Movies-data.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      moviesData = data;
      setupTrailerButtons();
    })
    .catch((error) => {
      console.error("Error loading movie data:", error);
      moviesData = {
        featuredMovies: [
          {
            id: "movie1",
            title: "The Last Horizon",
            trailerUrl: "https://www.youtube.com/watch?v=ipiF7b0Rg2o",
          },
          {
            id: "movie2",
            title: "Silent Whispers",
            trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          },
          {
            id: "movie3",
            title: "Eternal Legacy",
            trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          },
          {
            id: "movie4",
            title: "Dreamweavers",
            trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          },
          {
            id: "movie5",
            title: "Quantum Paradox",
            trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          },
        ],
      };
      setupTrailerButtons();
    });

  function setupTrailerButtons() {
    const trailerButtons = document.querySelectorAll(".carousel-caption .btn");

    trailerButtons.forEach((button, index) => {
      button.setAttribute("data-movie-id", moviesData.featuredMovies[index].id);

      button.addEventListener("click", function () {
        const movieId = this.getAttribute("data-movie-id");
        const movie = moviesData.featuredMovies.find((m) => m.id === movieId);

        if (movie) {
          openTrailerModal(movie);
        }
      });
    });
  }

  function openTrailerModal(movie) {
    let trailerModal = document.getElementById("trailerModal");

    if (!trailerModal) {
      const modalHTML = `
                <div class="modal fade" id="trailerModal" tabindex="-1" aria-labelledby="trailerModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered modal-lg">
                        <div class="modal-content bg-dark text-white">
                            <div class="modal-header border-secondary">
                                <h5 class="modal-title" id="trailerModalLabel"></h5>
                                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body p-0">
                                <div class="ratio ratio-16x9">
                                    <iframe id="trailerFrame" src="" title="Movie Trailer" allowfullscreen></iframe>
                                </div>
                            </div>
                            <div class="modal-footer border-secondary">
                                <div class="movie-info d-flex flex-column align-items-start me-auto">
                                    <div class="d-flex mb-1">
                                        <span id="movieRating" class="badge bg-primary me-2"></span>
                                        <span id="movieDuration" class="me-2"><i class="fas fa-clock me-1"></i></span>
                                        <span id="movieRelease"><i class="fas fa-calendar-alt me-1"></i></span>
                                    </div>
                                    <div id="movieDirector" class="small"></div>
                                    <div id="movieCast" class="small text-muted"></div>
                                </div>
                                <button type="button" class="btn btn-outline-light" data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;

      const modalElement = document.createElement("div");
      modalElement.innerHTML = modalHTML;
      document.body.appendChild(modalElement.firstChild);

      trailerModal = document.getElementById("trailerModal");

      trailerModal.addEventListener("hidden.bs.modal", function () {
        document.getElementById("trailerFrame").src = "";
      });
    }

    document.getElementById("trailerModalLabel").textContent = movie.title;
    document.getElementById("trailerFrame").src = movie.trailerUrl;

    if (movie.rating) {
      document.getElementById("movieRating").textContent = movie.rating;
    }
    if (movie.duration) {
      document.getElementById("movieDuration").textContent = movie.duration;
    }
    if (movie.releaseDate) {
      const releaseDate = new Date(movie.releaseDate);
      document.getElementById("movieRelease").textContent =
        releaseDate.toLocaleDateString();
    }
    if (movie.director) {
      document.getElementById(
        "movieDirector"
      ).textContent = `Director: ${movie.director}`;
    }
    if (movie.cast && movie.cast.length > 0) {
      document.getElementById(
        "movieCast"
      ).textContent = `Cast: ${movie.cast.join(", ")}`;
    }

    const modal = new bootstrap.Modal(trailerModal);
    modal.show();
  }

  window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    if (navbar) {
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    }
  });

  const searchForm = document.querySelector("nav form");
  if (searchForm) {
    searchForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const searchInput = this.querySelector('input[type="search"]');
      const searchTerm = searchInput.value.trim();

      if (searchTerm !== "") {
        console.log("Searching for:", searchTerm);
        alert(`Searching for: ${searchTerm}`);
        searchInput.value = "";
      }
    });
  }

  const loginBtn = document.querySelector(".login-btn");
  if (loginBtn) {
    loginBtn.addEventListener("click", function () {
      alert("Login functionality will be implemented here");
    });
  }

  const currentLocation = window.location.pathname;
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

  navLinks.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === currentLocation) {
      link.classList.add("active");
    }
  });

  if (!document.querySelector(".navbar-nav .nav-link.active")) {
    document.querySelector(".navbar-nav .nav-link").classList.add("active");
  }
});
