import { action, observable } from 'mobx'
import * as H from 'history'
export default class AppStore {
  public constructor () {
    this.isExpand = (localStorage.getItem('isExpand') as any) || '1'
    this.appToken = '51e827c9-d80e-40a1-a95a-1edc257596e7'
  }
  @observable public isExpand: '1' | '0' = '1'
  @observable private appToken: string | null = null

  /** 路由控制器 */
  public history!: H.History

  @action
  public setExpand = (isExpand: '1' | '0') => {
    this.isExpand = isExpand
    localStorage.setItem('isExpand', isExpand)
  }

  @action
  public getAppToken = () => {
    return this.appToken
  }
}
