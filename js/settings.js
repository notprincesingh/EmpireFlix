'use strict';

document.addEventListener("DOMContentLoaded", () => {

    const settings = StorageManager.getSettings();

    const theme = document.getElementById("theme");

    const volume = document.getElementById("default-volume");

    const autoplay = document.getElementById("autoplay");

    const skipIntro = document.getElementById("skip-intro");

    const nextEpisode = document.getElementById("next-episode");

    theme.value = settings.theme;

    volume.value = settings.volume;

    autoplay.checked = settings.autoplay;

    skipIntro.checked = settings.subtitles || false;

    nextEpisode.checked = settings.nextEpisode || false;

    document.getElementById("save-settings").onclick = () => {

        StorageManager.saveSettings({

            theme: theme.value,

            language: "en",

            autoplay: autoplay.checked,

            subtitles: skipIntro.checked,

            volume: Number(volume.value),

            nextEpisode: nextEpisode.checked

        });

        Utils.showToast("Settings Saved");

    };

    document.getElementById("clear-storage").onclick = () => {

        if (!confirm("Delete all local data?")) return;

        localStorage.clear();

        Utils.showToast("Local data cleared");

        setTimeout(() => {

            location.reload();

        }, 1000);

    };

});