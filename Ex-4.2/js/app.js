// Contants amb les referencies als elements HTML
const listTag = document.querySelector('#figures-list');
const priceTag = document.querySelector('#filter-price');
const priceMinTag = document.querySelector('#filter-min-price');
const btnFiltrarTag = document.getElementById("btn-filter");
const hearticon = document.querySelector(".fas fa-heart")


let figuresList = [];

// TODO:Petició asíncona per recuperar les figures
function getFigures() {

    fetch('./data/star-wars.json')
    .then(res=>res.json())
    .then( data =>{
        figures=data.items;
        printFigures(figures);
    });

}


// TODO:Crea les cards HTML de cada figura 
function printFigures(figures) {
    listTag.innerHTML ="";
    
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
    let list = figures
        .filter(e => 
        (e.price >= priceMinTag.value && e.price <= priceTag.value))
        
        .sort((a, b) => {
            // Ordena de major a menor pel nom
            if (a.name > b.name) return 1;
            if (a.name < b.name) return -1;
            return 0;
        });

    if (list.length === 0)
        listTag.innerHTML = "No hay figuras que coincidan con el filtro";
    else
        printFigures(list);
}


// Funció inicial de càrrega de la página
function init() {
    getFigures();
    btnFiltrarTag.addEventListener("click", filterFigures);
}
init();