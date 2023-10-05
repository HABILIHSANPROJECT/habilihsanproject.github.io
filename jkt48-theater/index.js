
import { qualityPickerPlugin } from "https://raw.githubusercontent.com/sahilkashyap64/hls/master/js/vjs-quality-picker.js?v=v0.0.2"
document.addEventListener("DOMContentLoaded", function () {
    const player = videojs("video-player", {
        techOrder: ["html5"],
        controls: true,
        autoplay: true,
        fluid: true,
        html5: {
            hls: {
                enableLowInitialPlaylist: true, // Start with lower quality for faster playback
            }
        }
    })
    player.qualityPickerPlugin = qualityPickerPlugin
    player.qualityPickerPlugin()
    player.src({
        src: "https://content.jwplatform.com/manifests/yp34SRmf.m3u8",
        type: "application/x-mpegURL"
    })
})
/*let resolution = []

axios.get("https://console.firebase.google.com/project/jkt48-theater/database/jkt48-theater-default-rtdb/data?hl=id").then(function (response) {
    resolution = response.data
})

document.addEventListener("DOMContentLoaded", function () {
    const player = videojs("video-player", {
        techOrder: ["html5"],
        controls: true,
        autoplay: true,
        fluid: true,
        html5: {
            hls: {
                enableLowInitialPlaylist: true, // Start with lower quality for faster playback
            }
        }
        
    })

    // Define the M3U8 playlist URL
    const m3u8Url = "https://hls-origin244.showroom-cdn.com/liveedge/ngrp:47169adbc150e532e2c5e62ab9d7fad1eb3442bdcfb28e8841db771cbd5b02a9_all/playlist.m3u8"
    // Load the M3U8 playlist
    player.src({
        src: m3u8Url,
        type: "application/x-mpegURL"
    })

    player.qualitySelector()

    /*
        fetch(m3u8Url)
            .then(response => response.text())
            .then(data => {
                const resolutions = []
    
                // Parse the M3U8 playlist for available resolutions
                data.split("\n").forEach(line => {
                    if (line.startsWith("#EXT-X-STREAM-INF")) {
                        const matches = /RESOLUTION=(\d+x\d+)/.exec(line)
                        if (matches) {
                            resolutions.push(matches[1])
                        }
                    }
                })
    
                // Populate the resolution selector dropdown
                const resolutionSelector = document.getElementById("resolution")
                resolutions.forEach(resolution => {
                    const option = document.createElement("option")
                    option.value = resolution
                    option.text = resolution
                    resolutionSelector.appendChild(option)
                })
    
                // Event listener to change video quality on resolution change
                resolutionSelector.addEventListener("change", function() {
                    const selectedResolution = this.value
                    player.src([
                        {
                            src: m3u8Url,
                            type: "application/x-mpegURL",
                            label: selectedResolution,
                            selected: true,
                        }
                    ])
                })
            })
})
*/