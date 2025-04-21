document.addEventListener("DOMContentLoaded", function () {
  const mainCarousel = document.getElementById("mainCarousel");
  if (mainCarousel) {
    const carousel = new bootstrap.Carousel(mainCarousel, {
      interval: 3000,
      wrap: true,
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
            title: "Bahubali: The Beginning",
            trailerUrl:
              "https://www.youtube.com/embed/gon3cU1bdnk?si=u_YnpxWUM-d0hvy2",
          },
          {
            id: "movie2",
            title: "Ninnu Kori",
            trailerUrl:
              "https://www.youtube.com/embed/Ia6EXfqKiV4?si=bmqVHDsuIqQmapp0",
          },
          {
            id: "movie3",
            title: "The Lion King",
            trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          },
          {
            id: "movie4",
            title: "Salaar: Part 1 - Ceasefire",
            trailerUrl:
              "https://www.youtube.com/embed/4GPvYMKtrtI?si=pUSB1kUk-8THpl8H",
          },
          {
            id: "movie5",
            title: "M.S. Dhoni: The Untold Story",
            trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          },
        ],
      };
      setupTrailerButtons();
    });

  function setupTrailerButtons() {
    const trailerButtons = document.querySelectorAll(".carousel-caption .btn");

    if (!moviesData || !moviesData.featuredMovies) return;

    trailerButtons.forEach((button, index) => {
      if (moviesData.featuredMovies[index]) {
        button.setAttribute(
          "data-movie-id",
          moviesData.featuredMovies[index].id
        );

        button.addEventListener("click", function () {
          const movieId = this.getAttribute("data-movie-id");
          const movie = moviesData.featuredMovies.find((m) => m.id === movieId);

          if (movie) {
            openTrailerModal(movie);
          }
        });
      }
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
      document.body.appendChild(modalElement.firstElementChild);

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

  const firstNavLink = document.querySelector(".navbar-nav .nav-link");
  if (!document.querySelector(".navbar-nav .nav-link.active") && firstNavLink) {
    firstNavLink.classList.add("active");
  }
});

// /=========================================================================================

// Global variables
const JSON_FILE_PATH = "./card-data.json"; // Path to your local JSON file
let allMovies = [];

// DOM elements
const movieContainer = document.getElementById("movieContainer");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const loader = document.getElementById("loader");

// Fetch movies from local JSON file
async function fetchMovies() {
  try {
    const response = await fetch(JSON_FILE_PATH);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    loader.style.display = "none"; // Hide loader
    return data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    movieContainer.innerHTML = `
      <div class="col-12 text-center">
        <div class="alert alert-danger">
          Failed to load movies. Please try again later.
        </div>
      </div>
    `;
    loader.style.display = "none";
    return [];
  }
}

// Display movies in card format
function displayMovies(movies, searchTerm = "") {
  movieContainer.innerHTML = "";

  if (movies.length === 0) {
    movieContainer.innerHTML = `
      <div class="col-12 text-center">
        <div class="alert alert-info">
          No movies found.
        </div>
      </div>
    `;
    return;
  }

  movies.forEach((movie) => {
    const isHighlighted =
      searchTerm &&
      (movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.director.toLowerCase().includes(searchTerm.toLowerCase()));

    const movieCard = document.createElement("div");
    movieCard.className = `col-md-4 col-lg-3 mb-4 ${
      isHighlighted ? "highlighted" : ""
    }`;

    const posterUrl =
      movie.posterUrl ||
      "https://via.placeholder.com/300x450?text=No+Poster+Available";

    movieCard.innerHTML = `
      <div class="card movie-card h-100">
        <img src="${movie.Poster}" class="card-img-top" alt="${
      movie.Title
    } poster">
        <div class="card-body">
          <h5 class="card-title">${movie.Title}</h5>
          <p class="card-text">Director: ${movie.Director || "Unknown"}</p>
          <p class="card-text">
            ${
              movie.description
                ? movie.Description.substring(0, 100) + "..."
                : "No description available"
            }
          </p>
        </div>
        <div class="card-footer">
          <small class="text-muted">Year: ${
            movie.Released?.split("-")[0] || "N/A"
          }</small>
          <div class="mt-2">
            <span class="rating">★ ${movie.imdbRating || "N/A"}</span>
          </div>
        </div>
      </div>
    `;

    movieCard.addEventListener("click", () => {
      window.location.href = `movie-card.html?id=${movie.id}`;
    });

    movieContainer.appendChild(movieCard);
  });
}

// Search movies
function searchMovies() {
  const searchTerm = searchInput.value.trim();

  if (searchTerm === "") {
    displayMovies(allMovies);
    return;
  }

  const filteredMovies = allMovies.filter(
    (movie) =>
      movie.Title.includes(searchTerm) ||
      movie.Director.includes(searchTerm) ||
      (movie.Description &&
        movie.Description.includes(searchTerm))
  );

  filteredMovies.sort((a, b) => {
    const aTitle = a.Title.toLowerCase();
    const bTitle = b.Title.toLowerCase();

    const aContains = aTitle.includes(searchTerm);
    const bContains = bTitle.includes(searchTerm);

    if (aContains && !bContains) return -1;
    if (!aContains && bContains) return 1;
    return 0;
  });

  displayMovies(filteredMovies, searchTerm);
}

// Event listeners
searchBtn.addEventListener("click", searchMovies);
searchInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    searchMovies();
  }
});


// Initialize
async function init() {
  allMovies = await fetchMovies();
  displayMovies(allMovies);
}

document.addEventListener("DOMContentLoaded", init);
