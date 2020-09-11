import BaseApiService from 'src/services/api/BaseApiService'
import qs from 'qs'

export default class EmpManageService extends BaseApiService {
  /** 继续教育人员列表 */
  public async getEmpList(query: any) {
    return this.post('/studyAndTrain/personelManage/queryMainListByPage', query)
  }
  /**人员基本信息 */
  public async getEmpDetail(query: any) {
    return this.post('/studyAndTrain/personelManage/getBasicInfo', qs.stringify(query))
  }
  /**学分记录 */
  public async getCreditRecord(query: any) {
    return this.post('/educon/eduMasterData/getCreditRecord', query)
  }
  /**积分记录*/
  public async getRewardPointsRecord(query: any) {
    return this.post('/educon/eduMasterData/getRewardPointsRecord', query)
  }
  /**培训记录*/
  public async getTrainData(query: any) {
    return this.post('/educon/eduMasterData/getTrainData', query)
  }
  /**练习记录*/
  public async getExercisesData(query: any) {
    return this.post('/educon/eduMasterData/getExercisesData', query)
  }
  /**考试记录*/
  public async getExamData(query: any) {
    return this.post('/educon/eduMasterData/getExamData', query)
  }
  /**视频学习*/
  public async getVideoLearnData(query: any) {
    return this.post('/educon/eduMasterData/getVideoLearnData', query)
  }
  /**获取所有片区 */
  public async findAllAreas() {
    return this.post('/educon/eduMasterData/findAllAreas')
  }

  /** 获取一级菜单*/
  public async getMenuTree() {
    return this.get(`/studyAndTrain/menuManage/getMenuTree`)
  }

  /** 获取一级菜单*/
  public async getAllCreditTypes() {
    return this.get(`/studyAndTrain/teachingPlanManage/getAllCreditTypes`)
  }

  /** 个人信息-获取学分记录*/
  public async queryCreditRecordPageList(query: any) {
    return this.post(`/studyAndTrain/personelManage/queryCreditRecordPageList`, query)
  }

  /** 个人信息-获取学时记录*/
  public async queryClassHourRecordPageList(query: any) {
    return this.post(`/studyAndTrain/personelManage/queryClassHourRecordPageList`, query)
  }

  /** 个人信息-获取学习记录*/
  public async queryStudyRecordPageList(query: any) {
    return this.post(`/studyAndTrain/personelManage/queryStudyRecordPageList`, query)
  }

  /** 个人信息-获取培训记录*/
  public async queryTrainRecordPageList(query: any) {
    return this.post(`/studyAndTrain/personelManage/queryTrainRecordPageList`, query)
  }

  /** 个人信息-获取考试记录*/
  public async queryExamRecordPageList(query: any) {
    return this.post(`/studyAndTrain/personelManage/queryExamRecordPageList`, query)
  }

  /** 个人信息-获取练习记录*/
  public async queryExerciseRecordPageList(query: any) {
    return this.post(`/studyAndTrain/personelManage/queryExerciseRecordPageList`, query)
  }

  /** 个人信息-获取实操记录*/
  public async queryPractiseRecordPageList(query: any) {
    return this.post(`/studyAndTrain/personelManage/queryPractiseRecordPageList`, query)
  }

  /** 个人信息-获取演练记录*/
  public async queryWtRecordPageList(query: any) {
    return this.post(`/studyAndTrain/personelManage/queryWtRecordPageList`, query)
  }

  /** 个人信息-获取练习记录*/
  public async querySocialPractiseRecordPageListt(query: any) {
    return this.post(`/studyAndTrain/personelManage/querySocialPractiseRecordPageList`, query)
  }

  /**人员管理- 获取讲课记录-分页查询 */
  public async queryTeachingRecordPageList(query: any) {
    return this.post(`/studyAndTrain/personelManage/queryTeachingRecordPageList`, query)
  }

  /** 个人信息-学分合计 */
  public async countCreditByParams(query: any) {
    return this.post(`/studyAndTrain/personelManage/countCreditByParams`, query)
  }

  /** 个人信息-学时合计 */
  public async countClassHoursByParams(query: any) {
    return this.post(`/studyAndTrain/personelManage/countClassHoursByParams`, query)
  }

  /** 个人信息-学时合计 */
  public async addCredit(query: any) {
    return this.post(`/studyAndTrain/personelManage/addCredit`, query)
  }

  /**个人信息-导出年度记录 */
  public async exporCreditdetailInfoByYear(query: any) {
    return this.post('/studyAndTrain/personelManage/exporCreditdetailInfoByYear', query, { responseType: 'blob' })
  }

  /**个人信息-导出月度记录 */
  public async exporCreditAndClassHoursCollect(query: any) {
    return this.post('/studyAndTrain/personelManage/exporCreditAndClassHoursCollect', query, { responseType: 'blob' })
  }

  /**职务列表 */
  public async getJob() {
    return this.post('/dept/dictInfo', qs.stringify({ code: 'user_new_job' }))
  }
}

export const empManageService = new EmpManageService()