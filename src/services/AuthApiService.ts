import mockAuth from '@/configs/mocks/auth'
import Mock from '@/libs/mock'

import BaseApiService from './BaseApiService'

export default class AuthApiService extends BaseApiService {

  @Mock(mockAuth.login)
  public login (username: string, password: string) {
    return this.post('/login', { username, password })
  }

}
