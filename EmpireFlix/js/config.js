'use strict';

/*
===========================================
EmpireFlix Configuration
Dream Force Production
Version 1.0.0
===========================================
*/

const CONFIG = {

    // -------------------------------------------------
    // APP
    // -------------------------------------------------

    APP_NAME: "EmpireFlix",

    STUDIO: "Dream Force Production",

    VERSION: "1.0.0",

    BUILD: "2026.08.01",

    CACHE_NAME: "empireflix-cache-v1",

    // -------------------------------------------------
    // DEFAULTS
    // -------------------------------------------------

    DEFAULT_LANGUAGE: "en",

    DEFAULT_THEME: "system",

    THEME_COLOR: "#0B0B0B",

    BACKGROUND_COLOR: "#050505",

    DEBUG_MODE: false,

    // -------------------------------------------------
    // ASSETS
    // -------------------------------------------------

    ASSETS: {

        LOGO: "assets/logos/empireflix-logo.webp",

        FALLBACK_POSTER:
            "assets/logos/fallback-poster.webp",

        FALLBACK_BANNER:
            "assets/logos/fallback-banner.webp",

        FALLBACK_THUMBNAIL:
            "assets/logos/fallback-thumbnail.webp",

        FALLBACK_VIDEO:
            "assets/videos/error-fallback.mp4",

        POSTERS:
            "assets/posters/",

        BANNERS:
            "assets/banners/",

        LOGOS:
            "assets/logos/",

        THUMBNAILS:
            "assets/thumbnails/",

        VIDEOS:
            "assets/videos/",

        SUBTITLES:
            "assets/subtitles/",

        ICONS:
            "assets/icons/"
    },

    // -------------------------------------------------
    // ROUTES
    // -------------------------------------------------

    ROUTES: {

        HOME: "index.html",

        MOVIE: "movie.html",

        PLAYER: "player.html",

        SERIES: "series.html",

        EPISODE: "episode.html",

        SEARCH: "search.html",

        MYLIST: "mylist.html",

        CONTINUE: "continue.html",

        HISTORY: "history.html",

        SETTINGS: "settings.html",

        OFFLINE: "offline.html",

        ERROR_404: "404.html"
    },

    // -------------------------------------------------
    // PLAYER
    // -------------------------------------------------

    PLAYER: {

        DEFAULT_VOLUME: 1,

        AUTOPLAY: true,

        SKIP_INTRO: true,

        AUTO_NEXT_EPISODE: true,

        SAVE_PROGRESS_INTERVAL: 5,

        DOUBLE_TAP_SKIP: 10,

        SEEK_STEP: 10
    },

    // -------------------------------------------------
    // STORAGE KEYS
    // -------------------------------------------------

    STORAGE: {

        SETTINGS: "empireflix-settings",

        HISTORY: "empireflix-history",

        MYLIST: "empireflix-mylist",

        CONTINUE: "empireflix-continue",

        SEARCH_HISTORY: "empireflix-search",

        THEME: "empireflix-theme"
    },

    // -------------------------------------------------
    // LIMITS
    // -------------------------------------------------

    LIMITS: {

        MAX_CONTINUE_WATCHING: 30,

        MAX_HISTORY: 200,

        MAX_MYLIST: 500,

        MAX_SEARCH_HISTORY: 20
    },

    // -------------------------------------------------
    // PERFORMANCE
    // -------------------------------------------------

    PERFORMANCE: {

        IMAGE_LAZY_LOADING: true,

        IMAGE_DECODING: "async",

        ANIMATION_DURATION: 300
    }

};

// Prevent accidental changes
Object.freeze(CONFIG);
Object.freeze(CONFIG.ASSETS);
Object.freeze(CONFIG.ROUTES);
Object.freeze(CONFIG.PLAYER);
Object.freeze(CONFIG.STORAGE);
Object.freeze(CONFIG.LIMITS);
Object.freeze(CONFIG.PERFORMANCE);