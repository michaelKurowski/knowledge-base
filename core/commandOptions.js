const ACTIONS = require('./actions')
const commandOptions = new Map([
    ['-n', ACTIONS.ADD_NOTE],
    ['--note', ACTIONS.ADD_NOTE],
    ['-c', ACTIONS.ADD_CATEGORY],
    ['--c', ACTIONS.ADD_CATEGORY],
    ['-l', ACTIONS.LIST_BY_CATEGORY],
    ['--list', ACTIONS.LIST_BY_CATEGORY],
    ['-q', ACTIONS.QUERY],
    ['--query', ACTIONS.QUERY],
    ['-en', ACTIONS.EDIT_NOTE],
    ['--edit-note', ACTIONS.EDIT_NOTE],
    ['-ec', ACTIONS.EDIT_CATEGORY],
    ['--edit-category', ACTIONS.EDIT_CATEGORY],
    ['-dn', ACTIONS.DELETE_NOTE],
    ['--delete-note', ACTIONS.DELETE_NOTE],
    ['-dc', ACTIONS.DELETE_CATEGORY],
    ['--delete-category', ACTIONS.DELETE_CATEGORY]
])

module.exports = commandOptions