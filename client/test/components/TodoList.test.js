import React from 'react'
import { Provider } from 'react-redux'
import { render, screen, waitFor } from '@testing-library/react'
import store from '../../store'

import TodoList from '../../components/TodoList'

import { getList } from '../../api'

jest.mock('../../api', () => (
    {
        getList: jest.fn()
    }
))

beforeEach(() => {
    getList.mockImplementation(() => Promise.resolve([
        { id: 1, item: 'test 1' },
        { id: 2, item: 'test 2' }
    ]))
})

test('renders text box and button, calls getList', () => {
    expect.assertions(3)

    render(<Provider store={store}><TodoList /></Provider>)

    let textbox = screen.getByRole('textbox')
    let button = screen.getByRole('button')

    expect(textbox)
    expect(button)

    waitFor(() => expect(getList).toHaveBeenCalledTimes(1))
})