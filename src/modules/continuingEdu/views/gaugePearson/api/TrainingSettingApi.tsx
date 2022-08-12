import BaseApiService from "src/services/api/BaseApiService";
// import { formApplyModal } from "../formApply/FormApplyModal";
import qs from "qs";

export default class TrainingSettingApi extends BaseApiService {

  // 规培生基本信息汇总表-信息获取
  public async getFormList(obj: any) {
    return this.post(`/studyAndTrain/planTrainStudentInfo/getPage`, obj);
  }

  // 规培生基本信息汇总表-带教护士列表
  public async getUserByRoleCode(roleCode: string) {
    return this.get(`/flowRole/getUserByRoleCode/${roleCode}`);
  }

  // 规培生基本信息汇总表-保存填写编辑接口
  public async saveOrUpdateInfo(obj: any) {
    return this.post(`/studyAndTrain/planTrainStudentInfo/saveOrUpdateInfo`, obj);
  }
  // 表单删除
  public async deleteForm(id: any) {
    return this.post(
      `/nursefile/otherPersonInfo/graduateIntern/deleteInfoById`,
      { id }
    );
  }
  // 规培生基本信息汇总表-导出列表
  public async exportPageList(obj: any) {
    return this.post(
      `/studyAndTrain/planTrainStudentInfo/exportPlanTrainStudentInfo`,
      obj,
      {
        responseType: "blob"
      }
    );
  }
  // 规培生基本信息汇总表-下载摸板
  public async downloadTemplate() {
    return this.get(
      `/studyAndTrain/planTrainStudentInfo/downLoadPlanTrainStudentInfoTemplate`,
      {
        responseType: "blob"
      }
    );
  }
 
  // 规培生基本信息汇总表-表单导入
  public async importSheetTemplate(filename:any) {
    let newFormData = new FormData()
    newFormData.set('file', filename)
    return this.post(
      `/studyAndTrain/planTrainStudentInfo/importPlanTrainStudentInfo`
      ,newFormData
    );
  }


  // 根据用户权限获取医院科室信息
  public async getnursingDeptRole() {
    return this.get(`/user/nursingUnit`);
  }



  // 规培生出科评价-获取表单列表
  public async getQueryPageList(obj: any) {
    return this.post(`/studyAndTrain/GraduateEvaluateOfPlanTrainStu/queryGraduateEvaluateOfPlanTrainStuListByPage`, obj);
  }
  // 规培生出科评价-导出列表
  public async countExcel(obj: any) {
    return this.post(`/api/studyAndTrain/GraduateEvaluateOfPlanTrainStu/countExcel`, obj);
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

 
}
export const trainingSettingApi = new TrainingSettingApi();
