axios.get("https://jkt48.com/theater/schedule?lang=id").then(function (response) {
  const scrape = response.data

  const result = []
  const parser = new DOMParser()
  const html = parser.parseFromString(scrape, "text/html")
  const shows = html.querySelectorAll("table")[0]
  for (let i = 1; i < shows.querySelectorAll("tr").length - 1; i += 3) {
    const schedules = shows.querySelectorAll("tr")[i].querySelectorAll("td")[0].querySelectorAll("font")[0]
    const scheduleNode = schedules.parentNode
    scheduleNode.removeChild(schedules)
    const dateNode = scheduleNode.innerText.split(",")
    const date = dateNode[0] + " / " + dateNode[1]
    const time = schedules.innerText.slice(0, 10)
    const setlist = shows.querySelectorAll("tr")[i].querySelectorAll("td")[1].innerText
    result.push({
      date, time, setlist
    })
  }
  let show = document.querySelector("#show")
  const schedule = data => {
    const template = document.createElement("template")
    template.innerHTML =
      `<tr>
            <td>${result[i].date}</td>
            <td>${result[i].time}</td>
            <td>${result[i].setlist}</td>
          </tr>`
        .trim()
    return template.content.firstChild
  }
  for (i in result) {
    show.append(schedule())
  }
})