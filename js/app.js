'use strict';

/*
===========================================
EmpireFlix Home Controller
Dream Force Production
Version 1.0.0
===========================================
*/

document.addEventListener("DOMContentLoaded", async () => {

    // Load database
    const loaded = await DB.init();

    if (!loaded) return;

    initNavbar();

    loadHero();

    loadRows();

});


// =======================================
// Navbar Scroll
// =======================================

function initNavbar(){

    const nav = document.getElementById("main-nav");

    window.addEventListener("scroll",()=>{

        if(window.scrollY>50){

            nav.classList.add("scrolled");

        }else{

            nav.classList.remove("scrolled");

        }

    },{passive:true});

}


// =======================================
// Hero
// =======================================

function loadHero(){

    const movie = DB.getFeatured()[0];

    if(!movie) return;

    document.getElementById("hero-title").textContent =
        movie.title;

    document.getElementById("hero-description").textContent =
        movie.description;

    document.getElementById("hero-year").textContent =
        movie.year;

    document.getElementById("hero-rating").textContent =
        movie.rating;

    document.getElementById("hero-runtime").textContent =
        movie.runtime;

    document.getElementById("hero-quality").textContent =
        movie.quality;

    const img=document.getElementById("hero-image");

    img.src=movie.banner;

    img.alt=movie.title;

    document.getElementById("play-button").href =
        `player.html?id=${movie.id}`;

    document.getElementById("trailer-button").href =
        `movie.html?id=${movie.id}`;

}


// =======================================
// Render Homepage
// =======================================

function loadRows(){

    renderRow(

        "continue-track",

        StorageManager.getContinueWatching()

    );

    renderRow(

        "trending-track",

        DB.getTrending()

    );

    renderRow(

        "originals-track",

        DB.getOriginals()

    );

    renderRow(

        "movies-track",

        DB.getMovies()

    );

    renderRow(

        "series-track",

        DB.getSeries()

    );

    renderRow(

        "coming-track",

        DB.getComingSoon()

    );

}


// =======================================
// Render Slider
// =======================================

function renderRow(trackId,movies){

    const track=document.getElementById(trackId);

    if(!track) return;

    if(!movies.length){

        track.innerHTML="<p>No content available.</p>";

        return;

    }

    track.innerHTML=movies.map(createCard).join("");

}


// =======================================
// Movie Card
// =======================================

function createCard(movie){

    return `

    <article class="card">

        <a href="${movie.type==="series"

            ?`series.html?id=${movie.id}`

            :`movie.html?id=${movie.id}`}">

            <img

                loading="lazy"

                decoding="async"

                src="${movie.poster}"

                alt="${movie.title}"

                class="card-img"

                onerror="Utils.handleBrokenImage(this)"

            >

        </a>

        <div class="card-overlay">

            <h3 class="card-title">

                ${movie.title}

            </h3>

            <p>

                ${movie.year} • ${movie.runtime}

            </p>

        </div>

    </article>

    `;

}