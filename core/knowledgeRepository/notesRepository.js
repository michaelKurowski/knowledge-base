const createNote = require('../createNote')
let repository = []

module.exports = {
    getAll() {
        return repository
    },
    add(noteSchema) {
        repository.push(createNote(noteSchema))
    },
    edit(id, newProperties) {
        const relevelantNote = repository.find(note => note.id === id)
        if (!relevelantNote) throw 'No note found with matching ID'
        Object.assign(relevelantNote, newProperties)
    },
    remove(id) {
        const COUNT_OF_NOTES_TO_BE_DELETED = 1
        const targetIndex = repository.findIndex(note => note.id === id)
        repository.splice(targetIndex, COUNT_OF_NOTES_TO_BE_DELETED)
    },
    removeCategoryFromNotes(categoryHead) {
        repository = repository.map(note => {
            note.categories = note.categories.filter(keyword => keyword !== categoryHead)
            return note
        })
        removeNotesWithNoCategories()
    },
    filter(callback) {
        return repository.filter(callback)
    },
    fuzzyFind(callback) {
        const listOfResults = repository.map(callback)
        const meaningfulResults = listOfResults.filter(result => result.score > 0)
        const sortedResults = meaningfulResults.sort((resultA, resultB) => resultB.score - resultA.score)
        return sortedResults.map(result => result.note)
    }
}

function removeNotesWithNoCategories() {
    repository = repository.filter(note => note.categories.length !== 0)
}