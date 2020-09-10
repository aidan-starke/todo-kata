import request from 'supertest'

import server from './server'
import {getTasks, saveTask, deleteTask} from './db'

jest.mock('./db', () => ({
    getTasks: jest.fn(),
    saveTask: jest.fn(),
    deleteTask: jest.fn()
}))

describe('GET /api/v1/tasks', () => {
    test('returns tasks when successful', () => {
        getTasks.mockImplementation(() => Promise.resolve([
            {id: 1, name: 'eat bananas'},
            {id: 2, name: 'eat chocolate'}
        ]))
        return request(server)
            .get('/api/v1/tasks')
            .then(res => {
                expect(res.status).toBe(200)
                expect(res.body.length).toBe(2)
            })
    })
    test('returns 500 if database function blows up', () => {
        getTasks.mockImplementation(() => Promise.reject('error'))
        return request(server)
            .get('/api/v1/tasks')
            .then(res => {
                expect(res.status).toBe(500)
                expect(res.text).toMatch(/something went wrong/)
            })
    })
})

describe('POST /api/v1/tasks', () => {
    test("add task to database", ( ) => {
        saveTask.mockImplementation(() => Promise.resolve([3]))
        return request(server)
            .post('/api/v1/tasks')
            .send({name: 'new task'})
            .then(res => {
                expect(saveTask).toHaveBeenCalled()
                expect(saveTask.mock.calls[0][0].name).toBe('new task')

                expect(res.status).toBe(201)
                expect(res.body.id).toBe(3)
            })
    })
})

describe('DELETE /api/v1/tasks/:id', () => {
    test("calls deleteTask database function", () => {
        deleteTask.mockImplementation(() => Promise.resolve(1))
        expect.assertions(2)
        return request(server)
            .delete('/api/v1/tasks/1')
            .then(res => {
                expect(deleteTask).toHaveBeenCalledWith(1)
                expect(res.status).toBe(200)
            })
    })
})