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
      `nurse/promotion/getById`,
      { id }
    )
  } 
}

export const PromotionApplicationApi = new PromotionApp()