import React, { useState, useEffect } from 'react'

import { connect } from 'react-redux'

import { getList } from '../api'

import { setTasks, addTask } from '../actions'

import { addNewTask } from '../api'

import Task from './Task'

const TodoList = ({ tasks, dispatch }) => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [newTask, setNewTask] = useState('')
    
    const loadTasks = () => {
        getList()
            .then(tasks => {
                dispatch(setTasks(tasks))
                setIsLoaded(true)
            })
    }

    useEffect(loadTasks, [])

    const changeHandler = event => {
        event.preventDefault()
        setNewTask(event.target.value)
    }

    const addTaskHandler = event => {
        event.preventDefault()
        addNewTask(newTask)
            .then(() => {
                dispatch(addTask(newTask))
            })
        loadTasks()
    }

    return (
        <div>
            {isLoaded &&
                <ul>
                    {tasks.map(item => item && <li key={item.id}><Task item={item} /></li>)}
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