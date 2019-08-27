export interface Options {
  x: number
  y: number
}

export interface MenuListItem {
  icon?: string
  label?: string
  type?: 'text' | 'line'
  onClick: () => void
}

export type MenuList = MenuListItem[]

export type show = (menuList: any[], options: Options) => void

export interface ContextMenu {
  Component: () => JSX.Element
  show: show
  close(): void
}
