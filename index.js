const bootstrapRepositories = require('./bootstrapRepositories')
const saveRepositories = require('./saveRepositories')
const mapArgvToAction = require('./core/mapArgvToAction')
const sendToRouter = require('./core/sendToRouter')

bootstrapRepositories()
const actionToBePerformed = mapArgvToAction(process.argv)

sendToRouter(actionToBePerformed)
    .then(saveRepositories)
    .catch(err => console.error(`Operation failed. More info:\n${err}`))
    .then(process.exit)

saveRepositories()