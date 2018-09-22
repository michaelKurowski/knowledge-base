const stringSimiliary = require('string-similarity')
const categoriesRepository = require('./categoriesRepository')

function calculateForEntry(phrase, entry) {
    const scoreFromCategories = calculateScoreForCategories(entry, phrase)
    const scoreFromTags = compareListsOfWords(entry.tags, phrase)
    const scoreFromContent = compareStringsWithoutCaseSensitivity(entry.content, phrase.join(' '))
    return {
        score: (scoreFromCategories + scoreFromTags + scoreFromContent) / 3,
        note: entry
    }
}

function compareStringsWithoutCaseSensitivity(stringA, stringB) {
    return stringSimiliary.compareTwoStrings(stringA.toUpperCase(), stringB.toUpperCase())
}

function compareListsOfWords(listA, listB) {
    return listA.reduce((totalScore, listAEntry) => 
        totalScore + listB.reduce((singleIterationScore, listBEntry) =>
            singleIterationScore + compareStringsWithoutCaseSensitivity(listAEntry, listBEntry)
        , 0) / listA.length
    , 0) / listB.length
}

function calculateScoreForCategories(note, queryKeywords) {
    const allCategoriesVariants = flattenList(note.categories.map(categoriesRepository.get))
    return compareListsOfWords(allCategoriesVariants, queryKeywords)
}

function flattenList(list) {
    return list.reduce((accumulator, listElement) => 
        accumulator.concat(...listElement)
    , [])
}
module.exports = calculateForEntry