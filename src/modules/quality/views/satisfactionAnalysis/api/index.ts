import BaseApiService from 'src/services/api/BaseApiService';

export interface getDataIn {
  startDate?: string,
  endDate?: string,
  // 2022-03-22
}
export interface setInvestIn extends getDataIn {
  recoveryCount?:	number,
  // 回收问卷
  validCount?: number,
  // 有效问卷
}
export interface getDeptScoreIn extends getDataIn {
  wardCode?: string
}
export type getEachVariousIndicatorsEnums = 1 | 2 | 3 | 4 | 5 | 6 | 7 
// 1:优质护理病房知晓情况 2:入院介绍 3:病房及卫生间清洁 4:输液体验 5:疾病相关知识宣教 6:护理操作讲解 7:健康指导 8:生活照顾 9:隐私保护 10:整体满意度
export interface getEachVariousIndicatorsIn extends getDataIn {
  type: getEachVariousIndicatorsEnums
}
class Api extends BaseApiService {
  private readonly apiPath: string = '/satisfactionAnalysis/'
  
  /**
   * 获取调查数量
   * @param params getDataIn
   * @returns 
   */
  public getInvestigationCount(params: getDataIn) {
    return this.post(`${this.apiPath}getInvestigationCount`, params)
  }
  /**
   * 设置调查数量
   * @param params setInvestIn
   * @returns 
   */
  public setInvestigationCount(params: setInvestIn) {
    return this.post(`${this.apiPath}setInvestigationCount`, params)
  }
  /**
   * 获取全院科室满意度得分列表
   * @param params getDeptScoreIn
   * @returns 
   */
  public getDeptScoreList(params: getDeptScoreIn = {}) {
    return this.post(`${this.apiPath}getDeptScoreList`, params)
  }
  /**
   * 获取全院科室满意度得分列表
   * @param params getDataIn
   * @returns 
   */
  public getPraiseSituationList(params: getDataIn) {
    return this.post(`${this.apiPath}getPraiseSituationList`, params)
  }
  /**
   * 获取各病房护理单元总体满意度列表
   * @param params getDataIn
   * @returns 
   */
  public getDeptPopulationList(params: getDataIn) {
    return this.post(`${this.apiPath}getDeptPopulationList`, params)
  }
  /**
   * 获取各指标总体满意度
   * @param params getDataIn
   * @returns 
   */
  public getVariousIndicatorsList(params: getDataIn) {
    return this.post(`${this.apiPath}getVariousIndicatorsList`, params)
  }
  /**
   * 获取各指标分数段分布
   * @param params getEachVariousIndicatorsIn
   * @returns 
   */
  public getEachVariousIndicatorsList(params: getEachVariousIndicatorsIn) {
    return this.post(`${this.apiPath}getEachVariousIndicatorsList`, params)
  }
  /**
   * 不满意指标柏拉图分析
   * @param params getDataIn
   * @returns 
   */
  public getDissatisfiedList(params: getDataIn) {
    return this.post(`${this.apiPath}getDissatisfiedList`, params)
  }
}

export const api = new Api()