let repository = []

module.exports = {
    getAll() {
        return repository
    },
    add(categoryVariants) {
        const areSomeVariantsAlreadyInUse = categoryVariants.some(this.has)
        if (areSomeVariantsAlreadyInUse) throw `Some of proposed category variants are already in use.`
        repository.push(categoryVariants)
    },
    edit(oldVariant, newVariants) {
        const relevelantCategory = repository.find(matchCategory.bind(null, oldVariant))
        if (!relevelantCategory) throw 'No matching category found'

        const conflictingCategories = newVariants.map(this.get)
        const areSomeCategoriesConflcitingWithTheRestOfRepository =
            conflictingCategories.some(conflictingCategory =>
                conflictingCategory && (conflictingCategory !== relevelantCategory)
            )

        if (areSomeCategoriesConflcitingWithTheRestOfRepository)
            throw `Some of new variants are used elsewhere`

        relevelantCategory.length = 0
        newVariants.forEach(variant => relevelantCategory.push(variant))
    },
    remove(variant) {
        const COUNT_OF_CATEGORIES_TO_BE_DELETED = 1
        const targetIndex = repository.findIndex(matchCategory.bind(null, variant))
        repository.splice(targetIndex, COUNT_OF_CATEGORIES_TO_BE_DELETED)
    },
    has(variant) {
        return repository.some(category => 
            category.some(alias => alias === variant)
        )
    },
    get(variant) {
        return  repository.find(matchCategory.bind(null, variant))
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