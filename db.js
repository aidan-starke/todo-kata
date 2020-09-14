const environment = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[environment]
const connection = require('knex')(config)

//I think this file would be better in the server folder

module.exports = {
    getList,
    getListItemById,
    addListItem,
    removeListItemById,
    editListItem
}

function getList(db = connection) {
    return db('todo-list')
        .select()
}

function getListItemById(id, db = connection) {
    return db('todo-list')
        .where('id', id)
        .first()
}

function addListItem(item, db = connection) {
    return db('todo-list')
        .insert({
            item: item
        })
}

function removeListItemById(id, db = connection) {
    return db('todo-list')
        .where('id', id)
        .delete()
}

function editListItem(oldItemId, newItem, db = connection) {
    return db('todo-list')
        .where('id', oldItemId)
        .update({
            item: newItem
        })
}

