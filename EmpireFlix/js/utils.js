'use strict';

/*
===========================================
EmpireFlix Utility Library
Dream Force Production
Version 1.0.0
===========================================
*/

const Utils = {

    // -----------------------------
    // Debounce
    // -----------------------------
    debounce(func, delay = 300) {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(null, args), delay);
        };
    },

    // -----------------------------
    // Throttle
    // -----------------------------
    throttle(func, limit = 200) {
        let waiting = false;

        return (...args) => {

            if (waiting) return;

            func.apply(null, args);

            waiting = true;

            setTimeout(() => {

                waiting = false;

            }, limit);

        };

    },

    // -----------------------------
    // Sleep
    // -----------------------------
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    // -----------------------------
    // Clamp Number
    // -----------------------------
    clamp(value, min, max) {

        return Math.min(Math.max(value, min), max);

    },

    // -----------------------------
    // Random ID
    // -----------------------------
    uuid() {

        return crypto.randomUUID();

    },

    // -----------------------------
    // Get URL Parameter
    // -----------------------------
    getQuery(name) {

        return new URLSearchParams(window.location.search).get(name);

    },

    // -----------------------------
    // Format Seconds
    // -----------------------------
    formatTime(seconds) {

        if (isNaN(seconds)) return "00:00";

        const h = Math.floor(seconds / 3600);

        const m = Math.floor((seconds % 3600) / 60);

        const s = Math.floor(seconds % 60);

        if (h > 0) {

            return `${h}:${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;

        }

        return `${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;

    },

    // -----------------------------
    // Runtime Parser
    // -----------------------------
    parseRuntime(runtime) {

        if (!runtime) return 0;

        let minutes = 0;

        const h = runtime.match(/(\d+)h/i);

        const m = runtime.match(/(\d+)m/i);

        if (h) minutes += Number(h[1]) * 60;

        if (m) minutes += Number(m[1]);

        return minutes;

    },

    // -----------------------------
    // Runtime Formatter
    // -----------------------------
    formatRuntime(minutes) {

        const h = Math.floor(minutes / 60);

        const m = minutes % 60;

        if (h <= 0) return `${m} min`;

        return `${h}h ${m}m`;

    },

    // -----------------------------
    // Date Formatter
    // -----------------------------
    formatDate(date) {

        return new Date(date).toLocaleDateString();

    },

    // -----------------------------
    // Escape HTML
    // -----------------------------
    escapeHTML(text) {

        const div = document.createElement("div");

        div.textContent = text;

        return div.innerHTML;

    },

    // -----------------------------
    // Copy Text
    // -----------------------------
    async copy(text) {

        try {

            await navigator.clipboard.writeText(text);

            return true;

        } catch {

            return false;

        }

    },

    // -----------------------------
    // Shuffle Array
    // -----------------------------
    shuffle(array) {

        return [...array].sort(() => Math.random() - 0.5);

    },

    // -----------------------------
    // Image Fallback
    // -----------------------------
    handleBrokenImage(img) {

        if (img.src !== CONFIG.ASSETS.FALLBACK_POSTER) {

            img.src = CONFIG.ASSETS.FALLBACK_POSTER;

        }

    },

    // -----------------------------
    // Toast Notification
    // -----------------------------
    showToast(message = "") {

        const toast = document.createElement("div");

        toast.className = "toast";

        toast.textContent = message;

        document.body.appendChild(toast);

        requestAnimationFrame(() => toast.classList.add("show"));

        setTimeout(() => {

            toast.classList.remove("show");

            setTimeout(() => toast.remove(),300);

        },2500);

    },

    // -----------------------------
    // Scroll Top
    // -----------------------------
    scrollTop() {

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    },

    // -----------------------------
    // Local Storage
    // -----------------------------
    save(key,data){

        localStorage.setItem(key,JSON.stringify(data));

    },

    load(key,defaultValue=[]){

        try{

            return JSON.parse(localStorage.getItem(key)) ?? defaultValue;

        }

        catch{

            return defaultValue;

        }

    },

    remove(key){

        localStorage.removeItem(key);

    }

};

Object.freeze(Utils);