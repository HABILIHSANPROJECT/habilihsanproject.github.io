axios.get("https://raw.githubusercontent.com/HABILIHSANPROJECT/habilihsanproject.github.io/main/jkt48-pm/r/firebase.json")
    .then(function (response) {
        const firebaseConfig = response.data
        firebase.initializeApp(firebaseConfig)
        firebase.analytics()
        
        function showError(message) { alert(message) }
        function showSuccess(message) { alert(message) }

        window.addEventListener("DOMContentLoaded", () => {
            let emailInput = document.getElementById("email")
            let passwordInput = document.getElementById("password")
            document.getElementById("login").addEventListener("click", (e) => {
                e.preventDefault()
                const email = emailInput.value
                const password = passwordInput.value

                firebase.auth().signInWithEmailAndPassword(email, password)
                    .then(() => {
                        firebase.auth().onAuthStateChanged(function (user) {
                            if (user) {
                                location.replace("./p/message.html")                        
                            } else {
                                location.reload()
                            }
                        })
                        showSuccess("Login berhasil!")
                    })
                    .catch((error) => {
                        showError("Data kamu tidak ditemukan! Silahkan registrasi terlebih dulu!")
                        location.replace("./p/register.html")
                    })
            })
            const toggleIcon = document.getElementById("toggleIcon")
            document.getElementById("togglePassword").addEventListener("click", () => {
                if (passwordInput.type === "password") {
                    passwordInput.type = "text"
                    toggleIcon.classList.remove("bi-eye-slash")
                    toggleIcon.classList.add("bi-eye")
                } else {
                    passwordInput.type = "password"
                    toggleIcon.classList.remove("bi-eye")
                    toggleIcon.classList.add("bi-eye-slash")
                }
            })

        })
    })

    axios.get("https://api.ipify.org?format=json").then(function (response) {
        localStorage.setItem("ip",response.data.ip)
    })