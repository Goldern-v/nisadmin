import BaseApiService from "src/services/api/BaseApiService";

class PromotionApp extends BaseApiService {
  public getSaveOrCommit(obj:any){
    return this.post(
      `/nurse/promotion/saveOrCommit`,
      obj
    )
  } 
  // 获取护士晋升详情
  public getpromotionList(id:any){
    return this.post(
      `/nurse/promotion/getById`,
      { id }
    )
  } 

  // 根据员工号和表格获取信息
  public getByEmpNoAndFormCode(obj:any){
    let newFormData = new FormData()
    newFormData.set('empNo', obj.empNo)
    newFormData.set('formCode', obj.formCode)
    return this.post(
      `/nurse/promotion/getByEmpNoAndFormCode`,
      newFormData
    )
  }
  //检查用户名和密码
  public async checkUser(query: any) {
    return this.post(`/form/checkUser`, query);
  }
}

export const PromotionApplicationApi = new PromotionApp()