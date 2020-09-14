const testEnv = require('./test-environment')
const db = require('../db')

let testDb = null

beforeEach(() => {
    testDb = testEnv.getTestDb()
    return testEnv.initialise(testDb)
})

afterEach(() => testEnv.cleanup(testDb))

test('getList returns all list items', () => {
    expect.assertions(1)
    const expected = 3

    return db.getList(testDb)
        .then(items => {
            expect(items.length).toBe(expected)
        })
})

test('addListItem adds a list item', () => {
    expect.assertions(1)
    const expected = 4

    return db.addListItem('test item', testDb)
        .then(() => db.getList(testDb))
        .then(list => {
            expect(list.length).toBe(expected)
        })
})

test('removeListItemById removes list item', () => {
    expect.assertions(1)
    const expected = 2

  //see the way of promise chaining below
    return db.removeListItemById(2, testDb)
        .then(() => db.getList(testDb))
        .then(list => expect(list.length).toBe(expected))

})

test('editListItem edits correct item', () => {
    expect.assertions(1)
    const expected = 'LOSS'

  //I like expect.assertions when dealing with async tests, just to be sure
  expect.assertions(1)

  //reads a little nicer to keep the thens in the same promise chain
    return db.editListItem(3, 'LOSS', testDb)
        .then(() => db.getListItemById(3, testDb))
        .then(item => expect(item.item).toMatch(expected))
})
