const testEnv = require('./test-environment')
const db = require('../../db')

let testDb = null

beforeEach(() => {
    testDb = testEnv.getTestDb()
    return testEnv.initialise(testDb)
})

afterEach(() => testEnv.cleanup(testDb))

test('getList returns all list items', () => {
    const expected = 3

    return db.getList(testDb)
        .then(items => {
            expect(items.length).toBe(expected)
        })
})

test('getListItemById returns correct list item', () => {
    const expected = 'PROFIT'

    return db.getListItemById(3, testDb)
        .then(item => {
            expect(item.item).toMatch(expected)
        })
})

test('addListItem adds a list item', () => {
    const expected = 4

    return db.addListItem('test item', testDb)
        .then(() => {
            return db.getList(testDb)
                .then(list => {
                    expect(list.length).toBe(expected)
                })
        })
})

test('removeListItemById removes list item', () => {
    const expected = 2

    return db.removeListItemById(2, testDb)
        .then(() => db.getList(testDb)
            .then(list => expect(list.length).toBe(expected))
        )
})

test('editListItem edits correct item', () => {
    const expected = 'LOSS'

    return db.editListItem(3, 'LOSS', testDb)
        .then(() => db.getListItemById(3, testDb)
            .then(item => expect(item.item).toMatch(expected))
        )
})