let api
let tokenPayment
let userData
let pageCount
let paymentList = []
let tokenData = []
let tokenPaid = []

window.addEventListener("contextmenu", function (e) {
    e.preventDefault()
})

axios.get("https://raw.githubusercontent.com/HABILIHSANPROJECT/habilihsanproject.github.io/main/jkt48-theater/r/firebase.json").then(function (response) {
    const firebaseConfig = response.data
    firebase.initializeApp(firebaseConfig)
    firebase.analytics()

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            console.log(user.email)
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
                    for (let i = 0; i < users.length; i++) {
                        if (userMail == users[i].email) {
                            userData = true
                            tokenData.push(users[i].token)
                            let fetch = document.getElementById("fetch")
                            fetch.style.display = "block"
                        } else {
                            let buy = document.getElementById("buy")
                            let loading = document.getElementById("loading")
                            loading.style.display = "none"
                            buy.style.display = "block"
                        }
                    }
                    if (tokenData == null) {
                        alert("Data kamu tidak ditemukan! Silahkan sign up terlebih dulu!")
                        location.replace("../p/signup.html")
                    }

                    api = snapshot.val().config.api
                    const header = {
                        headers: {
                            "Authorization": `Bearer ${api}`
                        }
                    }
                    axios.get("https://api.mayar.id/hl/v1/payment?status=paid", header)
                        .then(function (response) {
                            pageCount = response.data.pageCount
                            for (let z = 1; z < pageCount + 1; z++) {
                                axios.get(`https://api.mayar.id/hl/v1/payment?page=${z}&status=paid`, header)
                                    .then(function (response) {
                                        paymentList.push(...response.data.data)
                                        let paid = paymentList
                                        for (let i = 0; i < paid.length; i++) {
                                            tokenPayment = userMail + ":" + paid[i].link
                                            tokenPaid.push(tokenPayment)
                                        }
                                        for (let i = 0; i < tokenPaid.length; i++) {
                                            const a = tokenPaid[i]
                                            for (let j = 0; j < tokenData.length; j++) {
                                                const b = tokenData[j]
                                                if (a == b) {
                                                    location.replace("../p/player.html")
                                                } else {
                                                    let fetch = document.getElementById("fetch")
                                                    fetch.style.display = "none"
                                                    let buy = document.getElementById("buy")
                                                    let loading = document.getElementById("loading")
                                                    loading.style.display = "none"
                                                    buy.style.display = "block"
                                                }
                                            }
                                        }
                                    })
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
                            "amount": 15000,
                            "mobile": phone.value,
                            "redirectUrl": "https://habilihsanproject.github.io/jkt48-theater/p/player",
                            "description": "Pembayaran JKT48 Theater"
                        }

                        axios.post("https://api.mayar.id/hl/v1/payment/create", body, header)
                            .then(function (response) {
                                let a = response.data.data.link
                                let b = a.split("/")
                                let c = b[4]
                                let post = {
                                    "link": c,
                                    "mail": email.value,
                                    "email": email.value,
                                    "name": name.value,
                                    "mobile": phone.value,
                                    "token": email.value + ":" + c
                                }
                                let directlink = response.data.data.link
                                const firebaseUrl = "https://jkt48-theater-default-rtdb.asia-southeast1.firebasedatabase.app/token"
                                axios.post(`${firebaseUrl}.json`, post)
                                    .then(response => {
                                        console.log("Data has been posted successfully:", response.data)
                                        location.replace(directlink)
                                    })
                                    .catch(error => {
                                        console.error("Error posting data:", error)
                                        return
                                    })
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

axios.get("https://showroom-admin.vercel.app/schedules?isOnWeekSchedule=true").then(function (response) {
    let data_setlist = response.data

    let setlistDate = []
    response.data.forEach((date) => {
        setlistDate.push(date.showDate.split("T")[0])
    })
    
    let date = new Date()
    let d = date.getDate()
    let m = date.getMonth()
    if (Number(m) < 10) {
        m = `0${date.getMonth()}`
    }
    let y = date.getFullYear()

    let today = `${y}-${m}-${d}`

    let setlistNode = document.getElementById("setlist")
            let dateNode = document.getElementById("date")
            let timeNode = document.getElementById("time")
            let buy = document.getElementById("buy")
    for (i=0; i<setlistDate.length; i++) {
        if (today !== setlistDate[i]) {
            function off() {
                setlistNode.innerText = "Tidak ada show hari ini!"
                buy.disabled = true
            }
            return off()
        } else {
            function on() {
                setlistNode.innerText = data_setlist[i].setlist.name
            dateNode.innerText = data_setlist[i].showDate.split("T")[0]
            timeNode.innerText = data_setlist[i].showTime
            buy.disabled = false
            }
            return on()
        }
    }

})

/*
axios.get("https://jkt48.com/theater/schedule?lang=id").then(function (response) {
    let setlistNode = document.getElementById("setlist")
    let dateNode = document.getElementById("date")
    let timeNode = document.getElementById("time")
    let bundling = document.getElementById("bundling")
    const scrape = response.data
    let show = []

    const parser = new DOMParser()
    const html = parser.parseFromString(scrape, "text/html")
    const shows = html.querySelectorAll("table")[0]
    for (let i = 1; i < shows.querySelectorAll("tr").length; i += 3) {
        const schedules = shows.querySelectorAll("tr")[i].querySelectorAll("td")[0].querySelectorAll("font")[0]
        const scheduleNode = schedules.parentNode
        scheduleNode.removeChild(schedules)
        const dateText = scheduleNode.innerText.split(",")
        const date = dateText[0] + " / " + dateText[1]
        //const time = schedules.innerText.slice(0, 10)
        const setlist = shows.querySelectorAll("tr")[i].querySelectorAll("td")[1].innerText
        
    setlistNode.innerText = setlist
        show.push({ date, setlist })
        //dateNode.innerText = date
        //timeNode.innerText = time
    }
    show.reverse()


const buy = document.getElementById("setlist")
if (buy.innerText == "Ingin Bertemu") {
        console.log("true")
            const buy = document.getElementById("buy")
            if (buy) {
                buy.disabled = true
                buy.innerText = "Tiket untuk show ini tidak tersedia"
            }
        }
    
    /*
    const schedule = data => {
        const template1 = document.createElement("template")
        template1.innerHTML =
            `<p id="setlist" class="perform">${show[i].setlist} (${show[i].date})</p>`
                .trim()
        return template1.content.firstChild
    }
    for (i in show) {
        setlistNode.append(schedule())
    }
    //

    //bundling.innerText = `Pembelian tiket show theater yang tersedia saat ini bersifat bundling (${show.length} show)!`

 }) */