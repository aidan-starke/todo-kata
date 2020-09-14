import request from 'supertest'

import server from '../server'

import { getList, addListItem, removeListItemById, editListItem } from '../../db'

jest.mock('../../db', () => ({
    getList: jest.fn(),
    addListItem: jest.fn(),
    removeListItemById: jest.fn(),
    editListItem: jest.fn()
}))

test('GET api/v1/tasks returns tasks', () => {
    getList.mockImplementation(() => Promise.resolve([
        { id: 1, name: 'test task 1' },
        { id: 2, name: 'test task 2' }
    ]))

    return request(server)
        .get('/api/v1/tasks')
        .expect(200)
        .then(res => {
            expect(res.body.length).toBe(2)
        })
})

test('POST api/v1/tasks adds a list item to db', () => {
    addListItem.mockImplementation(() => Promise.resolve([3]))

    return request(server)
        .post('/api/v1/tasks/:test')
        .expect(201)
        .then(res => {
            expect(addListItem).toHaveBeenCalled()
            expect(res.text).toMatch('Created')
        })
})

test('DELETE api/va/tasks/:id calls db.removeListItemById', () => {
    removeListItemById.mockImplementation(() => Promise.resolve(2))

    return request(server)
        .delete('/api/v1/tasks/2')
        .expect(200)
        .then(() => expect(removeListItemById).toHaveBeenCalledWith(2))
})

test('calls db.editListItem', () => {
    editListItem.mockImplementation(() => Promise.resolve(3))

    return request(server)
        .patch('/api/v1/tasks/3')
        .send({item: 'LOSS'})
        .expect(200)
        .then(() => expect(editListItem).toHaveBeenCalledWith(3, 'LOSS'))
})