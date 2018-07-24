import * as React from 'react'

import Home from './views/Home'
import PageA from './views/PageA'
import PageB from './views/PageB'
import { RouteComponentProps as RouteProps } from 'react-router'

export interface RouteItem {
  path: string
  component: RouteComponentClass<any>
  routes?: RouteItem[]
}

export interface RouteComponentProps<P = {}> extends RouteProps<P> {
  routes?: RouteItem[]
}

interface RouteComponentClass<P> extends React.ComponentClass<RouteComponentProps<P>> {}

const routes: RouteItem[] = [
  {
    path: '/',
    component: Home,
    routes: [
      {
        path: '/aaa',
        component: PageA,
      },
      {
        path: '/bbb',
        component: PageB,
      },
    ],
  },
]

export default routes
