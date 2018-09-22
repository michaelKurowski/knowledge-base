const util = require('util')
const fs = require('fs')

const categoriesRepository = require('./core/knowledgeRepository/categoriesRepository')
const notesRepository = require('./core/knowledgeRepository/notesRepository')
const mapArgvToAcion = require('./core/mapArgvToAcion')
const route = require('./core/route')

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
categories.forEach(categoriesRepository.add)
notes.forEach(notesRepository.add)
const actionObject = mapArgvToAcion(process.argv)
route(actionObject)
    .then(() => {
        fs.writeFileSync('./categories.json', JSON.stringify(categoriesRepository.getAll()))
        fs.writeFileSync('./notes.json', JSON.stringify(notesRepository.getAll()))
        process.exit()
    })