import BaseApiService from './BaseApiService'

export default class AuthApiService extends BaseApiService {

  public login (username: string, password: string) {
    return this.post('/login', { username, password })
  }

}
