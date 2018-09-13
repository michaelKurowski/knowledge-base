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
        readlineInterface.question(questionText, resolve)
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

async function handleAddCategoriesPayload(stringifiedListOfCategories) {
    console.log('handleAddCategories')
    const listOfCategories = parseUserProvidedList(stringifiedListOfCategories)
    checkCategoriesForConflicts(listOfCategories)
    listOfCategories.forEach(databaseDriver.addCategory.bind(databaseDriver))
    console.log('added')
    return Promise.resolve()
}

async function handleAddEntryPayload(payload) {
    const newEntryInfo = {
        categories: null,
        tags: null,
        content: payload
    }

    const stringifiedListOfCategories = await createQuestion('What categories do you want to assign?')
    const listOfCategories = parseUserProvidedList(stringifiedListOfCategories)
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
        default:
            throw `Unhandled category: ${argument} with payload: ${payload}`
    }
}

module.exports = handleArguments