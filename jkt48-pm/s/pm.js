let halaman
let memuat

// Log Out Langganan
if (document.getElementById("exit")) {
    document.getElementById("exit").addEventListener("click", () => {
        firebase.auth().signOut()
            .then(() => {
                showSuccess("Logout berhasil!")
                location.replace("https://habilihsanproject.github.io/jkt48-pm/p/login")
            })
            .catch((error) => {
                showError(error.message)
            })
    })
}

// Log Out Tidak Langganan
if (document.getElementById("exits")) {
    document.getElementById("exits").addEventListener("click", () => {
        firebase.auth().signOut()
            .then(() => {
                showSuccess("Logout berhasil!")
                location.replace("https://habilihsanproject.github.io/jkt48-pm/p/login")
            })
            .catch((error) => {
                showError(error.message)
            })
    })
}

// Akses Database
