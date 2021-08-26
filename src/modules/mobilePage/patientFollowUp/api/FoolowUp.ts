import qs from "qs";
import { httpLoginToken } from 'src/libs/http/http';

import BaseApiService from "src/services/api/BaseApiService";

export default class FoolowUp extends BaseApiService {
  // 通过患者ID获取随访表记录列表 -（分页查询）
  public queryPageListByPatientId (params: any) {
    return httpLoginToken.post('/visit/visitMasterData/queryPageListByPatientId', params)
  }
  public getFollowUpContont (params:any){
    return httpLoginToken.post('/pdaform/getByFormCode',null,{params})
  }
  public getReportMaster (params:any){
    return httpLoginToken.post('/visit/visitReportMaster/getById',params)
  }
  public saveOrUpdateByPatient (params:any){
    return httpLoginToken.post('/visit/visitReportMaster/saveOrUpdateByPatient',params)
  }
  public setIsRead (params:any){
    return httpLoginToken.post('visit/visitMasterData/setIsRead',params)
  }
  
  // /**护理实习生花名册-将信息提交审核(手机端H5页面) */
  // public submitInfoToAudit(params: any) {
  //   return this.post('/nursefile/otherPersonInfo/refresherStudent/submitInfoToAudit', params)
  // }

  // /**公共接口-免登陆获取所有的护理单元信息 */
  // public nursingUnitWithOutLogin() {
  //   return this.get('/dept/nursingUnitWithOutLogin')
  // }
}

export const foolowUp = new FoolowUp()