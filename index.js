async function setupPlugin({ config, global }) {
    global.clearbitKey = config.clearbitKey;
    global.setupDone = true
}

async function processEvent(event, { config }) {
    if (event.properties['$ip']) {
        const response = await fetch('https://reveal.clearbit.com/v1/companies/find?ip=' + event.properties['$ip'], {
            headers: {
                Authorization: "Basic " + config.apiKey
            }
        })
        event.properties['companyName'] = response.company.name;
        event.properties['companyDomain'] = response.company.domain;

        console.log(response)
        return event
    }

    return event
}

module.exports = {
    setupPlugin,
    processEvent,
}
