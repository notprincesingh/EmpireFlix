'use strict';

document.addEventListener("DOMContentLoaded", async () => {

    const loaded = await DB.init();

    if (!loaded) return;

    const id = Utils.getQuery("id");

    const movie = DB.getById(id);

    if (!movie) {

        window.location.href = "404.html";

        return;

    }

    document.title = movie.title + " | EmpireFlix";

    document.getElementById("movie-banner").src = movie.banner;

    document.getElementById("movie-banner").alt = movie.title;

    document.getElementById("movie-title").textContent = movie.title;

    document.getElementById("movie-description").textContent = movie.description;

    document.getElementById("movie-year").textContent = movie.year;

    document.getElementById("movie-rating").textContent = movie.rating;

    document.getElementById("movie-runtime").textContent = movie.runtime;

    document.getElementById("movie-quality").textContent = movie.quality;

    document.getElementById("credits-starring").textContent =
        movie.credits.starring.join(", ");

    document.getElementById("credits-director").textContent =
        movie.credits.director;

    document.getElementById("credits-writer").textContent =
        movie.credits.writer;

    document.getElementById("credits-editor").textContent =
        movie.credits.editor;

    document.getElementById("play-btn").href =
        `player.html?id=${movie.id}`;

    renderRelated(movie.id);

    setupMyList(movie);

});

function renderRelated(id){

    const related = DB.getRelated(id);

    const track = document.getElementById("related-track");

    track.innerHTML = related.map(movie => `

    <article class="card">

        <a href="movie.html?id=${movie.id}">

            <img

                class="card-img"

                loading="lazy"

                src="${movie.poster}"

                alt="${movie.title}"

                onerror="Utils.handleBrokenImage(this)"

            >

        </a>

    </article>

    `).join("");

}

function setupMyList(movie){

    const btn = document.getElementById("mylist-btn");

    btn.onclick = () => {

        let list = StorageManager.getMyList();

        const exists = list.find(item => item.id === movie.id);

        if(exists){

            Utils.showToast("Already in My List");

            return;

        }

        list.push(movie);

        StorageManager.saveMyList(list);

        Utils.showToast("Added to My List");

    };

}