import React from 'react'

import { connect } from 'react-redux'

import {deleteTaskById} from '../api'

import {deleteTask} from '../actions'

function Task({item, dispatch}) {

    const deleteHandler = (id) => {
        deleteTaskById(id)
            .then(() => dispatch(deleteTask(id)))
    }

    return (
        <>
            {item.item}
            <input type='checkbox' onChange={() => deleteHandler(item.id)} />
        </>
    )
}

export default connect()(Task)