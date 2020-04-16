import { globalModal } from './../../global/globalModal';

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
    const userLoginInfoMap: any = JSON.parse(
      localStorage.userLoginInfoMap || "{}"
    );
    let _this = this

    let empNo = authStore.user?.empNo
    if (empNo) empNo = empNo.toLowerCase()

    if (userLoginInfoMap[empNo || '']) {
      globalModal.confirm('是否清除登录信息', '是否清除记住账号密码, 再次登录将不再自动补全此账号密码').then(res => {
        delete userLoginInfoMap[authStore.user?.empNo.toLowerCase() || '']
        localStorage.userLoginInfoMap = JSON.stringify(userLoginInfoMap)
        localStorage.lastLoginUserName = ''
        _this.clearUser()
      }).catch(res => {
        _this.clearUser()
      })
    } else {
      _this.clearUser()
    }

  }

  clearUser() {
    sessionStorage.removeItem('adminNurse')
    sessionStorage.removeItem('authToken')
    sessionStorage.removeItem('user')
    sessionStorage.removeItem('selectedDeptCode')
    authStore.delUser()
    statisticsViewModal.hadData = false
    window.location.href = '#/login'
  }
}
