const categoryActions = require('./actions/categoryActions')
const notesActions = require('./actions/notesActions')
const browsingActions = require('./actions/browsingActions')

const router = Object.assign({}, categoryActions, notesActions, browsingActions)

async function route({action, payload}) {
    console.log(router, action)
    return router[action](payload)
        .catch(err => {
            console.error(`Operation failed. More info:\n${err}`)
        })
}

module.exports = route