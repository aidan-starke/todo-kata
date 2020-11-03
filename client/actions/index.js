export const SET_TASKS = 'SET_TASKS'
export const DELETE_TASK = 'DELETE_TASK'
export const ADD_TASK = 'ADD_TASK'

export function setTasks(tasks) {
    return {
        type: SET_TASKS,
        tasks
    }
}

export function deleteTask(id) {
    return {
        type: DELETE_TASK,
        id
    }
}

export function addTask(task) {
    return {
        type: ADD_TASK,
        task
    }
}