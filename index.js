async function setupPlugin({ config, global }) {
    const base64 = Buffer.from(config.clearbitKey + ":" + '').toString('base64');
    const authHeader = "Basic " + base64;
    global.clearbitAuth = authHeader;
    global.setupDone = true
}

async function processEvent(event, { global }) {
  if (event.ip) {
      return fetch('https://reveal.clearbit.com/v1/companies/find?ip=' + event.ip, {
          headers: {
            Authorization: global.clearbitAuth
          }
      })
      .then((resp) => resp.json())
      .then((data) => {
        event.properties['companyName'] = data.company.name;
        event.properties['companyDomain'] = data.company.domain;
        return event
      }).catch(() => {
        return event;
      })
  } else {
      return event
  }
}

module.exports = {
    setupPlugin,
    processEvent,
}
