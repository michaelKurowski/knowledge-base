const commandOptions = require('./commandOptions')

const ACTION_OFFSET = 2
const ACTION_PAYLOAD_OFFSET = 3

function mapArgvToAction(argv) {
    const flag = argv[ACTION_OFFSET]
    const payload = argv.splice(ACTION_PAYLOAD_OFFSET)
    const action = commandOptions.get(flag)
    if (!action) throw `No action found for the flag "${flag}"`
    return {action, payload}
}



module.exports = mapArgvToAction