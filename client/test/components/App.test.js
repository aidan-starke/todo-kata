import React from 'react'
import {Provider} from 'react-redux'
import { render, screen } from '@testing-library/react'
import store from '../../store'

import App from '../../components/App'

test('displays heading', () => {
    render(<Provider store={store}><App /></Provider>)
    let heading = screen.getByRole('heading')

    expect(heading.innerHTML).toMatch(/Todo List/)
})