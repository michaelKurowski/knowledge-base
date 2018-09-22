const fs = require('fs')

const REPOSITORIES_PATHS = require('./repositoriesPaths')
const categoriesRepository = require('./core/knowledgeRepository/categoriesRepository')
const notesRepository = require('./core/knowledgeRepository/notesRepository')

function saveRepositories() {
    fs.writeFileSync(REPOSITORIES_PATHS.CATEGORIES, JSON.stringify(categoriesRepository.getAll()))
    fs.writeFileSync(REPOSITORIES_PATHS.NOTES, JSON.stringify(notesRepository.getAll()))
}

module.exports = saveRepositories