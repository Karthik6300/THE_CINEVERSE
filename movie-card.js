// Global variables
const detailContainer = document.getElementById("movieDetailContainer");
const detailLoader = document.getElementById("detailLoader");

// Function to get URL parameters
function getUrlParameter(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

// Fetch movie details by ID from local JSON
async function fetchMovieDetails(movieId) {
  try {
    const response = await fetch("./card-data.json");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const movies = await response.json();

    // Convert movieId to number since JSON might use numeric IDs
    const movie = movies.find((m) => m.id == movieId);

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

// Display movie details (unchanged)
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

  const posterUrl =
    movie.Poster ||
    "https://cdn.displate.com/artwork/270x380/2022-04-15/7422bfe15b3ea7b5933dffd896e9c7f9_46003a1b7353dc7b5a02949bd074432a.jpg";

  detailContainer.innerHTML = `
        <div class="col-md-4">
            <img src="${posterUrl}" alt="${
    movie.Title
  } poster" class="img-fluid rounded movie-detail-img">
        </div>
        <div class="col-md-8">
            <h2 class="movie-detail-title">${
              movie.Title
            } <span class="badge bg-secondary">${movie.Released}</span></h2>
            
            <div class="mb-4">
                <h5>Rating: <span class="text-warning">★ ${
                  movie.imdbRating ? movie.imdbRating : "N/A"
                }</span></h5>
            </div>
            
            <div class="mb-4">
                <h5>Director</h5>
                <p>${movie.Director ? movie.Director : "karthik"}</p>
            </div>
            
            <div class="mb-4">
                <h5>Plot</h5>
                <p>${movie.Plot || "No plot description available."}</p>
            </div>
            
            <div class="mb-4">
                <h5>Genre</h5>
                <p>${movie.Genre || "Genre not specified"}</p>
            </div>
            
            <div class="mb-4">
                <h5>Actors</h5>
                <p>${movie.Actors || "Cast not specified"}</p>
            </div>
            
            ${
              movie.Awards
                ? `
            <div class="mb-4">
                <h5>Awards</h5>
                <p>${movie.Awards}</p>
            </div>
            `
                : ""
            }
        </div>
    `;
}

// Navigate back to main page
function goBack() {
  window.location.href = "home.html";
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

  if (movie) {
    document.title = `${movie.Title} - Movie Details`;
  }
}

// Start app
document.addEventListener("DOMContentLoaded", init);
