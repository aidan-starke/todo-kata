import React from 'react'
import {Provider} from 'react-redux'
import { render, screen } from '@testing-library/react'
import store from '../../store'

import TodoList from '../../components/TodoList'

//this test is causing errors because api isn't mocked
//
//jest.mock('../../api', () => {
//getList: jest.fn()
//} etc.

test('renders text box', () => {
    render(<Provider store={store}><TodoList /></Provider>)
    let textbox = screen.getByRole('textbox')

    expect(textbox)
})

test('renders button', () => {
    render(<Provider store={store}><TodoList /></Provider>)
    let button = screen.getByRole('button')

    expect(button)
})
