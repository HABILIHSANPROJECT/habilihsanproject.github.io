
document.addEventListener("DOMContentLoaded", function () {
    const player = videojs("video-player", {
        controls: true,
        autoplay: true,
        fluid: true,
        html5: {
            hls: {
                enableLowInitialPlaylist: true,
            }
        },
        displayCurrentQuality: true
    })
    player.src({
        src: "https://hls-origin280.showroom-cdn.com/liveedge/ngrp:7612e3ed2f3f9a3f94882b2413c82d9119f9ef7463bb9a88ab2a6660fdcf6a9b_all/chunklist_b3399680.m3u8",
        type: "application/x-mpegURL"
    })
})