import { any } from 'prop-types';
import BaseApiService from 'src/services/api/BaseApiService'
import { fileDownload } from 'src/utils/file/file'

// 获取三级质控平均分统计列表params
export interface IQcGradeParams {
  wardCode?: string
  beginDate?: string
  endDate?: string
  order?: string
}
export interface IQcGradeOutput extends Record<string, any> {
  wardCode: string
  wardName: string
  nurseQuality: number
  nursingUnit: number
  criticallyPatient: number
  gradedNursing: number
  nursingDocument: number
  infectionManagement: number
  chargeNurse: number
  keyLink: number
  qualitySpecialized: number
  clinicalReality: number
  teachingInspection: number
  nNursingSkill: number
  firstAidCooperation: number
  satisfaction: number
  average: number
}

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
  /**护理质量检查小结 贵州市人民医院*/
  public countTemplateDetail(params: any) {
    return this.post(`/qcCount/countTemplateDetail`, params)
  }
  /**
   * 获取三级质控平均分统计列表
   * params wardCode	科室编号
   * beginDate	2021-11-11
   * endDate	2021-11-11
   * order	排序 1升序 -1倒叙
   */
  public async getQcGradeList(params: IQcGradeParams) {
    return this.post(`/qcGradeCount/countResult`, params)
  }
  /**
   * 导出三级质控平均分统计表格
   * @param params 
   * @returns 
   */
  public async exportCountResult(params: IQcGradeParams) {
    return this.post('/qcGradeCount/exportCountResult', params, { responseType: 'blob' })
      .then(res => fileDownload(res))
  }
  /**护理质量检查小结导出 */
  public countDetailExport(params: any) {
    return this.post(`/qcCount/countTemplateResult/export`, params, { responseType: 'blob' })
  }
}

export const qcFormGzsrmService = new QcFormGzsrmService()