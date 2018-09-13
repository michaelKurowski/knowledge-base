const ENTRY_SCHEMA = {
    id: null,
    categories: [],
    tags: [],
    content: null
}

function entryBuilder(content, categoriesList, tagsList) {
    const id = Math.floor(Math.random() * 1000000)
    const newEntry = Object.create(ENTRY_SCHEMA)
    newEntry.id = id
    newEntry.categories = categoriesList
    newEntry.tags = tagsList
    newEntry.content = content
    return newEntry
}

module.exports = entryBuilder