import BaseApiService from 'src/services/api/BaseApiService'
import { fileDownload } from 'src/utils/file/file'

class QcFormGzsrmService extends BaseApiService {
  /**
   * QCC.4.02、质控汇总：问题原因措施汇总
   * @param query.qcLevel 质控级别
   * @param query.beginDate 汇总开始事件
   * @param query.endDate 汇总结束时间
   */
  public problemCauseMeasureSummary(query: {
    qcLevel: string,
    beginDate: string,
    endDate: string,
  }) {
    return this.post('/qcCount/problemCauseMeasureSummary', query)
  }

  /**
     * QCC.4.02、质控汇总：问题原因措施汇总
     * @param query.qcLevel 质控级别
     * @param query.beginDate 汇总开始事件
     * @param query.endDate 汇总结束时间
     */
  public problemCauseMeasureSummaryExport(query: {
    qcLevel: '1' | '2' | '3',
    beginDate: string,
    endDate: string,
  }) {
    return this.post('/qcCount/problemCauseMeasureSummary/export', query, { responseType: 'blob' })
      .then(res => fileDownload(res))
  }
}

export const qcFormGzsrmService = new QcFormGzsrmService()