import React from 'react'
import { connect } from 'react-redux'
import { fetchTasks } from '../api'
import { setTasks } from '../actions'

class Tasks extends React.Component{
    componentDidMount() {
        fetchTasks()
            .then(tasks => {
                this.props.dispatch(setTasks(tasks))
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        const {tasks} = this.props
        return (
            <>
            <h1>Task List</h1>
            <ul>{tasks.map(task => <li key={task.id}>{task.name}</li>)}</ul>
            </>
        )
    }
}

function mapStateToProps(state) {
    return {
      tasks: state.tasks
    }
}

export default connect(mapStateToProps)(Tasks)
