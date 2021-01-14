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
        console.log(response)
    }

    return event
}

module.exports = {
    setupPlugin,
    processEvent,
}
