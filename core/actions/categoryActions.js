const ACTIONS = require('../actions')
const categoriesRepository = require('../knowledgeRepository/categoriesRepository')
const createQuestion = require('./createQuestion')

module.exports = {
    //works
    async [ACTIONS.ADD_CATEGORY](categoryAliasesList) {
        categoriesRepository.add(categoryAliasesList)
        return
    },
    //works
    async [ACTIONS.EDIT_CATEGORY](categoryVariant) {
        const newAliasesString = await createQuestion('Enlist new variants for this category or leavy empty to not introduce any changes.')
        if (!newAliasesString) return
        const newAliases = newAliasesString.split(' ')

        try { categoriesRepository.edit(categoryVariant[0], newAliases) }
        catch (err) { throw `Edition unsuccessful, reason: ${err}` }
    },
    //works
    async [ACTIONS.DELETE_CATEGORY](targetKey) {
        categoriesRepository.remove(targetKey[0])
    }
}