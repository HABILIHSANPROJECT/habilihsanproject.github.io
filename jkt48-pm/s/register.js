axios.get("https://raw.githubusercontent.com/HABILIHSANPROJECT/habilihsanproject.github.io/main/jkt48-pm/r/firebase.json")
    .then(function (response) {
    const firebaseConfig = response.data
    firebase.initializeApp(firebaseConfig)
    firebase.analytics()

    let signupEmailInput = document.getElementById("email")
    let signupPasswordInput = document.getElementById("password")

    // Function untuk menampilkan pesan error
    function showError(message) {
        alert(message)
    }

    // Function untuk menampilkan pesan berhasil
    function showSuccess(message) {
        alert(message)
    }

    document.getElementById("register").addEventListener("click", (e) => {
            e.preventDefault()
            const email = signupEmailInput.value
            const password = signupPasswordInput.value

            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(() => {
                    firebase.auth().onAuthStateChanged(function (user) {
                        if (user) {
                            // Pengguna sudah login
                        } else {
                            // Pengguna tidak login
                        }
                    })
                    showSuccess("Akun berhasil dibuat!")
                })
                .catch((error) => {
                    showError("Data kamu tidak ditemukan! Silahkan sign up terlebih dulu!")
                })
        })
        const toggleIcon = document.getElementById("toggleIcon")
        document.getElementById("togglePassword").addEventListener("click", function () {
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
    })