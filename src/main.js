const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    Headers:{
        'content-Type': 'application/jason;charset=utf-8',
    },
    params:{
        'api_key': API_KEY,
        'language': navigator.language,
    }
});

function likedMoviesList() {
    const item = JSON.parse(localStorage.getItem('liked_movies'));
    let movies;

    if (item){
        movies = item;
    }else{
        movies = {};
    }
    return movies
}

function likeMovie(movie){
    const likedMovies = likedMoviesList();
    if (likedMovies[movie.id]){
        likedMovies[movie.id] = undefined;
    }else{
        likedMovies[movie.id] = movie;
    }

    localStorage.setItem('liked_movies',JSON.stringify(likedMovies));
}


//utils

const lazyLoader = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting){
            const url = entry.target.getAttribute('data-img')
            entry.target.setAttribute('src', url);
        }
    })
})

language.addEventListener('click', () =>{
    lang = language.value;
    console.log(lang)
})

function createMovies(movies, container, clean = true){
    
    if (clean){
        container.innerHTML = '';
    }
    movies.forEach(movie => {
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');

       
        const movieImg = document.createElement('img');
        movieImg.classList.add('skeleton');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute('data-img', 'https://image.tmdb.org/t/p/w300/' + movie.poster_path);
        movieImg.addEventListener('click', () => {
            location.hash = '#movie=' + movie.id;
        })
        movieImg.addEventListener('error', () =>{
            movieImg.setAttribute('src', 'https://elvortex.com/wp-content/uploads/2019/09/error-404.png');

        });
        const movieBtn = document.createElement('button');
        movieBtn.classList.add('movie-btn');
        likedMoviesList()[movie.id] &&  movieBtn.classList.add('movie-btn--liked')
        movieBtn.addEventListener('click', () => { 
            movieBtn.classList.toggle('movie-btn--liked');
            likeMovie(movie);
            window.location.reload();
        });
        
        lazyLoader.observe(movieImg);
        movieContainer.appendChild(movieImg);
        movieContainer.appendChild(movieBtn)
        container.appendChild(movieContainer);
    });
}

function createMoviesSlishow(movies, container){
    container.innerHTML = '';

    movies.splice(0,3).forEach(movie => {
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('mySlides');

        movieContainer.addEventListener('click', () => {
            location.hash = '#movie=' + movie.id;
        })
        const movieImg = document.createElement('img');
        movieImg.classList.add('slideshow-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w500' + movie.poster_path);

        movieContainer.appendChild(movieImg);
        container.appendChild(movieContainer);
    });
}

function createCategories(categories,container){
    container.innerHTML = "";

    categories.forEach(category => {
        
        const categoryContainer = document.createElement('div');
        categoryContainer.classList.add('category-container');
       
        const categoryTitle = document.createElement('h3');
        categoryTitle.classList.add('category-title');
        categoryTitle.setAttribute('id', category.id);
        categoryTitle.addEventListener('click', () => {
            location.hash = `#category=${category.id}-${category.name}`;
        });
        const categoryTitleText = document.createTextNode(category.name);

        categoryTitle.appendChild(categoryTitleText);
        categoryContainer.appendChild(categoryTitle);
        container.appendChild(categoryContainer);
    });
}

//gets

async function getTrendingMoviesPreview(){
    const {data} = await api('trending/movie/day');
    const movies = data.results;
    
    createMovies(movies, trendingMoviesPreviewList);
}
async function getTrendingMoviesSlyde(){
    const {data} = await api('trending/movie/week');
    const movies = data.results;
    
    createMoviesSlishow(movies, slishowContainer);

    let slideIndex = 1;
    showSlides(slideIndex);

    // Next/previous controls

    function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex-1].style.display = "block";
    }

    
}
async function getCategoriesPreview(){
    const {data} = await api('genre/movie/list');
    const categories = data.genres;
    
    categoriesPreviewList.innerHTML = '';

    createCategories(categories, categoriesPreviewList);
    
}

