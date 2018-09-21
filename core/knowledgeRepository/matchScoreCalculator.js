const stringSimiliary = require('string-similarity')
const categoriesRepository = require('./categoriesRepository')

function calculateForEntry(entry, phrase) {
    const scoreFromCategories = calculateScoreForCategories(entry, phrase)
    const scoreFromTags = calculateScoreForTags(entry, phrase)
    const scoreFromContent = compareStringsWithoutCaseSensitivity(entry.content, phrase)

    return (scoreFromCategories + scoreFromTags + scoreFromContent) / 3
}

function compareStringsWithoutCaseSensitivity(stringA, stringB) {
    return stringSimiliary.compareTwoStrings(stringA.toUpperCase(), stringB.toUpperCase())
}

function calculateScoreForCategories(entry, queryKeywords) {
    return entry.categories.reduce((entryTotalScore, category) => 
        entryTotalScore + queryKeywords.reduce((categoryTotalScore, keyword) => 
            categoryTotalScore + 
            categoriesRepository.findAllCategoryVariants(category).reduce((categoryFormTotalScore, categoryForm) => 
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

module.exports = calculateForEntry