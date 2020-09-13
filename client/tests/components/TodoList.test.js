import React from 'react'
import {Provider} from 'react-redux'
import { render, screen } from '@testing-library/react'
import store from '../../store'

import TodoList from '../../components/TodoList'

test('displays a task list', () => {
    render(<Provider store={store}><TodoList /></Provider>)
    let tasks = screen.getAllByRole('listitem')
    
    expect(tasks.length).toBe(2)
    expect(tasks[0].innerHTML).toMatch(/test/)
})