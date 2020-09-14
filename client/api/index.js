import request from 'superagent'

const url = '/api/v1/tasks'

export function getList() {
    return request
        .get(url)
        .then(res => res.body)
        .catch(err => console.log(err.message))
}

export function deleteTaskById(id) {
    return request
        .delete(`${url}/${id}`)
        .catch(err => console.log(err.message))
}

export function addNewTask(task) {
    return request 
        .post(`${url}/${task}`)
        .catch(err => console.log(err.message))
}