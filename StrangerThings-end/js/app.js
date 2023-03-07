const gridSimilars = document.querySelector('.grid-similares');
let seasonsJSON = [];
let currentSeason = 1;

const getSeasons = () => {

    fetch("./data/seasons-things.json")

        .then(res => res.json())
        .then(data => {
            seasonsJSON= data.seasons;
            renderSeasons(seasonsJSON);
        })
        .catch(error => {
            console.log(error);
        });
}

const renderSeasons = (list)  => {
const currentSeasonStorage = localStorage.getItem("currentSeason");
if(currentSeasonStorage) currentSeason = parseInt(currentSeasonStorage, 10);

    const seasonsContainer = document.querySelector('#nav-temporada')
    seasonsContainer.innerHTML="";
    for (let i = 0; i < seasonsJSON.length; i++) {
        let numberSeason = i+1;
        seasonsContainer.innerHTML+=`
            <a href="#" 
                id="seasons-${numberSeason}"
                onclick="showEpisodes(${numberSeason})"
                class="${currentSeason === numberSeason?"active":""}"> 
                Temporada ${numberSeason}
            </a>
        `;
        
    }
    showEpisodes(currentSeason);
}

const showEpisodes = (numberSeason) =>{
    currentSeason=numberSeason;
    localStorage.setItem("currentSeason",currentSeason);

    document.querySelector('#nav-temporada .active').classList.remove("active");
    document.querySelector(`#seasons-${currentSeason}`).classList.add("active");
        
    const episodesContainer = document.querySelector('.episodes');
    episodesContainer.innerHTML="";

    const episodes = seasonsJSON.find(season=>season.number===currentSeason).episodes;
    episodes.forEach(e => {
        episodesContainer.innerHTML+=`
        <article class="item-episode">
            <div class="number">${e.number}</div>
                <div class="play-episode">
                    <img src="img/${e.image}" alt="">
                    <div class="play-episode-icon"></div>
            </div>
            <div class="desc">
                <div class="container-title">
                    <h3>${e.title}</h3>
                    <div class="duration">${e.duration} m</div>
                </div>
                <p>${e.description}</p>
            </div>
        </article>
        `
    });
}

const getSeries = () => {

    fetch("./data/series.json")

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
    getSeasons();
}

init();