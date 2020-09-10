import React from 'react'
import {render, screen} from '@testing-library/react'

import App from './App'

jest.mock('./Tasks.jsx', () => { return () => <h1>Tasks</h1> })
jest.mock('./AddTask.jsx', () => { return () => <h2>Add Tasks</h2> })

test("renders tasks", () => {
    render(<App />)
    let heading = screen.getAllByRole('heading')[0]
    expect(heading.innerHTML).toMatch(/Tasks/)
})

test("renders Add Tasks form", () => {
    render(<App />)
    let heading = screen.getAllByRole('heading')[1]
    expect(heading.innerHTML).toMatch(/Add Tasks/)
})