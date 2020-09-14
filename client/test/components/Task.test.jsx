import React from 'react'
import {Provider} from 'react-redux'
import { render, screen } from '@testing-library/react'
import store from '../../store'

import Task from '../../components/Task'

const task = {
    id: 1,
    item: 'test todo item'
}

test('renders task', () => {
    render(<Provider store={store}><Task task={task}/></Provider>)
    
    const renderedItem = screen.queryByText(task.item)

    expect(renderedItem)
})