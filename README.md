# THE_CINEVERSE


// Global variables
const API_URL = "https://earthy-rattle-cushion.glitch.me/movies";
let allMovies = [];

// DOM elements
const movieContainer = document.getElementById("movieContainer");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const loader = document.getElementById("loader");

// Fetch movies from API
async function fetchMovies() {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    // Hide loader after data is fetched
    loader.style.display = "none";

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
    // Check if the movie matches search term to highlight it
    const isHighlighted =
      searchTerm &&
      (movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.director.toLowerCase().includes(searchTerm.toLowerCase()));

    const movieCard = document.createElement("div");
    movieCard.className = `col-md-4 col-lg-3 mb-4 ${
      isHighlighted ? "highlighted" : ""
    }`;

    // Default image if poster is not available
    const posterUrl =
      movie.poster ||
      "https://via.placeholder.com/300x450?text=No+Poster+Available";

    movieCard.innerHTML = `
            <div class="card movie-card h-100">
                <img src="${posterUrl}" class="card-img-top" alt="${
      movie.title
    } poster">
                <div class="card-body">
                    <h5 class="card-title">${movie.title}</h5>
                    <p class="card-text">Director: ${movie.director}</p>
                    <p class="card-text">${
                      movie.plot
                        ? movie.plot.substring(0, 100) + "..."
                        : "No description available"
                    }</p>
                </div>
                <div class="card-footer">
                    <small class="text-muted">Year: ${movie.year}</small>
                    <div class="mt-2">
                        <span class="rating">★ ${
                          movie.rating ? movie.rating : "N/A"
                        }</span>
                    </div>
                </div>
            </div>
        `;

    // Add click event to navigate to movie details page
    movieCard.addEventListener("click", () => {
      window.location.href = `movie-detail.html?id=${movie.id}`;
    });

    movieContainer.appendChild(movieCard);
  });
}

