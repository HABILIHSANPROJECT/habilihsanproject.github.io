axios.get("https://jkt48-theater-default-rtdb.asia-southeast1.firebasedatabase.app/").then(function (response) {
    const firebaseConfig = response.data.data.config
    firebase.initializeApp(firebaseConfig)
    firebase.analytics()

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            console.log(user.email)
            // User logged in already or has just logged in.
            const logoutBtn = document.getElementById("logout-btn")
            const signupBtn = document.getElementById("signup-btn")
            const loginBtn = document.getElementById("login-btn")

            signupBtn.style.display = "none"
            loginBtn.style.display = "none"
            logoutBtn.style.display = "block"

            const link = document.querySelectorAll("a#link")
            for (let i = 0; i < link.length; i++) {
                link[i].classList.remove("disabled")
            }
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
                        signupBtn.style.display = "block"
                        loginBtn.style.display = "block"
                        logoutBtn.style.display = "none"

                        const link = document.querySelectorAll("a#link")
                        for (let i = 0; i < link.length; i++) {
                            link[i].classList.add("disabled")
                        }
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