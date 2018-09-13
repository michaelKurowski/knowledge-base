const util = require('util')

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
        console.log(util.inspect(databaseDriver.showDatabase()))
        process.exit()
    })
