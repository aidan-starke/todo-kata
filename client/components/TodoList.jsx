import React, { useState, useEffect } from 'react'

import { connect } from 'react-redux'

// I would import addNewTask at the same time
//import { addNewTask, getList } from '../api'

import { getList } from '../api'

import { setTasks, addTask } from '../actions'

import { addNewTask } from '../api'

import Task from './Task'

const TodoList = ({ tasks, dispatch }) => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [newTask, setNewTask] = useState('')

    const loadTasks = () => {
        let mounted = true
        getList()
            .then(tasks => {
                if (mounted) {
                    dispatch(setTasks(tasks))
                    setIsLoaded(true)
                }
            })
        return () => mounted = false
    }

    useEffect(loadTasks, [])

    const changeHandler = event => {
        event.preventDefault()
        setNewTask(event.target.value)
    }

    const addTaskHandler = event => {
        event.preventDefault()
        addNewTask(newTask)
            .then(() => dispatch(addTask(newTask)))
        loadTasks()
    }

    return (
        <div>
            {isLoaded &&
                <ul>
                    {tasks.map((task, i) => <li key={i}><Task task={task} /></li>)}
                </ul>
            }
            <form onSubmit={addTaskHandler}>
                <input type='text' onChange={changeHandler} />
                <input type='submit' value='Add task' />
            </form>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        tasks: state.tasks
    }
}

export default connect(mapStateToProps)(TodoList)
