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

jest.mock('./EditTask.jsx', () => (() => <>Edit Form</> ))

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

describe("hover over task", () => {
    beforeEach(() => {
        const listItem = screen.getByRole('listitem')
        fireEvent.mouseEnter(listItem)
    })

    describe("click edit button", () => {
        beforeEach(() => {
            let button = screen.getAllByRole('button')[0]
            fireEvent.click(button)
        })
        test("shows edit form", () => {
            let listitem = screen.getByRole('listitem')
            expect(listitem.innerHTML).toMatch(/Edit Form/)
        })
        test("hides the controls", () => {
            let buttons = screen.queryAllByRole('button')
            expect(buttons).toEqual([])
        })

        test("mouseEnter won't re-enable controls", () => {
            const listItem = screen.getByRole('listitem')
            fireEvent.mouseEnter(listItem)
            let buttons = screen.queryAllByRole('button')
            expect(buttons).toEqual([])
        })
    })

    describe("click delete button", () => {
        beforeEach(() => {
            let button = screen.getAllByRole('button')[1]
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

})
