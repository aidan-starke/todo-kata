import nock from 'nock'
import {fetchTasks, addTask, deleteTask} from './api'

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

test('add task posts to server', () => {
    const scope = nock(/localhost/)
        .post('/api/v1/tasks')
        .reply(201)

    return addTask({name: 'test task'})
        .then(() => {
            expect(scope.isDone()).toBe(true)
        })
})

test('delete task', () => {
    const scope = nock(/localhost/)
        .delete('/api/v1/tasks/1')
        .reply(200)

    return deleteTask(1)
        .then(() => {
            expect(scope.isDone()).toBe(true)
        })
})