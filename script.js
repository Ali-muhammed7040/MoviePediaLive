// TMDB Api
const API_KEY = 'api_key=36a4f15f2c17484e855f2b82840691a5';
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL= BASE_URL + '/discover/movie?sort_by=popularity.desc&'+ API_KEY;

const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
const SearchURL = BASE_URL+ '/search/movie?'+API_KEY;
getMovies(API_URL);


function getMovies(url) {
    
    fetch(url).then(response => response.json()).then(data=> {
        console.log(data.results)
        showMovies(data.results);
    })

}

function showMovies(data){
    main.innerHTML ='';

    data.forEach((movie,i) => {
        console.log(i,movie)
        const {title,poster_path,vote_average,overview} = movie;
        const movieEl = document.createElement('div');
        movieEl.movieId = movie.id;
        movieEl.addEventListener('click',onClickMovie)
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
        
        <img src="${IMG_URL+poster_path}" alt="${title}"> 
        <div  class="movie-info">
            <h3>${title}</h3>
            <span class="${getColor(vote_average)}">${vote_average}</span>
        </div>

        <div class="overview">
            <h3>Overviews</h3>
            ${overview}
        </div>
        `
        main.appendChild(movieEl);
    });
}

function onClickMovie(event){
    const movieId = event.currentTarget.movieId;
    const movie = getMovieDetail(movieId);
    console.log(movie);
}

function getMovieDetail(id){
    let movieDetail = null;
    let url= BASE_URL + `/movie/${id}?`+ API_KEY;
    return fetch(url).then(response => response.json()).then(data=>data.results)
    // return movieDetail;
}
function getColor(vote){
    if(vote>=8)
    {
        return 'green'
    }else if(vote>=5)
    {
        return "orange"
    }else
    {
        return 'red'
    }
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const searchTerm = search.value;

    if(searchTerm)
    {
        getMovies(SearchURL+'&query='+searchTerm)
    }
})