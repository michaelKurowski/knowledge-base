const ARGUMENTS = require('./argumentsMap')

const ARGUMENTS_OFFSET = 2

const argumentsMap = new Map([
    ['-e', ARGUMENTS.ADD_ENTRY],
    ['--entry', ARGUMENTS.ADD_ENTRY],
    ['-c', ARGUMENTS.ADD_CATEGORY],
    ['--c', ARGUMENTS.ADD_CATEGORY],
    ['-l', ARGUMENTS.LIST_BY_CATEGORY],
    ['--list', ARGUMENTS.LIST_BY_CATEGORY],
    ['-q', ARGUMENTS.QUERY],
    ['--query', ARGUMENTS.QUERY]
])

function getOptionsFromArguments(processArguments) {
    const firstArgument = processArguments[ARGUMENTS_OFFSET]
    const argumentSymbol = argumentsMap.get(firstArgument)
    if (!argumentSymbol) throw `Unhandled argument received: "${firstArgument}"`

    const argumentPayload = processArguments[ARGUMENTS_OFFSET + 1]

    return {argument: argumentSymbol, payload: argumentPayload}
}

module.exports = getOptionsFromArguments
