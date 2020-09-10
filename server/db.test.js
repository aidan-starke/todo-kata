import knex from 'knex'
import config from '../knexfile'

const {getTasks} = require('./db')

let db = knex(config.test)

beforeAll(() => db.migrate.latest())
beforeEach(() => db.seed.run())

test('get all tasks', () => {
    getTasks(db)
        .then((tasks) => {
            expect(tasks.length).toBe(3)
        })
})