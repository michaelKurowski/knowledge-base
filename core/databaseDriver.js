const stringSimiliarity = require('string-similarity')

const QUERY_RESULT_SCHEMA = {
    entry: null,
    score: null
}

let database = {}

function compareStringsWithoutCaseSensitivity(stringA, stringB) {
    return stringSimiliarity.compareTwoStrings(stringA.toUpperCase(), stringB.toUpperCase())
}

function calculateScoreForCategories(entry, queryKeywords) {
    return entry.categories.reduce((entryTotalScore, category) => 
        entryTotalScore + queryKeywords.reduce((categoryTotalScore, keyword) => 
            categoryTotalScore + 
            findAllCategoryForms(category).reduce((categoryFormTotalScore, categoryForm) => 
                categoryFormTotalScore + compareStringsWithoutCaseSensitivity(categoryForm, keyword)
            , 0)
        , 0) / queryKeywords.length
    , 0) / entry.categories.length
}


function calculateScoreForTags(entry, queryKeywords) {
    return entry.tags.reduce((entryTotalScore, tag) => 
        entryTotalScore + queryKeywords.reduce((tagTotalScore, keyword) => 
            tagTotalScore + compareStringsWithoutCaseSensitivity(tag, keyword)
        , 0) / queryKeywords.length
    , 0) / entry.tags.length
}

function calculateScoreForContent(entry, queryKeywords) {
    return compareStringsWithoutCaseSensitivity(entry.content, queryKeywords.join(' '))
}

function calculateScore (entry, keywords) {
    return (
        calculateScoreForContent(entry, keywords) +
        calculateScoreForTags(entry, keywords) +
        calculateScoreForCategories(entry, keywords)
    ) / 3
}

function getDatabase() {
    return database
}

function query(keywordsList) {
    const entriesWithCalculatedMatchScore = database.entries.map(entry => {
        const newQueryResult = Object.create(QUERY_RESULT_SCHEMA)
        newQueryResult.entry = entry
        newQueryResult.score = calculateScore(entry, keywordsList)
        return newQueryResult
    })
    const results = entriesWithCalculatedMatchScore.filter(result => result.score !== 0)
    const sortedResults = results.sort((queryResultA, queryResultB) => queryResultB.score - queryResultA.score)
    return sortedResults
}

function filterByCategory(categoryForm) {
    const matchedCategory = database.categories.find(categoryObject => 
        matchCategory(categoryForm, categoryObject)
    )
    if (!matchedCategory) `Throw no corresponding category found to ${categoryForm}`
    console.log(matchedCategory)
    return database.entries.filter(entry => 
        entry.categories.find(entryCategory => entryCategory.toUpperCase() === matchedCategory.key.toUpperCase())
    )
}

function loadDatabase(databaseToLoad) {
    database = databaseToLoad
}

function addEntry(entryObject) {
    database.entries.push(entryObject)
}

function addCategory(categoryObject) {
    database.categories.push(categoryObject)
}

function hasCategory(categoryName) {
    return !!database.categories.find(iteratedCategory => matchCategory(categoryName, iteratedCategory))
}

function getEntryById(id) {
    return database.entries.find(entry => entry.id === id)
}

function getCategoryByName(wantedCategoryName) {
    return database.categories.find(category => matchCategory(wantedCategoryName, category) )
}

function deleteEntryById(id) {
    const databaseAfterOperation = database.entries.filter(entry => entry.id !== id)
    if (databaseAfterOperation.length === database.entries.length)
        throw `There's no entry with ID ${id}`
    database.entries = databaseAfterOperation
}

function deleteCategoryByKey(categoryKeyToDelete) {
    const databaseAfterOperation = database.categories.filter(category => category.key !== categoryKeyToDelete)
    if (databaseAfterOperation.length === database.categories.length)
        throw `There's no category with key ${key}`
    database.categories = databaseAfterOperation
    clearEntriesFromNonexistingCategories()
}

function clearEntriesFromNonexistingCategories() {
    let entriesIdsToDelete = []
    const databaseAfterOperation = database.entries.map(entry => {
        const existingCategories = entry.categories.filter(entryCategoryKey => {
            return !!database.categories.find(category => category.key === entryCategoryKey)
        })
        if (existingCategories.length === 0) {
            console.log(`${entry.content} will be removed as no existing categories left for him.`)
            entriesIdsToDelete.push(entry.id)
        }
        console.log(entry.content, '  |  ', entry.categories, ' => ', existingCategories)
        entry.categories = existingCategories
        console.log(entry.content, ' | categories left:', entry.categories)
        return entry
    })
    database.entries = databaseAfterOperation
    console.log('Entries to delete', entriesIdsToDelete)
    entriesIdsToDelete.forEach(deleteEntryById)
}

function mapCategoryFormToKey(categoryForm) {
    return database.categories.find(categoryObject => 
        matchCategory(categoryForm, categoryObject)).key
    
}

function findAllCategoryForms(categoryForm) {
    const foundCategoryObject = database.categories.find(categoryObject => 
        matchCategory(categoryForm, categoryObject)
    )
    return [foundCategoryObject.key, ...foundCategoryObject.aliases]
}

function matchCategory(query, category) {
    const normalizedQuery = query.toUpperCase()
    const normalizedCategoryKey = category.key.toUpperCase()
    const normalizedCategoryAliases = category.aliases.map(alias => alias.toUpperCase())
    return [normalizedCategoryKey, ...normalizedCategoryAliases].find(categoryForm =>
        categoryForm === normalizedQuery
    )
}

function changeCategoryKey(categoryKey, newCategoryKey) {
    const entriesAfterOperation = database.entries.map(entry => {
        const newCategories = entry.categories.map(category => (category === categoryKey) ? newCategoryKey : category)
        entry.categories = newCategories
        return entry
    })
    const category = database.categories.find(iteratedCategory => iteratedCategory.key === categoryKey)
    category.key = newCategoryKey
    database.entries = entriesAfterOperation
}

function changeCategoryAliases(targetCategoryKey, newAliases) {
    const category = database.categories.find(category => category.key === targetCategoryKey)
    category.aliases = newAliases
}

module.exports = {
    getDatabase,
    query,
    loadDatabase,
    addEntry,
    addCategory,
    hasCategory,
    filterByCategory,
    getEntryById,
    getCategoryByName,
    deleteEntryById,
    mapCategoryFormToKey,
    deleteCategoryByKey,
    changeCategoryKey,
    changeCategoryAliases
}
