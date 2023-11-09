window.addEventListener("contextmenu", function (e) {
    e.preventDefault()
})
axios.get("https://raw.githubusercontent.com/HABILIHSANPROJECT/habilihsanproject.github.io/main/jkt48-pm/r/firebase.json")
    .then(function (response) {
        const firebaseConfig = response.data
        firebase.initializeApp(firebaseConfig)
        firebase.analytics()

        function showError(message) { alert(message) }
        function showSuccess(message) { alert(message) }

        window.addEventListener("DOMContentLoaded", () => {
            let signupEmailInput = document.getElementById("email")
            let signupPasswordInput = document.getElementById("password")
            document.getElementById("register").addEventListener("click", (e) => {
                e.preventDefault()
                const email = signupEmailInput.value
                const password = signupPasswordInput.value

                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then(() => {
                        firebase.auth().onAuthStateChanged(function (user) {
                            if (user) {
                                location.replace("../p/subs.html")    
                            } else {
                                location.reload()
                            }
                        })
                        showSuccess("Akun berhasil dibuat!")
                    })
                    .catch((error) => {
                        showError("Email kamu sudah terdaftar, gunakan email yang lain!")
                    })
            })
            const toggleIcon = document.getElementById("toggleIcon")
            const i = document.getElementById("togglePassword").addEventListener("click", function () {
                if (signupPasswordInput.type === "password") {
                    signupPasswordInput.type = "text";
                    toggleIcon.classList.remove("bi-eye-slash");
                    toggleIcon.classList.add("bi-eye");
                } else {
                    signupPasswordInput.type = "password";
                    toggleIcon.classList.remove("bi-eye");
                    toggleIcon.classList.add("bi-eye-slash");
                }
            })
            if (i === null) {
                location.reload()
            }
        })
    })