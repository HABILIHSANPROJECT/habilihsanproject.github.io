// Mendapatkan elemen canvas dan menginisialisasi konteks 2D
var canvas = document.getElementById("gameArea");
var c = canvas.getContext("2d");

// Mengatur ukuran canvas sesuai dengan ukuran jendela browser
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Objek Duck yang mewakili karakter pemain
var duck = {
    img: new Image(),
    x: 10,
    y: 200,
    height: 80,
    width: 80,
    speed: 5
};

// Objek Enemy yang mewakili musuh
var enemy = {
    height: 80,
    width: 60,
    spawnClock: 15
};

var water = {
    height: 10,
    width: 40,
    spawnClock: 1
};

// Objek Splat
var splat = {
    height: 200,
    width: 200
}

// Objek Flora
var flora = {
    height: 260,
    width: 200
}

// Gambar untuk efek splat dan background
var splatImg = new Image();
var waterImg = new Image
var bgMenu = new Image();
var bgPlay = new Image();
var duckImg = new Image();
var enemyImg = new Image();
var duckShrinkImg = new Image();
var floraImg = new Image();

var soundImg = {
    on: new Image(),
    off: new Image()
}

var sound = new Audio("./sounds/sound.mp3");
sound.volume = 0.5

var sounding = true

soundImg.on.src = "./assets/soundOn.png"
soundImg.off.src = "./assets/soundOff.png"

floraImg.src = "./assets/flora.png"
splatImg.src = "./assets/splat.png"
waterImg.src = "./assets/water.png"
bgMenu.src = "./assets/bgMenu.png"
bgPlay.src = "./assets/bgPlay.png"
duckImg.src = "./assets/duck.png"
enemyImg.src = "./assets/enemy.png"
duckShrinkImg.src = "./assets/duckShrink.png"

// Tinggi UI (User Interface)
var UIHeight = 50;

// Array untuk menyimpan musuh-musuh yang aktif di layar
var enemies = [];
var waters = []

// Status permainan
var playing = false;

// Skor pemain
var score = 0;

// Waktu mulai permainan
var startTime = Date.now();

var menu = true

// Mendengarkan pergerakan mouse dan sentuhan untuk mengatur posisi duck
canvas.addEventListener('mousemove', duckSetPos, false);
canvas.addEventListener('touchmove', duckSetPosTouch, false);

// RequestAnimationFrame untuk animasi
var requestAnimationFrame = window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame;

// Status game over
var gameOver = false;

// Fungsi untuk menggambar layar game over
function drawGameOverScreen() {
    //drawDuckShrink()

    c.fillStyle = "rgba(0, 0, 0, 0.5)";
    c.fillRect(0, 0, canvas.width, canvas.height)

    c.fillStyle = "white";
    c.font = "100px Delicious Handrawn";
    c.textAlign = "center";
    c.fillText("Game Over", canvas.width / 2, canvas.height / 2 - 50);

    c.font = "60px Delicious Handrawn";
    c.fillText("Your Score: " + score, canvas.width / 2, canvas.height / 2 + 50);

    c.fillStyle = "#FFD700";
    c.font = "40px Delicious Handrawn";
    c.fillText("Click to Play Again", canvas.width / 2, canvas.height / 2 + 100);
    
    exitFullscreen()
}

function soundClick(ev) {
        var rect = canvas.getBoundingClientRect();
        var mouseX = ev.clientX - rect.left;
        var mouseY = ev.clientY - rect.top;

        if (sounding) {
            if (mouseX >= 25 && mouseX <= 65 &&
                mouseY >= 5 && mouseY <= 45) {
                sounding = false
                sound.pause()
            }
        } else {
            if (mouseX >= 25 && mouseX <= 65 &&
                mouseY >= 5 && mouseY <= 45) {
                sounding = true
                sound.play()
                sound.loop = true
            }
        }
}

function music() {
    canvas.addEventListener('mousedown', soundClick, true);
    if (sounding) {
        sound.play()
        sound.loop = true
    } else {
        sound.pause()
    }
}

