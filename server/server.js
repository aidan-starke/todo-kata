const path = require('path')
const express = require('express')
const db = require('./db')
const server = express()
const cors = require('cors')

server.use(cors())
server.use(express.json())
server.use(express.static(path.join(__dirname, './public')))

server.get('/api/v1/tasks', (req, res) => {
	db.getList()
		.then(data => {
			res.json(data)
		})
		.catch(err => {
			res.status(500).send(err.message)
		})
})

server.post('/api/v1/tasks', (req, res) => {
	const { task } = req.body

	db.addListItem(task)
		.then(() => res.sendStatus(201))
		.catch(err => {
			res.status(500).send(err.message)
		})
})

server.delete('/api/v1/tasks/:id', (req, res) => {
	let id = Number(req.params.id)

	db.removeListItemById(id)
		.then(() => res.sendStatus(200))
		.catch(err => {
			res.status(500).send(err.message)
		})
})

server.patch('/api/v1/tasks/:id', (req, res) => {
	let id = Number(req.params.id)
	let { item } = req.body

	db.editListItem(id, item)
		.then(() => res.sendStatus(200))
		.catch(err => {
			res.status(500).send(err.message)
		})
})

module.exports = server
