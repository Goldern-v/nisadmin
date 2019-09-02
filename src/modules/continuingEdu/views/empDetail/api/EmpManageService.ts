import BaseApiService from 'src/services/api/BaseApiService'
import qs from 'qs';

export default class EmpManageService extends BaseApiService {
  /** 继续教育人员列表 */
  public async getEmpList(query: any) {
    return this.post('/educon/eduMasterData/getByFormCodePC', qs.stringify(query));
  }
  /**人员基本信息 */
  public async getEmpDetail(query: any) {
    return this.post('/educon/eduMasterData/getBaseInformation', qs.stringify(query));
  }
  /**学分记录 */
  public async getCreditRecord(query: any) {
    return this.post('/educon/eduMasterData/getCreditRecord', query);
  }
  /**积分记录*/
  public async getRewardPointsRecord(query: any) {
    return this.post('/educon/eduMasterData/getRewardPointsRecord', query);
  }
  /**培训记录*/
  public async getTrainData(query: any) {
    return this.post('/educon/eduMasterData/getTrainData', query);
  }
  /**练习记录*/
  public async getExercisesData(query: any) {
    return this.post('/educon/eduMasterData/getExercisesData', query);
  }
  /**考试记录*/
  public async getExamData(query: any) {
    return this.post('/educon/eduMasterData/getExamData', query);
  }
  /**视频学习*/
  public async getVideoLearnData(query: any) {
    return this.post('/educon/eduMasterData/getVideoLearnData', query);
  }
  /**获取所有片区 */
  public async findAllAreas() {
    return this.post('/educon/eduMasterData/findAllAreas');
  }
}

export const empManageService = new EmpManageService();