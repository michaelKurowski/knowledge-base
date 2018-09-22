const ACTIONS = require('../actions')
const notesRepository = require('../knowledgeRepository/notesRepository')
const categoriesRepository = require('../knowledgeRepository/categoriesRepository')
const createQuestion = require('./utils/createQuestion')

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
    async [ACTIONS.EDIT_NOTE](noteIdString) {
        const newContent =
            await createQuestion('Type new content for the note, or leave empty to skip that step.')
        
        const newCategoriesString = 
            await createQuestion('Enlist new categories for the note, or leave empty to skip that step.')
        const newCategoriesList = newCategoriesString.split(' ')
        const areAllEnlistedCategoriesExisting = newCategoriesList.every(categoriesRepository.has)
        if (!areAllEnlistedCategoriesExisting && newCategoriesString) 
            throw `Some of the enlisted categories don't exist!`

        const newTagsString =
            await createQuestion('Enlist new tags for the note, or leave empty to skip that step.')
        
        const newTagsList = newTagsString.split(' ')
       
        const newNote = {}
        
        if (newCategoriesString) newNote.categories = newCategoriesList
        if (newContent) newNote.content = newContent
        if (newTagsString) newNote.tags = newTagsList
        try { notesRepository.edit(parseInt(noteIdString), newNote) }
        catch (err) { throw `Edition unsuccessful, reason: ${err}` }
    },
    async [ACTIONS.DELETE_NOTE](targetKey) {
        notesRepository.remove(parseInt(targetKey[0]))
    }
}