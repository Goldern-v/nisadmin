/** 权限验证 */
import { action, observable } from 'mobx'

import User from '@/models/User'

export default class AuthStore {
  public constructor () {
    try {
      this.user = JSON.parse(sessionStorage.getItem('user') || '[]')
      this.authToken = sessionStorage.getItem('authToken') || ''
      this.adminNurse = sessionStorage.getItem('adminNurse') || ''
    } catch (error) {
      console.log(error)
    }
  }

  @observable public user: User | null = null
  @observable private authToken: string | null = null
  @observable private adminNurse: string | null = null

  @action
  public async updateUser (user: User) {
    this.user = user
  }

  @action
  public async removeUser () {
    this.user = null
  }

  @action
  public setAuthToken (token: string) {
    this.authToken = token
  }

  @action
  public getAuthToken () {
    return this.authToken || ''
  }

  @action
  public setAdminNurse (name: string) {
    this.adminNurse = name
  }

  @action
  public getAdminNurse () {
    return this.adminNurse
  }
}
