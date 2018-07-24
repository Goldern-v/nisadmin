import * as React from 'react'
import { Switch, Route } from 'react-router'

import { RouteItem } from '../routes'

export interface Props {
  switched?: boolean
  routes?: RouteItem[]
}

export interface State {}

export default class RouterView extends React.Component<Props, State> {

  public render () {
    const { switched = true, routes } = this.props

    if (!routes || !routes.length) {
      return null
    }

    const Wrapper = switched ? Switch : React.Fragment

    return (
      <Wrapper>
        {routes.map((route, i) => (
          <Route
            key={i}
            path={route.path}
            render={(props) => <route.component {...props} routes={route.routes}/>}
          />
        ))}
      </Wrapper>
    )
  }

}
