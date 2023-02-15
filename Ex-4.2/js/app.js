// Contants amb les referencies als elements HTML
const listTag = document.querySelector('#figures-list');
const priceTag = document.querySelector('#filter-price');
const priceMinTag = document.querySelector('#filter-min-price');
const btnFiltrarTag = document.getElementById("btn-filter");
const hearticon = document.querySelector(".fas fa-heart")


let figuresList = [];

// TODO:Petició asíncona per recuperar les figures
function getFigures() {

    fetch('./data/star-wars-figures.json')
    .then(res=>res.json())
    .then( data =>{
        figures=data;
        printFigures();
    });

}


// TODO:Crea les cards HTML de cada figura 
function printFigures() {
   
    figures.forEach(figure =>{
        listTag.innerHTML+=`
        <article class="card">
            <img src="./img/${figure.photo}" alt="">
            <h3> ${figure.name}</h3>
            <span>${figure.price}</span>
            <div class="favorite">
                <i class="fas fa-heart"></i>
            </div>
        </article>
        `;
    });

}

// TODO: Intercanvia el icone de favorit
function setFavourites() {

}


function filterFigures() {
    let filterList =[];
    for (let figure of figuresList){

        if (figure.price>=priceMinTag.value && figure.price<=priceTag.value ){
            filterList.push(figure);
        }
    }

    if (filterList.length == 0) {
        listTag.innerHTML = "No hay figuras que coincidan con el precio insertado en el filtro";
    } else {
        printFigures(filterList);
    }
}


// Funció inicial de càrrega de la página
function init() {
    getFigures();
    btnFiltrarTag.addEventListener("click", filterFigures);
}
init();