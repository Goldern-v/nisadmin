import BaseApiService from "src/services/api/BaseApiService";
// import { formApplyModal } from "../formApply/FormApplyModal";
import qs from "qs";

export default class TrainingSettingApi extends BaseApiService {

  // 获取表单列表
  public async getFormList(obj: any) {
    return this.post(`/nursefile/otherPersonInfo/graduateIntern/queryPageList`, obj);
  }
  // 添加实习生
  public async AddFormSave(obj: any) {
    return this.post(`/nursefile/otherPersonInfo/graduateIntern/saveOrUpdateYaXinInfo`, obj);
  }


 
  // 表单删除
  public async deleteForm(id: any) {
    return this.post(
      `/nursefile/otherPersonInfo/graduateIntern/deleteInfoById`,
      { id }
    );
  }
  // 表单导出
  public async exportPageList(obj: any) {
    return this.post(
      `/nursefile/otherPersonInfo/graduateIntern/exportPageYaXinList`,
      obj,
      {
        responseType: "blob"
      }
    );
  }
  // 下载摸板
  public async downloadTemplate() {
    return this.get(
      `/nursefile/otherPersonInfo/graduateIntern/downLoadGraduateInternInfoYaXinTemplate`,
      {
        responseType: "blob"
      }
    );
  }
  // 表单导入
  public async exportSheetTemplate(filename:any,year:any) {
    let newFormData = new FormData()
    newFormData.set('file', filename)
    newFormData.set('year', year)
    return this.post(
      `/nursefile/otherPersonInfo/graduateIntern/importGraduateInternInfoYaXinTemplate`
      ,newFormData
    );
  }

  // 实习生教学计划-获取表单列表
  public async getQueryPageList(obj: any) {
    return this.post(`/studyAndTrain/courseLibrary/queryPageYaXinList`, obj);
  }
  // 实习生教学计划-删除表单列表
  public async deleteQueryPageList(id: any) {
    return this.post(`/studyAndTrain/courseLibrary/delete`, { id });
  }
  // 导入教学计划课件-提交按钮
  public async saveOrUpdate(obj: any) {
    return this.post(`/studyAndTrain/courseLibrary/saveOrUpdateYaXin`, obj);
  }
  // 实习生教学计划-上传附件接口
  public async uploadPictures(filename:any) {
    let newFormData = new FormData()
    newFormData.set('file', filename)
    return this.post(`/studyAndTrain/courseLibrary/uploadPictures`, newFormData);
  }

  // 实习生临床评定获取表单列表（查询接口）
  public async getFormListYaXin(obj: any) {
    return this.post(`/studyAndTrain/clinicalIdentificationOfInterns/queryClinicalIdentificationListByPage`, obj);
  }
  // 实习生临床评定获取实习科室
  public async getUintList() {
    return this.get(`/user/nursingUnit`);
  }
  // 实习生临床评定导出接口
  public async exportPageListYaXin(obj: any) {
    return this.post(
      `/studyAndTrain/clinicalIdentificationOfInterns/countExcel`,
      obj,
      {
        responseType: "blob"
      }
    );
  }
  // 实习生临床评定保存接口
  public async saveClinicalYaXin(obj: any) {
    return this.post(
      `/studyAndTrain/clinicalIdentificationOfInterns/saveOrUpdateClinicalIdentificationList`,
      obj
    );
  }
}
export const trainingSettingApi = new TrainingSettingApi();
