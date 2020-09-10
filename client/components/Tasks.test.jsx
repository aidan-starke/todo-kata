import React from 'react'
import {render, screen, waitFor} from '@testing-library/react'
import {Provider} from 'react-redux'

import {SET_TASKS} from '../actions'
import store from '../store'
import Tasks from './Tasks'
import {fetchTasks} from '../api'

jest.mock('../api', () => ({
    fetchTasks: jest.fn()
}))

jest.spyOn(store, 'getState')
jest.spyOn(store, 'dispatch')

let tasks = [
    { id: 1, name: 'record video' },
    { id: 2, name: 'facilitate checkout circle' },
    { id: 3, name: 'publish videos to youtube' }
]

beforeEach(() => {
    store.getState.mockImplementation(() => ({ tasks }) )
    fetchTasks.mockImplementation(() => Promise.resolve(tasks))
})

afterEach(jest.resetAllMocks)

test("displays a task list", () => {
    render(<Provider store={store}><Tasks/></Provider>)
    let tasks = screen.getAllByRole('listitem')
    expect(tasks.length).toBe(3)
    expect(tasks[2].innerHTML).toMatch(/publish/)
})

test("get tasks from api when component mounts", async () => {
    render(<Provider store={store}><Tasks/></Provider>)
    await waitFor(() => store.dispatch.mock.calls.length == 1)
    expect(store.dispatch).toHaveBeenCalled()
    expect(store.dispatch.mock.calls[0][0].type).toBe(SET_TASKS)
})

test("console logs error from api client", async () => {
    jest.spyOn(console, 'log').mockImplementation(() => {})

    fetchTasks.mockImplementation(() => Promise.reject('internal server error'))
    render(<Provider store={store}><Tasks/></Provider>)
    await waitFor(() => fetchTasks.mock.calls.length == 1)
    expect(store.dispatch).not.toHaveBeenCalled()
    expect(console.log).toHaveBeenCalledWith('internal server error')

    console.log.mockReset()
})