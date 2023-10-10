axios.get("https://raw.githubusercontent.com/HABILIHSANPROJECT/habilihsanproject.github.io/main/jkt48-theater/res/firebase.json").then(function (response) {
    const firebaseConfig = response.data
    firebase.initializeApp(firebaseConfig)
    firebase.analytics()

    const loginForm = document.getElementById("login-form")
    const emailInput = document.getElementById("email")
    const passwordInput = document.getElementById("password")

    // Function untuk menampilkan pesan error
    function showError(message) {
        alert(message)
    }

    // Function untuk menampilkan pesan berhasil
    function showSuccess(message) {
        alert(message)
    }

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault()
        const email = emailInput.value
        const password = passwordInput.value

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                firebase.auth().onAuthStateChanged(function(user) {
                    if (user) {
                        location.replace("../index.html")
                      // Pengguna sudah login
                    } else {
                      // Pengguna tidak login
                    }
                  })
                showSuccess("Login berhasil!")
            })
            .catch((error) => {
                showError("Data kamu tidak ditemukan! Silahkan sign up terlebih dulu!")
                location.replace("../page/signup.html")
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