import {setTasks, deleteTask, addTask} from '../../actions'

import tasks from '../../reducers/tasks'

const testTasks = [
    {id: 1, item: 'test 1'},
    {id: 2, item: 'test 2'}
]

test('SET_TASKS returns tasks', () => {
    let state = tasks([], setTasks(testTasks))

    expect(state.length).toBe(2)
})

test('DELETE_TASK deletes task by id', () => {
    let state = tasks(testTasks, deleteTask(2))

    expect(state.length).toBe(1)
    expect(state.find(task => task.id == 2)).toBe(undefined)
})

test('ADD_TASK adds a task', () => {
    let state = tasks(testTasks, addTask('test 3'))

    expect(state.length).toBe(3)
    expect(state[2]).toMatch(/test 3/)
})
