import BaseApiService from "src/services/api/BaseApiService";

class AuditNurseFileNewService extends BaseApiService {
  // getByEmpNoAudite
  // 1查找护士基本信息 护长
  public async nurseInformation(empNo: any) {
    return this.get(`/nurseInformation/getByEmpNoAudite/${empNo}`).then(res => {
      return res;
    });
  }
  /** 待我审核 */
  public findNurseFilePendingFlow(empNo: any, pageIndex: any, pageSize: any) {
    return this.post(`/auditeNurseFileIndexNys/findNurseFilePendingFlow`, this.stringify({ empNo, pageIndex, pageSize }))
  }
  /** 我已审核 */
  public findNurseFileProcessedFlow(empNo: any, pageIndex: any, pageSize: any) {
    return this.post(
      `/auditeNurseFileIndexNys/findNurseFileProcessedFlow`,
      this.stringify({ empNo, pageIndex, pageSize })
    )
  }
}

export const auditNurseFileNewService = new AuditNurseFileNewService()