let link
let api
let userData
let payment
let tokenData = []
let tokenPayment = []
//  let token
//  let email

window.addEventListener('contextmenu', function (e) {
    e.preventDefault()
})

axios.get("https://raw.githubusercontent.com/HABILIHSANPROJECT/habilihsanproject.github.io/main/jkt48-theater/res/firebase.json").then(function (response) {
    const firebaseConfig = response.data
    firebase.initializeApp(firebaseConfig)
    firebase.analytics()

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            const logoutBtn = document.getElementById("logout-btn")
            //  const email = document.getElementById("email")
            //  const tokenInput = document.getElementById("token")
            //  const submit = document.getElementById("submit")
            console.log(user.email)
            let userMail = user.email
            let players = document.getElementById("player")
            let loading = document.getElementById("loading")
            //  email.value = user.email

            $(document).ready(function () {
                //  document.getElementById("email").value = user.email
                //  $("#myModal").modal("show")

                const database = firebase.database()
                const ref = database.ref("/")
                ref.on("value", function (snapshot) {
                    if (snapshot.exists()) {
                        let users = Object.values(snapshot.val().token)
                        for (i = 0; i < users.length; i++) {
                            if (userMail = users[i].email) {
                                userData = true
                                tokenData.push(users[i].link)
                            } else {
                                userData = false
                            }
                        }
                        if (userData == false) {
                            alert("Data anda tidak ditemukan! Silahkan sign up terlebih dulu!")
                            location.replace("../page/signup.html")
                        }

                        api = snapshot.val().payment
                        const header = {
                            headers: {
                                "Authorization": `Bearer ${api}`
                            }
                        }
                        axios.get("https://api.mayar.id/hl/v1/payment?status=paid", header)
                            .then(function (response) {
                                let token = response.data.data
                                for (i = 0; i < token.length; i++) {
                                    tokenPayment.push(token[i].link)
                                }
                                for (i = 0; i < tokenPayment.length; i++) {
                                    if (tokenData[i] = tokenPayment[i]) {
                                        payment = true
                                        players.style.display = "block"
                                        loading.style.display = "none"
                                    } else {
                                        payment = false
                                    }
                                }
                                if (payment == false) {
                                    alert("Data pembelian anda tidak ditemukan! Silahkan beli tiket terlebih dulu!")
                                    location.replace("../page/payment.html")
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
                    } else {
                        location.reload()
                    }
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

        } else {
        }
    })
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