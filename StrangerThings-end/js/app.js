const gridSimilars = document.querySelector('.grid-similares');


const getSeries = () => {

    return fetch("./data/series.json")

        .then(res => res.json())
        .then(data => {
            renderListSimilars(data)
        })
        .catch(error => {
            console.log(error);
        });
}

const renderListSimilars = (series) => {
    gridSimilars.innerHTML="";
    series.forEach(serie => {
        gridSimilars.innerHTML+=renderCard(serie);
    });
}

const renderCard = (serie) => {

    let time = null;
    if(serie.miniserie){
        time = "Miniserie"
    }else if(serie.episodes){
        time = serie.episodes + " Episodios"; 
    }else{
        time = serie.seasons + " Temporadas"
    }


    let matchHTML = "";
    if(serie.match>70){
        matchHTML = `<div class="coincidencia">${serie.match}% de coincidencia</div>`
    }
    

    let starsHTML="";
    if(serie.stars){
        for(let i=0; i<serie.stars; i++){
            // star-on
            starsHTML+=`<div class="star"></div>`;
        }

        for(let i=serie.stars; i<5; i++){

            //star-off
            starsHTML+=`<div class="star-off"></div>`
        }
        starsHTML=`<div class="score">${starsHTML}</div>`;
    }


    return `
        <article class="card">
            <div class="season">${time}</div>
                <img src="./img/${serie.cover}" alt="">
            <div class="container">
            ${matchHTML}
                <div class="info-card-container">
                    <div>
                        <span class="pegi age-${serie.pegi}">${serie.pegi}+</span>
                        <span class="year">${serie.release}</span>
                    </div>
                    <div>
                        <span class="material-icons btn-icon">add</span>
                    </div>
                </div>
                ${starsHTML}
                <p>${serie.description}</p>
            </div>
        </article>
    `
}



function init() {
    getSeries();
}

init();