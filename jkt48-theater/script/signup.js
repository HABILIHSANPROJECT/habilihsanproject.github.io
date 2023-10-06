axios.get("https://raw.githubusercontent.com/HABILIHSANPROJECT/habilihsanproject.github.io/main/jkt48-theater/res/firebase.json").then(function (response) {
    const firebaseConfig = response.data
    firebase.initializeApp(firebaseConfig)
    firebase.analytics()

    const signupForm = document.getElementById("signup-form")
    const signupEmailInput = document.getElementById("signup-email")
    const signupPasswordInput = document.getElementById("signup-password")

    // Function untuk menampilkan pesan error
    function showError(message) {
        alert(message)
    }

    // Function untuk menampilkan pesan berhasil
    function showSuccess(message) {
        alert(message)
    }

    signupForm.addEventListener("submit", (e) => {
        e.preventDefault()
        const email = signupEmailInput.value
        const password = signupPasswordInput.value

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
                firebase.auth().onAuthStateChanged(function(user) {
                    if (user) {
                        location.replace("../index.html")
                      // Pengguna sudah login
                    } else {
                      // Pengguna tidak login
                    }
                  })
                showSuccess("Akun berhasil dibuat!")
            })
            .catch((error) => {
                showError(error.message)
            })
    })

    const toggleSignupIcon = document.getElementById("toggleSignupIcon")
    document.getElementById("toggleSignupPassword").addEventListener("click", function () {
        if (signupPasswordInput.type === "password") {
            signupPasswordInput.type = "text";
            toggleSignupIcon.classList.remove("bi-eye-slash");
            toggleSignupIcon.classList.add("bi-eye");
        } else {
            signupPasswordInput.type = "password";
            toggleSignupIcon.classList.remove("bi-eye");
            toggleSignupIcon.classList.add("bi-eye-slash");
        }
    })
})