export const GET_TASKS = 'GET_TASKS'
export const DELETE_TASK = 'DELETE_TASK'

export function getTasks() {
    return {
        type: GET_TASKS
    }
}

export function deleteTask(id) {
    return {
        type: DELETE_TASK,
        id
    }
}