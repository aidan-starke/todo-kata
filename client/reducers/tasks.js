import {SET_TASKS, REMOVE_TASK} from '../actions'

export default function(state=[], action) {
  switch(action.type) {
    case SET_TASKS: 
      return action.tasks

    case REMOVE_TASK:
      return state.filter(t => t.id != action.id)

    default: 
      return state
  }
}
