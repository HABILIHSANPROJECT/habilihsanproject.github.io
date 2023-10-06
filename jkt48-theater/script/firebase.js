axios.get("https://raw.githubusercontent.com/HABILIHSANPROJECT/habilihsanproject.github.io/main/jkt48-theater/res/firebase.json").then(function (response) {
    const firebaseConfig = response.data
    firebase.initializeApp(firebaseConfig)
    firebase.analytics()

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