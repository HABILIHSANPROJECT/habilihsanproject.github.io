let api
let tokenPayment
let userData
let payment
let tokenData = []
let tokenPaid = []

window.addEventListener("contextmenu", function (e) {
    e.preventDefault()
})

axios.get("https://raw.githubusercontent.com/HABILIHSANPROJECT/habilihsanproject.github.io/main/jkt48-theater/res/firebase.json").then(function (response) {
    const firebaseConfig = response.data
    firebase.initializeApp(firebaseConfig)
    firebase.analytics()

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            let email = document.getElementById("email")
            email.value = user.email
            let userMail = user.email
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

            const database = firebase.database()
            const ref = database.ref("/")
            ref.on("value", function (snapshot) {
                if (snapshot.exists()) {
                    let users = Object.values(snapshot.val().token)
                    for (i = 0; i < users.length; i++) {
                        if (userMail == users[i].email) {
                            userData = true
                            tokenData.push(users[i].token)
                        }
                    }
                    if (tokenData == null) {
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
                            let paid = response.data.data
                            for (i = 0; i < paid.length; i++) {
                                tokenPayment = userMail + ":" + paid[i].link
                                tokenPaid.push(tokenPayment)
                            }
                            for (i = 0; i < tokenPaid.length; i++) {
                                if (tokenData[i] == tokenPaid[i]) {
                                    payment = true
                                    location.replace("../page/player.html")
                                } else {
                                    payment = false
                                    let buy = document.getElementById("buy")
                                    let loading = document.getElementById("loading")
                                    loading.style.display = "none"
                                    buy.style.display = "block"
                                }
                            }
                        })

                    let form = document.getElementById("payment-form")
                    form.style.display = "block"

                    let name = document.getElementById("name")
                    let phone = document.getElementById("phone")
                    form.addEventListener("submit", function (e) {
                        e.preventDefault()
                        const header = {
                            headers: {
                                "Authorization": `Bearer ${api}`
                            }
                        }

                        const body = {
                            "name": name.value,
                            "email": email.value,
                            "amount": 10000,
                            "mobile": phone.value,
                            "redirectUrl": "https://habilihsanproject.github.io/jkt48-theater/page/player",
                            "description": "Pembayaran JKT48 Theater"
                        }

                        axios.post("https://api.mayar.id/hl/v1/payment/create", body, header)
                            .then(function (response) {
                                console.log(response)
                                let a = "https://habilihsanproject.mayar.link/pl/8mg00i5svd"
                                let b = a.split("/")
                                let c = b[4]
                                let post = {
                                    "link": c,
                                    "email": email.value,
                                    "name": name.value,
                                    "mobile": phone.value,
                                    "token": email.value + ":" + "link"
                                }
                                const postDatabase = firebase.database()
                                const postRef = postDatabase.ref("token")
                                postRef.set(post)
                                    .then(function () {
                                        console.log("Data written successfully.")
                                    })
                                    .catch(function (error) {
                                        console.error("Error writing data:", error)
                                    })
                                location.replace(response.data.data.link)
                            }).catch(function (error) {
                                alert(error)
                            })
                    })
                } else {
                    location.reload()
                }
            })

        } else {
            location.replace("../index.html")
        }
    })
})

axios.get("https://jkt48.com/theater/schedule?lang=id").then(function (response) {
    let setlistNode = document.getElementById("setlist")
    let dateNode = document.getElementById("date")
    let timeNode = document.getElementById("time")
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
        const time = schedules.innerText.slice(0, 10)
        const setlist = shows.querySelectorAll("tr")[i].querySelectorAll("td")[1].innerText

        setlistNode.innerText = setlist
        dateNode.innerText = date
        timeNode.innerText = time

    }
})