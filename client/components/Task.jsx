import React from 'react'

import { connect } from 'react-redux'

import { deleteTaskById } from '../api'

import { deleteTask } from '../actions'
import { Typography } from '@material-ui/core'

function Task({ task, dispatch }) {
	const deleteHandler = id => {
		deleteTaskById(id).then(() => dispatch(deleteTask(id)))
	}

	return (
		<div>
			<Typography variant='button'>{task.item}</Typography>
			&nbsp;&nbsp;
			<input type='checkbox' onClick={() => deleteHandler(task.id)} />
		</div>
	)
}

export default connect()(Task)
