import { action, observable } from 'mobx'

export default class AppStore {
  public constructor () {
    this.isExpand = (localStorage.getItem('isExpand') as any) || '1'
  }
  @observable public isExpand: '1' | '0' = '1'

  @action
  public setExpand = (isExpand: '1' | '0') => {
    this.isExpand = isExpand
    localStorage.setItem('isExpand', isExpand)
  }
}
