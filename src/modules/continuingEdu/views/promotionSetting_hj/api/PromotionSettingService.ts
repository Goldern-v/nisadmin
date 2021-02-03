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
    otherInfos?: {
      jobDuty?: string
    }
  }) {
    return this.post(`/studyAndTrain/promoteManage/editPromoteRequest`, params);
  }

  /** 设置晋升层级的晋升要求条目 */
  public editPromoteConfig(params: {
    promoteLevel: string;
    promoteInfoList: any[];
  }) {
    return this.post(`/studyAndTrain/promoteManage/SaveSelectedRequest`, params);
  }

  /** 341.厚街-晋升管理pc-获取所有-专业训练重点 */
  public getLevelTrainingKeyPoint(promoteType: any) {
    return this.post(`/studyAndTrain/promoteManage/getAllPromoteRequest/trainingKeyPoint`, { promoteType });
  }

  /** 342.厚街-晋升管理pc-根据晋升等级获取-专业训练重点 */
  public getTrainingKeyPointConfig(level: string) {
    return this.get(`/studyAndTrain/promoteManage/getPromoteConfig/trainingKeyPoint/${level}`);
  }

  /** 344.厚街-晋升管理pc-保存晋升要求编辑-临床能力训练重点 */
  public eidtTrainingKeyPoint(params: {
    promoteType: string;
    trainingKeyPointList: any[];
  }) {
    return this.post('/studyAndTrain/promoteManage/saveSelectedRequest/trainingKeyPoint', params)
  }

  /** 343.厚街-晋升管理pc-根据晋升等级获取晋升要求设置-其它信息（专业训练重点、岗位职责信息） */
  public getPromoteConfigOther(level: string) {
    return this.get(`/studyAndTrain/promoteManage/getPromoteConfig/otherInfos/${level}`);
  }
}

export const promotionSettingService = new PromotionSettingService();
