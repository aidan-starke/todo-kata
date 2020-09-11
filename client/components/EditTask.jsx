import React from 'react'
import {connect} from 'react-redux'
import {FaPlusCircle} from 'react-icons/fa'

import { updateTask } from '../actions'
import { editTask } from '../api'

class EditTask extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: props.task.name
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    listenForKeys = (event) => {
        switch(event.keyCode) {
            case 13:
                this.submit()
                break
            
            case 27:
                if (this.props.onEscape) this.props.onEscape()
                break

        }
    }

    submit = () => {
        let {id} = this.props.task
        let {name} = this.state
        editTask(id, name)
            .then(() => {
                this.props.dispatch(updateTask(id, name))
            })
    }

    render() {
        let style = {color: 'green', marginLeft: '7px'}
        return (
            <>
                <input 
                    name='name' 
                    autoFocus={true}
                    value={this.state.name} 
                    onKeyDown={this.listenForKeys} 
                    onChange={this.handleChange} 
                />
                <FaPlusCircle onClick={this.submit} role='button' style={style}/>
            </>
        )
    }
}

export default connect()(EditTask)