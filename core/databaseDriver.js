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
            categoryTotalScore + compareStringsWithoutCaseSensitivity(category, keyword)
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

function filterByCategory(category) {
    return database.entries.filter(entry => 
        entry.categories.indexOf(category) !== -1)
}

function loadDatabase(databaseToLoad) {
    database = databaseToLoad
}

function addEntry(entryObject) {
    database.entries.push(entryObject)
}

function addCategory(categoryName) {
    database.categories.push(categoryName)
}

function hasCategory(categoryName) {
    return !!database.categories.find(iteratedCategory => iteratedCategory === categoryName)
}

function getEntryById(id) {
    return database.entries.find(entry => entry.id === id)
}

function getCategoryByName(wantedCategoryName) {
    return database.categories.find(category => category === wantedCategoryName )
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
    getCategoryByName
}
