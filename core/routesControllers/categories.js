const ROUTES = require('../routes')
const categoriesRepository = require('../knowledgeRepository/categoriesRepository')
const createQuestion = require('./utils/createQuestion')

module.exports = {
    async [ROUTES.ADD_CATEGORY](categoryAliasesList) {
        categoriesRepository.add(categoryAliasesList)
        return
    },
    async [ROUTES.EDIT_CATEGORY](categoryVariant) {
        const newAliasesString =
            await createQuestion('Enlist new variants for this category or leavy empty to not introduce any changes.')
        if (!newAliasesString) return
        const newAliases = newAliasesString.split(' ')

        try { categoriesRepository.edit(categoryVariant[0], newAliases) }
        catch (err) { throw `Edition unsuccessful, reason: ${err}` }
    },
    async [ROUTES.DELETE_CATEGORY](targetKey) {
        categoriesRepository.remove(targetKey[0])
    }
}