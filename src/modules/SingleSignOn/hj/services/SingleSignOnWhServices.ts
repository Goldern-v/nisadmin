import { authStore, scheduleStore } from 'src/stores'
import { httpLoginToken } from 'src/libs/http/http'

class SingleSignOnHjServices {

  /**
   * 根据工号登录系统
   */
  public autoLogin(token: string) {
    return httpLoginToken.post(`/ssoLogin`, { token })
      .then(res => {
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
          window.location.href = '#/continuingEdu/在线学习'
        } else {
          window.location.href = '#/home'
        }
      })
  }
}

export const singleSignOnHjServices = new SingleSignOnHjServices()