import { httpLoginToken } from '@/libs/http/http'

import { authStore, scheduleStore } from '@/stores'

import BaseApiService from './BaseApiService'

export default class AuthApiService extends BaseApiService {
  public login (username: string, password: string) {
    return httpLoginToken
      .post('/login', this.stringify({ empNo: username, password: password }))
      .then((res) => {
        // console.log('登陆成功',res)
        let { adminNurse, authToken, user } = res.data.data
        sessionStorage.setItem('adminNurse', adminNurse)
        sessionStorage.setItem('authToken', authToken)
        sessionStorage.setItem('user', JSON.stringify(user))
        authStore.setAuthToken(authToken)
        authStore.setAdminNurse(adminNurse)
        authStore.updateUser(user)
        scheduleStore.setDepartmentValue('deptCode', user.deptCode)
        scheduleStore.setDepartmentValue('deptName', user.deptName)
        window.location.href = '#/home'
        console.log('登陆成功', adminNurse, authToken, user, sessionStorage, scheduleStore)
      })
      .catch((err) => {
        console.log('登陆失败', err)
      })
  }
  public logout () {
    sessionStorage.removeItem('adminNurse')
    sessionStorage.removeItem('authToken')
    sessionStorage.removeItem('user')
    authStore.setAuthToken('')
    authStore.setAdminNurse('')
    authStore.removeUser()
    window.location.href = '#/login'
  }
}
