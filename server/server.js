const path = require('path')
const express = require('express')

const {getTasks} = require('./db')

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

module.exports = server
