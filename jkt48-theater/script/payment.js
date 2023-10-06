axios.get("https://raw.githubusercontent.com/HABILIHSANPROJECT/habilihsanproject.github.io/main/jkt48-theater/res/firebase.json").then(function (response) {
    const firebaseConfig = response.data
    firebase.initializeApp(firebaseConfig)
    firebase.analytics()

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            let email = document.getElementById("email")
            email.value = user.email
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