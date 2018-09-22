const categoriesRoutesController = require('./routesControllers/categories')
const notesRoutesController= require('./routesControllers/notes')
const browsingRoutesController = require('./routesControllers/browsing')

const router = Object.assign({}, categoriesRoutesController, notesRoutesController, browsingRoutesController)

async function sendToRouter({action, payload}) {
    if (!router[action]) throw `There's no logic attached to the action "${action}"`
    return router[action](payload)

}

module.exports = sendToRouter