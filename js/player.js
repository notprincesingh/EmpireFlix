'use strict';

let player;
let currentMovie = null;

document.addEventListener("DOMContentLoaded", async () => {

    const loaded = await DB.init();

    if (!loaded) return;

    const movieId = Utils.getQuery("id");

    currentMovie = DB.getById(movieId);

    if (!currentMovie) {

        window.location.replace("404.html");

        return;

    }

    document.getElementById("video-title").textContent = currentMovie.title;

});

function onYouTubeIframeAPIReady() {

    loadMovie();

}

function loadMovie() {

    if (!currentMovie) {

        setTimeout(loadMovie, 200);

        return;

    }

    const videoId = getYouTubeId(currentMovie.video);

    player = new YT.Player("youtube-player", {

        width: "100%",

        height: "100%",

        videoId: videoId,

        playerVars: {

            autoplay: 1,

            rel: 0,

            modestbranding: 1,

            playsinline: 1

        },

        events: {

            onReady: onPlayerReady,

            onStateChange: onPlayerStateChange

        }

    });

}

function getYouTubeId(url) {

    if (url.includes("/embed/")) {

        return url.split("/embed/")[1].split("?")[0];

    }

    if (url.includes("watch?v=")) {

        return url.split("watch?v=")[1].split("&")[0];

    }

    if (url.includes("youtu.be/")) {

        return url.split("youtu.be/")[1].split("?")[0];

    }

    return url;

}function onPlayerReady(event) {

    // Resume from saved position
    const savedTime = StorageManager.getProgress(currentMovie.id);

    if (savedTime > 0) {
        player.seekTo(savedTime, true);
    }

    // Save progress every 5 seconds
    setInterval(() => {

        if (player && player.getCurrentTime) {

            StorageManager.saveProgress(
                currentMovie.id,
                player.getCurrentTime()
            );

        }

    }, 5000);

}

function onPlayerStateChange(event) {

    // Movie Finished
    if (event.data === YT.PlayerState.ENDED) {

        StorageManager.saveProgress(currentMovie.id, 0);

        if (Utils.showToast) {
            Utils.showToast("Finished Watching");
        }

    }

}

// Keyboard Shortcuts
document.addEventListener("keydown", (e) => {

    if (!player) return;

    switch (e.key.toLowerCase()) {

        case " ":

            e.preventDefault();

            const state = player.getPlayerState();

            if (state === YT.PlayerState.PLAYING) {

                player.pauseVideo();

            } else {

                player.playVideo();

            }

            break;

        case "arrowright":

            player.seekTo(player.getCurrentTime() + 10, true);

            break;

        case "arrowleft":

            player.seekTo(player.getCurrentTime() - 10, true);

            break;

        case "m":

            if (player.isMuted()) {

                player.unMute();

            } else {

                player.mute();

            }

            break;

        case "f":

            const element = document.documentElement;

            if (!document.fullscreenElement) {

                element.requestFullscreen();

            } else {

                document.exitFullscreen();

            }

            break;

    }

});
