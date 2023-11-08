axios.get("https://raw.githubusercontent.com/HABILIHSANPROJECT/habilihsanproject.github.io/main/jkt48-pm/r/firebase.json")
    .then(function (response) {
    const firebaseConfig = response.data
    firebase.initializeApp(firebaseConfig)
    firebase.analytics()

    let emailInput = document.getElementById("email")
    let passwordInput = document.getElementById("password")

    // Function untuk menampilkan pesan error
    function showError(message) {
        alert(message)
    }

    // Function untuk menampilkan pesan berhasil
    function showSuccess(message) {
        alert(message)
    }

    document.getElementById("login").addEventListener("click", (e) => {
            e.preventDefault()
            const email = emailInput.value
            const password = passwordInput.value

            firebase.auth().signInWithEmailAndPassword(email, password)
                .then(() => {
                    firebase.auth().onAuthStateChanged(function (user) {
                        if (user) {
                            location.replace("../jkt48-pm/index.html")
                            // Pengguna sudah login
                        } else {
                            // Pengguna tidak login
                        }
                    })
                    showSuccess("Login berhasil!")
                })
                .catch((error) => {
                    showError("Data kamu tidak ditemukan! Silahkan sign up terlebih dulu!")
                    location.replace("../jkt48-pm/p/register.html")
                })
        })
        const toggleIcon = document.getElementById("toggleIcon")
        document.getElementById("togglePassword").addEventListener("click", function () {
            if (passwordInput.type === "password") {
                passwordInput.type = "text";
                toggleIcon.classList.remove("bi-eye-slash");
                toggleIcon.classList.add("bi-eye");
            } else {
                passwordInput.type = "password";
                toggleIcon.classList.remove("bi-eye");
                toggleIcon.classList.add("bi-eye-slash");
            }
        })
    })