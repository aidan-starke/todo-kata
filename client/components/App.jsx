import React from 'react'
import {connect} from 'react-redux'

class App extends React.Component {

  render() {
    const {tasks} = this.props
    return (
      <>
      <h1>Task List</h1>
      <ul>{tasks.map(task => <li key={task.id}>{task.name}</li>)}</ul>
      </>
    )
  }
}

function mapStateToProps(state) {
  return {
    tasks: state.tasks
  }
}

export default connect(mapStateToProps)(App)
