import React from 'react'
import { Typography } from '@material-ui/core'
import TodoList from './TodoList'

const App = () => {
	return (
		<div className='app'>
			<Typography
				style={{ fontFamily: 'montserrat' }}
				component='h2'
				variant='h3'>
				TODO LIST
			</Typography>
			<TodoList />
		</div>
	)
}

export default App
