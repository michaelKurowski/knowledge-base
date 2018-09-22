const util = require('util')
const fs = require('fs')


const mapArgvToAcion = require('./core/mapArgvToAcion')
const route = require('./core/route')
const repositoryDriver = require('./core/knowledgeRepository/repositoryDriver')
let categories = []
let notes = []
try {
    categories = require('./categories.json')
} catch (err) {//TODO handle many types of errors
    console.warn('Unable to find categories repository, creating new one')
}

try {
    notes = require('./notes.json')
} catch(err) {//TODO handle many types of errors
    console.warn('Unable to find notes repository, creating new one')
}

repositoryDriver.load({categories, notes})
const actionObject = mapArgvToAcion(process.argv)
route(actionObject)
    .then(() => {
        fs.writeFileSync('./categories.json', JSON.stringify(repositoryDriver.getCategories()))
        fs.writeFileSync('./notes.json', JSON.stringify(repositoryDriver.getNotes()))
        process.exit()
    })