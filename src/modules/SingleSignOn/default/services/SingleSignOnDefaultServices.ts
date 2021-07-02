import { authStore, scheduleStore } from 'src/stores'
import { httpLoginToken } from 'src/libs/http/http'
import { message } from 'src/vendors/antd'

class SingleSignOnDefaultServices {

  /**
   * 根据工号登录系统
   */
  public autoLogin(token: string) {
    return httpLoginToken.post(`/ssoLogin`, { token })
      .then(res => {
        if (res.data.code === "200") {
          let { adminNurse, authToken, user } = res.data
          user = { ...user }
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

          // 实习生直接跳转学习培训在线学习
          if (authStore.isOnlyInternsManage) {
            return window.location.href = '#/continuingEdu/在线学习'
          }

          window.location.href = '#/home'
        } else {
          let errMsg = res.data.desc || `请求失败 状态码为${res.data.code || 404}`
          message.error(errMsg)
        }
      })
  }
}

export const singleSignOnDefaultServices = new SingleSignOnDefaultServices()