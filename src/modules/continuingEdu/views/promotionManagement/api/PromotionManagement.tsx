import BaseApiService from "src/services/api/BaseApiService";
// import { formApplyModal } from "../formApply/FormApplyModal";
import qs from "qs";


export default class PromotionManagement extends BaseApiService {
  //获取医院科室信息
  public async getnursingAll() {
    return this.get(`/user/nursingUnit/all`);
  }
  //获取进修生
  public async getFormList(obj: any) {
    return this.post(`/nursefile/otherPersonInfo/refresherStudent/queryPageListYaXin`, obj);
  }
  //添加进修生
  public async getSaveFormData(obj: any) {
    return this.post(`/nursefile/otherPersonInfo/refresherStudent/saveOrUpDateByGroupYaXin`, obj);
  }
  //删除选中进修生
  public async deleteFormData(id: any) {
    return this.post(`/nursefile/otherPersonInfo/refresherStudent/deleteInfoByIdYaXin`, { id });
  }
  //导出进修生
  public async exportMainData(obj: any) {
    return this.post(`/nursefile/otherPersonInfo/refresherStudent/exportPageYaXinList`,  obj, {
      responseType: "blob"
    } );
    
  }
  //-导入教学计划课件
  public async exportSheetTemplate(obj: any) {
    return this.post(`/studyAndTrain/teachPlanAdvancedStu/saveOrUpdateYaXin`, obj );
  }
  //晋升表单数据获取
  public async getQueryPageList(obj: any) {
    return this.post(`/nurse/promotion/listPromotion`, obj);
  }
  // 实习生教学计划-删除表单列表
  public async deleteQueryPageList(id: any) {
    return this.post(`/studyAndTrain/teachPlanAdvancedStu/delete`, { id });
  }
  // 导入教学计划课件-提交按钮
  public async saveOrUpdate(obj: any) {
    return this.post(`/studyAndTrain/teachPlanAdvancedStu/saveOrUpdateYaXin`, obj);
  }
  // 实习生教学计划-上传附件接口
  public async uploadPictures(filename:any) {
    let newFormData = new FormData()
    newFormData.set('file', filename)
    return this.post(`/studyAndTrain/teachPlanAdvancedStu//uploadPictures`, newFormData);
  }
  // 晋升管理-导出
  public async export() {
    return this.post(`/nurse/promotion/exportPromotion`, {});
  }
}
export const PromotionManagementApi = new PromotionManagement();