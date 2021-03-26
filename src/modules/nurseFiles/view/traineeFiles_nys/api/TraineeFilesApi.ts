import qs from "qs";
import BaseApiService from "src/services/api/BaseApiService";

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
  public async deleteInfoById(id: any) {
    return this.post(
      `/nursefile/otherPersonInfo/graduateIntern/deleteInfoById`,
      { id }
    );
  }

  // 导出
  public exportPageList(obj?: any) {
    return this.post(
      `/nursefile/otherPersonInfo/graduateIntern/exportPageList`,
      obj,
      {
        responseType: "blob"
      }
    );
  }

  /**护理实习生花名册-获取待审核的记录-分页查询 */
  public queryToAuditPageList(query: any) {
    return this.post(
      "/nursefile/otherPersonInfo/graduateIntern/queryToAuditPageList",
      query
    );
  }

  /**护理实习生花名册-根据id获取待审核记录的详细信息 */
  public queryToAuditInfoById(id: string | number) {
    return this.post(
      "/nursefile/otherPersonInfo/graduateIntern/queryToAuditInfoById",
      qs.stringify({ id })
    );
  }

  /**护理实习生花名册-保存信息至花名册 */
  public auditInfo(params: any) {
    return this.post(
      "/nursefile/otherPersonInfo/graduateIntern/auditInfo",
      params
    );
  }

  /**护理实习生花名册-保存信息至花名册 */
  public deleteToAuditInfoByIds(ids: any[]) {
    return this.post(
      "/nursefile/otherPersonInfo/graduateIntern/deleteToAuditInfoByIds",
      qs.stringify({ ids: ids.join(",") })
    );
  }
}
export const traineeFilesApi = new TraineeFilesApi();
