async function setupPlugin({ config, global }) {
    const base64 = Buffer.from(config.clearbitKey + ":" + '').toString('base64');
    const authHeader = "Basic " + base64;
    global.clearbitAuth = authHeader;
    global.setupDone = true
}

async function processEvent(event, { global, cache }) {
  if (event.ip) {
      let response = await cache.get(event.ip);
      let data = JSON.parse(response);

      if (!response) {
        response = await fetch('https://reveal.clearbit.com/v1/companies/find?ip=' + event.ip, {
          headers: {
            Authorization: global.clearbitAuth
          }
        })

        data = await response.json();

        cache.set(event.ip, JSON.stringify(data));
      }


      event.properties['companyName'] = data.company.name;
      event.properties['companyDomain'] = data.company.domain;

      return event
  }
  
  return event  
}


module.exports = {
    setupPlugin,
    processEvent,
}
