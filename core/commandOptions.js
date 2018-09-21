const ACTIONS = require('./actions')
const commandOptions = new Map([
    ['-e', ACTIONS.ADD_ENTRY],
    ['--entry', ACTIONS.ADD_ENTRY],
    ['-c', ACTIONS.ADD_CATEGORY],
    ['--c', ACTIONS.ADD_CATEGORY],
    ['-l', ACTIONS.LIST_BY_CATEGORY],
    ['--list', ACTIONS.LIST_BY_CATEGORY],
    ['-q', ACTIONS.QUERY],
    ['--query', ACTIONS.QUERY],
    ['-ee', ACTIONS.EDIT_ENTRY],
    ['--edit-entry', ACTIONS.EDIT_ENTRY],
    ['-ec', ACTIONS.EDIT_CATEGORY],
    ['--edit-category', ACTIONS.EDIT_CATEGORY],
    ['-de', ACTIONS.DELETE_ENTRY],
    ['--delete-entry', ACTIONS.DELETE_ENTRY],
    ['-dc', ACTIONS.DELETE_CATEGORY],
    ['--delete-category', ACTIONS.DELETE_CATEGORY]
])

module.exports = commandOptions