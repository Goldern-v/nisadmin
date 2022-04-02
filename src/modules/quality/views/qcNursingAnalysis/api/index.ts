import BaseApiService from 'src/services/api/BaseApiService';

export interface getDataIn {
  startDate?: string,
  endDate?: string,
  // 2022-03-22
}

/**
 * 类型列表
 * 1.危重患者护理检查分析报告(危重患者质量考核标准)
 * 2.护理单元管理检查分析报告((护理单元管理检查表)
 * 3.护士素质管理检查分析报告(护士素质检查表)
 * 4.分级护理检查分析报告(分级护理质量考核标准)
 * 5.病房护士长质量检查分析报告(病房护士长质量考核)
 * 6.重点环节检查分析报告(重点环节护理质量评价标准（非手术科室）\重点环节护理质量评价标准（手术科室）\重点环节护理质量评价标准（手术室）)
*/
export type getDeptAverageScoreEnums = 1 | 2 | 3 | 4 | 5 | 6
export interface getDeptAverageScoreIn extends getDataIn {
  typeList: Array<getDeptAverageScoreEnums>
}
// export interface getEvaluationRateIn extends getDeptAverageScoreIn {
//   typeList: Array<getDeptAverageScoreEnums | 7 | 8 | 9 | 10>
// }
interface getEvaluationRateIn extends getDataIn{
    typeList: Array<getDeptAverageScoreEnums | 7 | 8 | 9 | 10>
}
class Api extends BaseApiService {
  private readonly apiPath: string = '/qcNursingAnalysis/'
  
  /**
   * 获取全院护理质量检查
   * @param params getDataIn
   * @returns 
   */
  public getAllQualityScore(params: getDataIn) {
    return this.post(`${this.apiPath}getAllQualityScore`, params)
  }
  /**
   * 获取满分科室分布（表格）分科室分布
   * @param params getDataIn
   * @returns 
   */
  public getFullScoreDeptList(params: getDataIn) {
    return this.post(`${this.apiPath}getFullScoreDeptList`, params)
  }
  /**
   * 获取科室平均分
   * @param params getDeptAverageScoreIn
   * @returns 
   */
  public getDeptAverageScoreList(params: getDeptAverageScoreIn) {
    return this.post(`${this.apiPath}getDeptAverageScoreList`, params)
  }
  /**
   * 获取片区科室平均分
   * @param params getDeptAverageScoreIn
   * @returns 
   */
  public getAreaDeptAverageScoreList(params: getDeptAverageScoreIn) {
    return this.post(`${this.apiPath}getAreaDeptAverageScoreList`, params)
  }
  /**
   * 获取具体扣分项目列表
   * @param params getDeptAverageScoreIn
   * @returns 
   */
  public getSpecificDeductionList(params: getDeptAverageScoreIn) {
    return this.post(`${this.apiPath}getSpecificDeductionList`, params)
  }
  /**
   * 获取评估合格率
   * @param params getEvaluationRateIn
   * @returns 
   */
  public getEvaluationRate(params: getEvaluationRateIn) {
    return this.post(`${this.apiPath}getEvaluationRate`, params)
  }
  
}

export const api = new Api()