import React from 'react'

import { connect } from 'react-redux'

import {deleteTaskById} from '../api'

import {deleteTask} from '../actions'

//I think task is a better name than item - the item.item below reads a bit clunky

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
