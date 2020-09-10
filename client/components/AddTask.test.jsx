import React from 'react'
import {render, screen, fireEvent, waitFor} from '@testing-library/react'
import {Provider} from 'react-redux'

import {AddTask} from './'
import {addTask} from '../api'

jest.mock('../api', () => ({
    addTask: jest.fn()
}))

test("render add task form", async () => {
    render(<AddTask />)
    let input = screen.getByRole('textbox')
    fireEvent.change(input, {target: {name: 'name', value: 'new task'}})

    let submit = screen.getByRole('button')
    fireEvent.click(submit)

    expect(addTask).toHaveBeenCalled()
    expect(addTask.mock.calls[0][0]).toBe('new task')
})