import React from 'react'
import {Task} from './'
import {render, screen, fireEvent} from '@testing-library/react'

import {deleteTask} from '../api'

jest.mock('../api', () => ({
    deleteTask: jest.fn(() => Promise.resolve('done'))
}))

const task = {id: 1, name: 'do stuff'}
beforeEach(() => render(<Task task={task} />))

test("renders list item", () => {
    const listItem = screen.getByRole('listitem')
    expect(listItem.innerHTML).toMatch(/do stuff/)
})

test("delete button is hidden to start", () => {
    let button = screen.queryByRole('button')
    expect(button).toBe(null)
})

test("shows delete button when hovering over list item", () => {
    const listItem = screen.getByRole('listitem')
    fireEvent.mouseEnter(listItem)
    let button = screen.getByRole('button')
    expect(button).not.toBe(undefined)
})

test("calls deleteTask from api when delete button clicked", () => {
    const listItem = screen.getByRole('listitem')
    fireEvent.mouseEnter(listItem)
    let button = screen.getByRole('button')
    fireEvent.click(button)
    expect(deleteTask).toHaveBeenCalledWith(task.id)
})