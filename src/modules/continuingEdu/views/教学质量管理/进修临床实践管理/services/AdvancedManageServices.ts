import BaseApiService from 'src/services/api/BaseApiService'
import { fileDownload } from 'src/utils/file/file'

class AdvancedManageServices extends BaseApiService {
  /**
   * 护理PC-厚街-进修临床实践管理-查询进修临床实践列表 -（分页查询）
   * @param query.deptCode 科室
   * @param query.highestEducation 最高学历
   * @param query.empNo 学员名称
   * @returns 
   */
  public getPageAdvancedList(query: {
    deptCode: string,
    highestEducation: string,
    empName: string,
    pageIndex: number,
    pageSize: number
  }) {
    return this.post('/studyAndTrain/advancedManage/getPageAdvancedList', query)
  }

  /**
   * 护理PC-厚街-进修临床实践管理-保存或更新进修临床实践
   * @param params.id 进修临床实践id
   * @param params.empNo 工号
   * @param params.startDate 开始时间（yyyy-MM-dd HH:mm）
   * @param params.endDate 结束时间（yyyy-MM-dd HH:mm）
   * @param params.juniorCollege 进修专科
   * @param params.organizer 主办单位
   */
  public saveOrUpdateAdvanced(params: {
    id?: string | number,
    empNo: string,
    startDate: string,
    endDate: string,
    juniorCollege: string,
    organizer: string,
  }) {
    return this.post('/studyAndTrain/advancedManage/saveOrUpdateAdvanced', params)
  }

  /**
   * 护理PC-厚街-进修临床实践管理-保存或更新进修人员工作计划表
   * @param params.id 条目id
   * @param params.advancedId 进修临床实践id
   * @param params.empNo 工号
   * @param params.projectName 计划名称
   * @param params.startDate 开始时间（yyyy-MM）
   * @param params.endDate 结束时间（yyyy-MM）
   * @param params.finishField 完成场地
   * @param params.audiencer 受众对象
   * @param params.reason 原因或理由
   * @param params.advancedId 进修临床实践id
   */
  public saveOrUpdateUserWorkPlan(params: {
    id: string | number,
    advancedId: string | number,
    empNo: string,
    projectName: string,
    startDate: string,
    endDate: string,
    finishField: string,
    audiencer: string,
    reason: string,
    concreteMeasure: string,
    completion: string,
    impactAssessment: string,
  }) {
    return this.post('/studyAndTrain/advancedManage/saveOrUpdateUserWorkPlan', params)
  }

  /**
   * 护理PC-厚街-进修临床实践管理-查询进修人员工作计划表列表
   * @param advancedId 进修临床实践表Id
   * @returns 
   */
  public getPageUserWorkPlanList(advancedId: string) {
    return this.post('/studyAndTrain/advancedManage/getPageUserWorkPlanList', { advancedId })
  }

  /**
   * 护理PC-厚街-进修临床实践管理-导出进修人员工作计划表列表
   */
  public exportPageUserWorkPlanList(advancedId: string) {
    return this.post('/studyAndTrain/advancedManage/exportPageUserWorkPlanList', { advancedId }, { responseType: 'blob' })
      .then(res => fileDownload(res))
  }

  /**
   * 护理PC-厚街-进修临床实践管理-删除进修人员工作计划表
   * @param id 进修人员工作计划表Id
   */
  public deleteUserWorkPlanById(id: string | number) {
    return this.post('/studyAndTrain/advancedManage/deleteUserWorkPlanById', { id })
  }

  /**
   * 护理PC-厚街-进修临床实践管理-获取进修人员工作计划表ById
   * @param id 进修人员工作计划表Id
   */
  public getUserWorkPlanById(id: string | number) {
    return this.post('/studyAndTrain/advancedManage/getUserWorkPlanById', { id })
  }
}

export const advancedManageServices = new AdvancedManageServices()