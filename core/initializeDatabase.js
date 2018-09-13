const INITIAL_DATABASE_SCHEMA = {
    categories: [

    ],
    entries: [

    ]
}

function initializeDatabase() {
    const initialDatabaseSchemaClone = JSON.parse( JSON.stringify(INITIAL_DATABASE_SCHEMA) )
    return initialDatabaseSchemaClone
}

module.exports = initializeDatabase