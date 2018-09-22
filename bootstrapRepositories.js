const REPOSITORIES_PATHS = require('./repositoriesPaths')
const categoriesRepository = require('./core/knowledgeRepository/categoriesRepository')
const notesRepository = require('./core/knowledgeRepository/notesRepository')

function bootstrapRepositories() {
    const categories = loadDataFromRepository(REPOSITORIES_PATHS.CATEGORIES)
    const notes = loadDataFromRepository(REPOSITORIES_PATHS.NOTES)

    categories.forEach(categoriesRepository.add.bind(categoriesRepository))
    notes.forEach(notesRepository.add.bind(categoriesRepository))
}

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

module.exports = bootstrapRepositories