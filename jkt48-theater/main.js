$(window).on('load', function () {
    //$('#m3u8-placeholder')[0].value = "https://hls-origin213.showroom-cdn.com/liveedge/ngrp:89f9bdbbddbac79d7c7be67799c8417c61c84bcaf80398d774aa3d6ab3070808_all/chunklist_b3399680.m3u8" || '';
    $('#play-btn').on('click', function () {
        //localStorage.setItem('m3u8-link', $('#m3u8-placeholder')[0].value);
        window.location.href = './player/index.html#https://hls-origin276.showroom-cdn.com/liveedge/ngrp:4bc3f677066576f680862a4cb20b857040bbff0f89afb4150ca49c0d17838b77_all/playlist.m3u8'
    });
});
