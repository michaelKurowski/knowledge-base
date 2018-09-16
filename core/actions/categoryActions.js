const ACTIONS = require('../actions')
const categoriesRepository = require('../knowledgeRepository/categoriesRepository')
const createCategory = require('../createCategory')

module.exports = {
    [ACTIONS.ADD_CATEGORY](categoryKey, categoryAliases) {
        const newCategory = createCategory(categoryKey, categoryAliases)
        categoriesRepository.add(newCategory)
    },

    [ACTIONS.EDIT_CATEGORY](targetKey, {aliases, key}) {

    },

    [ACTIONS.DELETE_CATEGORY](targetKey) {
        categoriesRepository.remove(targetKey)
    }
}