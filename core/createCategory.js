const CATEGORY_SCHEMA = {
    key: null,
    aliases: null
}

function createCategory(key, aliases) {
    const newCategory = Object.create(CATEGORY_SCHEMA)
    newCategory.key = key
    newCategory.aliases = aliases
    return newCategory
}