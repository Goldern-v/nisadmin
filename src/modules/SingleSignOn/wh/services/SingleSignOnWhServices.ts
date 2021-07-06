import axios from 'axios'
import qs from 'qs'
import { appStore, authStore, scheduleStore } from 'src/stores'
import { httpLoginToken } from 'src/libs/http/http'
import { message } from 'antd'

const host = appStore.isDev ? '114.251.193.138:8099' : '192.168.20.25:8099'

const appHost = process.env.NODE_ENV === "development" ? 'nurse.cr-health.com:34022' : window.location.host

const client_id = appStore.isDev ? 'craPn3h604zp' : 'sD3I9vT526tb'
const client_secret = appStore.isDev ? 'rBrMnhKrhq6B' : 'VD636hwiDZ0A'

class SingleSignOnWhServices {
  /**
   * 3.2.2.	获取授权接口（authorization_code模式）
   */
  public accessToken(code: string) {
    return axios.post(`http://${host}/DTH_SSO/oauth2.0/accessToken`, qs.stringify({
      code,
      client_id,
      client_secret,
      redirect_uri: `http://${appHost}/crNursing/manage/#/wh_single_point_login`,
      grant_type: 'code'
    }))
  }

  /**
   * 3.2.3.	刷新授权接口
   * @param refresh_token 刷新码
   */
  public refreshToken(refresh_token: string) {
    return axios.post(`http://${host}/DTH_SSO/oauth2.0/refreshToken`, qs.stringify({
      refresh_token
    }))
  }

  /**
   * 3.2.4.	获取用户信息接口
   * @param access_token
   */
  public profile(access_token: string) {
    return axios.get(`http://${host}/DTH_SSO/oauth2.0/profile?${qs.stringify({ access_token })}`)
  }

  /**
   * 根据工号登录系统
   */
  public loginWithEmpNo(empNo: string, token: string) {
    return httpLoginToken.post(`/auth2/oauthLogin`, { empNo, token })
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

export const singleSignOnWhServices = new SingleSignOnWhServices()