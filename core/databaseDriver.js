const stringSimiliarity = require('string-similarity')

const QUERY_RESULT_SCHEMA = {
    entry: null,
    score: null
}

let database = {}

function compareStringsWithoutCaseSensitivity(stringA, stringB) {
    return stringSimiliarity.compareTwoStrings(stringA.toUpperCase(), stringB.toUpperCase())
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
        calculateScoreForTags(entry, keywords)
    ) / 2
}

function getDatabase() {
    return database
}

function query(keywordsList) {
    const results = database.entries.map(entry => {
        const newQueryResult = Object.create(QUERY_RESULT_SCHEMA)
        newQueryResult.entry = entry
        newQueryResult.score = calculateScore(entry, keywordsList)
        return newQueryResult
    })
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

module.exports = {getDatabase, query, loadDatabase, addEntry, addCategory, hasCategory, filterByCategory}