// Search movies function
function searchMovies() {
  const searchTerm = searchInput.value.trim().toLowerCase();

  if (searchTerm === "") {
    displayMovies(allMovies);
    return;
  }

  // Filter movies based on search term
  const filteredMovies = allMovies.filter(
    (movie) =>
      movie.title.toLowerCase().includes(searchTerm) ||
      movie.director.toLowerCase().includes(searchTerm) ||
      (movie.plot && movie.plot.toLowerCase().includes(searchTerm))
  );

  // Sort matches by relevance (title matches first)
  filteredMovies.sort((a, b) => {
    const aTitle = a.title.toLowerCase();
    const bTitle = b.title.toLowerCase();

    const aContainsSearch = aTitle.includes(searchTerm);
    const bContainsSearch = bTitle.includes(searchTerm);

    if (aContainsSearch && !bContainsSearch) return -1;
    if (!aContainsSearch && bContainsSearch) return 1;
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

// Initialize the page
async function init() {
  allMovies = await fetchMovies();
  displayMovies(allMovies);
}

// Start app
document.addEventListener("DOMContentLoaded", init);



// document.addEventListener("DOMContentLoaded", function () {
//     const mainCarousel = document.getElementById("mainCarousel");
//     if (mainCarousel) {
//       const carousel = new bootstrap.Carousel(mainCarousel, {
//         interval: 3000,
//         wrap: true,
//         // keyboard: true,
//         pause: "hover",
//       });
//     }

//     let moviesData;

//     fetch("./Movies-data.json")
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         return response.json();
//       })
//       .then((data) => {
//         moviesData = data;
//         setupTrailerButtons();
//       })
//       .catch((error) => {
//         console.error("Error loading movie data:", error);
//         moviesData = {
//           featuredMovies: [
//             {
//               id: "movie1",
//               title: "The Last Horizon",
//               trailerUrl: "https://www.youtube.com/watch?v=ipiF7b0Rg2o",
//             },
//             {
//               id: "movie2",
//               title: "Silent Whispers",
//               trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
//             },
//             {
//               id: "movie3",
//               title: "Eternal Legacy",
//               trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
//             },
//             {
//               id: "movie4",
//               title: "Dreamweavers",
//               trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
//             },
//             {
//               id: "movie5",
//               title: "Quantum Paradox",
//               trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
//             },
//           ],
//         };
//         setupTrailerButtons();
//       });

//     function setupTrailerButtons() {
//       const trailerButtons = document.querySelectorAll(".carousel-caption .btn");

//       trailerButtons.forEach((button, index) => {
//         button.setAttribute("data-movie-id", moviesData.featuredMovies[index].id);

//         button.addEventListener("click", function () {
//           const movieId = this.getAttribute("data-movie-id");
//           const movie = moviesData.featuredMovies.find((m) => m.id === movieId);

//           if (movie) {
//             openTrailerModal(movie);
//           }
//         });
//       });
//     }

//     function openTrailerModal(movie) {
//       let trailerModal = document.getElementById("trailerModal");

//       if (!trailerModal) {
//         const modalHTML = `
//                   <div class="modal fade" id="trailerModal" tabindex="-1" aria-labelledby="trailerModalLabel" aria-hidden="true">
//                       <div class="modal-dialog modal-dialog-centered modal-lg">
//                           <div class="modal-content bg-dark text-white">
//                               <div class="modal-header border-secondary">
//                                   <h5 class="modal-title" id="trailerModalLabel"></h5>
//                                   <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
//                               </div>
//                               <div class="modal-body p-0">
//                                   <div class="ratio ratio-16x9">
//                                       <iframe id="trailerFrame" src="" title="Movie Trailer" allowfullscreen></iframe>
//                                   </div>
//                               </div>
//                               <div class="modal-footer border-secondary">
//                                   <div class="movie-info d-flex flex-column align-items-start me-auto">
//                                       <div class="d-flex mb-1">
//                                           <span id="movieRating" class="badge bg-primary me-2"></span>
//                                           <span id="movieDuration" class="me-2"><i class="fas fa-clock me-1"></i></span>
//                                           <span id="movieRelease"><i class="fas fa-calendar-alt me-1"></i></span>
//                                       </div>
//                                       <div id="movieDirector" class="small"></div>
//                                       <div id="movieCast" class="small text-muted"></div>
//                                   </div>
//                                   <button type="button" class="btn btn-outline-light" data-bs-dismiss="modal">Close</button>
//                               </div>
//                           </div>
//                       </div>
//                   </div>
//               `;

//         const modalElement = document.createElement("div");
//         modalElement.innerHTML = modalHTML;
//         document.body.appendChild(modalElement.firstChild);

//         trailerModal = document.getElementById("trailerModal");

//         trailerModal.addEventListener("hidden.bs.modal", function () {
//           document.getElementById("trailerFrame").src = "";
//         });
//       }

//       document.getElementById("trailerModalLabel").textContent = movie.title;
//       document.getElementById("trailerFrame").src = movie.trailerUrl;

//       if (movie.rating) {
//         document.getElementById("movieRating").textContent = movie.rating;
//       }
//       if (movie.duration) {
//         document.getElementById("movieDuration").textContent = movie.duration;
//       }
//       if (movie.releaseDate) {
//         const releaseDate = new Date(movie.releaseDate);
//         document.getElementById("movieRelease").textContent =
//           releaseDate.toLocaleDateString();
//       }
//       if (movie.director) {
//         document.getElementById(
//           "movieDirector"
//         ).textContent = `Director: ${movie.director}`;
//       }
//       if (movie.cast && movie.cast.length > 0) {
//         document.getElementById(
//           "movieCast"
//         ).textContent = `Cast: ${movie.cast.join(", ")}`;
//       }

//       const modal = new bootstrap.Modal(trailerModal);
//       modal.show();
//     }

//     window.addEventListener("scroll", function () {
//       const navbar = document.querySelector(".navbar");
//       if (navbar) {
//         if (window.scrollY > 50) {
//           navbar.classList.add("scrolled");
//         } else {
//           navbar.classList.remove("scrolled");
//         }
//       }
//     });

//     const searchForm = document.querySelector("nav form");
//     if (searchForm) {
//       searchForm.addEventListener("submit", function (e) {
//         e.preventDefault();
//         const searchInput = this.querySelector('input[type="search"]');
//         const searchTerm = searchInput.value.trim();

//         if (searchTerm !== "") {
//           console.log("Searching for:", searchTerm);
//           alert(`Searching for: ${searchTerm}`);
//           searchInput.value = "";
//         }
//       });
//     }

//     const loginBtn = document.querySelector(".login-btn");
//     if (loginBtn) {
//       loginBtn.addEventListener("click", function () {
//         alert("Login functionality will be implemented here");
//       });
//     }

//     const currentLocation = window.location.pathname;
//     const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

//     navLinks.forEach((link) => {
//       link.classList.remove("active");

//       if (link.getAttribute("href") === currentLocation) {
//         link.classList.add("active");
//       }
//     });

//     if (!document.querySelector(".navbar-nav .nav-link.active")) {
//       document.querySelector(".navbar-nav .nav-link").classList.add("active");
//     }
//   });

======================================================================================================


// Global variables
const API_URL = "https://earthy-rattle-cushion.glitch.me/movies";
let allMovies = [];

// DOM elements
const movieContainer = document.getElementById("movieContainer");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const loader = document.getElementById("loader");

// Fetch movies from API
async function fetchMovies() {
  try {
    const response = await fetch(API_URL);

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
        <img src="${posterUrl}" class="card-img-top" alt="${
      movie.title
    } poster">
        <div class="card-body">
          <h5 class="card-title">${movie.title}</h5>
          <p class="card-text">Director: ${movie.director || "Unknown"}</p>
          <p class="card-text">
            ${
              movie.description
                ? movie.description.substring(0, 100) + "..."
                : "No description available"
            }
          </p>
        </div>
        <div class="card-footer">
          <small class="text-muted">Year: ${
            movie.releaseDate?.split("-")[0] || "N/A"
          }</small>
          <div class="mt-2">
            <span class="rating">★ ${movie.rating || "N/A"}</span>
          </div>
        </div>
      </div>
    `;

    movieCard.addEventListener("click", () => {
      window.location.href = `./movie-card.html?id=${movie.id}`;
    });

    movieContainer.appendChild(movieCard);
  });
}

// Search movies
function searchMovies() {
  const searchTerm = searchInput.value.trim().toLowerCase();

  if (searchTerm === "") {
    displayMovies(allMovies);
    return;
  }

  const filteredMovies = allMovies.filter(
    (movie) =>
      movie.title.toLowerCase().includes(searchTerm) ||
      movie.director.toLowerCase().includes(searchTerm) ||
      (movie.description &&
        movie.description.toLowerCase().includes(searchTerm))
  );

  // Sort matches to show closest match on top
  filteredMovies.sort((a, b) => {
    const aTitle = a.title.toLowerCase();
    const bTitle = b.title.toLowerCase();

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


===========================================================================================================


// Global variables
const API_URL = "https://earthy-rattle-cushion.glitch.me/movies";
const detailContainer = document.getElementById("movieDetailContainer");
const detailLoader = document.getElementById("detailLoader");

// Function to get URL parameters
function getUrlParameter(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

// Fetch movie details by ID
async function fetchMovieDetails(movieId) {
  try {
    const response = await fetch(`${API_URL}/${movieId}`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const movie = await response.json();

    // Hide loader after data is fetched
    detailLoader.style.display = "none";

    return movie;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    detailContainer.innerHTML = `
            <div class="col-12 text-center">
                <div class="alert alert-danger">
                    Failed to load movie details. Please try again later.
                </div>
            </div>
        `;
    detailLoader.style.display = "none";
    return null;
  }
}

// Display movie details
function displayMovieDetails(movie) {
  if (!movie) {
    detailContainer.innerHTML = `
            <div class="col-12 text-center">
                <div class="alert alert-warning">
                    Movie not found.
                </div>
            </div>
        `;
    return;
  }

  // Default image if poster is not available
  const posterUrl =
    movie.poster ||
    "https://cdn.displate.com/artwork/270x380/2022-04-15/7422bfe15b3ea7b5933dffd896e9c7f9_46003a1b7353dc7b5a02949bd074432a.jpg";

  detailContainer.innerHTML = `
        <div class="col-md-4">
            <img src="${posterUrl}" alt="${
    movie.title
  } poster" class="img-fluid rounded movie-detail-img">
        </div>
        <div class="col-md-8">
            <h2 class="movie-detail-title">${
              movie.title
            } <span class="badge bg-secondary">${movie.year}</span></h2>
            
            <div class="mb-4">
                <h5>Rating: <span class="text-warning">★ ${
                  movie.rating ? movie.rating : "N/A"
                }</span></h5>
            </div>
            
            <div class="mb-4">
                <h5>Director</h5>
                <p>${movie.director}</p>
            </div>
            
            <div class="mb-4">
                <h5>Plot</h5>
                <p>${movie.plot || "No plot description available."}</p>
            </div>
            
            <div class="mb-4">
                <h5>Genre</h5>
                <p>${movie.genre || "Genre not specified"}</p>
            </div>
            
            <div class="mb-4">
                <h5>Actors</h5>
                <p>${movie.actors || "Cast not specified"}</p>
            </div>
            
            ${
              movie.awards
                ? `
            <div class="mb-4">
                <h5>Awards</h5>
                <p>${movie.awards}</p>
            </div>
            `
                : ""
            }
        </div>
    `;
}

// Navigate back to main page
function goBack() {
  window.location.href = "index.html";
}

// Initialize the page
async function init() {
  const movieId = getUrlParameter("id");

  if (!movieId) {
    detailLoader.style.display = "none";
    detailContainer.innerHTML = `
            <div class="col-12 text-center">
                <div class="alert alert-warning">
                    No movie ID provided.
                </div>
            </div>
        `;
    return;
  }

  const movie = await fetchMovieDetails(movieId);
  displayMovieDetails(movie);

  // Update page title
  if (movie) {
    document.title = `${movie.title} - Movie Details`;
  }
}

// Start app
document.addEventListener("DOMContentLoaded", init);
