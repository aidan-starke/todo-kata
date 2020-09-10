import React from 'react'
import {render, screen, waitFor} from '@testing-library/react'
import {Provider} from 'react-redux'

import {SET_TASKS} from '../actions'
import store from '../store'
import App from './App'

jest.spyOn(store, 'getState')
jest.spyOn(store, 'dispatch')

beforeEach(() => {
    store.getState.mockImplementation(() => ({
        tasks: [
            { id: 1, name: 'record video' },
            { id: 2, name: 'facilitate checkout circle' },
            { id: 3, name: 'publish videos to youtube' }
        ]
    }) )
})
afterEach(jest.resetAllMocks)

test("displays a task list", () => {
    render(<Provider store={store}><App/></Provider>)
    let tasks = screen.getAllByRole('listitem')
    expect(tasks.length).toBe(3)
    expect(tasks[2].innerHTML).toMatch(/publish/)
})

test("get tasks from api when component mounts", async () => {
    render(<Provider store={store}><App/></Provider>)
    await waitFor(() => store.dispatch.mock.calls.length == 1)
    expect(store.dispatch).toHaveBeenCalled()
    expect(store.dispatch.mock.calls[0][0].type).toBe(SET_TASKS)
})