const categoriesRoutesController = require('./routesControllers/categories')
const notesRoutesController= require('./routesControllers/notes')
const browsingRoutesController = require('./routesControllers/browsing')

const router = Object.assign({}, categoriesRoutesController, notesRoutesController, browsingRoutesController)

async function sendToRouter({route, payload}) {
    if (!router[route]) throw `There's no logic attached to the route "${route}"`
    return router[route](payload)

}

module.exports = sendToRouter