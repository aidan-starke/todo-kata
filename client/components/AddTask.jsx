import React from 'react'
import {connect} from 'react-redux'

import {setTasks} from '../actions'
import { addTask, fetchTasks } from '../api'

class AddTask extends React.Component {
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
            .then(() => {
                this.setState({name: ''})
                return fetchTasks()
            })
            .then((tasks) => {
                this.props.dispatch(setTasks(tasks))
            })
    }

    listenForKeys = (event) => {
        switch(event.keyCode) {
            case 13:
                this.submit()
                break
            
        }
    }

    render() {
        return (
            <>
                <h2>Add Task</h2>
                <input 
                    name='name' 
                    onChange={this.handleChange}
                    onKeyDown={this.listenForKeys}
                    value={this.state.name}
                />
                <button onClick={this.submit}>Create Task</button>
            </>
        )
    }
}

export default connect()(AddTask)