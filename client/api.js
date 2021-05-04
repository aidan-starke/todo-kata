import request from 'superagent'

const url = 'http://localhost:4000/api/v1/tasks'

export function getList() {
    return request
        .get(url)
        .then(res => res.body)
}

export function deleteTaskById(id) {
    return request
        .delete(`${url}/${id}`)
}

export function addNewTask(task) {
    return request 
        .post(url)
        .send({task})
}