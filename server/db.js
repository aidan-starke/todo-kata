const knex = require('knex')
const config = require('../knexfile').development

let database = knex(config)

function getTasks(db = database) {
    return db('tasks').select()
}

function saveTask({name}, db = database) {
    return db('tasks').insert({name})
}

function deleteTask(id, db = database) {
    if (!id) return Promise.reject('id must be specified')
    return db('tasks').where({id}).delete()
}

module.exports = {getTasks, saveTask, deleteTask}