import nock from 'nock'
import {fetchTasks} from './api'

test("fetchTasks from server", () => {
    nock(/localhost/)
        .get('/api/v1/tasks')
        .reply(200, [{id: 1, name: 'eat a banana'}])
    
    return fetchTasks()
        .then(tasks => {
            expect(tasks.length).toBe(1)
            expect(tasks[0].name).toBe('eat a banana')
        })
})