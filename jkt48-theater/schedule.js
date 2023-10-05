const parseSchedule = html => {
  const schedulesPage = parse(html)
  const results = []

  const shows = schedulesPage.querySelectorAll('table')[0]
  for (let i = 1; i < shows.querySelectorAll('tr').length - 1; i += 3) {

    const schedule = shows.querySelectorAll('tr')[i].querySelectorAll('td')[0].structuredText.split('\n')
    const date = schedule[1]
    const showTime = schedule[2].replace('Show', '').trim()
    const teamLogo = shows.querySelectorAll('tr')[i].querySelectorAll('td')[1].querySelector('img').attributes['src']
    //const unixTime = moment(`${date} ${showTime}`, 'DD.MM.YYYY HH:mm').unix()

    let showName = '';
    if (teamLogo === '/images/icon.team1.png') {
      showName = 'fajar sang idola'
    } else if (teamLogo === '/images/icon.team2.png') {
      showName = 'saka agari'
    } else if (teamLogo === '/images/icon.team11.png') {
      showName = 'pajama drive'
    } else if (teamLogo === '/images/icon.team5.png') {
      showName = 'tunas di balik seragam'
    }

    results.push({
      date,
      showTime,
      showName,
      unixTime
    })
  }

  const membersTable = schedulesPage.querySelectorAll('table')[1];
  for (let i = 1; i < membersTable.querySelectorAll('tr').length; i++) {
    index = i - 1;
    const members = membersTable.querySelectorAll('tr')[i].querySelectorAll('td')[2].structuredText.trim().split(',')
    results[index].members = members.map(member => {
      if (member !== '') {
        return member.trim()
      }
    })
    results[index].members.splice(-1, 1)
  }
  return results
}



exports.showScraper = async (req, res) => {
  try {
    const schedulesPage = await axios.get('https://jkt48.com/theater/schedule?lang=id')
    const result = parseSchedule(schedulesPage.data)
    res.send(result)
  } catch (e) {
    console.error(e)
  }
}