import React from 'react'
import {FaMinusCircle, FaEdit} from 'react-icons/fa'
import {connect} from 'react-redux'

import {removeTask} from '../actions'
import {deleteTask} from '../api'
import {EditTask} from './'

class Task extends React.Component {
    state = {
        showControls : false,
        editing: false
    }

    showControls = () => {
        if (this.state.editing) return
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

    editTask = () => {
        this.setState({
            showControls: false,
            editing: true
        })
    }

    hideEditForm = () => {
        this.setState({
            showControls: true,
            editing: false
        })
    }

    render() {
        const {task} = this.props
        const {showControls, editing} = this.state
        const editStyle = {color: 'orange', marginLeft: '7px', cursor: 'pointer'}
        const deleteStyle = {color: 'red', marginLeft: '7px', cursor: 'pointer'}
        return (
            <li
                onMouseEnter={this.showControls}
                onMouseLeave={this.hideControls}
                style={{height: '45px'}}
            > 
                { editing ? <EditTask task={task} onEscape={this.hideEditForm}/> : task.name}
                { showControls ? <>
                    <FaEdit 
                        style={editStyle}
                        onClick={this.editTask}
                        role='button'
                    />
                    <FaMinusCircle 
                        style={deleteStyle} 
                        onClick={this.deleteTask}
                        role='button' 
                        />
                 </> : '' }
            </li>
        )
    }

}

export default connect()(Task)