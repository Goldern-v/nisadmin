import { appStore, authStore, scheduleStore } from 'src/stores'
import { httpLoginToken } from 'src/libs/http/http'
import { message } from 'src/vendors/antd'
import { globalModal } from 'src/global/globalModal'

class SingleSignOnGzsrmServices {
  private checkStatus (res: any) {
    return new Promise((resolve, reject) => {
      if (res.data.code === '402') {
        globalModal.confirm('提示', res.data.data.expireDesc).then(() => {
          return resolve(true);
        })
        .catch(()=>{
          return resolve(true);
        })
      } else if (res.data.code === '403') {
        globalModal.confirm('提示', res.data.data.expireDesc).then(() => {
          appStore.history.goBack();
        }).catch(() => {
          appStore.history.goBack();
        });
      } else {
        return resolve(true);
      }
    })
  }
  /**
   * 根据工号登录系统
   */
  public autoLogin(params: {
    token?: string | "",
    v_url?: string,
    appCode?:string | "HLTLXT",
    appName?: string | "护理管理系统",
    v_token?: string,
    tradeCode?: string | "nursing_ssoLogin_2"
  }) {
    return httpLoginToken.post(`/ssoLogin`, params)
      .then(async res => {
        const isPassCheck = await this.checkStatus(res);
        if (!isPassCheck) return;
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