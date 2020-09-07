import React from 'react'

const TodoList = props => {
    const list = props.list

    return (
        <div>
            <h2>Todo List</h2>
            <ul>
                {list.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
        </div>
    )
}

export default TodoList