let link
let token
let email

window.addEventListener('contextmenu', function (e) {
    e.preventDefault()
})

axios.get("https://raw.githubusercontent.com/HABILIHSANPROJECT/habilihsanproject.github.io/main/jkt48-theater/res/firebase.json").then(function (response) {
    const firebaseConfig = response.data
    firebase.initializeApp(firebaseConfig)
    firebase.analytics()

    //firebase.auth().onAuthStateChanged((user) => {
        //if (user) {
            //console.log(user.email)
            //email = user.email
            // User logged in already or has just logged in.
            const logoutBtn = document.getElementById("logout-btn")
            const tokenInput = document.getElementById("token")
            const submit = document.getElementById("submit")

            $(document).ready(function () {
                //document.getElementById("email").value = user.email
                $("#myModal").modal("show")

                const database = firebase.database()
                const ref = database.ref("/")
                ref.on("value", function (snapshot) {
                    // Handle the data from the snapshot here
                    token = snapshot.val().token
                    submit.addEventListener("click", () => {
                        for (let i = 0; i < token.length; i++) {
                            if (tokenInput.value === token[i].uic) {
                                $("#myModal").modal("hide")
                                const player = document.getElementById("player")
                                player.style.display = "block"
                            } else {
                                document.getElementById("tokenError").innerText = "Token anda tidak tersedia!"
                            }
                        }
                    })

                    link = snapshot.val().src
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
                    player.on("error", function (e) {
                        document.querySelector(".vjs-modal-dialog-content").innerText = "Tidak ada show yang berlangsung saat ini!"
                    })
                })
            })

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

        //} else {
         //   location.reload()
            // User not logged in or has just logged out.
        //}
    //})
})

axios.get("https://jkt48.com/theater/schedule?lang=id").then(function (response) {
    let setlistNode = document.getElementById("setlist")
    let dateNode = document.getElementById("date")
  const scrape = response.data

  const parser = new DOMParser()
  const html = parser.parseFromString(scrape, "text/html")
  const shows = html.querySelectorAll("table")[0]
  for (let i = 1; i < shows.querySelectorAll("tr").length; i += 3) {
    const schedules = shows.querySelectorAll("tr")[i].querySelectorAll("td")[0].querySelectorAll("font")[0]
    const scheduleNode = schedules.parentNode
    scheduleNode.removeChild(schedules)
    const dateText = scheduleNode.innerText.split(",")
    const date = dateText[0] + " / " + dateText[1]
    const setlist = shows.querySelectorAll("tr")[i].querySelectorAll("td")[1].innerText
    
    setlistNode.innerText = setlist
    dateNode.innerText = date
  }
})