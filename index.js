var Client = require('clearbit').Client;

async function setupPlugin({ config, global }) {
    global.clearbitKey = config.clearbitKey;
    global.setupDone = true
}

async function processEvent(event, { config }) {
    const Reveal = new Client({key: global.clearbitKey}).Reveal;

    if (event.properties['$ip']) {
        Reveal.find(event.properties['$ip']).then(function (company) {
            console.log(company);
            event.properties['cb-raw'] = company;

            return event
        })
    }

    return event
}

module.exports = {
    setupPlugin,
    processEvent,
}
