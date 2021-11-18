import BaseApiService from 'src/services/api/BaseApiService';

export default class TrainingChartAnalysisApi extends BaseApiService {
  /**获取全部科室 */
  getDeptList() {
    return this.get(`/user/nursingUnit/all`)
  }
  /** 本人有权限的科室列表 */
  getRoleDeptList() {
    return this.get(`/qcItem/dict/qcWardCodeList`);
  }
}
export const trainingChartAnalysisApi = new TrainingChartAnalysisApi()