import User from 'src/models/User'

import BaseApiService from './BaseApiService'

export default class UserApiService extends BaseApiService {
  public listUser () {
    return this.get(`/users`)
  }

  public getUser (id: string) {
    return this.get(`/users/${id}`)
  }

  public addUser (user: Partial<User>) {
    return this.post(`/users`, user)
  }

  public updateUser (id: string, user: Partial<User>) {
    return this.put(`/users/${id}`, user)
  }

  public removeUser (id: string) {
    return this.delete(`/users/${id}`)
  }
  /**佛山杏坛，专科护理质量 菜单 */
  public getSpecialMenu () {
    return this.get(`goodEvent/dynamicDeptConfig/getPermission`)
  }
  
}
