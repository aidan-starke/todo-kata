import { DELETE_TASK } from '../actions'
import { deleteTaskById } from '../api'
let initialState = []

function viewTasks(state = initialState, action) {
    switch (action.type) {
        case DELETE_TASK:
            deleteTaskById(action.id)
        default:
            return state

    }
}

export default viewTasks