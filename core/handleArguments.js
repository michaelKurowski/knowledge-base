const readline = require('readline')

const databaseDriver = require('./databaseDriver')
const entryBuilder = require('./entryBuilder')
const ARGUMENTS = require('./argumentsMap')

const readlineInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

function createQuestion(questionText) {
    return new Promise(resolve => {
        readlineInterface.question(`${questionText}\n`, resolve)
    })
}

function parseUserProvidedList(list) {
    return list.split(' ')
}

function findConflictingCategories(listOfCategories) {
    return listOfCategories
        .filter(databaseDriver.hasCategory)
}

function checkCategoriesForConflicts(listOfCategories) {
    const conflictingCategories = findConflictingCategories(listOfCategories)
    if (!!conflictingCategories.length) {
        throw `Some of these categories already exist: ${conflictingCategories}`
    }
    return listOfCategories
}

async function handleQuery(stringifiedListOfKeywords) {
    const listOfKeywords = stringifiedListOfKeywords.split(' ')
    const results = databaseDriver.query(listOfKeywords)
    results.forEach(result => console.log(result.entry.content, result.score))
}

async function handleAddCategoriesPayload(stringifiedListOfCategories) {
    console.log('handleAddCategories')
    const listOfCategories = parseUserProvidedList(stringifiedListOfCategories)
    checkCategoriesForConflicts(listOfCategories)
    listOfCategories.forEach(databaseDriver.addCategory.bind(databaseDriver))
    console.log('added')
    return Promise.resolve()
}

async function handleListByCategory(categoryName) {
    const isCategoryExisting = findConflictingCategories([categoryName]).length === 1
    if (!isCategoryExisting) throw `${categoryName} is not created yet.`
    const matchingResults = databaseDriver.filterByCategory(categoryName)
    matchingResults.forEach(entry => console.log(entry.content))
}

async function handleAddEntryPayload(payload) {
    const newEntryInfo = {
        categories: null,
        tags: null,
        content: payload
    }

    const stringifiedListOfCategories = await createQuestion('What categories do you want to assign?')
    const listOfCategories = parseUserProvidedList(stringifiedListOfCategories)
    const existingCategories = findConflictingCategories(listOfCategories)
    if (existingCategories.length !== listOfCategories.length) {
        console.log(existingCategories, listOfCategories)
        const nonExistingCategories = listOfCategories.filter(category => existingCategories.indexOf(category) === -1)
        throw `Some of categories that you wanted to use, do not exist: ${JSON.stringify(nonExistingCategories)}`
    }
    newEntryInfo.categories = listOfCategories

    const stringifiedListOfTags = await createQuestion('What tags do you want to assign?')
    const listOfTags = parseUserProvidedList(stringifiedListOfTags)
    newEntryInfo.tags = listOfTags
    
    const entryObject = entryBuilder(newEntryInfo.content, newEntryInfo.categories, newEntryInfo.tags)

    databaseDriver.addEntry(entryObject)
    return Promise.resolve()
}

function handleArguments({argument, payload}) {
    console.log('handle arguments')
    switch (argument) {
        case ARGUMENTS.ADD_ENTRY:
            return handleAddEntryPayload(payload)
        case ARGUMENTS.ADD_CATEGORY:
            return handleAddCategoriesPayload(payload)
        case ARGUMENTS.LIST_BY_CATEGORY:
            return handleListByCategory(payload)
        case ARGUMENTS.QUERY:
            return handleQuery(payload)
        default:
            throw `Unhandled category: ${argument} with payload: ${payload}`
    }
}

module.exports = handleArguments