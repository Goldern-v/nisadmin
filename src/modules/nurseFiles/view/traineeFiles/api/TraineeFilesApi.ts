import BaseApiService from "src/services/api/BaseApiService";
import { authStore } from "src/stores/index";
import qs from "qs";

export default class TraineeFilesApi extends BaseApiService {
  // 查询
  public async queryPageList(obj: any) {
    return this.post(
      `/nursefile/otherPersonInfo/graduateIntern/queryPageList`,
      obj
    );
  }

  // 保存
  public async saveOrUpdateInfo(obj: any) {
    return this.post(
      `/nursefile/otherPersonInfo/graduateIntern/saveOrUpdateInfo`,
      obj
    );
  }

  // 修改回显
  public async queryInfoByIdentifier(identifier: any) {
    return this.post(
      `/nursefile/otherPersonInfo/graduateIntern/queryInfoByIdentifier`,
      { identifier }
    );
  }

  // 删除
  public async deleteInfoByIdentifier(identifier: any) {
    return this.post(
      `/nursefile/otherPersonInfo/graduateIntern/deleteInfoByIdentifier`,
      { identifier }
    );
  }

  // 导出
  // public exportMainData(obj?: any) {
  //   return this.post(`/studyAndTrain/teachingPlanManage/exportPageList`, obj, {
  //     responseType: "blob"
  //   });
  // }
}
export const traineeFilesApi = new TraineeFilesApi();
