import React from 'react'

const tasks = [
  { id: 1, name: 'record video' },
  { id: 2, name: 'facilitate checkout circle' }
]

const App = () => {
  return (
    <>
    <h1>Task List</h1>
    <ul>{tasks.map(task => <li key={task.id}>{task.name}</li>)}</ul>
    </>
  )
}

export default App