// Fungsi untuk memulai permainan
function playGame() {
    if (playing) {
        gameOver = false
        menu = false
        var currentTime = Date.now();
        var elapsedTime = (currentTime - startTime) / 1000; // waktu yang telah berlalu dalam detik

        // Memunculkan musuh baru, menggerakkan duck dan musuh, dan memeriksa tabrakan
        spawnEnemy();
        spawnWater();
        moveDuck();
        moveEnemies();
        moveWater();
        checkCollision();

        drawBackground();
        drawWater();
        drawDuck();
        drawEnemies();
        

        // Menghitung skor berdasarkan waktu yang telah berlalu
        score = Math.floor(elapsedTime);

        drawUI();

        // Melakukan rekursi untuk terus memanggil fungsi playGame
        requestAnimationFrame(playGame);
    } else {
        // Jika permainan berakhir, menampilkan layar game over
        menu = false
        playing = false
        gameOver = true
        drawGameOverScreen();
    }
}

// Fungsi untuk memunculkan musuh baru
function spawnEnemy() {
    let bottom = canvas.height - 100
    if (enemy.spawnClock % 35 === 0) {
        enemies.push({
            x: canvas.width,
            y: randomInt(UIHeight + 10, bottom)
        });
    }
    enemy.spawnClock++;
}

function spawnWater() {
    let bottom = canvas.height - 100
    if (water.spawnClock % 5 === 0) {
        waters.push({
            x: canvas.width,
            y: randomInt(UIHeight + 10, bottom)
        });
    }
    water.spawnClock++;
}

// Fungsi untuk menggerakkan duck
function moveDuck() {
    if (duck.y <= UIHeight) {
        duck.y = UIHeight;
    }
    let bottomDuck = canvas.height - 50
    if (duck.y + duck.height >= bottomDuck) {
        duck.y = bottomDuck - duck.height;
    }
}

// Fungsi untuk menggerakkan musuh
function moveEnemies() {
    for (var i = 0; i < enemies.length; i++) {
        if (score < 60) {
            enemies[i].x -= 3;
        }
        if (score >= 60 && score < 100) {
            enemies[i].x -= 5;
        }
        if (score >= 100 && score < 300) {
            enemies[i].x -= 7.5;
        }
        if (score >= 300 && score < 600) {
            enemies[i].x -= 10;
        }
        if (score > 600) {
            enemies[i].x -= 15;
        }
    }
}

function moveWater() {
    for (var i = 0; i < waters.length; i++) {
        if (score < 60) {
            waters[i].x -= 3;
        }
        if (score >= 60 && score < 100) {
            waters[i].x -= 5;
        }
        if (score >= 100 && score < 300) {
            waters[i].x -= 7.5;
        }
        if (score >= 300 && score < 600) {
            waters[i].x -= 10;
        }
        if (score > 600) {
            waters[i].x -= 15;
        }
    }
}

// Fungsi untuk memeriksa tabrakan antara duck dan musuh
function checkCollision() {
    for (var i = 0; i < enemies.length; i++) {
        if (collision(duck, enemies[i])) {
            playing = false;
            gameOver = true;

            duckImg = new Image()
            duckImg.src = "./assets/duckShrink.png"
            c.drawImage(duckImg, duck.x, duck.y, duck.width, duck.height);
            break;
        }
    }
}

// Fungsi untuk mengecek tabrakan antara dua objek
function collision(obj1, obj2) {
    return obj1.x < obj2.x + (enemy.width - 15) &&
        obj1.x + (duck.width - 15) > obj2.x &&
        obj1.y < obj2.y + (enemy.height - 20) &&
        obj1.y + (duck.height - 50) > obj2.y;
}

// Fungsi untuk menggambar background
function drawBackground() {
    c.drawImage(bgPlay, 0, 0, canvas.width, canvas.height);
}

function drawBackgroundMenu() {
    c.drawImage(bgMenu, 10, 10, canvas.width, canvas.height);
}

// Fungsi untuk menggambar duck
function drawDuck() {
    c.drawImage(duckImg, duck.x, duck.y, duck.width, duck.height);
}

