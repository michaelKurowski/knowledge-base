let repository = []

module.exports = {
    getAll() {
        return repository
    },
    add(categoryAliases) {
        repository.push(categoryAliases)
    },
    edit() {
        const relevelantCategory = repository.find(category => category.key === key)
        Object.assign(relevelantCategory, newProperties)
    },
    remove() {
        const COUNT_OF_CATEGORIES_TO_BE_DELETED = 1
        const targetIndex = repository.findIndex(category => category.key === key)
        repository.splice(targetIndex, COUNT_OF_CATEGORIES_TO_BE_DELETED)
    },
    has(variant) {
        return repository.some(category => 
            category.some(alias => alias === variant)
        )
    },
    mapKeyToAliases(targetKey) {
        const matchingCategory = repository.find(category => category.key === targetKey)
        return matchingCategory.aliases
    },
    findAllCategoryVariants(categoryForm) {
        const foundCategoryObject = database.categories.find(categoryObject => 
            matchCategory(categoryForm, categoryObject)
        )
        return [foundCategoryObject.key, ...foundCategoryObject.aliases]
    }
}

function matchCategory(query, category) {
    const normalizedQuery = query.toUpperCase()
    const normalizedCategoryKey = category.key.toUpperCase()
    const normalizedCategoryAliases = category.aliases.map(alias => alias.toUpperCase())
    return [normalizedCategoryKey, ...normalizedCategoryAliases].find(categoryForm =>
        categoryForm === normalizedQuery
    )
}