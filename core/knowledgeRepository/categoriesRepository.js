let repository = []

module.exports = {
    getAll() {
        return repository
    },
    add(categoryAliases) {
        repository.push(categoryAliases)
    },
    edit(oldVariant, newVariants) {
        const relevelantCategory = repository.find(matchCategory.bind(null, oldVariant))
        if (!relevelantCategory) throw 'No matching category found'
        relevelantCategory.length = 0
        newVariants.forEach(variant => relevelantCategory.push(variant))
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
    return category.some(variant => variant.toUpperCase() === normalizedQuery)
}