import React, { useState, useEffect } from 'react'

import { connect } from 'react-redux'

import { getList } from '../api'

import { setTasks, addTask } from '../actions'

import { addNewTask } from '../api'

import Task from './Task'

import { Button, Form, FormControl, InputGroup } from 'react-bootstrap'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
	form: {
		display: 'inline-block',
		marginBottom: '10px',
	},
})

const TodoList = ({ tasks, dispatch }) => {
	const [isLoaded, setIsLoaded] = useState(false)
	const [newTask, setNewTask] = useState('')

	const classes = useStyles()

	const loadTasks = () => {
		let mounted = true
		getList().then(tasks => {
			if (mounted) {
				dispatch(setTasks(tasks))
				setIsLoaded(true)
			}
		})
		return () => (mounted = false)
	}

	useEffect(loadTasks, [])

	const changeHandler = event => {
		event.preventDefault()
		setNewTask(event.target.value)
	}

	const addTaskHandler = event => {
		event.preventDefault()
		addNewTask(newTask).then(() => dispatch(addTask(newTask)))
		loadTasks()
	}

	return (
		<div>
			{isLoaded && (
				<ul>
					{tasks.map((task, i) => (
						<li key={i}>
							<Task task={task} />
						</li>
					))}
				</ul>
			)}
			<Form onSubmit={addTaskHandler} className={classes.form}>
				<InputGroup size='sm' style={{ width: '500px' }}>
					<FormControl
						onChange={changeHandler}
						style={{ marginBottom: '20px' }}
						aria-label='Small'
						aria-describedby='inputGroup-sizing-sm'
					/>
				</InputGroup>
				<Button variant='dark' type='submit'>
					Add Task
				</Button>
			</Form>
		</div>
	)
}

function mapStateToProps(state) {
	return {
		tasks: state.tasks,
	}
}

export default connect(mapStateToProps)(TodoList)
