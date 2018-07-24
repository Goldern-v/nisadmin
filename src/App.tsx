import * as React from 'react'
import { HashRouter as Router } from 'react-router-dom'

import RouterView from './components/RouterView'
import routes from './routes'

export interface Props {}

export interface State {}

export default class App extends React.Component<Props, State> {

  public render () {
    return (
      <Router>
        <RouterView routes={routes}/>
      </Router>
    )
  }

}
