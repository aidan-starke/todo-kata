import { render, screen } from '@testing-library/react'
import App from './App'
import {Provider} from 'react-redux'
import store from '../store'

test('displays a task list', () => {
    render(<Provider store={store}><App /></Provider>)
    let tasks = screen.getAllByRole('listitem')
    expect(tasks.length).toBe(2)
    expect(tasks[0].innerHTML).toMatch(/test/)
})