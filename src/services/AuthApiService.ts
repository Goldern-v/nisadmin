import mockAuth from '../configs/mocks/auth'
import BaseApiService from './BaseApiService'
import { Mock } from '../libs/mock'

export default class AuthApiService extends BaseApiService {

  @Mock(mockAuth.login)
  public login (username: string, password: string) {
    return this.post('/login', { username, password })
  }

}
