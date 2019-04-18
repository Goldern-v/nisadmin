import { action, observable } from 'mobx'
import * as H from 'history'
import { match } from 'react-router'

export default class AppStore {
  public constructor () {
    this.isExpand = (localStorage.getItem('isExpand') as any) || '1'
    this.appToken = '51e827c9-d80e-40a1-a95a-1edc257596e7'
    window.onresize = () => {
      this.wih = document.body.offsetHeight
      console.log(this.wih)
    }
  }
  @observable public isExpand: '1' | '0' = '1'
  @observable private appToken: string | null = null

  /** 路由控制器 */
  @observable public history!: H.History
  @observable public match!: match<any>

  /** 页面高度 */
  @observable public wih: number = document.body.offsetHeight

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
