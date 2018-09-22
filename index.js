const util = require('util')
const fs = require('fs')

const categoriesRepository = require('./core/knowledgeRepository/categoriesRepository')
const notesRepository = require('./core/knowledgeRepository/notesRepository')
const mapArgvToAcion = require('./core/mapArgvToAcion')
const route = require('./core/route')



const categories = loadDataFromRepository('./categories.json')
const notes = loadDataFromRepository('./notes.json')

categories.forEach(categoriesRepository.add)
notes.forEach(notesRepository.add)

const actionObject = mapArgvToAcion(process.argv)
route(actionObject)
    .then(() => {
        fs.writeFileSync('./categories.json', JSON.stringify(categoriesRepository.getAll()))
        fs.writeFileSync('./notes.json', JSON.stringify(notesRepository.getAll()))
        process.exit()
    })
    .catch(err => {
        console.error(`Operation failed. More info:\n${err}`)
        process.exit()
    })

function handleRepositoryLoadingError(err) {
    const MODULE_NOT_FOUND_ERROR = 'MODULE_NOT_FOUND'
    if (err.code === MODULE_NOT_FOUND_ERROR) {
        console.warn('Unable to find categories repository, creating new one')
        return []
    }
    throw `Unhandled error during accessing categories repository: ${err.code}`
}

function loadDataFromRepository(path) {
    try {
        return require(path)
    } catch (err) {
        handleRepositoryLoadingError(err)
    }
}