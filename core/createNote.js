const NOTE_SCHEMA = {
    id: null,
    content: null,
    categories: null,
    tags: null
}

function createNote({content, categories, tags, id}) {
    const newNote = Object.create(NOTE_SCHEMA)
    newNote.id = id ? id : Math.floor(Math.random() * 1000000)
    newNote.content = content
    newNote.categories = categories
    newNote.tags = tags
    return newNote
}

module.exports = createNote