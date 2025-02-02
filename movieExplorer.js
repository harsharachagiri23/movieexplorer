const API_KEY = 'c3d181f7'; // Ensure this matches your actual key

async function searchMovies() {
    const query = document.getElementById('searchInput').value;
    const moviesContainer = document.getElementById('movies');

    if (!query) {
        alert("Please enter a movie name!");
        return;
    }

    moviesContainer.innerHTML = `<p>Loading...</p>`;

    try {
        const response = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`);
        const data = await response.json();

        if (data.Response === "False") {
            moviesContainer.innerHTML = `<p>No movies found.</p>`;
            return;
        }

        moviesContainer.innerHTML = data.Search.map(movie => `
            <div class="movie">
                <img src="${movie.Poster !== "N/A" ? movie.Poster : 'https://via.placeholder.com/200'}" alt="${movie.Title}">
                <h3>${movie.Title}</h3>
                <p>Year: ${movie.Year}</p>
            </div>
        `).join('');
    } catch (error) {
        moviesContainer.innerHTML = `<p>Something went wrong! Try again.</p>`;
    }
}