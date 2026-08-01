'use strict';

/*
===========================================
EmpireFlix Player
Dream Force Production
===========================================
*/

document.addEventListener("DOMContentLoaded", async () => {

    const loaded = await DB.init();

    if (!loaded) return;

    const movieId = Utils.getQuery("id");

    const movie = DB.getById(movieId);

    if (!movie) {

        window.location.href = "404.html";

        return;

    }

    initializePlayer(movie);

});

function initializePlayer(movie) {

    const video = document.getElementById("video-player");
    
    const youtube = document.getElementById("youtube-player");

    const playBtn = document.getElementById("play-btn");

    const pauseBtn = document.getElementById("pause-btn");

    const muteBtn = document.getElementById("mute-btn");

    const fullscreenBtn = document.getElementById("fullscreen-btn");

    const progress = document.getElementById("progress");

    const volume = document.getElementById("volume");

    const currentTime = document.getElementById("current-time");

    const duration = document.getElementById("duration");

    const title = document.getElementById("video-title");

   if (title) {
    title.textContent = movie.title;
}

    if (movie.video.includes("youtube.com/embed")) {

    video.style.display = "none";

    youtube.style.display = "block";

    youtube.src = movie.video + "?autoplay=1&rel=0";

    document.querySelector(".player-controls").style.display = "none";

    return;

} else {

    youtube.style.display = "none";

    video.style.display = "block";

    video.src = movie.video;

}

    video.volume = CONFIG.PLAYER.DEFAULT_VOLUME;

    // Resume previous position

    const savedTime = StorageManager.getProgress(movie.id);

    video.addEventListener("loadedmetadata", () => {

        if (savedTime > 0 && savedTime < video.duration) {

            video.currentTime = savedTime;

        }

        duration.textContent = Utils.formatTime(video.duration);

    });

    // Play

    playBtn.onclick = () => video.play();

    // Pause

    pauseBtn.onclick = () => video.pause();

    // Volume

    volume.oninput = () => {

        video.volume = volume.value;

    };

    // Mute

    muteBtn.onclick = () => {

        video.muted = !video.muted;

        muteBtn.textContent = video.muted ? "🔇" : "🔊";

    };

    // Fullscreen

    fullscreenBtn.onclick = () => {

        if (!document.fullscreenElement) {

            document.documentElement.requestFullscreen();

        } else {

            document.exitFullscreen();

        }

    };

    // Update Progress

    video.addEventListener("timeupdate", () => {

        currentTime.textContent = Utils.formatTime(video.currentTime);

        progress.value =

            (video.currentTime / video.duration) * 100 || 0;

        StorageManager.saveProgress(

            movie.id,

            video.currentTime

        );

    });

    // Seek

    progress.oninput = () => {

        video.currentTime =

            (progress.value / 100) * video.duration;

    };

    // Finished

    video.addEventListener("ended", () => {

        StorageManager.saveProgress(movie.id, 0);

        Utils.showToast("Finished Watching");

    });

    // Keyboard Shortcuts

    document.addEventListener("keydown", e => {

        switch (e.key.toLowerCase()) {

            case " ":

                e.preventDefault();

                if (video.paused)

                    video.play();

                else

                    video.pause();

                break;

            case "arrowright":

                video.currentTime += 10;

                break;

            case "arrowleft":

                video.currentTime -= 10;

                break;

            case "m":

                video.muted = !video.muted;

                break;

            case "f":

                if (!document.fullscreenElement)

                    document.documentElement.requestFullscreen();

                else

                    document.exitFullscreen();

                break;

        }

    });

    // Auto-hide controls

    let timeout;

    const controls = document.querySelector(".player-controls");

    function showControls() {

        controls.classList.remove("hidden");

        clearTimeout(timeout);

        timeout = setTimeout(() => {

            if (!video.paused) {

                controls.classList.add("hidden");

            }

        }, 3000);

    }

    document.addEventListener("mousemove", showControls);

    document.addEventListener("touchstart", showControls);

    showControls();

}
