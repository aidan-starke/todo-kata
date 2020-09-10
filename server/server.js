const path = require('path')
const express = require('express')

const {getTasks, saveTask, deleteTask} = require('./db')

const server = express()

server.use(express.json())
server.use(express.static(path.join(__dirname, './public')))

server.get('/api/v1/tasks', (req, res) => {
    getTasks()
        .then(tasks => res.json(tasks))
        .catch(err => {
            res.status(500).send('something went wrong')
        })
})

server.post('/api/v1/tasks', (req, res) => {
    let {name} = req.body
    saveTask({name}) 
        .then((ids) => {
            res.status(201).json({id: ids[0]})
        })
})

server.delete('/api/v1/tasks/:id', (req, res) => {
    let {id} = req.params
    if (!id) return res.status(400).send("no id specified")

    deleteTask(Number(id))
        .then((recordsDeleted) => {
            res.sendStatus(200)
        })
        .catch(error => {
            res.sendStatus(500)
        })
})

module.exports = server
