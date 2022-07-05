searchFormBtn.addEventListener('click', () => {
    location.hash = '#search='
})
trendingBtn.addEventListener('click', () => {
    location.hash = '#trends'
})
arrowBtn.addEventListener('click', () => {
    location.hash = '#home'
})

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
    
        function homePage(){
            console.log('Home!!')

            searchFormBtn.classList.remove('inactive');
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
            slideshow.classList.add('inactive');
            headerSection.classList.remove('header-container--long');
            headerSection.getElementsByClassName.background = '';
            arrowBtn.classList.remove('inactive');
            searchForm.classList.add('inactive');
            headerCategoryTitle.classList.remove('inactive');
            trendingPreviewSection.classList.add('inactive');
            categoriesPreviewSection.classList.add('inactive');
            genericSection.classList.remove('inactive');
            movieDetailSection.classList.add('inactive');
        }
        function movieDetailsPage(){
            console.log('Movie!!')

            slideshow.classList.add('inactive');
            headerSection.classList.remove('header-container--long');
            headerSection.getElementsByClassName.background = '';
            arrowBtn.classList.remove('inactive');
            searchForm.classList.add('inactive');
            headerCategoryTitle.classList.add('inactive');
            trendingPreviewSection.classList.add('inactive');
            categoriesPreviewSection.classList.add('inactive');
            genericSection.classList.add('inactive');
            movieDetailSection.classList.remove('inactive');
        }
        function searchPage(){
            console.log('Search!!');
            slideshow.classList.add('inactive');
            headerSection.classList.remove('header-container--long');
            headerSection.getElementsByClassName.background = '';
            arrowBtn.classList.remove('inactive');
            searchForm.classList.add('inactive');
            headerCategoryTitle.classList.add('inactive');
            trendingPreviewSection.classList.add('inactive');
            categoriesPreviewSection.classList.add('inactive');
            genericSection.classList.remove('inactive');
            movieDetailSection.classList.add('inactive');
        }
        function trendsPage(){
            console.log('TRENDS!!');

            slideshow.classList.add('inactive');
            headerSection.classList.remove('header-container--long');
            headerSection.getElementsByClassName.background = '';
            arrowBtn.classList.remove('inactive');
            searchForm.classList.remove('inactive');
            headerCategoryTitle.classList.add('inactive');
            trendingPreviewSection.classList.add('inactive');
            categoriesPreviewSection.classList.add('inactive');
            genericSection.classList.remove('inactive');
            movieDetailSection.classList.add('inactive');
        }
    location.hash
}