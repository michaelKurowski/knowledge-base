
const categoriesRepository = require('./categoriesRepository')
const notesRepository = require('./notesRepository')
const matchScoreCalculator = require('./matchScoreCalculator')

function load({categories, notes}) {
    categories.forEach(categoriesRepository.add)
    notes.forEach(notesRepository.add)
}

function removeCategory(targetKey) {
    categoriesRepository.remove(targetKey)
    notesRepository.removeCategoryFromEntries(targetKey)
}

function getCategories() {
    return categoriesRepository.getAll()
}

function getNotes() {
    return notesRepository.getAll()
}

module.exports = {
    removeCategory,
    load,
    getCategories,
    getNotes
}