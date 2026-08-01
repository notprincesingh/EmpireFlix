'use strict';

document.addEventListener("DOMContentLoaded", async () => {

    const loaded = await DB.init();

    if (!loaded) return;

    const grid = document.getElementById("continue-grid");

    const progressData = StorageManager.load("empireflix-progress", {});

    const movies = [];

    Object.keys(progressData).forEach(id => {

        const movie = DB.getById(id);

        if (!movie) return;

        movies.push({

            ...movie,

            progress: progressData[id]

        });

    });

    if (!movies.length) {

        grid.innerHTML = "<p>No movies to continue.</p>";

        return;

    }

    grid.innerHTML = movies.map(movie => `

        <article class="card">

            <a href="player.html?id=${movie.id}">

                <img

                    class="card-img"

                    src="${movie.poster}"

                    loading="lazy"

                    alt="${movie.title}"

                    onerror="Utils.handleBrokenImage(this)"

                >

            </a>

            <div class="card-overlay">

                <h3 class="card-title">

                    ${movie.title}

                </h3>

                <div class="progress-bar">

                    <div

                        class="progress-fill"

                        style="width:${Math.min(movie.progress*2,100)}%">

                    </div>

                </div>

                <p>

                    Resume Watching

                </p>

            </div>

        </article>

    `).join("");

});