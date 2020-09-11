import React from 'react'
import {render, screen, fireEvent, waitFor} from '@testing-library/react'
import {Provider} from 'react-redux'

import store from '../store'
import {AddTask} from './'
import {addTask, fetchTasks} from '../api'

jest.mock('../api', () => ({
    addTask: jest.fn(() => Promise.resolve(1)),
    fetchTasks: jest.fn()
}))

jest.spyOn(store, 'dispatch')

test("saves task ", async () => {
    const tasks = [{id: 1, name: 'a task'}]
    fetchTasks.mockImplementation(() => Promise.resolve(tasks))

    render(<Provider store={store}><AddTask /></Provider>)
    let input = screen.getByRole('textbox')
    fireEvent.change(input, {target: {name: 'name', value: 'new task'}})

    let submit = screen.getByRole('button')
    fireEvent.click(submit)

    expect(addTask).toHaveBeenCalled()
    expect(addTask.mock.calls[0][0]).toBe('new task')

    await waitFor(() => store.dispatch.mock.calls.length > 0)
    expect(fetchTasks).toHaveBeenCalled()
    expect(store.dispatch).toHaveBeenCalled()
    expect(store.dispatch.mock.calls[0][0].tasks).toEqual(tasks)
    expect(input.value).toBe('')
})