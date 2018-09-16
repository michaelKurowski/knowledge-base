let repository = []

module.exports = {
    add() {
        repository.push(categoryObject)
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
    has() {
        const matchingCategory = repository.find(category => {
            const isKeyMatching = category.key === phrase
            const isAnyAliasMatching = category.aliases.some(alias => alias === phrase)
            return isKeyMatching || isAnyAliasMatching
        })
        return !!matchingCategory
    },
    mapKeyToAliases(targetKey) {
        const matchingCategory = repository.find(category => category.key === targetKey)
        return matchingCategory.aliases
    }
}