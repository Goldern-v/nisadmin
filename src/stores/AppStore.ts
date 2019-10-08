import { action, observable, computed } from 'mobx'
import * as H from 'history'
import { match } from 'react-router'
import qs from 'qs'

interface FullLoadingBarObj {
  /** 预计加载完成毫秒数 */
  duration: number
  /** 描述 */
  aside: string
}

export default class AppStore {
  public constructor() {
    this.isExpand = (localStorage.getItem('isExpand') as any) || '1'
    this.appToken = '51e827c9-d80e-40a1-a95a-1edc257596e7'
    window.onresize = () => {
      this.wih = window.innerHeight
    }
  }
  @observable public isExpand: '1' | '0' = '1'
  @observable private appToken: string | null = null

  /** 开发环境 true-开发  false-生产*/
  @observable public isDev: boolean = process.env.NODE_ENV === 'development'

  /** 路由控制器 */
  @observable public history!: H.History
  @observable public match!: match<any>
  @observable public location!: H.Location<any>
  /** 页面高度 */
  @observable public wih: number = window.innerHeight

  /** 医院id */
  @observable public HOSPITAL_ID = process.env.REACT_APP_HOSPITAL_ID
  /** 医院名称 */
  @observable public HOSPITAL_Name = process.env.REACT_APP_HOSPITAL_NAME
  /** 全局进度条 */
  @observable public fullLoadingBarObj: FullLoadingBarObj | null = null

  /** url 参数 */
  @computed
  public get HOSPITAL_LOGO() {
    if (this.HOSPITAL_ID == 'wh') {
      return require('src/assets/images/武汉logo.png')
    } else if (this.HOSPITAL_ID == 'hj') {
      return require('src/assets/images/厚街logo.png')
    } else {
      return require('src/assets/images/厚街logo.png')
    }
  }
  /** url 参数 */
  @computed
  public get query() {
    try {
      return this.location.search.substr(1)
    } catch (error) {
      return ''
    }
  }

  @computed
  public get queryObj() {
    try {
      return qs.parse(this.location.search.substr(1))
    } catch (error) {
      return {}
    }
  }

  @action
  public setExpand = (isExpand: '1' | '0') => {
    this.isExpand = isExpand
    localStorage.setItem('isExpand', isExpand)
  }

  @action
  public getAppToken = () => {
    return this.appToken
  }

  /** 打开全局进度条 */
  openFullLoadingBar(option: FullLoadingBarObj) {
    this.fullLoadingBarObj = option
  }
  /** 关闭全局进度条 */
  closeFullLoadingBar() {
    this.fullLoadingBarObj = null
  }
}
