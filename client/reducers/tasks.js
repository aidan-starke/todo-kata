import { GET_TASKS } from '../actions'
let initialState = []

function viewTasks(state = initialState, action) {
    switch(action.type) {
        case GET_TASKS:
            return state
        // case ADD_TASK:
        //     return state.concat(action.task)
        // case DELETE_TASK:
        //     return ['skrrt']
        default:
            return state

    }
}

export default viewTasks