

// document.addEventListener('DOMContentLoaded', async () => {
//     const movieContainer = document.getElementById('movie-container');
//     const searchForm = document.getElementById('search-form');
//     const searchInput = document.getElementById('search-input');

//     // Function to fetch movies
//     async function fetchMovies(query = '') {
//         const url = query
//             ? `https://imdb8.p.rapidapi.com/auto-complete?q=${encodeURIComponent(query)}`
//             : 'https://imdb8.p.rapidapi.com/title/v2/get-popular?first=20&country=US&language=en-US';
//         const options = {
//             method: 'GET',
//             headers: {
//                 'x-rapidapi-key': 'df671e8e8fmshb9448b63cd48a7ap15d8e1jsn8517309873ee',
//                 'x-rapidapi-host': 'imdb8.p.rapidapi.com'
//             }
//         };

//         try {
//             const response = await fetch(url, options);
//             if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
//             const result = await response.json();
//             console.log(result);

//             let movies = [];

//             // Check if it's a search query
//             if (query) {
//                 // For search results
//                 if (result && result.d && result.d.length > 0) {
//                     movies = result.d; // Directly use the array from the search results
//                 }
//             } else {
//                 // For popular movies
//                 if (result && result.data && result.data.movies && result.data.movies.edges) {
//                     movies = result.data.movies.edges.map(edge => edge.node);
//                 }
//             }

//             movieContainer.innerHTML = ''; // Clear any previous content

//             movies.forEach(movie => {
//                 const card = document.createElement('div');
//                 card.className = 'movie-card';
//                 card.innerHTML = `
//                     <img src="${movie.primaryImage?.url || movie.i?.imageUrl || 'https://via.placeholder.com/300x450'}" alt="${movie.titleText?.text || 'No Title'} Poster">
//                     <h2>${movie.titleText?.text || movie.l || 'N/A'}</h2>
//                     ${movie.ratingsSummary?.aggregateRating ? `<p>Rating: ${movie.ratingsSummary.aggregateRating}</p>` : ''}
//                     ${movie.releaseYear?.year ? `<p>Year: ${movie.releaseYear.year}</p>` : ''}
//                     ${movie.s ? `<p>Actors: ${movie.s}</p>` : ''}
//                     ${movie.plot?.plotText?.plainText ? `<p>Plot: ${movie.plot.plotText.plainText}</p>` : ''}
//                     <a href="https://www.imdb.com/title/${movie.id}" target="_blank">
//                         <button class="more-info-btn">More Info</button>
//                     </a>
//                 `;
//                 movieContainer.appendChild(card);
//             });
//         } catch (error) {
//             console.error('Error fetching movie data:', error);
//         }
//     }

//     // Fetch popular movies on load
//     fetchMovies();

//     // Search functionality
//     searchForm.addEventListener('submit', (event) => {
//         event.preventDefault();
//         const query = searchInput.value.trim();
//         fetchMovies(query);
//     });
// });


//  v3 :


document.addEventListener('DOMContentLoaded', async () => {
    const movieContainer = document.getElementById('movie-container');
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const titleHeader = document.createElement('h2'); // Create a new header element
    titleHeader.id = 'title-header'; // Set an ID for styling
    document.getElementById('main-content').insertBefore(titleHeader, movieContainer); // Insert it before the movie container

    // Function to fetch movies
    async function fetchMovies(query = '') {
        const url = query
            ? `https://imdb8.p.rapidapi.com/auto-complete?q=${encodeURIComponent(query)}`
            : 'https://imdb8.p.rapidapi.com/title/v2/get-popular?first=20&country=US&language=en-US';
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': 'df671e8e8fmshb9448b63cd48a7ap15d8e1jsn8517309873ee',
                'x-rapidapi-host': 'imdb8.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            const result = await response.json();
            console.log(result);

            let movies = [];

            // Check if it's a search query
            if (query) {
                // For search results
                if (result && result.d && result.d.length > 0) {
                    movies = result.d; // Directly use the array from the search results
                    titleHeader.textContent = `Showing results for "${query}"`; // Update title for search results
                } else {
                    titleHeader.textContent = `No results found for "${query}"`; // Handle no results
                }
            } else {
                // For popular movies
                if (result && result.data && result.data.movies && result.data.movies.edges) {
                    movies = result.data.movies.edges.map(edge => edge.node);
                    titleHeader.textContent = 'Popular Movies'; // Update title for popular movies
                }
            }

            movieContainer.innerHTML = ''; // Clear any previous content

            movies.forEach(movie => {
                const card = document.createElement('div');
                card.className = 'movie-card';
                card.innerHTML = `
                    <img src="${movie.primaryImage?.url || movie.i?.imageUrl || 'https://via.placeholder.com/300x450'}" alt="${movie.titleText?.text || 'No Title'} Poster">
                    <h2>${movie.titleText?.text || movie.l || 'N/A'}</h2>
                    ${movie.ratingsSummary?.aggregateRating ? `<p>Rating: ${movie.ratingsSummary.aggregateRating}</p>` : ''}
                    ${movie.releaseYear?.year ? `<p>Year: ${movie.releaseYear.year}</p>` : ''}
                    ${movie.s ? `<p>Actors: ${movie.s}</p>` : ''}
                    ${movie.y ? `<p>Year: ${movie.y}</p>` : ''}
                    ${movie.rank ? `<p>Rank: ${movie.rank}</p>` : ''}
                    ${movie.plot?.plotText?.plainText ? `<p>Plot: ${movie.plot.plotText.plainText}</p>` : ''}
                    <a href="https://www.imdb.com/title/${movie.id}" target="_blank">
                        <button class="more-info-btn">More Info</button>
                    </a>
                `;
                movieContainer.appendChild(card);
            });
        } catch (error) {
            console.error('Error fetching movie data:', error);
        }
    }

    // Fetch popular movies on load
    fetchMovies();

    // Search functionality
    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const query = searchInput.value.trim();
        fetchMovies(query);
    });
});