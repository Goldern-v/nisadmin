import qs from "qs";
import BaseApiService from "src/services/api/BaseApiService";

export default class TraineeInfoSubmitService extends BaseApiService {
  /**护理实习生花名册-将信息提交审核(手机端H5页面) */
  public submitInfoToAudit(params: any) {
    return this.post('/nursefile/otherPersonInfo/graduateIntern/submitInfoToAudit', params)
  }

  /**公共接口-免登陆获取所有的护理单元信息 */
  public nursingUnitWithOutLogin() {
    return this.get('/dept/nursingUnitWithOutLogin')
  }
}

export const traineeInfoSubmitService = new TraineeInfoSubmitService()