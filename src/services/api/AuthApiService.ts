import { statisticsViewModal } from 'src/modules/nurseFiles/view/statistics/StatisticsViewModal'
import { message } from 'src/vendors/antd'
import { httpLoginToken } from 'src/libs/http/http'

import { authStore, scheduleStore, appStore } from 'src/stores'

import BaseApiService from './BaseApiService'

export default class AuthApiService extends BaseApiService {
  public login(username: string, password: string) {
    return httpLoginToken.post('/login', this.stringify({ empNo: username, password: password })).then((res) => {
      // console.log('登陆成功',res)
      let { adminNurse, authToken, user } = res.data
      sessionStorage.setItem('adminNurse', adminNurse)
      sessionStorage.setItem('authToken', authToken)
      sessionStorage.setItem('user', JSON.stringify(user))
      authStore.setAuthToken(authToken)
      authStore.setAdminNurse(adminNurse)
      authStore.updateUser(user)
      authStore.selectDeptCode(user.deptCode)
      scheduleStore.setDepartmentValue('deptCode', user.deptCode)
      scheduleStore.setDepartmentValue('deptName', user.deptName)
      authStore.initUser()
      if (appStore.HOSPITAL_ID == 'wh') {
        // if (user.roleManage != '1') {
        //   return message.warn('你没有权限进入管理系统')
        // }
      }

      window.location.href = '#/home'
    })
  }
  public logout() {
    sessionStorage.removeItem('adminNurse')
    sessionStorage.removeItem('authToken')
    sessionStorage.removeItem('user')
    sessionStorage.removeItem('selectedDeptCode')
    authStore.delUser()
    statisticsViewModal.hadData = false
    window.location.href = '#/login'
  }
}
