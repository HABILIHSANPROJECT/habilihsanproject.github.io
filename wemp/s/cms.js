//navdraw
let navdrawItem = [
    { name: "E-Modul", icon: "bi-journal-album", link: "../emodul/index.html" },
    { name: "Market", icon: "bi-shop", link: "../market/index.html" },
    { name: "Website", icon: "bi-globe", link: "../website/index.html" }
]

let navdrawList = document.getElementById("navdrawList")
function navdraw() {
    const template = document.createElement("template")
    template.innerHTML =
        `<a class="nav-link" href="${navdrawItem[i].link}" id="navdrawActive">
            <i class="bi ${navdrawItem[i].icon} me-2"></i>
            <span class="d-sm-none d-lg-inline" id="navdrawName">${navdrawItem[i].name}</span>
        </a>`
    return template.content.firstChild
}

for (i in navdrawItem) {
    navdrawList.append(navdraw())
    let title = document.getElementById("title")
    let navdrawName = document.querySelectorAll("#navdrawName")
    let navdrawActive = document.querySelectorAll("#navdrawActive")
    if (navdrawName[i].innerText == title.innerText) {
        navdrawActive[i].classList.add("active")
    }
}

//emodul
let emodul = [
    { name: "Energi Alternatif", category: "Fase E", slug: "energi-alternatif" }
]

let emodulList = document.getElementById("emodul")
function modul() {
    const template = document.createElement("template")
    template.innerHTML =
        `<tr>
            <td>${emodul[i].name}</td>
            <td class="text-center">${emodul[i].category}</td>
            <td class="text-center">${emodul[i].slug}</td>
            <td class="text-center">
                <div class="btn-group" role="group">
                    <button type="button" class="btn btn-primary btn-sm">
                        <i class="bi bi-pencil"></i> Edit
                    </button>
                    <button type="button" class="btn btn-success btn-sm">
                        <i class="bi bi-trash"></i> Lihat
                    </button>
                    <button type="button" class="btn btn-danger btn-sm">
                        <i class="bi bi-trash"></i> Hapus
                    </button>
                </div>
            </td>
        </tr>`
    return template.content.firstChild
}

if (emodulList) {
    for (i in emodul) {
        emodulList.append(modul())
    }
}

//edit emodul
let kontenEModul = [
    { id: 1, name: "Pendahuluan", content: `<p>Test</p><br/><iframe src="https://google.com">` },
    { id: 2, name: "Kegiatan Pembelajaran 1", content: `<p>Test</p><br/><iframe src="https://google.com">` },
    { id: 3, name: "Kegiatan Pembelajaran 2", content: `<p>Test</p><br/><iframe src="https://google.com">` },
    { id: 4, name: "Kegiatan Pembelajaran 3", content: `<p>Test</p><br/><iframe src="https://google.com">` },
    { id: 5, name: "Kegiatan Pembelajaran 4", content: `<p>Test</p><br/><iframe src="https://google.com">` },
    { id: 6, name: "Evaluasi", content: `<p>Test</p><br/><iframe src="https://google.com">` },
    { id: 7, name: "Penutup", content: `<p>Test</p><br/><iframe src="https://google.com">` }
]

let kontenEModulList = document.getElementById("konten")
function kontenModul () {
    const template = document.createElement("template")
    template.innerHTML = 
        `<div class="accordion-item border-0 mb-2">
            <div class="accordion-header d-flex btn-group border rounded-0">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${kontenEModul[i].id}">
                    ${kontenEModul[i].name}
                </button>
                <button type="button" class="btn btn-outline-info border-0 rounded-0">
                    <i class="bi bi-pencil"></i>
                </button>
                <button type="button" class="btn btn-outline-info border-0 rounded-0">
                    <i class="bi bi-eye"></i>
                </button>
            </div>
            <div id="collapse-${kontenEModul[i].id}" class="accordion-collapse collapse" data-bs-parent="#konten">
                <div class="accordion-body border">
                    ${kontenEModul[i].content}
                </div>
            </div>
        </div>`
    return template.content.firstChild
}

if (kontenEModulList) {
    for (i in kontenEModul) {
        kontenEModulList.append(kontenModul())
    }
}