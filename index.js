import { Client } from 'clearbit';

async function setupPlugin({ config, global }) {
    global.clearbitKey = config.clearbitKey;
    global.setupDone = true
}

async function processEvent(event, { config }) {
    const Reveal = new Client({key: global.clearbitKey}).Reveal;

    if (event.properties) {
        Reveal.find(event.properties['$ip']).then(function (company) {
            console.log(company);
        })
    }

    return event
}

module.exports = {
    setupPlugin,
    processEvent,
}
