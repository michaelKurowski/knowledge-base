const NOTE_SCHEMA = {
    id: null,
    content: null,
    categories: null,
    tags: null
}

function createNote({content, categories, tags}) {
    const newNote = Object.create(NOTE_SCHEMA)
    newNote.id = Math.floor(Math.random * 1000000)
    newNote.content = content
    newNote.categories = categories
    newNote.tags = tags
    return newNote
}

module.exports = createNote