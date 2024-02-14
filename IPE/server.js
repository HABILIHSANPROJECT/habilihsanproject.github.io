// Chart
axios.get("https://kawalpemilu.org/h").then((res) => {
    const pemilu = res.data

    const parser = new DOMParser()
    const html = parser.parseFromString(scrape, "text/html")
    const suara01 = html.querySelectorAll("span")[252].innerText
    const suara02 = html.querySelectorAll("span")[254].innerText
    const suara03 = html.querySelectorAll("span")[256].innerText

    document.getElementById("suara01").innerText = suara01
    document.getElementById("suara02").innerText = suara02
    document.getElementById("suara03").innerText = suara03
    
    const labels = ["Paslon 01", "Paslon 02", "Paslon 03"]
    const data = [suara01, suara02, suara03]
    const ctx = document.getElementById("grafik").getContext("2d")
    new Chart(ctx, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{
                label: "Data",
                data: data,
                backgroundColor: [
                    "rgba(0, 145, 245, 0.3)",
                    "rgba(255, 185, 0, 0.3)",
                    "rgba(200, 50, 50, 0.3)"
                ],
                borderColor: [
                    "rgba(0, 145, 245, 1)",
                    "rgba(255, 185, 0, 1)",
                    "rgba(200, 50, 50, 1)"
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        callback: function (value) {
                            return value + '%'
                        }
                    }
                }
            }

        }
    })
})