async function getMoviesByCategory(id){
    const {data} = await api('discover/movie', {
        params:{
            with_genres: id,
        },
    });
    const movies = data.results;
    maxPage = data.total_pages;
        
    createMovies(movies, genericSection);
}
async function getMoviesBySearch(query){
    genericSection.innerHTML = ''
    const {data} = await api('/search/movie', {
        params:{
            query,
        },
    });
    const movies = data.results;
    maxPage = data.total_pages;
    console.log(maxPage);
        
    createMovies(movies, genericSection);
}
async function getTrendingMovies(){
    const {data} = await api('trending/movie/day');
    const movies = data.results;

    maxPage = data.total_pages

    createMovies(movies, genericSection);


}





async function getPaginatedTrendingMovies(){
    const {scrollTop,
         scrollHeight,
         clientHeight} = document.documentElement;

    const scrollIsBottom = (scrollTop + clientHeight) >= (scrollHeight - 15);
    
    const pageIsNotMax = page < maxPage;

    if (scrollIsBottom && pageIsNotMax){
        page++;
        const {data} = await api('trending/movie/day',{
            params:{
                page,
            }
        });
    
        
        const movies = data.results;
        
        createMovies(movies, genericSection, false);
    
    }
}

const getPaginatedMoviesBySearch = (query) => {
    return async function () {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const scrollIsBottom = scrollTop + clientHeight >= scrollHeight - 15;
      const pageIsNotMax = page < maxPage;
  
      if (scrollIsBottom && pageIsNotMax) {
        page++;
        const { data } = await api(`search/movie`, {
          params: {
            query,
            page,
          },
        });
  
        const movies = data.results;
        createMovies(movies, genericSection, false);
      }
    };
};


const getPaginatedMoviesByCategory = (id) => {
    return async function () {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const scrollIsBottom = scrollTop + clientHeight >= scrollHeight - 15;
      const pageIsNotMax = page < maxPage;
  
      if (scrollIsBottom && pageIsNotMax) {
        page++;
        const { data } = await api('discover/movie', {
          params: {
            with_genres: id,
            page,
          },
        });
  
        const movies = data.results;
        createMovies(movies, genericSection, false);
      }
    };
};


const getPaginatedRelatedMovie = (id) => {
    return async function () {
      const { scrollLeft, scrollWidth, clientWidth } = document.documentElement;
      const scrollIsRight = scrollLeft + clientWidth >= scrollWidth - 15;
      const pageIsNotMax = page < maxPage;
  
      if (scrollIsRight && pageIsNotMax) {
        page++;
        const { data } = await api(`movie/${id}/recommendations`, {
          params: {
            page,
          },
        });
  
        const relatedMovies = data.results;
        createMovies(relatedMovies, relatedMoviesContainer);
      }
    };
};


async function getMovieById(id){
    const {data:movie} = await api('movie/' + id);

    const movieImgUrl = 'https://image.tmdb.org/t/p/w500' + movie.poster_path;
    longImg.classList.add('skeleton');
    longImg.src = movieImgUrl;
    movieDetailTitle.textContent = movie.title;
    movieDetailDescription.textContent = movie.overview;
    movieDetailScore.textContent = movie.vote_average;

    createCategories(movie.genres, movieDetailCategoriesList);
    getRelatedMoviesId(id);
}


async function getRelatedMoviesId(id){

    const {data} = await api(`movie/${id}/recommendations`)
    const relatedMovies = data.results;
    maxPage = data.total_pages;
    console.log(maxPage);
    createMovies(relatedMovies, relatedMoviesContainer)
}

function getLikedMovies(movie){
    const likedMovies = likedMoviesList();
//{keys: 'values',keys: 'values'}
//['value','value2']
    const moviesArray = Object.values(likedMovies);

    createMovies(moviesArray,likedMoviesListArticle, true);
    console.log(likedMovies);
}

