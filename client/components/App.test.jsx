import React from 'react'
import {render, screen} from '@testing-library/react'
import {Provider} from 'react-redux'

import store from '../store'
import App from './App'

jest.spyOn(store, 'getState')

beforeEach(() => {
    store.getState.mockImplementation(() => ({
        tasks: [
            { id: 1, name: 'record video' },
            { id: 2, name: 'facilitate checkout circle' },
            { id: 3, name: 'publish videos to youtube' }
        ]
    }) )
})

test("displays a task list", () => {
    render(<Provider store={store}><App/></Provider>)
    let tasks = screen.getAllByRole('listitem')
    expect(tasks.length).toBe(3)
    expect(tasks[2].innerHTML).toMatch(/publish/)
})