import {setTasks, removeTask, updateTask} from '../actions'
import tasksReducer from './tasks'

test("initial state is an empty array", () => {
    let state = tasksReducer(undefined, {})
    expect(state.length).toBe(0)
})

test("SET_TASKS action sets the tasks", () => {
    let tasks = [{name: 'eat bananas'}]
    let action = setTasks(tasks)
    let newState = tasksReducer([], action)
    expect(newState).toEqual(tasks)
})

test("REMOVE_TASK action removes a task", () => {
    let tasks = [{name: 'stuff', id: 3}]
    let action = removeTask(3)
    let newState = tasksReducer(tasks, action)
    expect(newState).toEqual([])
})

describe('UPDATE_TASK', () => {
    test("updates a task", () => {
        let tasks = [{name: 'stuff', id: 3}]
        let action = updateTask(3, "rock the boat")
        let newState = tasksReducer(tasks, action)
        expect(newState[0].name).toEqual("rock the boat")
    })

    test("does not update other tasks", () => {
        let tasks = [{name: 'stuff', id: 3}]
        let action = updateTask(2, "rock the boat")
        let newState = tasksReducer(tasks, action)
        expect(newState[0].name).toEqual("stuff")
    })
})