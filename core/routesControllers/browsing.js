const ROUTES = require('../routes')
const notesRepository = require('../knowledgeRepository/notesRepository')
const categoriesRepository = require('../knowledgeRepository/categoriesRepository')
const matchScoreCalculator = require('./utils/matchScoreCalculator')
const repositoriesUtils = require('./utils/repositoriesUtils')

module.exports = {
    async [ROUTES.QUERY](phrase) {
        const results = notesRepository.fuzzyFind(matchScoreCalculator.bind(null, phrase))
        printResults(results)
    },
    async [ROUTES.LIST_BY_CATEGORY](categoryQuery) {
        const notesMatchingCriteria =
            repositoriesUtils.getNoteByCategory(categoriesRepository, notesRepository, categoryQuery[0])
        printResults(notesMatchingCriteria)
    }
}

function printResults(results) {
    console.log('RESULTS:')
    results.forEach(printNote)
}

function printNote(note, index) {
    console.log(`#${index + 1}`)
    console.log(`ID: ${note.id}, CATEGORIES: ${note.categories}`)
    console.log(`TAGS: ${note.tags}`)
    console.log(note.content)
    console.log('')
}