import qs from "qs";
import BaseApiService from "src/services/api/BaseApiService";

export default class SatisfiedPatSubmitService extends BaseApiService {
  /** 保存填写的调查表内容 */
  public submitInfoToAudit(params: any) {
    return this.post('/satisfiedPat/submitForm', params)
  }

  /**公共接口-免登陆获取所有的护理单元信息 */
  // public nursingUnitWithOutLogin() {
  //   return this.get('/dept/nursingUnitWithOutLogin')
  // }
}

export const satisfiedPatSubmitService = new SatisfiedPatSubmitService()