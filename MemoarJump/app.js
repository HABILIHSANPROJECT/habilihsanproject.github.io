document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");
    const menu = document.getElementById("menu");
    const startButton = document.getElementById("startGame");
    const restartButton = document.getElementById("restartGame");

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let ZeeLeftSpace = 50;
    let ZeeBottomSpace = 150;
    let isGameOver = false;
    let platforms = [];
    let isJumping = true;
    let score = 0;
    let level = 1;
    let timers = {}; // Holds intervals to clear them later

    let zeeImages = [];
    let normalImages = [];
    let crackImages = [];

    // Load Zee images
    for (let i = 0; i <= 11; i++) {
        const img = new Image();
        img.src = `./zee/jump${i}.png`; // Ganti dengan path yang sesuai
        zeeImages.push(img);
        zeeImages.sort();
    }

    // Load platform images
    for (let i = 0; i <= 11; i++) {
        const normalImg = new Image();
        normalImg.src = `./platform/normal${i}.png`; // Ganti dengan path yang sesuai
        normalImages.push(normalImg);
        normalImages.sort();

        const crackImg = new Image();
        crackImg.src = `./platform/crack${i}.png`; // Ganti dengan path yang sesuai
        crackImages.push(crackImg);
        crackImages.sort();
    }

    // Load all images
    Promise.all([...zeeImages, ...normalImages, ...crackImages].map(img => new Promise(resolve => img.onload = resolve)))
        .then(startMenu)
        .catch(err => console.error("Error loading images:", err));

    function startMenu() {
        menu.style.display = "block"; // Show the menu
    }

    function startGame() {
        menu.style.display = "none"; // Hide the menu
        if (!isGameOver) {
            level = 1; // Start at level 1
            createPlatforms();
            drawEverything();
            timers.platforms = setInterval(() => {
                movePlatforms();
                drawEverything();
            }, 25);
            jump();
            document.addEventListener("touchmove", followTouch);
            document.addEventListener("mousemove", followMouse);
        } else {
            gameOver();
        }
    }

    function restartGame() {
        // Reset all game variables
        ZeeLeftSpace = 50;
        ZeeBottomSpace = 150;
        isGameOver = false;
        platforms = [];
        score = 0;
        level = 1;
        timers = {}; // Clear any existing timers

        // Hide game over menu and show game start menu
        restartButton.style.display = "none";
        menu.style.display = "none";
        startMenu(); // Show the menu again to start a new game
    }

    function createZee() {
        const ZeeImage = zeeImages[level % 12]; // Select image based on level
        ctx.drawImage(ZeeImage, ZeeLeftSpace, canvas.height - ZeeBottomSpace - 60, 60, 60); // Zee
    }

    class Platform {
        constructor(bottom, type = "normal") {
            this.bottom = bottom;
            this.left = Math.random() * (canvas.width - 85);
            this.type = type;
        }

        draw() {
            const img = this.type === "crack" ? crackImages[level % 12] : normalImages[level % 12];
            ctx.drawImage(img, this.left, canvas.height - this.bottom - 15, 85, 15);
        }

        incrementTouch() {
            if (this.type === "crack") {
                ZeeBottomSpace = this.bottom;
                jump();
                this.remove();
            }
        }

        remove() {
            platforms = platforms.filter(p => p !== this);
        }
    }

    function createPlatforms() {
        const types = ["normal", "crack"];
        for (let i = 0; i < 10; i++) {
            const bottom = 100 + i * (600 / 5);
            const type = types[Math.floor(Math.random() * types.length)];
            platforms.push(new Platform(bottom, type));
        }
    }

    function movePlatforms() {
        if (ZeeBottomSpace > 100) {
            platforms.forEach(platform => {
                platform.bottom -= 4;
                if (platform.bottom < 10) {
                    platform.remove();
                    score++;
                    for (let i = 0; i < zeeImages.length; i++) {
                        if (score >= i * 50) {
                            level = i;
                        } else {
                            break;
                        }
                    }
                    platforms.push(new Platform(canvas.height, ["normal", "crack"][Math.floor(Math.random() * 2)]));
                }
            });
        }
    }

    function jump() {
        clearInterval(timers.down);
        isJumping = true;
        timers.up = setInterval(() => {
            ZeeBottomSpace += 20;
            if (ZeeBottomSpace > 350) {
                fall();
            }
        }, 25);
    }

    function fall() {
        isJumping = false;
        clearInterval(timers.up);
        timers.down = setInterval(() => {
            ZeeBottomSpace -= 5;
            if (ZeeBottomSpace <= 0) {
                gameOver();
            }

            platforms.forEach(platform => {
                if (
                    ZeeBottomSpace >= platform.bottom &&
                    ZeeBottomSpace <= platform.bottom + 15 &&
                    ZeeLeftSpace + 60 >= platform.left &&
                    ZeeLeftSpace <= platform.left + 85 &&
                    !isJumping
                ) {
                    platform.incrementTouch();
                    if (platform.type !== "crack") {
                        ZeeBottomSpace = platform.bottom;
                        jump();
                    }
                    isJumping = true;
                }
            });

            drawEverything();
        }, 25);
    }

    function gameOver() {
        isGameOver = true;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = "30px Montserrat";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.fillText(`Game Over!`, canvas.width / 2, canvas.height / 2);
        ctx.fillText(`Score: ${score}`, canvas.width / 2, canvas.height / 1.8);

        // Show restart button
        restartButton.style.display = "block";

        // Stop all intervals
        clearInterval(timers.up);
        clearInterval(timers.down);
        clearInterval(timers.left);
        clearInterval(timers.right);

        // Remove event listeners
        document.removeEventListener("touchmove", followTouch);
        document.removeEventListener("mousemove", followMouse);
    }

    function drawEverything() {
        if (!isGameOver) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            platforms.forEach(platform => platform.draw());
            createZee();
            ctx.font = "30px Montserrat";
            ctx.fillStyle = "black";
            ctx.textAlign = "center";
            ctx.fillText(`Score: ${score}`, canvas.width / 2, 30);
        }
    }

    startButton.addEventListener("click", startGame);
    restartButton.addEventListener("click", restartGame);

    function followMouse(e) {
        const mouseX = e.pageX - canvas.offsetLeft;
        const canvasWidth = canvas.width;
        const ZeeWidth = 60;

        if (mouseX >= 0 && mouseX <= canvasWidth - ZeeWidth) {
            ZeeLeftSpace = mouseX;
            drawEverything();
        }
    }

    function followTouch(e) {
        e.preventDefault(); // Mencegah perilaku default seperti menggulir halaman

        const touchX = e.touches[0].pageX - canvas.offsetLeft; // Ambil posisi sentuhan pertama
        const canvasWidth = canvas.width;
        const ZeeWidth = 60;

        if (touchX >= 0 && touchX <= canvasWidth - ZeeWidth) {
            ZeeLeftSpace = touchX;
            drawEverything();
        }
    }
});
