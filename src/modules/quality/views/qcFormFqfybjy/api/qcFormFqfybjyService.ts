import BaseApiService from 'src/services/api/BaseApiService'
import { fileDownload } from 'src/utils/file/file'

export interface saveContentItemIn {
  id?: number
  // 主键	
  qcMasterId?: number
  // 质控Id	
  type?: number
  // 类型（1:存在问题 2：原因分析 3：整改措施 4：追踪组日期 5：追踪评价 6：追踪者 7：护长评价日期 8：护长评价 9：护长评价者 ）	
  content?: string
  // 内容	
  evaluateDate?: null
  // 日期	
  author?: string
}
export interface saveContentIn {
  contentList: saveContentItemIn[]
}
export interface saveMainIn {
  qcMasterId?:	number
  // 质控Id
  checkDate?:	string
  // 检查日期
  checkAuthor?:	string
  // 检查者
}
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
    return this.post('/qcPdcaForFQ/getList', query)
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
    return this.post('/qcPdcaForFQ/getList/exportForFQ', query, { responseType: 'blob' })
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
  /**
   * 保存内容 by福清
   * @param params 
   * @returns 
   */
  public saveContent(params: saveContentIn) {
    return this.post('/qcPdcaForFQ/saveOrUpdateContent', params)
  }
  /**
   * 保存主信息 检查日期，检查人 by福清
   * @param params 
   * @returns 
   */
  public saveMain(params: saveMainIn) {
    return this.post('/qcPdcaForFQ/saveOrUpdateMeasure', params)
  }
}

export const qcFormFqfybjyService = new QcFormFqfybjyService()