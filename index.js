const util = require('util')
const fs = require('fs')


const mapArgvToActions = require('./core/mapArgvToActions')
const handleArguments = require('./core/handleArguments')
const repositoryDriver = require('./core/knowledgeRepository/repositoryDriver')
let categories
let notes
try {
    categories = require('./categories.json')
} catch (err) {//TODO handle many types of errors
    console.warn('Unable to find categories repository, creating new one')
}

try {
    notes = require('./notes.json')
} catch(err) {//TODO handle many types of errors
    console.warn('Unable to find notes repository, creating new one')
}

repositoryDriver.load({categories, notes})
console.log('process.argv', process.argv)
const actionObject = mapArgvToActions(process.argv)
handleArguments(actionObject)
    .then(() => {
        //console.log(formattedDb)
        fs.writeFileSync('./categories.json', JSON.stringify(repositoryDriver.getCategories()))
        fs.writeFileSync('./notes.json', JSON.stringify(repositoryDriver.getNotes()))
        process.exit()
    })