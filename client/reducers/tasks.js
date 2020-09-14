import { SET_TASKS, DELETE_TASK, ADD_TASK } from '../actions'

function viewTasks(state = [], action) {
    switch (action.type) {
        case SET_TASKS:
            return action.tasks
        case DELETE_TASK:
            return state.filter(task => task.id != action.id)
        case ADD_TASK:
            return state.concat(action.task)
        default:
            return state
    }
}

export default viewTasks