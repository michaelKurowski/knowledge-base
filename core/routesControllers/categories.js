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

        const oldAliases = categoriesRepository.get(categoryVariant[0])
        if (!oldAliases) throw `No "${categoryVariant}" category found`
        const oldHeadVariant = oldAliases[0]
        const affectedNotes =
            repositoriesUtils.getNoteByCategory(categoriesRepository, notesRepository, oldHeadVariant)


        try { categoriesRepository.edit(categoryVariant[0], newAliases) }
        catch (err) { throw `Edition unsuccessful, reason: ${err}` }
        const newStateOfNotes = affectedNotes.map(note => {
            note.categories = note.categories.map(category => {
                return (category === oldHeadVariant) ? newAliases[0] : category
            })
            return note
        })
        newStateOfNotes.forEach(note => {
            notesRepository.edit(note.id, {categories: note.categories})
        })
    },
    async [ROUTES.DELETE_CATEGORY](targetKey) {
        const category = categoriesRepository.get(targetKey[0])
        if (!category) throw `No "${category}" category found.`
        notesRepository.removeCategoryFromNotes(category[0])
        categoriesRepository.remove(category[0])
    }
}