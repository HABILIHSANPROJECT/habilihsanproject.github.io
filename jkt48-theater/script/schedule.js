axios.get("https://jkt48.com/theater/schedule?lang=id").then(function (response) {
  const scrape = response.data

  const resultShow = []
  const resultMember = []
  const parser = new DOMParser()
  const html = parser.parseFromString(scrape, "text/html")
  const shows = html.querySelectorAll("table")[0]
  for (let i = 1; i < shows.querySelectorAll("tr").length; i += 3) {
    const schedules = shows.querySelectorAll("tr")[i].querySelectorAll("td")[0].querySelectorAll("font")[0]
    const scheduleNode = schedules.parentNode
    scheduleNode.removeChild(schedules)
    const dateNode = scheduleNode.innerText.split(",")
    const date = dateNode[0] + " / " + dateNode[1]
    const time = schedules.innerText.slice(0, 10)
    const setlist = shows.querySelectorAll("tr")[i].querySelectorAll("td")[1].innerText
    resultShow.push({
      date, time, setlist
    })
  }
  const members = html.querySelectorAll("table")[1]
  for (let i = 1; i < members.querySelectorAll("tr").length; i++) {
    const listMember = members.querySelectorAll("tr")[i].querySelectorAll("td")[2].innerText.split("\n\n")
    resultMember.push({
      listMember
    })
  }
  let show = document.querySelector("#show")
  const schedule = data => {
    const template1 = document.createElement("template")
    template1.innerHTML =
      `<tr>
            <td>${resultShow[i].date}</td>
            <td>${resultShow[i].setlist}</td>
            <td>${resultShow[i].time}</td>
            <td><a href="./page/player.html" class="btn btn-primary disabled" id="link">LINK</a></td>
          </tr>`
        .trim()
    return template1.content.firstChild
  }
  for (i in resultShow) {
    show.append(schedule())
  }

  let member = document.querySelector("#member")
  const perform = data => {
    const template2 = document.createElement("template")
    template2.innerHTML =
      `<tr>
            <td>${resultShow[i].setlist}</td>
            <td>${resultMember[i].listMember}</td>
          </tr>`
        .trim()
    return template2.content.firstChild
  }
  for (i in resultMember) {
    member.append(perform())
  }
})