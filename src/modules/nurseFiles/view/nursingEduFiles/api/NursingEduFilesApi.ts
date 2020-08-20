import BaseApiService from "src/services/api/BaseApiService";

export default class NursingEduFilesApi extends BaseApiService {
  // 查询
  public async queryPageList(obj: any) {
    return this.post(
      `/nursefile/otherPersonInfo/refresherStudent/queryPageList`,
      obj
    );
  }

  // 保存
  public async saveOrUpdateInfo(obj: any) {
    return this.post(
      `/nursefile/otherPersonInfo/refresherStudent/saveOrUpdateInfo`,
      obj
    );
  }

  // 修改回显
  public async queryInfoByIdentifier(identifier: any) {
    return this.post(
      `/nursefile/otherPersonInfo/refresherStudent/queryInfoByIdentifier`,
      { identifier }
    );
  }

  // 删除
  public async deleteInfoByIdentifier(identifier: any) {
    return this.post(
      `/nursefile/otherPersonInfo/refresherStudent/deleteInfoByIdentifier`,
      { identifier }
    );
  }

  // 导出
  public exportPageList(obj?: any) {
    return this.post(
      `/nursefile/otherPersonInfo/refresherStudent/exportPageList`,
      obj,
      {
        responseType: "blob"
      }
    );
  }
}
export const nursingEduFilesApi = new NursingEduFilesApi();
