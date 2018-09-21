const stringSimiliarity = require('string-similarity')

const categoriesRepository = require('./categoriesRepository')
const notesRepository = require('./notesRepository')

function load({categories, notes}) {
    categories.forEach(categoriesRepository.add)
    notes.forEach(notesRepository.add)
}

function removeCategory(targetKey) {
    categoriesRepository.remove(targetKey)
    notesRepository.removeCategoryFromEntries(targetKey)
}

function queryNotes(phrase) {
    return notesRepository.fuzzyFind(assignMatchScoreToNote(phrase))
}

function assignMatchScoreToNote(phraseToMatchAgainst) {
    return note => {
        const stringListOfCategoriesForms = note.categories.map(categoryKey => 
            [categoryKey, ...categoriesRepository.mapKeyToAliases(categoryKey)].join(' '))
        const stringListOfTags = note.tags.join(' ')
        const fullString = `${note.content} ${stringListOfCategoriesForms} ${stringListOfTags}`
        const score = stringSimiliarity(fullString, phraseToMatchAgainst)
        return {
            note,
            score
        }
    }
}

function getCategories() {
    return categoriesRepository.getAll()
}

function getNotes() {
    return notesRepository.getAll()
}

module.exports = {
    removeCategory,
    queryNotes,
    load,
    getCategories,
    getNotes
}