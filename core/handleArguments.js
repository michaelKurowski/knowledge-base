const readline = require('readline')

const databaseDriver = require('./databaseDriver')
const entryBuilder = require('./entryBuilder')
const ARGUMENTS = require('./argumentsMap')

const readlineInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

function printEntry(entry) {
    console.log('------------------------------')
    console.log(`ID: ${entry.id} || Categories: ${entry.categories.join(', ')}`)
    console.log(entry.content)
}

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

function findNonExistingCategories(listOfCategories) {
    const existingCategories = findConflictingCategories(listOfCategories)
    return listOfCategories.filter(category => existingCategories.indexOf(category) === -1)
}

async function handleQuery(stringifiedListOfKeywords) {
    const listOfKeywords = stringifiedListOfKeywords.split(' ')
    const results = databaseDriver.query(listOfKeywords)
    results.forEach(result => {printEntry(result.entry), console.log(result.score)})
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
    matchingResults.forEach(printEntry)
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
        const nonExistingCategories = findNonExistingCategories(listOfCategories)
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

async function handleEditEntryPayload(payload) {
    const id = parseInt(payload)
    const entry = databaseDriver.getEntryById(id)
    if (!entry) throw `There's no entry with ID: ${id}`
    const newContent = await createQuestion('What shoould be a new content? (Leave empty if content shouldn\'t be changed)')
    const newCategories = await createQuestion('What should be new categories? (Leave empty if categories shouldn\'t be changed)')
    const newTags = await createQuestion('What should be new tags? (Leave empty is tags shouldn\'t be changed)')

    if (!!newCategories) {
        const categoriesList = newCategories.split(' ')
        const nonExistingCategories = findNonExistingCategories(categoriesList)
        if (nonExistingCategories.length !== 0)
            throw `Some of categories you typed are nonexisting: ${nonExistingCategories}`
        entry.categories = newCategories
    }

    entry.tags = newTags || entry.tags
    entry.content = newContent || entry.content
    console.log('ENTRY EDITED!')
    console.log('NEW ENTRY VERSION:')
    printEntry(entry)
}

async function handleEntryDeletion(payload) {
    const id = parseInt(payload)
    databaseDriver.deleteEntryById(id)
    console.log('Entry deleted!')
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
        case ARGUMENTS.EDIT_ENTRY:
            return handleEditEntryPayload(payload)
        case ARGUMENTS.DELETE_ENTRY:
            return handleEntryDeletion(payload)
        default:
            throw `Unhandled category: ${argument} with payload: ${payload}`
    }
}

module.exports = handleArguments