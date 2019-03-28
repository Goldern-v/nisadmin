// import { Component } from 'react'
import { RouteComponentProps } from '@/components/RouterView'

export interface BreadcrumbItem {
  name: string
  type: string
  childrens?: BreadcrumbItem[]
  component?: React.ComponentType<RouteComponentProps<any>>
}
