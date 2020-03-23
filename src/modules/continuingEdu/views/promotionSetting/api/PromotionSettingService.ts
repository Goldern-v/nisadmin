import { PageOptions } from "src/components/BaseTable";
import BaseApiService from "src/services/api/BaseApiService";

export default class PromotionSettingService extends BaseApiService {
  /** 获取医院所有层级 */
  public getAllNurseLevel() {
    return this.get(`/studyAndTrain/promoteManage/getAllNurseLevel`);
  }

  /** 获取所有晋升要求 */
  public getAllPromoteRequest() {
    return this.get(`/studyAndTrain/promoteManage/getAllPromoteRequest`);
  }

  /** 获取晋升层级的晋升要求详情 */
  public getPromoteConfig(level: string) {
    return this.get(`/studyAndTrain/promoteManage/getPromoteConfig/${level}`);
  }

  /** 设置晋升层级的晋升要求详情 */
  public editPromoteRequest(params: {
    promoteLevel: string;
    promoteInfoList: any[];
  }) {
    return this.post(`/studyAndTrain/promoteManage/editPromoteRequest`, params);
  }
}

export const promotionSettingService = new PromotionSettingService();
