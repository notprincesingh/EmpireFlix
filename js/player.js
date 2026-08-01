'use strict';

let player;
let movie;

document.addEventListener("DOMContentLoaded", async () => {

    const loaded = await DB.init();

    if (!loaded) return;

    const id = Utils.getQuery("id");

    movie = DB.getById(id);

    if (!movie) {

        window.location.replace("404.html");

        return;

    }

    document.getElementById("title").textContent = movie.title;

});

function onYouTubeIframeAPIReady() {

    waitForMovie();

}

function waitForMovie() {

    if (!movie) {

        setTimeout(waitForMovie, 100);

        return;

    }

    const videoId = extractVideoId(movie.video);

    player = new YT.Player("player", {

        width: "100%",

        height: "100%",

        videoId: videoId,

        playerVars: {

            autoplay: 1,

            controls: 1,

            rel: 0,

            modestbranding: 1,

            fs: 1,

            iv_load_policy: 3,

            playsinline: 1

        },

        events: {

            onReady: onPlayerReady,

            onStateChange: onPlayerStateChange

        }

    });

}

function extractVideoId(url) {

    if (url.includes("embed/"))

        return url.split("embed/")[1].split("?")[0];

    if (url.includes("watch?v="))

        return url.split("watch?v=")[1].split("&")[0];

    if (url.includes("youtu.be/"))

        return url.split("youtu.be/")[1].split("?")[0];

    return url;

}

function onPlayerReady() {

    console.log("EmpireFlix Player Ready");

}

function onPlayerStateChange(event) {

    if (event.data === YT.PlayerState.ENDED) {

        console.log("Movie Finished");

    }

}

document.addEventListener("keydown", e => {

    if (!player) return;

    switch(e.key.toLowerCase()) {

        case " ":

            e.preventDefault();

            if(player.getPlayerState()===YT.PlayerState.PLAYING)

                player.pauseVideo();

            else

                player.playVideo();

            break;

        case "arrowright":

            player.seekTo(player.getCurrentTime()+10,true);

            break;

        case "arrowleft":

            player.seekTo(player.getCurrentTime()-10,true);

            break;

        case "m":

            if(player.isMuted())

                player.unMute();

            else

                player.mute();

            break;

        case "f":

            const el=document.documentElement;

            if(!document.fullscreenElement)

                el.requestFullscreen();

            else

                document.exitFullscreen();

            break;

    }

});
