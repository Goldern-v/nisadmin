import { httpNoToken } from '@/libs/http/http'

export default class AuthApiService {
  public login (username: string, password: string) {
    return httpNoToken.post('/login', { username, password }).then((res) => {
      let { adminNurse, authToken, user } = res.data
      sessionStorage.setItem('adminNurse', adminNurse)
      sessionStorage.setItem('authToken', authToken)
      sessionStorage.setItem('user', user)
      window.location.href = '#/home'
    })
  }
}
