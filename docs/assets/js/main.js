"use strict";const button=document.querySelector(".js-button"),input=document.querySelector(".js-input"),favouritesList=document.querySelector(".js-favouritesList"),searchesList=document.querySelector(".js-searchesList");let filmsFormated=[],favouriteFilms=[];function setFavouriteFilmsfromLocalStorage(){console.log("Hola estoy guardando tus favoritos en LocalStorage"),console.log(favouriteFilms),localStorage.setItem("favouriteFilms",JSON.stringify(favouriteFilms))}function getFavouriteFilmsfromLocalStorage(){console.log("Hola estoy cogiendo tus favoritos de la última vez que estuviste aqui");const e=JSON.parse(localStorage.getItem("favouriteFilms"));null!==e&&(favouriteFilms=e)}function getFilmInfoandPrint(e){e.preventDefault(),console.log("Hola voy a empezar a buscar"),eraseSearchedFilms(),getDataFromServer()}function formatData(e){console.log("Hola estoy formateando los datos");let o="";for(let t=0;t<e.length;t++)o=null===e[t].show.image?"https://via.placeholder.com/210x295/ffffff/666666/?text=TV":`${e[t].show.image.medium}`,filmsFormated.push({name:e[t].show.name,picture:o,id:e[t].show.id});return filmsFormated}function getDataFromServer(){console.log("Hola voy al servidor a por los datos");const e=input.value;return fetch(`http://api.tvmaze.com/search/shows?q=${e}`).then(e=>e.json()).then(o=>{const t=o;console.log(`Hola estoy en el servidor y te traigo ${e}`),formatData(t),printFilms()})}function printFilms(){console.log("Hola voy a pintar las pelis");let e="";for(const o of filmsFormated)e+=`<li class="search_film js-searchedFilm" data-index="${o.id}">`,e+=`<img src="${o.picture}" alt="${o.name}">`,e+=`<h3 class="js-favouriteTitle"> ${o.name}</h3>`,e+="</li>";searchesList.innerHTML=e,listenToSearchedFilms()}function eraseSearchedFilms(){console.log("Hola estoy borrando las búsquedas"),filmsFormated=[]}function changeFavourites(e){const o=e.currentTarget,t=parseInt(o.dataset.index);console.log("Hola voy a añadir tus favorias al array"),o.classList.toggle("selected");for(let e=0;e<filmsFormated.length;e++)filmsFormated[e].id!==t||favouriteFilms.includes(filmsFormated[e])||favouriteFilms.push(filmsFormated[e]);printFavourites(),setFavouriteFilmsfromLocalStorage(favouriteFilms)}function listenToSearchedFilms(){console.log("Hola voy a escuchar a ver si hacéis click");const e=document.querySelectorAll(".js-searchedFilm");for(const o of e)o.addEventListener("click",changeFavourites)}function printFavourites(){console.log("Hola voy a pintar tus favoritas");let e="";for(const o of favouriteFilms)e+=`<li class="favourite_item js-favouritedFilm" data-index="${o.id}">`,e+=`<div class="favourite_item_container"><img class="favourite_img" src="${o.picture}" alt="${o.name}">`,e+=`<h3 class="favourite_title"> ${o.name}</h3></div>`,e+='<button class="js-delete delete_favourite">x</button>',e+="</li>";favouritesList.innerHTML=e,listenToFavouriteFilms()}function deleteFavouritedFilms(e){const o=e.currentTarget;console.log("Hola voy a borrar tu peli de favoritas");const t=parseInt(o.dataset.index);for(let e=0;e<favouriteFilms.length;e++)favouriteFilms[e].id===t&&favouriteFilms.splice(e,1);printFavourites(),setFavouriteFilmsfromLocalStorage()}function listenToFavouriteFilms(){console.log("Hola voy a escuchar tus favoritos por si quieres borrarlos");const e=document.querySelectorAll(".js-favouritedFilm");for(const o of e)o.addEventListener("click",deleteFavouritedFilms)}getFavouriteFilmsfromLocalStorage(),printFavourites(),button.addEventListener("click",getFilmInfoandPrint);