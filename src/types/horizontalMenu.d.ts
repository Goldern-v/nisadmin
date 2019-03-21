import { Component } from 'react'
import { RouteComponentProps } from '@/components/RouterView'

export interface HorizontalMenuItem {
  name: string
  type: string
  childrens?: HorizontalMenuItem[]
  component?: React.ComponentType<RouteComponentProps<any>>
}
