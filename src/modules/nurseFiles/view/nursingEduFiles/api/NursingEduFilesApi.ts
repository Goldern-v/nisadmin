import qs from "qs";
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
  public async deleteInfoById(obj: any) {
    return this.post(
      `/nursefile/otherPersonInfo/refresherStudent/deleteInfoById`,
      obj
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

  /**护理进修生花名册-获取待审核的记录-分页查询 */
  public queryToAuditPageList(query: any) {
    return this.post(
      "/nursefile/otherPersonInfo/refresherStudent/queryToAuditPageList",
      query
    );
  }

  /**护理进修生花名册-根据id获取待审核记录的详细信息 */
  public queryToAuditInfoById(id: string | number) {
    return this.post(
      "/nursefile/otherPersonInfo/refresherStudent/queryToAuditInfoById",
      qs.stringify({ id })
    );
  }

  /**护理进修生花名册-保存信息至花名册 */
  public auditInfo(params: any) {
    return this.post(
      "/nursefile/otherPersonInfo/refresherStudent/auditInfo",
      params
    );
  }

  /**护理进修生花名册-保存信息至花名册 */
  public deleteToAuditInfoByIds(ids: any[]) {
    return this.post(
      "/nursefile/otherPersonInfo/refresherStudent/deleteToAuditInfoByIds",
      qs.stringify({ ids: ids.join(",") })
    );
  }

  // 获取人员
  public getAllEmpName(empName?: any) {
    let obj: any = {
      empName,
      pageIndex: 1,
      pageSize: 100
    };
    return this.post(`studyAndTrain/basicInformation/user/getPage`, obj);
  }
}
export const nursingEduFilesApi = new NursingEduFilesApi();
