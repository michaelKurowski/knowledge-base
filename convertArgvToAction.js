const flagsToRoutesMap = require('./core/flagsToRoutesMap')

const FLAG_OFFSET = 2
const ACTION_PAYLOAD_OFFSET = 3

function mapArgvToAction(argv) {
    const flag = argv[FLAG_OFFSET]
    const payload = argv.splice(ACTION_PAYLOAD_OFFSET)
    const route = flagsToRoutesMap.get(flag)
    if (!route) throw `No route found for the flag "${flag}"`
    return {route, payload}
}
module.exports = mapArgvToAction