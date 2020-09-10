import knex from 'knex'
import config from '../knexfile'

const {getTasks, saveTask} = require('./db')

let db = knex(config.test)

beforeAll(() => db.migrate.latest())
beforeEach(() => db.seed.run())

test('get all tasks', () => {
    getTasks(db)
        .then((tasks) => {
            expect(tasks.length).toBe(3)
        })
})

test('save task', () => {
    return saveTask({name: 'new task'}, db)
        .then(ids => {
            expect(ids[0] > 0).toBe(true)
            return getTasks(db)
        })
        .then(tasks => {
            expect(tasks.length).toBe(4)
            expect(tasks[3].name).toBe('new task')
        })
})