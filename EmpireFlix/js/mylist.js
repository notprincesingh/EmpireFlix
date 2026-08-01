'use strict';

document.addEventListener("DOMContentLoaded", () => {

    const grid = document.getElementById("mylist-grid");

    const list = StorageManager.getMyList();

    if (!list.length) {

        grid.innerHTML = `
        <p>
            Your My List is empty.
        </p>
        `;

        return;

    }

    grid.innerHTML = list.map(movie => `

    <article class="card mylist-card">

        <a href="${movie.type==="series"

            ?`series.html?id=${movie.id}`

            :`movie.html?id=${movie.id}`}">

            <img

                class="card-img"

                loading="lazy"

                src="${movie.poster}"

                alt="${movie.title}"

                onerror="Utils.handleBrokenImage(this)"

            >

        </a>

        <button

            class="remove-btn"

            onclick="removeMovie('${movie.id}')">

            ✕

        </button>

    </article>

    `).join("");

});

function removeMovie(id){

    let list = StorageManager.getMyList();

    list = list.filter(movie => movie.id !== id);

    StorageManager.saveMyList(list);

    location.reload();

}