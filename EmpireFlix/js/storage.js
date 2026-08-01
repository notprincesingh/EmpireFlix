'use strict';

/*
===========================================
EmpireFlix Storage Manager
Dream Force Production
Version 1.0.0
===========================================
*/

const StorageManager = (() => {

    // -----------------------------
    // Save
    // -----------------------------

    function save(key, value) {

        try {

            localStorage.setItem(key, JSON.stringify(value));

            return true;

        } catch (error) {

            console.error("Storage Save Error:", error);

            return false;

        }

    }

    // -----------------------------
    // Load
    // -----------------------------

    function load(key, defaultValue = null) {

        try {

            const data = localStorage.getItem(key);

            return data ? JSON.parse(data) : defaultValue;

        } catch (error) {

            console.error("Storage Load Error:", error);

            return defaultValue;

        }

    }

    // -----------------------------
    // Remove
    // -----------------------------

    function remove(key) {

        localStorage.removeItem(key);

    }

    // -----------------------------
    // Clear
    // -----------------------------

    function clear() {

        localStorage.clear();

    }

    // =============================
    // Continue Watching
    // =============================

    function getContinueWatching() {

        return load(CONFIG.STORAGE.CONTINUE, []);

    }

    function saveContinueWatching(list) {

        save(CONFIG.STORAGE.CONTINUE, list);

    }

    // =============================
    // Watch History
    // =============================

    function getHistory() {

        return load(CONFIG.STORAGE.HISTORY, []);

    }

    function saveHistory(list) {

        save(CONFIG.STORAGE.HISTORY, list);

    }

    // =============================
    // My List
    // =============================

    function getMyList() {

        return load(CONFIG.STORAGE.MYLIST, []);

    }

    function saveMyList(list) {

        save(CONFIG.STORAGE.MYLIST, list);

    }

    // =============================
    // Search History
    // =============================

    function getSearchHistory() {

        return load(CONFIG.STORAGE.SEARCH_HISTORY, []);

    }

    function saveSearchHistory(list) {

        save(CONFIG.STORAGE.SEARCH_HISTORY, list);

    }

    // =============================
    // Settings
    // =============================

    function getSettings() {

        return load(CONFIG.STORAGE.SETTINGS, {

            theme: CONFIG.DEFAULT_THEME,

            language: CONFIG.DEFAULT_LANGUAGE,

            autoplay: true,

            subtitles: false,

            volume: 1

        });

    }

    function saveSettings(settings) {

        save(CONFIG.STORAGE.SETTINGS, settings);

    }

    // =============================
    // Player Progress
    // =============================

    function saveProgress(movieId, seconds) {

        let progress = load("empireflix-progress", {});

        progress[movieId] = seconds;

        save("empireflix-progress", progress);

    }

    function getProgress(movieId) {

        const progress = load("empireflix-progress", {});

        return progress[movieId] || 0;

    }

    // =============================
    // Public API
    // =============================

    return {

        save,

        load,

        remove,

        clear,

        getContinueWatching,

        saveContinueWatching,

        getHistory,

        saveHistory,

        getMyList,

        saveMyList,

        getSearchHistory,

        saveSearchHistory,

        getSettings,

        saveSettings,

        saveProgress,

        getProgress

    };

})();