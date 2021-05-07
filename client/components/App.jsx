import React from 'react'
import { Card, Container, makeStyles, Typography } from '@material-ui/core'
import TodoList from './TodoList'

const useStyles = makeStyles({
	card: {
		marginTop: '2.5%',
		maxHeight: '20%',
		color: 'black',
		width: '40%',
		margin: 'auto',
		backgroundColor: '#1a1a1a',
	},
	wrapper: {
		margin: '2.5% 1% 2.5% 1%',
	},
	heading: {
		fontFamily: 'montserrat',
		marginBottom: '20px',
	},
})

const App = () => {
	const classes = useStyles()

	return (
		<div className='app'>
			<Card className={classes.card}>
				<div className={classes.wrapper}>
					<Typography className={classes.heading} component='h2' variant='h2'>
						TODO LIST
					</Typography>
					<TodoList />
				</div>
			</Card>
		</div>
	)
}

export default App
