const ACTIONS = require('../actions')
const notesRepository = require('../knowledgeRepository/notesRepository')
const matchScoreCalculator = require('../knowledgeRepository/matchScoreCalculator')

module.exports = {
    async [ACTIONS.QUERY](phrase) {
        const results = notesRepository.fuzzyFind(matchScoreCalculator.bind(null, phrase))
        console.log('RESULTS:')
        results.forEach(result => {
            console.log('==================')
            console.log(`ID: ${result.id}, CATEGORIES: ${result.categories}`)
            console.log(`TAGS: ${result.tags}`)
            console.log(result.content)
        })
    }
}