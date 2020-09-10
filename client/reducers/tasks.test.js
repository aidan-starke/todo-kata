import {setTasks} from '../actions'
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