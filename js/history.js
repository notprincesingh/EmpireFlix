'use strict';

document.addEventListener("DOMContentLoaded", () => {

    const grid = document.getElementById("history-grid");

    let history = StorageManager.getHistory();

    render();

    document
        .getElementById("clear-history")
        .onclick = () => {

            if (!confirm("Clear watch history?")) return;

            StorageManager.saveHistory([]);

            history = [];

            render();

        };

    function render() {

        if (!history.length) {

            grid.innerHTML = `

                <p>No watch history available.</p>

            `;

            return;

        }

        grid.innerHTML = history.map(movie => `

        <article class="card">

            <a href="movie.html?id=${movie.id}">

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

                <p>

                    ${movie.year}

                </p>

            </div>

        </article>

        `).join("");

    }

});