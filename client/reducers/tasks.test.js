import tasksReducer from './tasks'

test("initial state has two tasks", () => {
    let state = tasksReducer(undefined, {})
    expect(state.length).toBe(2)
})