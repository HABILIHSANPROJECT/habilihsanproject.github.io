axios.get("https://raw.githubusercontent.com/HABILIHSANPROJECT/habilihsanproject.github.io/main/jkt48-pm/r/firebase.json")
    .then((r) => {
        let LOGIN_FORM = document.getElementById("login")
        let EMAIL_LOGIN = document.getElementById("email-login")
        let PASSWORD_LOGIN = document.getElementById("password-login")
        let TOGGLE_ICON_LOGIN = document.getElementById("toggle-icon-login")
        let TOGGLE_PASSWORD_LOGIN = document.getElementById("toggle-password-login")

        let FIREBASE_CONFIG = r.data
        firebase.initializeApp(FIREBASE_CONFIG)

        if (TOGGLE_PASSWORD_LOGIN) {
            TOGGLE_PASSWORD_LOGIN.addEventListener("click", () => {
                if (PASSWORD_LOGIN.type === "password") {
                    PASSWORD_LOGIN.type = "text"
                    TOGGLE_ICON_LOGIN.classList.remove("bi-eye-slash")
                    TOGGLE_ICON_LOGIN.classList.add("bi-eye")
                } else {
                    PASSWORD_LOGIN.type = "password"
                    TOGGLE_ICON_LOGIN.classList.remove("bi-eye")
                    TOGGLE_ICON_LOGIN.classList.add("bi-eye-slash")
                }
            })
            document.getElementById("body").style.backgroundImage = "url(https://jkt48.primesse.me/images/top_background.png)"
        } else {
            location.reload()
        }

        LOGIN_FORM.addEventListener("submit", (e) => {
            e.preventDefault()
            const EMAIL = EMAIL_LOGIN.value
            const PASSWORD = PASSWORD_LOGIN.value

            firebase.auth().signInWithEmailAndPassword(EMAIL, PASSWORD)
                .then(() => {
                    firebase.auth().onAuthStateChanged((user) => {
                        if (user) {
                            location.replace("https://habilihsanproject.github.io/jkt48-pm/")
                        } else {
                            location.reload()
                        }
                    })
                    alert("Login berhasil!")
                })
                .catch((e) => {
                    alert("Data kamu tidak ditemukan! Silahkan registrasi terlebih dulu!")
                    location.reload()
                })
        })
    })
    .catch((e) => {
        location.reload()
    })