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

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {

            } else {

            }
        })
    })