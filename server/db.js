const knex = require('knex')
const config = require('../knexfile').development

let database = knex(config)

function getTasks(db = database) {
    return db('tasks').select()
}

module.exports = {getTasks}