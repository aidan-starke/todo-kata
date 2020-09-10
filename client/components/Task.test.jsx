import React from 'react'
import {Task} from './'
import {render, screen, fireEvent, waitFor} from '@testing-library/react'
import {Provider} from 'react-redux'

import {REMOVE_TASK} from '../actions'
import store from '../store'
import {deleteTask} from '../api'

const task = {id: 1, name: 'do stuff'}

jest.mock('../api', () => ({
    deleteTask: jest.fn(() => Promise.resolve('done'))
}))

jest.spyOn(store, 'dispatch')

beforeEach(() => render(<Provider store={store}><Task task={task} /></Provider>))

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

describe("click delete button", () => {
    beforeEach(() => {
        const listItem = screen.getByRole('listitem')
        fireEvent.mouseEnter(listItem)
        let button = screen.getByRole('button')
        fireEvent.click(button)
    })
    test("calls deleteTask from api when delete button clicked", () => {
        expect(deleteTask).toHaveBeenCalledWith(task.id)
    })

    test("dispatches fetchTask after delete api call resolves", () => {
        waitFor(() => store.dispatch.mock.calls.length > 0)
        expect(store.dispatch.mock.calls[0][0].id).toEqual(task.id)
        expect(store.dispatch.mock.calls[0][0].type).toEqual(REMOVE_TASK)
    })

})
