const path = require('path')
const express = require('express')

const server = express()

server.use(express.json())
server.use(express.static(path.join(__dirname, './public')))

server.get('/api/v1/tasks', (req, res) => {
    const tasks = [
        { id: 1, name: 'record video' },
        { id: 2, name: 'facilitate checkout circle' }
    ]
    res.json(tasks)
})

module.exports = server
