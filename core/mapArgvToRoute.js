const commandOptions = require('./commandOptions')

const ROUTE_OFFSET = 2
const ROUTE_PAYLOAD_OFFSET = 3

function mapArgvToRoute(argv) {
    const flag = argv[ROUTE_OFFSET]
    const payload = argv.splice(ROUTE_PAYLOAD_OFFSET)
    const route = commandOptions.get(flag)
    if (!route) throw `No route found for the flag "${flag}"`
    return {route, payload}
}



module.exports = mapArgvToRoute