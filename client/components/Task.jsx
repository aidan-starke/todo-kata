import React from 'react'

import { connect } from 'react-redux'

import {deleteTaskById} from '../api'

import {deleteTask} from '../actions'

function Task({task, dispatch}) {

    const deleteHandler = (id) => {
        deleteTaskById(id)
            .then(() => dispatch(deleteTask(id)))
    }

    return (
        <>
            {task.item}
            <input type='checkbox' onChange={() => deleteHandler(task.id)} />
        </>
    )
}

export default connect()(Task)
