const path = require('path')
const express = require('express')
const db = require('../db')
const server = express()

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

//I would prefer to see this without the task in params and instead getting the task data from the body. Makes it easier to add fields to the task in the future
server.post('/api/v1/tasks/:task', (req, res) => {
    const { task } = req.params
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
