const spawnSync = require('child_process').spawnSync


let suite
beforeEach(() => {
    suite = {}
})

afterEach(() => {

})

describe('E2E: Browsing', () => {
    describe('Listing by categories', () => {
        it('throws error when no category was provided', () => {

        })

        it('throws errror when provided category does not exists', () => {

        })

        it('throws error when space was provided as category', () => {

        })

        it('shows results for correct category', () => {

        })
    })

    describe('Querrying', () => {
        it('throws when no input was provided', () => {

        })

        it('throws when spaces were provided as input', () => {

        })

        it('shows results when no notes match the criteria', () => {

        })

        it('shows no results when no notes match the criteria', () => {

        })
    })
})