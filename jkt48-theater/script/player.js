axios.get("https://raw.githubusercontent.com/HABILIHSANPROJECT/habilihsanproject.github.io/main/jkt48-theater/res/firebase.json").then(function (response) {
    const firebaseConfig = response.data
    firebase.initializeApp(firebaseConfig)
    firebase.analytics()

    let link
    const database = firebase.database()
    const ref = database.ref("src")
    ref.on("value", function(snapshot) {
      // Handle the data from the snapshot here
      link = snapshot.val()
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
            src: link,
            type: "application/x-mpegURL"
        })
        player.on('error', function (e) {
            document.querySelector(".vjs-modal-dialog-content").innerText = "Tidak ada show yang berlangsung saat ini!"
        })
    })

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            console.log(user.email)
            // User logged in already or has just logged in.
            const logoutBtn = document.getElementById("logout-btn")
            // Function untuk menampilkan pesan error
            function showError(message) {
                alert(message)
            }

            // Function untuk menampilkan pesan berhasil
            function showSuccess(message) {
                alert(message)
            }

            logoutBtn.addEventListener("click", () => {
                firebase.auth().signOut()
                    .then(() => {
                        showSuccess("Logout berhasil!")
                        location.replace("../index.html")
                    })
                    .catch((error) => {
                        showError(error.message)
                    })
            })
        } else {
            // User not logged in or has just logged out.
        }
    })
})
