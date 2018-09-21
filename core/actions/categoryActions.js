const ACTIONS = require('../actions')
const categoriesRepository = require('../knowledgeRepository/categoriesRepository')
const createCategory = require('../createCategory')

module.exports = {
    async [ACTIONS.ADD_CATEGORY](categoryAliasesList) {
        categoriesRepository.add(categoryAliasesList)
        return
    },

    [ACTIONS.EDIT_CATEGORY](targetKey, {aliases, key}) {

    },

    [ACTIONS.DELETE_CATEGORY](targetKey) {
        categoriesRepository.remove(targetKey)
    }
}