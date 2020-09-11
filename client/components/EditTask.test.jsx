import React from 'react'
import {render, screen, fireEvent, waitFor} from '@testing-library/react'
import {Provider} from 'react-redux'

import store from '../store'
import {EditTask} from './'
import {editTask} from '../api'
import {UPDATE_TASK} from '../actions'

jest.mock('../api', () => ({
    editTask: jest.fn(() => Promise.resolve(1)),
}))

jest.spyOn(store, 'dispatch')

const task = {id: 1, name: 'do stuff'} 
const escapeCallback = jest.fn()

beforeEach(() => {
    render(<Provider store={store}>
        <EditTask task={task} onEscape={escapeCallback}/>
        </Provider>)
})

afterEach(() => {
    escapeCallback.mockClear()
    store.dispatch.mockClear()
    editTask.mockClear()
})

test("displays the task name in the input field", () => {
    let input = screen.getByRole('textbox')
    expect(input.value).toBe('do stuff')
} )

test("esape key calls onEscape callback", () => {
    let input = screen.getByRole('textbox')
    fireEvent.keyDown(input, {keyCode: 27})
    expect(escapeCallback).toHaveBeenCalled()
})

test("enter key submits form", () => {
    let input = screen.getByRole('textbox')
    fireEvent.keyDown(input, {keyCode: 13})
    expect(editTask).toHaveBeenCalled()
})

test("clicking the button submits the form", () => {
    let button = screen.getByRole('button')
    fireEvent.click(button)
    expect(editTask).toHaveBeenCalled()
})

test("dispatch is called with update task action after saving", async () => {
    let input = screen.getByRole('textbox')
    fireEvent.change(input, {target: {value: 'do more stuff'}})

    let button = screen.getByRole('button')
    fireEvent.click(button)

    expect(editTask).toHaveBeenCalledWith(1, 'do more stuff')

    await waitFor(() => store.dispatch.mock.calls.length > 0)

    expect(store.dispatch.mock.calls[0][0].type).toBe(UPDATE_TASK)
    expect(store.dispatch.mock.calls[0][0].id).toBe(task.id)
    expect(store.dispatch.mock.calls[0][0].name).toBe('do more stuff')
    expect(escapeCallback).toHaveBeenCalled()
})