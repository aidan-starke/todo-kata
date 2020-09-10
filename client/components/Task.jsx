import React from 'react'
import {FaMinusCircle} from 'react-icons/fa'

import {deleteTask} from '../api'

export default class Task extends React.Component {
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
        deleteTask(this.props.task.id)
            .then(() => {
                //TBD
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