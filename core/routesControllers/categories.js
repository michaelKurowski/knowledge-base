const ROUTES = require('../routes')
const categoriesRepository = require('../knowledgeRepository/categoriesRepository')
const notesRepository = require('../knowledgeRepository/notesRepository')
const createQuestion = require('./utils/createQuestion')
const repositoriesUtils = require('./utils/repositoriesUtils')


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
        const category = categoriesRepository.get(targetKey[0])
        if (!category) throw `No "${category}" category found.`
        notesRepository.removeCategoryFromNotes(category[0])
        categoriesRepository.remove(category[0])
    }
}