// Fungsi untuk menggambar musuh
function drawEnemies() {
    for (var i = 0; i < enemies.length; i++) {
        c.drawImage(enemyImg, enemies[i].x, enemies[i].y, enemy.width, enemy.height);
    }
}

function drawWater() {
    for (var i = 0; i < waters.length; i++) {
        c.drawImage(waterImg, waters[i].x, waters[i].y, water.width, water.height);
    }
}

// Fungsi untuk menggambar UI (User Interface)
function drawUI() {
    c.fillStyle = "#ff001a";
    c.fillRect(0, 0, canvas.width, UIHeight + 3);

    c.fillStyle = "#e4e4e4";
    c.fillRect(0, 0, canvas.width, UIHeight);

    c.fillStyle = "#000000";
    c.font = "40px Delicious Handrawn";
    c.fillText("Score: " + score, canvas.width - 200, 37);

    if (sounding) {
        c.drawImage(soundImg.on, 25, 5, 40, 40)
    } else {
        c.drawImage(soundImg.off, 25, 5, 40, 40)
    }
}

// Fungsi untuk mengatur posisi duck berdasarkan pergerakan mouse
function duckSetPos(ev) {
    duck.y = ev.clientY - canvas.offsetTop - (duck.height / 2);
}

// Fungsi untuk mengatur posisi duck berdasarkan pergerakan sentuhan
function duckSetPosTouch(ev) {
    ev.preventDefault();
    duck.y = ev.touches[0].clientY - canvas.offsetTop - (duck.height / 2);
}

// Fungsi untuk menghasilkan bilangan bulat acak di antara min dan max
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Mendengarkan perubahan ukuran jendela browser dan mengatur ulang ukuran canvas
window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Fungsi untuk menampilkan layar menu dan memulai permainan saat tombol "Start Game" diklik
function click(ev) {
    var rect = canvas.getBoundingClientRect();
    var mouseX = ev.clientX - rect.left;
    var mouseY = ev.clientY - rect.top;
    if (menu) {
        if (mouseX >= (canvas.width / 3) && mouseX <= (canvas.width - (canvas.width / 3)) &&
            mouseY >= (canvas.height / 3) && mouseY <= canvas.height) {
            startGame();
        }

        if (mouseX >= canvas.width - 200 && mouseX <= canvas.width - 10 &&
            mouseY >= canvas.height - 200 && mouseY <= canvas.height - 10) {
            window.open("https://x.com/HIBIKUN_", "_blank")
        }

        if (mouseX >= 10 && mouseX <= canvas.width - (canvas.width-200) &&
            mouseY >= canvas.height - 260 && mouseY <= canvas.height - 10) {
            window.open("https://twitter.com/FloRisenID/status/1775580080158449850", "_blank")
        }

    }

    if (gameOver) {
        c.clearRect(0, 0, canvas.width, canvas.height);
        location.reload()
    }

}

canvas.addEventListener('mousedown', click, false);

// Fungsi untuk menampilkan layar menu
function drawMenu() {
    c.drawImage(bgMenu, 0, 0, canvas.width, canvas.height);
    c.drawImage(splatImg, canvas.width - (splat.width + 10), canvas.height - (splat.height + 10), splat.width, splat.height)
    c.drawImage(floraImg, 10, canvas.height - (flora.height + 20), flora.width, flora.height)
}

// Fungsi untuk memulai permainan
function startGame() {
    playing = true;
    menu = false
    gameOver = false
    score = 0;
    requestAnimationFrame(playGame);
    requestFullscreen()
    music()
}

function requestFullscreen() {
    var element = document.documentElement;
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) { /* Firefox */
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) { /* IE/Edge */
        element.msRequestFullscreen();
    }
}

function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { /* Firefox */
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { /* Chrome, Safari & Opera */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE/Edge */
        document.msExitFullscreen();
    }
}

// Menampilkan layar menu saat pertama kali permainan dimuat
bgMenu.onload = function () {
    drawMenu();
};
