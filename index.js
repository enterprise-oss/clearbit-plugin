async function setupPlugin({ config, global }) {
    const base64 = Buffer.from(config.clearbitKey + ":" + '').toString('base64');
    const authHeader = "Basic " + base64;
    global.clearbitAuth = authHeader;
    global.setupDone = true
}

async function processEvent(event, { global }) {
  if (event.properties['$ip']) {
      const response = await fetch('https://reveal.clearbit.com/v1/companies/find?ip=' + event.properties['$ip'], {
          headers: {
            Authorization: global.clearbitAuth
          }
      })
      .then((resp) => resp.json())
      .then((data) => {
        event.properties['companyName'] = response.company.name;
        event.properties['companyDomain'] = response.company.domain;
      
        console.log(data)
        return event
      })
  } else {
      return event
  }
}

module.exports = {
    setupPlugin,
    processEvent,
}
