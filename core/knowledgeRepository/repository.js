const repository = {
    categories: [],
    notes: []
}

function addCategory(categoryObject) {
    repository.categories.push(categoryObject)
}

function editCategory(id, newProperties) {
    const relevelantCategory = repository.categories.find(category => category.id === id)
    Object.assign(relevelantCategory, newProperties)
}

function deleteCategory(id) {
    const COUNT_OF_CATEGORIES_TO_BE_DELETED = 1
    const targetIndex = repository.categories.findIndex(category => category.id === id)
    repository.categories.splice(targetIndex, COUNT_OF_CATEGORIES_TO_BE_DELETED)
}

function addNote(noteObject) {
    repository.notes.push(noteObject)
}

function editNote(id, newProperties) {
    const relevelantNote = repository.notes.find(note => note.id === id)
    Object.assign(relevelantNote, newProperties)
}

function deleteNote(id) {
    const COUNT_OF_NOTES_TO_BE_DELETED = 1
    const targetIndex = repository.notes.findIndex(note => note.id === id)
    repository.notes.splice(targetIndex, COUNT_OF_NOTES_TO_BE_DELETED)
}

module.exports = {
    addCategory,
    editCategory,
    deleteCategory,
    addNote,
    editNote,
    deleteNote
}