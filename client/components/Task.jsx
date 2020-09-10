import React from 'react'
import {FaMinusCircle} from 'react-icons/fa'
import {connect} from 'react-redux'

import {removeTask} from '../actions'
import {deleteTask} from '../api'

class Task extends React.Component {
    state = {
        showControls : false
    }

    showControls = () => {
        this.setState({showControls: true})
    }

    hideControls = () => {
        this.setState({showControls: false})
    }

    deleteTask = () => {
        let {id}  = this.props.task
        deleteTask(id)
            .then(() => {
                this.props.dispatch(removeTask(id))
            })
    }

    render() {
        const {task} = this.props
        const {showControls} = this.state
        const deleteStyle = {color: 'red', marginRight: '7px', cursor: 'pointer'}
        return (
            <li
                onMouseEnter={this.showControls}
                onMouseLeave={this.hideControls}
            > 
                { showControls ? <FaMinusCircle 
                                    style={deleteStyle} 
                                    onClick={this.deleteTask}
                                    role='button' 
                                    /> : '' }
                {task.name}
            </li>
        )
    }

}

export default connect()(Task)