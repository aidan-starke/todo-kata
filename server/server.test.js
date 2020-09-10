import request from 'supertest'

import server from './server'
import {getTasks} from './db'

jest.mock('./db', () => ({
    getTasks: jest.fn()
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