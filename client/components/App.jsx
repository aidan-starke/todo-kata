import React from 'react'
import {Tasks, AddTask} from './'

export default class App extends React.Component {
  render() {
    return(
      <>
      <Tasks />
      <AddTask />
      </>
    )
  }
}