const util = require('util')
const fs = require('fs')

const initializeDatabase = require('./core/initializeDatabase')
const databaseDriver = require('./core/databaseDriver')
const getOptionsFromArguments = require('./core/getOptionsFromArguments')
const handleArguments = require('./core/handleArguments')
let database
try {
    database = require('./database.json')
} catch (err) {
    //Check if err is about no file found
    database = initializeDatabase()
}

console.log('database', database)
databaseDriver.loadDatabase(database)
console.log('process.argv', process.argv)
const optionsObject = getOptionsFromArguments(process.argv)
handleArguments(optionsObject)
    .then(() => {
        const formattedDb = util.inspect(databaseDriver.getDatabase())
        //console.log(formattedDb)
        fs.writeFileSync('./database.json', JSON.stringify(databaseDriver.getDatabase()))
        process.exit()
    })
