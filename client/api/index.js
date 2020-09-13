import request from 'superagent'

const url = '/api/v1/tasks'

export function getList() {
    return request
        .get(url)
        .then(res => res.body)
        .catch(err => console.log(err.message))
}