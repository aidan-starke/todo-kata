export const SET_TASKS = 'SET_TASKS'
export const ADD_TASK = 'ADD_TASKS'

export function setTasks(tasks) {
    return ({
        type: SET_TASKS,
        tasks
    })
}