let favs = []

function addFavorite(city) {
    favs.push(city);
    console.log('Added to favorites! '+ favs);    
}

function removeFavorite(city){
    let removeCityIndex = favs.indexOf(city);
    favs.splice(removeCityIndex, 1);
    console.log('Removed to favorites! '+ city);
    
}

function openFavorites(){
    displayWeatherForCities(favs)
}

document.getElementById("favorite").addEventListener('click', openFavorites);

