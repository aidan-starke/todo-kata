import request from 'supertest'

import server from './server'
import { TestScheduler } from 'jest'

test('GET /api/v1/tasks', () => {
    request(server)
        .get('/api/v1/tasks')
        .then(res => {
            expect(res.status).toBe(200)
            expect(res.body.length).toBe(2)
        })
})