import React from 'react'
import {Provider} from 'react-redux'
import { render, screen } from '@testing-library/react'
import store from '../../store'

import Task from '../../components/Task'

const item = {
    id: 1,
    item: 'test'
}

test('renders text box', () => {
    render(<Provider store={store}><Task item={item}/></Provider>)
    
    const renderedItem = screen.queryByText('test')

    expect(renderedItem)
})