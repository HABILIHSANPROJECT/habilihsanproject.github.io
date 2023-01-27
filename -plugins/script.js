// NAVBAR
$.get("/-plugins/navbar.html", function(data){
    $("#navbar").replaceWith(data);
})
// THEME
var html = document.getElementsByTagName("html")[0].dataset.bsTheme
var getTheme = localStorage.getItem("theme")
function lightTheme() {
    document.getElementById("setTheme").classList.replace("mdi-weather-night", "mdi-weather-sunny")
    document.getElementById("setTheme").classList.replace("light", "dark")
    document.getElementById("logo").classList.replace("light", "dark")
    document.getElementById("footer").classList.replace("light", "dark")
}
function darkTheme() {
    document.getElementById("setTheme").classList.replace("mdi-weather-sunny", "mdi-weather-night")
    document.getElementById("setTheme").classList.replace("dark", "light")
    document.getElementById("logo").classList.replace("dark", "light")
    document.getElementById("footer").classList.replace("dark", "light")
}
if (html == "dark") {
    darkTheme()
} else {
    lightTheme()
}
function setTheme() {
    if (html == "dark") {
        lightTheme()
        localStorage.setItem("theme", "undefined")
        document.getElementsByTagName("html")[0].dataset.bsTheme = "undefined"
    } else {
        darkTheme()
        localStorage.setItem("theme", "dark")
        document.getElementsByTagName("html")[0].dataset.bsTheme = "dark"
    }
}
if (getTheme == "dark") {
    darkTheme()
} else if (getTheme == "undefined") {
    lightTheme()
} else {
    localStorage.clear()
}
/* NAVBAR
let navbar_list = [
    { title: "ARTICLE", to: "../pages/articles/index.html" },
    { title: "PROJECT", to: "../pages/index.html" },
    { title: "PORTOFOLIO", to: "../pages/portofolio.html" },
    { title: "ABOUT", to: "../pages/about.html" }
]
let navbarList = document.querySelector("#navbarList")
let navbarLink = document.getElementById("navbarLink")
const navbar = data => {
    const template = document.createElement("template")
    template.innerHTML =
        `<li class="nav-item navItem" id="navbarItem">
        <a class="nav-link" id="navbarLink${navbar_list[i].title}" aria-current="page" href="${navbar_list[i].to}">${navbar_list[i].title}</a>
        </li>`
            .trim()
    return template.content.firstChild
}
for (i in navbar_list) {
    navbarList.append(navbar(0))
}
let title = document.getElementsByTagName("title")[0]
document.getElementById(`navbarLink${title.innerText}`).classList.add("active")
title.innerHTML = `habilihsanproject | ${title.innerText}`
*/