const commandOptions = require('./commandOptions')

const ACTION_OFFSET = 2
const ACTION_PAYLOAD_OFFSET = 3

function mapArgvToActions(argv) {
    const flag = argv[ACTION_OFFSET]
    const payload = argv[ACTION_PAYLOAD_OFFSET]

    const action = commandOptions.get(flag)

    return {action, payload}
}



module.exports = mapArgvToActions