
const readline = require('readline')

const readlineInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

function createQuestion(questionText) {
    return new Promise(resolve => {
        readlineInterface.question(`${questionText}\n`, resolve)
    })
}

module.exports = createQuestion