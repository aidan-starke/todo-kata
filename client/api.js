
export function fetchTasks() {
    const tasks = [
        { id: 1, name: 'record video' },
        { id: 2, name: 'facilitate checkout circle' }
    ]
    return Promise.resolve(tasks)
}