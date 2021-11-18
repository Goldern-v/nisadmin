import BaseApiService from 'src/services/api/BaseApiService'

class TrainingChartAnalysisApi extends BaseApiService {
  /**
   * 获取本人可查看的质控科室
   * @returns 
   */
  public getDeptList() {
    return this.get(`/qcItem/dict/qcWardCodeList`)
  }
}

export const trainingChartAnalysisApi = new TrainingChartAnalysisApi()
