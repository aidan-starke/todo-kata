import React from 'react'

import { connect } from 'react-redux'

const TodoList = ({tasks}) => {
    return (
        <div>
            <h2>Todo List</h2>
            <ul>
                {tasks.map(item => <li key={item.id}>{item.task}</li>)}
            </ul>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        tasks: state.tasks
    }
}

export default connect(mapStateToProps)(TodoList)