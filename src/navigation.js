searchIcon.addEventListener('click', () => {
    location.hash = '#search='
})
trendingBtn.addEventListener('click', () => {
    location.hash = '#trends'
})
arrowBtn.addEventListener('click', () => {
    location.hash = '#home'
})
searchFormBtn.addEventListener('click', () => {
    location.hash = '#search=' + searchFormInput.value;
});

window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);

function navigator(){
    console.log({location});

    if(location.hash.startsWith('#trends')) {
        trendsPage();
    }else if (location.hash.startsWith('#search=')){
       searchPage();
    }else if (location.hash.startsWith('#movie=')){
        movieDetailsPage();
    }else if (location.hash.startsWith('#category=')){
        categoriesPage();
    } else {
        homePage();
    }

    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
        function homePage(){
            console.log('Home!!')
            searchFormInput.classList.add('inactive');
            headerLogo.classList.remove('inactive');
            headerLong.classList.add('inactive');
            searchFormBtn.classList.add('inactive');
            headerSection.classList.remove('header-container--long');
            headerSection.getElementsByClassName.background = '';
            arrowBtn.classList.add('inactive');
            slideshow.classList.remove('inactive');
            headerCategoryTitle.classList.add('inactive');
            trendingPreviewSection.classList.remove('inactive');
            categoriesPreviewSection.classList.remove('inactive');
            genericSection.classList.add('inactive');
            movieDetailSection.classList.add('inactive');

            getTrendingMoviesPreview();
            getCategoriesPreview();
    
        }
        function categoriesPage(){

            console.log('categories!!')
            searchFormInput.classList.add('inactive');
            headerLogo.classList.add('inactive');
            headerLong.classList.add('inactive');
            slideshow.classList.add('inactive');
            headerSection.classList.remove('header-container--long');
            headerSection.getElementsByClassName.background = '';
            arrowBtn.classList.remove('inactive');
            searchFormBtn.classList.add('inactive');
            headerCategoryTitle.classList.remove('inactive');
            trendingPreviewSection.classList.add('inactive');
            categoriesPreviewSection.classList.add('inactive');
            genericSection.classList.remove('inactive');
            movieDetailSection.classList.add('inactive');

            const [_,categoryData] = location.hash.split('='); 
            const [categoryId,categoryName] = categoryData.split('-');

            const newName = categoryName.replace('%20', ' ');
            headerCategoryTitle.innerHTML = newName;

            getMoviesByCategory(categoryId);

        }
        function movieDetailsPage(){
            console.log('Movie!!')
            searchFormInput.classList.add('inactive');
            headerLogo.classList.add('inactive');
            slideshow.classList.add('inactive');
            headerLong.classList.remove('inactive');
            headerSection.classList.remove('header-container--long');
            headerSection.getElementsByClassName.background = '';
            arrowBtn.classList.remove('inactive');
            searchFormBtn.classList.add('inactive');
            headerCategoryTitle.classList.add('inactive');
            trendingPreviewSection.classList.add('inactive');
            categoriesPreviewSection.classList.add('inactive');
            genericSection.classList.add('inactive');
            movieDetailSection.classList.remove('inactive');

            const [_,movieId] = location.hash.split('='); 

            getMovieById(movieId);
        }
        function searchPage(){
            console.log('Search!!');
            headerLogo.classList.remove('inactive');
            headerLong.classList.add('inactive');
            slideshow.classList.add('inactive');
            headerSection.classList.remove('header-container--long');
            headerSection.getElementsByClassName.background = '';
            arrowBtn.classList.remove('inactive');
            searchFormBtn.classList.remove('inactive');
            searchFormInput.classList.remove('inactive');
            headerCategoryTitle.classList.add('inactive');
            trendingPreviewSection.classList.add('inactive');
            categoriesPreviewSection.classList.add('inactive');
            genericSection.classList.remove('inactive');
            movieDetailSection.classList.add('inactive');

            const [_,query] = location.hash.split('='); 
            getMoviesBySearch(query);
        }
        function trendsPage(){
            console.log('TRENDS!!');
            searchFormInput.classList.add('inactive');
            headerLong.classList.add('inactive');
            slideshow.classList.add('inactive');
            headerSection.classList.remove('header-container--long');
            headerSection.getElementsByClassName.background = '';
            arrowBtn.classList.remove('inactive');
            searchFormBtn.classList.add('inactive');
            headerCategoryTitle.classList.add('inactive');
            trendingPreviewSection.classList.add('inactive');
            categoriesPreviewSection.classList.add('inactive');
            genericSection.classList.remove('inactive');
            movieDetailSection.classList.add('inactive');
            getTrendingMovies();
        }
    location.hash
}