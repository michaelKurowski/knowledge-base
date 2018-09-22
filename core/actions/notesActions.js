const ACTIONS = require('../actions')
const notesRepository = require('../knowledgeRepository/notesRepository')
const categoriesRepository = require('../knowledgeRepository/categoriesRepository')
const createQuestion = require('./createQuestion')

module.exports = {
    async [ACTIONS.ADD_NOTE](noteContentWordsList) {
        const noteContentString = noteContentWordsList.join(' ')
        const categoriesString =
            await createQuestion('Enlist categories for the note.')
        if (!categoriesString) throw 'You must to enlist at least one category'

        const tagsString =
            await createQuestion('Enlist tags for the note.')

        const categoriesList = categoriesString.split(' ')
        const areAllEnlistingCategoriesExisting = categoriesList.every(categoriesRepository.has) 

        if (!areAllEnlistingCategoriesExisting) throw `Some of the enlisted categories are not existing`

        const tagsList = tagsString.split(' ')

        notesRepository.add({ content: noteContentString, tags: tagsList, categories: categoriesList })
        return
    },
    async [ACTIONS.EDIT_NOTE](categoryVariant) {
        const newAliasesString = await createQuestion('Enlist new variants for this category or leavy empty to not introduce any changes.')
        if (!newAliasesString) return
        const newAliases = newAliasesString.split(' ')

        try { notesRepository.edit(categoryVariant[0], newAliases) }
        catch (err) { throw `Edition unsuccessful, reason: ${err}` }
    },
    async [ACTIONS.DELETE_NOTE](targetKey) {
        notesRepository.remove(targetKey[0])
    }
}