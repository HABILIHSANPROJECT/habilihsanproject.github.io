axios.get("https://raw.githubusercontent.com/HABILIHSANPROJECT/habilihsanproject.github.io/main/jkt48-pm/r/firebase.json")
    .then((r) => {
        let REGISTER_FORM = document.getElementById("register")
        let EMAIL_REGISTER = document.getElementById("email-register")
        let PASSWORD_REGISTER = document.getElementById("password-register")
        let TOGGLE_ICON_REGISTER = document.getElementById("toggle-icon-register")
        let TOGGLE_PASSWORD_REGISTER = document.getElementById("toggle-password-register")

        let FIREBASE_CONFIG = r.data
        firebase.initializeApp(FIREBASE_CONFIG)

        if (TOGGLE_PASSWORD_REGISTER) {
            TOGGLE_PASSWORD_REGISTER.addEventListener("click", () => {
                if (PASSWORD_REGISTER.type === "password") {
                    PASSWORD_REGISTER.type = "text"
                    TOGGLE_ICON_REGISTER.classList.remove("bi-eye-slash")
                    TOGGLE_ICON_REGISTER.classList.add("bi-eye")
                } else {
                    PASSWORD_REGISTER.type = "password"
                    TOGGLE_ICON_REGISTER.classList.remove("bi-eye")
                    TOGGLE_ICON_REGISTER.classList.add("bi-eye-slash")
                }
            })
            document.getElementById("body").style.backgroundImage = "url(https://jkt48.primesse.me/images/top_background.png)"
        } else {
            location.reload()
        }

        REGISTER_FORM.addEventListener("submit", (e) => {
            e.preventDefault()
            const EMAIL = EMAIL_REGISTER.value
            const PASSWORD = PASSWORD_REGISTER.value

            firebase.auth().createUserWithEmailAndPassword(EMAIL, PASSWORD)
                .then(() => {
                    firebase.auth().onAuthStateChanged((user) => {
                        if (user) {
                            location.replace("https://habilihsanproject.github.io/jkt48-pm/p/subs")
                        } else {
                            location.reload()
                        }
                    })
                    alert("Akun berhasil dibuat!")
                })
                .catch((e) => {
                    alert("Email kamu sudah terdaftar, gunakan email yang lain!")
                })
        })
    })
    .catch((e) => {
        location.reload()
    })