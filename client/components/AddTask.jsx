import React from 'react'
import { connect } from 'react-redux'

import { addTask } from '../api'

export default class AddTask extends React.Component {
    state = {
        name: ''
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    submit = () => {
        addTask(this.state.name)
    }

    render() {
        return (
            <>
                <h2>Add Task</h2>
                <input name='name' onChange={this.handleChange}/>
                <button onClick={this.submit}>Create Task</button>
            </>
        )
    }

}
