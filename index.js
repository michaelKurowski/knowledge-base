const bootstrapRepositories = require('./bootstrapRepositories')
const saveRepositories = require('./saveRepositories')
const convertArgvToAction = require('./convertArgvToAction')
const sendToRouter = require('./core/sendToRouter')

bootstrapRepositories()
const actionToBePerformed = convertArgvToAction(process.argv)

sendToRouter(actionToBePerformed)
    .then(saveRepositories)
    .catch(err => console.error(`Operation failed. More info:\n${err}`))
    .then(process.exit)

saveRepositories()