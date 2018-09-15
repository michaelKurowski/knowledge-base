let database = {}

function getDatabase() {
    return database
}

function query() {

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
