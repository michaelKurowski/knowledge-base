const ROUTES = require('./routes')
const commandOptions = new Map([
    ['-n', ROUTES.ADD_NOTE],
    ['--note', ROUTES.ADD_NOTE],
    ['-c', ROUTES.ADD_CATEGORY],
    ['--c', ROUTES.ADD_CATEGORY],
    ['-l', ROUTES.LIST_BY_CATEGORY],
    ['--list', ROUTES.LIST_BY_CATEGORY],
    ['-q', ROUTES.QUERY],
    ['--query', ROUTES.QUERY],
    ['-en', ROUTES.EDIT_NOTE],
    ['--edit-note', ROUTES.EDIT_NOTE],
    ['-ec', ROUTES.EDIT_CATEGORY],
    ['--edit-category', ROUTES.EDIT_CATEGORY],
    ['-dn', ROUTES.DELETE_NOTE],
    ['--delete-note', ROUTES.DELETE_NOTE],
    ['-dc', ROUTES.DELETE_CATEGORY],
    ['--delete-category', ROUTES.DELETE_CATEGORY]
])

module.exports = commandOptions