'use strict';

document.addEventListener("DOMContentLoaded", async () => {

    const loaded = await DB.init();

    if (!loaded) return;

    const input = document.getElementById("search-input");

    const results = document.getElementById("search-results");

    render(DB.getAll());

    input.addEventListener(

        "input",

        Utils.debounce(() => {

            const query = input.value.trim();

            if (!query) {

                render(DB.getAll());

                return;

            }

            render(DB.search(query));

        }, 250)

    );

    function render(movies) {

        if (!movies.length) {

            results.innerHTML = "<p>No results found.</p>";

            return;

        }

        results.innerHTML = movies.map(movie => `

        <article class="card">

            <a href="${movie.type==="series"

                ?`series.html?id=${movie.id}`

                :`movie.html?id=${movie.id}`}">

                <img

                    class="card-img"

                    loading="lazy"

                    src="${movie.poster}"

                    alt="${movie.title}"

                    onerror="Utils.handleBrokenImage(this)">

            </a>

            <div class="card-overlay">

                <h3 class="card-title">

                    ${movie.title}

                </h3>

                <p>

                    ${movie.year}

                </p>

            </div>

        </article>

        `).join("");

    }

});