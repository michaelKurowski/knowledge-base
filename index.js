const fs = require('fs')

const categoriesRepository = require('./core/knowledgeRepository/categoriesRepository')
const notesRepository = require('./core/knowledgeRepository/notesRepository')
const mapArgvToAction = require('./core/mapArgvToAction')
const sendToRouter = require('./core/sendToRouter')

const CATEGORIES_REPOSITORY_PATH = './categories.json'
const NOTES_REPOSITORY_PATH = './notes.json'

const categories = loadDataFromRepository(CATEGORIES_REPOSITORY_PATH)
const notes = loadDataFromRepository(NOTES_REPOSITORY_PATH)


categories.forEach(categoriesRepository.add)
notes.forEach(notesRepository.add)

const actionToBePerformed = mapArgvToAction(process.argv)

sendToRouter(actionToBePerformed)
    .then(saveRepositories)
    .catch(err => console.error(`Operation failed. More info:\n${err}`))
    .then(process.exit)

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
        return handleRepositoryLoadingError(err)
    }
}

function saveRepositories() {
    fs.writeFileSync(CATEGORIES_REPOSITORY_PATH, JSON.stringify(categoriesRepository.getAll()))
    fs.writeFileSync(NOTES_REPOSITORY_PATH, JSON.stringify(notesRepository.getAll()))
}