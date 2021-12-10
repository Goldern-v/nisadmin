import { authStore, scheduleStore } from 'src/stores'
import { httpLoginToken } from 'src/libs/http/http'
import { message } from 'src/vendors/antd'

class SingleSignOnGzsrmServices {

  /**
   * 根据工号登录系统
   */
  public autoLogin(params: {
    token: string,
    v_url: string,
    appCode?:string | "HLTLXT",
    appName?:string | "护理管理系统",
  }) {
    return httpLoginToken.post(`/ssoLogin`, params)
      .then(res => {
        if (res.data) {
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
        }
      })
  }
}

export const singleSignOnGzsrmServices = new SingleSignOnGzsrmServices()