import BaseApiService from "src/services/api/BaseApiService";
// import { formApplyModal } from "../formApply/FormApplyModal";
import qs from "qs";
import { Obj } from "src/libs/types";

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
  public async deleteForm(sapCode: any) {
    return this.post(
      `/studyAndTrain/planTrainStudentInfo/deleteInfoBySapCode`,
      { sapCode }
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
  public async importSheetTemplate(filename: any) {
    let newFormData = new FormData()
    newFormData.set('file', filename)
    return this.post(
      `/studyAndTrain/planTrainStudentInfo/importPlanTrainStudentInfo`
      , newFormData
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
    return this.post(`/studyAndTrain/GraduateEvaluateOfPlanTrainStu/countExcel`, obj, { responseType: "blob" });
  }
  // 规培生出科评价-删除单个
  public async deleteQueryPageList(obj: any) {
    return this.post(`/studyAndTrain/GraduateEvaluateOfPlanTrainStu/deleteGraduateEvaluateOfPlanTrainStu`, obj);
  }
  // 规培生出科评价-保存列表数据
  public async saveQueryPageList(obj: any) {
    return this.post(`/studyAndTrain/GraduateEvaluateOfPlanTrainStu/saveOrUpdateGraduateEvaluateOfPlanTrainStuList`, obj);
  }

  /*亚心--规培手册api*/
  public async getTemplateList(obj: any) {
    return this.post(`/formHandBook/getTemplateList`, obj);
  }
  public async saveOrUpdate(obj: any) {
    let formData = new FormData()
    Object.keys(obj).forEach(v => {
      formData.append(v, obj[v])
    })
    return this.post(`/formHandBook/saveOrUpdate`, formData);
  }
  public async deleteTemplate(obj: any) {
    return this.post(`/formHandBook/deleteTemplate`, obj);
  }
  public async getTemplateMaintenance() {
    return this.get('/formHandBook/getTemplateMaintenance');
  }
  /**
   * 创建手册  
   * @param obj.ptStudentId {string}  
   * @param obj.deptCode {string}  
   * @param obj.deptName {string}  
   * @param obj.handbookName {string}  
   * @param obj.templateIds {string}  
   * @returns 
   */
  public async createHandbook(obj: any) {
    return this.post(`/studyAndTrain/planTrainStudentInfo/createHandbook`, obj);
  }
  /**
   * 删除
   * @param obj.id {string}  
   * @returns 
   */
  public async deleteHandbook(obj: any) {
    return this.post(`/studyAndTrain/planTrainStudentInfo/deleteHandbook`, obj);
  }
  /**
   * 根据规培生ID查询手册主表列表  
   * @param ptStudentId {string} 规培生id
   * @returns 
   */
  public async getHandbookMaster(ptStudentId: string) {
    return this.get(`/studyAndTrain/planTrainStudentInfo/getHandbookMaster/${ptStudentId}`);
  }
  /**
   * 根据主表ID查询手册目录列表  
   * @param masterId {number}
   * @returns 
   */
  public async getHandbookCatalog(masterId: number) {
    return this.get(`/studyAndTrain/planTrainStudentInfo/getHandbookCatalog/${masterId}`);
  }

  public async updateHandbookCatalog(tableData:any) {
    return this.post(`/studyAndTrain/planTrainStudentInfo/updateHandbookCatalog`, tableData);
  }
  /**
   * 查询出对应模板的项和数据  
   * @param obj.catalogId {string}  
   * @param obj.masterId {string}  
   * @param obj.templateId {string}  
   * @param obj.templateType {string}  
   * @returns 
   */
  public async queryTemplateItemAndData(obj: Obj) {
    return this.get(`/studyAndTrain/planTrainStudentInfo/queryTemplateItemAndData?${qs.stringify(obj)}`);
  }
  /**保存或更新模板项数据**/
  public async saveOrUpdateItemData(params:any) {
    return this.post('/studyAndTrain/planTrainStudentInfo/saveOrUpdateItemData',params);
  }
  /**获取手册模板，表单的子项**/
  public async getTemplateItems(params:any) {
    return this.post('/formHandBook/getTemplateItems',params);
  }
  /**修改手册表单的子项**/
  public async updateFormItem(params:any) {
    return this.post('/formHandBook/updateFormItem',params);
  }
  /**
   * 单个导出
   * @param templateDd {number}
   * @returns
   */
  public async getDownload(params:any) {
    return this.post('/formHandBook/download',params,{ responseType: 'blob' });
  }
  /**下载所有模板**/
  public async getAllDownloadZip(params:any) {
    return this.post('/formHandBook/downloadZip',params,{ responseType: 'blob' });
  }
  /**
   * 查询所有模板的项和数据（用于手册导出）
   * @param masterId {number}
   * @returns
   */
  public async exportQueryAllData(masterId: any) {
    return this.get(`/studyAndTrain/planTrainStudentInfo/queryAllData/${masterId}`);
  }
}
export const trainingSettingApi = new TrainingSettingApi();
