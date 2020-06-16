import "./scripts/components/navbar-component.js";
import "./styles/style.css";

// Initial Values
const API_KEY = '051814ac82e166a2db8e8a24938ade89';
const BaseURL = 'https://api.themoviedb.org';
const BaseImgURL = 'https://image.tmdb.org/t/p/w500';
let initialSearchValue = 'Marvel';
const log = console.log;

//Selecting elements from the DOM
const moviesContainer = document.getElementById("movies-container");
const moviesSearchable = document.getElementById("movies-searchable");

function requestMovies(url, onComplete, onError) {
    fetch(url)
        .then((res) => res.json())
        .then(onComplete)
        .catch(onError);
}

//API Transaction
function generateMovieDBUrl(path) {
    const url = `${BaseURL}/3${path}?api_key=${API_KEY}`;
    return url;
}

function getTopRatedMovies() {
    const url = generateMovieDBUrl(`/movie/top_rated`);
    const render = renderMovies.bind({ title: 'Top Rated Movies' })
    requestMovies(url, render, handleGeneralError);
}

function getTrendingMovies() {
    const url = generateMovieDBUrl('/trending/movie/day');
    const render = renderMovies.bind({ title: 'Trending Movies' })
    requestMovies(url, render, handleGeneralError);
}

function searchUpcomingMovies() {
    const url = generateMovieDBUrl('/movie/upcoming');
    const render = renderMovies.bind({ title: 'Upcoming Movies' })
    requestMovies(url, render, handleGeneralError);
}

function searchPopularMovie() {
    const url = generateMovieDBUrl('/movie/popular');
    const render = renderMovies.bind({ title: 'Popular Movies' });
    requestMovies(url, render, handleGeneralError);
}

function searchMovie(value) {
    const url = generateMovieDBUrl('/search/movie') + '&query=' + value;
    requestMovies(url, renderSearchMovies, handleGeneralError);
}

function createImageContainer(imageUrl, id) {
    const tempDiv = document.createElement('div');
    tempDiv.setAttribute('class', 'imageContainer');
    tempDiv.setAttribute('data-id', id);

    const movieElement = `
        <img src="${imageUrl}" alt="" data-movie-id="${id}">
    `;
    tempDiv.innerHTML = movieElement;

    return tempDiv;
}

function resetInput() {
    searchInput.value = '';
}

function handleGeneralError(error) {
    log('Error: ', error.message);
    alert(error.message || 'Internal Server');
}

function createSectionHeader(title) {
    const header = document.createElement('h2');
    header.innerHTML = title;

    return header;
}

function renderMovies(data) {
    const moviesBlock = generateMoviesBlock(data);
    const header = createSectionHeader(this.title);
    moviesBlock.insertBefore(header, moviesBlock.firstChild);
    moviesContainer.appendChild(moviesBlock);
}

function renderSearchMovies(data) {
    moviesSearchable.innerHTML = '';
    const moviesBlock = generateMoviesBlock(data);
    moviesSearchable.appendChild(moviesBlock);
}

function generateMoviesBlock(data) {
    const movies = data.results;
    const section = document.createElement('section');
    section.setAttribute('class', 'section');

    for (let i = 0; i < movies.length; i++) {
        const { poster_path, id } = movies[i];

        if (poster_path) {
            const imageUrl = BaseImgURL + poster_path;
    
            const imageContainer = createImageContainer(imageUrl, id);
            section.appendChild(imageContainer);
        }
    }
    const movieSectionAndContent = createMovieContainer(section);
    return movieSectionAndContent;
}

// Inserting section before content element
function createMovieContainer(section) {
    const movieElement = document.createElement('div');
    movieElement.setAttribute('class', 'movie');
    movieElement.insertBefore(section, movieElement.firstChild);
    return movieElement;
}

    // Selecting elements from the DOM
    const buttonSearch = document.querySelector("#buttonSearch");
    const searchInput = document.querySelector("#searchInput");

    buttonSearch.addEventListener("click", function(){
        const searchValue = searchInput.value;
        if(searchValue){
            searchMovie(searchValue);
        }else{
            resetInput();
        }
        
    });
    
// Initialize the search
searchMovie(initialSearchValue);
searchUpcomingMovies();
getTopRatedMovies();
searchPopularMovie();
getTrendingMovies();

