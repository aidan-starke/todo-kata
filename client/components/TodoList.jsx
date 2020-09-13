import React, { useState, useEffect } from 'react'

import {connect} from 'react-redux'

import { getList } from '../api'

const TodoList = ({dispatch}) => {
    const [tasks, setTasks] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        getList()
            .then(res => {
                setIsLoaded(true)
                setTasks(res)
            })
    }, [])

    return (
        <div>
            <h2>Todo List</h2>
            {isLoaded &&
                <ul>
                    {tasks.map(item => <li key={item.id}>{item.item} <input type='checkbox' onChange={dispatch(deleteTask(item.id))}>Done?</input></li>)}
                </ul>
            }
            <form onSubmit={}>
                <label for='new-task'>Add a task</label>
                <input type='text' onChange={}></input>
            </form>
        </div>
    )
}

export default connect()(TodoList)