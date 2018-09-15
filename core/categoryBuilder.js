const CATEGORY_SCHEMA = {
    key: null,
    aliases: []
}

function categoryBuilder(key, aliases) {
    const newCategory = Object.create(CATEGORY_SCHEMA)
    newCategory.key = key
    newCategory.aliases = aliases
    return newCategory
}

return categoryBuilder