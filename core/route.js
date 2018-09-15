const categoryActions = require('./actions/categoryActions')
const notesActions = require('./actions/notesActions')
const browsingActions = require('./actions/browsingActions')

const router = Object.assign({}, categoryActions, notesActions, browsingActions)

function route({action, payload}) {
    router[action](payload)
}

module.exports = route