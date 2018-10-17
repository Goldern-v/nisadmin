import { action, observable } from 'mobx'

import User from '@/models/User'

export default class AppStore {

  @observable public user: User | null = null

  @action
  public async updateUser (user: User) {
    this.user = user
  }

  @action
  public async removeUser () {
    this.user = null
  }

}
