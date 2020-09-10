import React from 'react'
import {render, screen} from '@testing-library/react'

import App from './App'

test("displays a task list", () => {
    render(<App />)
    let tasks = screen.getAllByRole('listitem')
    expect(tasks.length).toBe(2)
    expect(tasks[0].innerHTML).toMatch(/record video/)
})