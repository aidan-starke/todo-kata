import knex from 'knex'
import config from '../knexfile'

const {getTasks, saveTask, deleteTask, updateTask} = require('./db')

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

describe('delete task', () => {
    test('deletes a  task', () => {
        expect.assertions(2)
        return deleteTask(2, db)
            .then(recordsDeleted => {
                expect(recordsDeleted).toBe(1)
                return getTasks(db)
            })
            .then(tasks => {
                expect(tasks.length).toBe(2)
            })
    })

    test("id of undefined doesn't break anything", () => {
        expect.assertions(2)
        return deleteTask(undefined, db)
            .catch(errorMessage => {
                expect(errorMessage).toBe("id must be specified")
                return getTasks(db)
            })
            .then(tasks => {
                expect(tasks.length).toBe(3)
            })
    })

})

describe('updateTask', () => {
    test("updates a task", () => {
        expect.assertions(2)
        return updateTask(1, "wash the dogs", db)
            .then((recordsUpdated) => {
                expect(recordsUpdated).toBe(1)
                return db('tasks').where({id: 1}).select().first()
            })
            .then(task => {
                expect(task.name).toBe("wash the dogs")
            })
    })

})
