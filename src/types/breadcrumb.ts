// import { Component } from 'react'
import { RouteComponentProps } from 'src/components/RouterView'

export interface BreadcrumbItem {
  name: string
  type: string
  childrens?: BreadcrumbItem[]
  component?: React.ComponentType<RouteComponentProps<any>>
}
