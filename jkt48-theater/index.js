
const schedule = []
const header = {
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "APIKEY",
        "APIKEY": "NGIDOLKAKAK"
    }
}
console.log(header)
axios.get("https://idol48.top/event", header).then(function(response) {
    schedule = response.data.events
    console.log(schedule)
})

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
        src: "https://hls-origin280.showroom-cdn.com/liveedge/7612e3ed2f3f9a3f94882b2413c82d9119f9ef7463bb9a88ab2a6660fdcf6a9b_source/chunklist.m3u8",
        type: "application/x-mpegURL"
    })
    player.on('error', function (e) {
        document.querySelector(".vjs-modal-dialog-content").innerText = "Tidak ada show yang berlangsung saat ini!"
      })
})