'use strict';

/*
===========================================
EmpireFlix Database Engine
Dream Force Production
Version 1.0.0
===========================================
*/

const DB = (() => {

    let catalog = [];

    // -----------------------------
    // Load Database
    // -----------------------------
    async function init() {

        try {

            const response = await fetch(`catalog.json?v=${CONFIG.VERSION}`);

            if (!response.ok) {
                throw new Error("Unable to load catalog.");
            }

            catalog = await response.json();

            console.log(`EmpireFlix Database Loaded (${catalog.length} titles)`);

            return true;

        } catch (error) {

            console.error(error);

            document.body.innerHTML = `
                <div style="
                    height:100vh;
                    display:flex;
                    justify-content:center;
                    align-items:center;
                    background:#050505;
                    color:white;
                    font-family:Inter,sans-serif;
                    text-align:center;
                ">
                    <div>
                        <h1>EmpireFlix</h1>
                        <p>Unable to load content database.</p>
                    </div>
                </div>
            `;

            return false;

        }

    }

    // -----------------------------
    // Basic Getters
    // -----------------------------

    const getAll = () => [...catalog];

    const getById = id =>
        catalog.find(item => item.id === id);

    // -----------------------------
    // Content Types
    // -----------------------------

    const getMovies = () =>
        catalog.filter(item => item.type === "movie");

    const getSeries = () =>
        catalog.filter(item => item.type === "series");

    // -----------------------------
    // Collections
    // -----------------------------

    const getFeatured = () =>
        catalog.filter(item => item.featured);

    const getTrending = () =>
        catalog.filter(item => item.trending);

    const getComingSoon = () =>
        catalog.filter(item => item.status === "coming_soon");

    const getReleased = () =>
        catalog.filter(item => item.status === "released");

    const getOriginals = () =>
        catalog.filter(item =>
            item.studio === CONFIG.STUDIO
        );

    // -----------------------------
    // Genres
    // -----------------------------

    const getByGenre = genre =>
        catalog.filter(item =>
            item.genre.includes(genre)
        );

    // -----------------------------
    // Search
    // -----------------------------

    const search = keyword => {

        keyword = keyword.toLowerCase();

        return catalog.filter(item =>

            item.title.toLowerCase().includes(keyword) ||

            item.description.toLowerCase().includes(keyword) ||

            item.genre.join(" ").toLowerCase().includes(keyword)

        );

    };

    // -----------------------------
    // Related Content
    // -----------------------------

    const getRelated = (movieId) => {

        const movie = getById(movieId);

        if (!movie) return [];

        return catalog.filter(item =>

            item.id !== movie.id &&

            item.genre.some(g => movie.genre.includes(g))

        ).slice(0,10);

    };

    // -----------------------------
    // Sorting
    // -----------------------------

    const newest = () =>
        [...catalog].sort((a,b)=>b.year-a.year);

    const oldest = () =>
        [...catalog].sort((a,b)=>a.year-b.year);

    const alphabetical = () =>
        [...catalog].sort((a,b)=>
            a.title.localeCompare(b.title)
        );

    // -----------------------------
    // Statistics
    // -----------------------------

    const stats = () => ({

        total: catalog.length,

        movies: getMovies().length,

        series: getSeries().length,

        originals: getOriginals().length,

        trending: getTrending().length,

        comingSoon: getComingSoon().length

    });

    // -----------------------------
    // Public API
    // -----------------------------

    return {

        init,

        getAll,

        getById,

        getMovies,

        getSeries,

        getFeatured,

        getTrending,

        getComingSoon,

        getReleased,

        getOriginals,

        getByGenre,

        search,

        getRelated,

        newest,

        oldest,

        alphabetical,

        stats

    };

})();