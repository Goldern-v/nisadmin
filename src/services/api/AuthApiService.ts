import { globalModal } from './../../global/globalModal';

import { statisticsViewModal } from 'src/modules/nurseFiles/view/statistics/StatisticsViewModal'
import { message } from 'src/vendors/antd'
import { httpLoginToken } from 'src/libs/http/http'

import { authStore, scheduleStore, appStore } from 'src/stores'
import { autoLoginTnNisInfoBe } from 'src/utils/toNisInfo/toNisInfo'

import BaseApiService from './BaseApiService'
import { compileStr } from 'src/utils/encode/encode';
import qs from 'qs'
export interface DictItemIn {
  dictCode: string
  itemCode: string
}

export default class AuthApiService extends BaseApiService {
  private checkStatus (res: any) {
    return new Promise((resolve, reject) => {
      if (res.code === '402') {
        globalModal.confirm('提示', res.data.expireDesc).then(() => {
          return resolve(true);
        })
        .catch(()=>{
          return resolve(true);
        })
      } else if (res.data.code === '403') {
        globalModal.confirm('提示', res.data.desc);
      } else {
        return resolve(true);
      }
    })
  }
  public login(username: string, password: string, code: string, repaint: any,orgPsd?:string) {
    return httpLoginToken.post('/login', this.stringify({ empNo: username, password: password, code: code, repaint: repaint })).then(async (res:any) => {
      if (res.errorCode) {
        return res
      }
      const isPassCheck = await this.checkStatus(res);
      if (!isPassCheck) {
        return false;
      }
      // let regexp = new RegExp("^(?![A-Za-z0-9]+$)(?![a-z0-9\\W]+$)(?![A-Za-z\\W]+$)(?![A-Z0-9\\W]+$)[a-zA-Z0-9\\W]{8,}$")
      let regexp = new RegExp("^(?![A-Z]*$)(?![a-z]*$)(?![0-9]*$)(?![^a-zA-Z0-9]*$)\\S{8,}$")
      if (['sdlj','dghl', 'qzde'].includes(appStore.HOSPITAL_ID) && !regexp.test(orgPsd||'')) {
        message.error('当前登录密码强度较弱，请修改密码后登录!')
        window.location.href = '#/resetpassword'
        return
      }
      else if (appStore.pwdRule?.flag) {
        const pattern = eval(`/${appStore.pwdRule?.rule}/`)
        const flag = pattern.test(orgPsd);
        if (!flag) {
          message.error(
            appStore.pwdRule.ruleMsg,
            2,
            () => {
              window.location.href = '#/resetpassword'
            }
          )
          return
        }
      }
      let { adminNurse, authToken, user } = res.data
      user = { ...user, wsp: compileStr(password) }
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
      // if (appStore.HOSPITAL_ID == 'wh') {
        // if (user.roleManage != '1') {
        //   return message.warn('你没有权限进入管理系统')
        // }
      // }
      // 实习生直接跳转学习培训在线学习
      if (authStore.isOnlyInternsManage) {
        return window.location.href = '#/continuingEdu/在线学习'
      }

      if (appStore.HOSPITAL_ID == 'nys' && appStore.onlyBadEvent) {
        //普通护士无权限进入南医三不良事件审核系统
        if (user.roleManageCodeList.length > 0 || user.roleManage == '1') {
          window.location.href = '#/home'
        } else {
          message.warning('无审核权限', 3, () => autoLoginTnNisInfoBe())
        }
      } else if (['gdtj','whfk'].includes(appStore.HOSPITAL_ID)) {
        window.location.href = '#/setting'
      }else {
        window.location.href = '#/home'
      }
    })
  }
  public logout(stopComfirm?: boolean) {

    // 退出就删除专科护理质量--佛山杏坛
    sessionStorage.removeItem('specialmenu')

    const userLoginInfoMap: any = JSON.parse(
      localStorage.userLoginInfoMap || "{}"
    );
    let _this = this

    let empNo = authStore.user?.empNo
    if (empNo) empNo = empNo.toLowerCase()

    if (stopComfirm) {
      delete userLoginInfoMap[authStore.user?.empNo.toLowerCase() || '']
      localStorage.userLoginInfoMap = JSON.stringify(userLoginInfoMap)
      localStorage.lastLoginUserName = ''
      _this.clearUser()
    } else {

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

  }

  /**
   * 重置密码
   * @param empNo 工号
   * @param oldPswd 旧密码
   * @param newPswd 新密码
   * @param rePswd 确认密码
   * @returns
   */
  //  empNo: string, oldPswd: string, newPswd: string, rePswd: string
  public updatePassword(data:any) {
    return httpLoginToken.post('/updatePassword',data)
  }
 /**
   * 忘记密码
   * @param empNo 工号
   * @param phone 手机号码
   * @param newPswd 新密码
   * @param rePswd 确认密码
   * @returns
   */
  //  empNo: string, oldPswd: string, newPswd: string, rePswd: string
  public updatePasswordByPhoneNumber(data:any) {
    return httpLoginToken.post('/updatePasswordByPhoneNumber',data)
  }
  /**
   * 重置密码（密码入参已做md5加密）
   * @param empNo 工号
   * @param oldPswd 旧密码
   * @param newPswd 新密码
   * @param rePswd 确认密码
   * @returns
   */
  //  empNo: string, oldPswd: string, newPswd: string, rePswd: string
  public updatePasswordMd5(data:any) {
    return httpLoginToken.post('/updatePasswordMd5',data)
  }

  /**
   * 获取正则
   */
  public passwordRule() {
    return httpLoginToken.get('/getPasswordRule')
  }

  clearUser() {
    // sessionStorage.removeItem('adminNurse')
    // sessionStorage.removeItem('authToken')
    // sessionStorage.removeItem('user')
    // sessionStorage.removeItem('selectedDeptCode')
    sessionStorage.clear()
    authStore.delUser()
    statisticsViewModal.hadData = false
    window.location.href = '#/login'
  }
  /**
   * 获取配置项字典
   * @param params DictItemIn
   * @returns
   */
  public getDictItem(params: DictItemIn) {
    return httpLoginToken.get(`/dict/common/getDictItem?${qs.stringify(params)}`)
  }
}
