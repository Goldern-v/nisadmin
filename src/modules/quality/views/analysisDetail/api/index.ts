import { appStore } from "../../../../../stores/index";
import BaseApiService from "src/services/api/BaseApiService";
// import { analysisDetailModal } from '../AnalysisDetailModal'
export default class AnalysisDetailApi extends BaseApiService {

  public cancelPublishReport(obj?: any) {
    return this.post(`/qcAnalysis/cancelPublish`, appStore.queryObj);
  }
  /**查看详细报告 */
  public getPageDetaile(reportId: string) {
    return this.get(`/baseReport/getReport/${reportId}`);
  }
  /**保存属性类型报告数据 */
  public saveReportFieldData(data: any) {
    return this.post(`/reportFieldData/save`, data);
  }
  /**报告表格编辑 */
  public saveReportTableData(data: any) {
    return this.post(`/reportTableData/batchSave`, data);
  }
  /**发布报告 */
  public publishReport(reportId: string) {
    return this.get(`/baseReport/publish/${reportId}`);
  }
  /**审核报告 */
  public auditReport(data: any) {
    return this.post(`/baseReport/audit`, data);
  }
  /**撤销报告 */
  public revokeReport(reportId: string) {
    return this.get(`/baseReport/revoke/${reportId}`);
  }
  public deleteReport(reportId: string) {
    return this.get(`/baseReport/delete/${reportId}`);
  }
  public exportReport(reportId: string) {
    return this.get(`/baseReport/export/${reportId}`, {
      responseType: "blob"
    })
  }
}

export const analysisDetailApi = new AnalysisDetailApi();
