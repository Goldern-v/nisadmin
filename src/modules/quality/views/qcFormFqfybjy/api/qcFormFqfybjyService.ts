import BaseApiService from 'src/services/api/BaseApiService'
import { fileDownload } from 'src/utils/file/file'

class QcFormFqfybjyService extends BaseApiService {
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
    return this.post('/qcPdca/getList', query)
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
    return this.post('/qcPdca/getList/export', query, { responseType: 'blob' })
      .then(res => fileDownload(res))
  }
  public cause(query: {}) {
    return this.post('/qcPdca/save/cause', query)
  }
  public measure(query: {}) {
    return this.post('/qcPdca/save/measure', query)
  }
  public opinions(query: {}) {
    return this.post('/qcPdca/save/opinions', query)
  }
  public rectificationResult(query: {}) {
    return this.post('/qcPdca/save/rectificationResult', query)
  }
}

export const qcFormFqfybjyService = new QcFormFqfybjyService()