import React from 'react'

import TodoList from './TodoList'

let list = ['test', 'pls']

const App = () => {
  return (
    <>
      <h1>Todo-Kata</h1>
      <TodoList list={list} />
    </>
  )
}

export default App
