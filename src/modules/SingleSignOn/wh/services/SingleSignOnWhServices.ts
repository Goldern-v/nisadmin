import axios from 'axios'
import qs from 'qs'
import { appStore } from 'src/stores'

const host = appStore.isDev ? '114.251.193.138:8099' : '192.168.20.25:8099'

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
      redirect_uri: `http://${host}/crNursing/manage/`,
      grant_type: 'authorization_code'
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
}

export const singleSignOnWhServices = new SingleSignOnWhServices()