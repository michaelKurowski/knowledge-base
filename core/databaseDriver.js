let database = {}

function showDatabase() {
    return database
}

function query() {

}

function loadDatabase(databaseToLoad) {
    database = databaseToLoad
}

function addEntry() {

}

function addCategory(categoryName) {
    database.categories.push(categoryName)
}

function hasCategory(categoryName) {
    return !!Object.keys(database.categories).find(iteratedCategory => iteratedCategory === categoryName)
}

module.exports = {showDatabase, query, loadDatabase, addEntry, addCategory, hasCategory}
