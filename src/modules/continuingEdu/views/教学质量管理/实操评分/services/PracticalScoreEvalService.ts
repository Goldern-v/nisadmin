import BaseApiService from 'src/services/api/BaseApiService'

class PracticalScoreEvalService extends BaseApiService {
  /** 护理PC-厚街-实操管理-导出通过ID获取实操评分和参与人列表EXCEL */
  public exportMemberListExcel(id: string | number) {
    return this.post('/studyAndTrain/practicalScore/exportMemberListExcel', { id }, { responseType: 'blob' })
  }

  /** 385.pc端-厚街-教学质量评价-评教计划-获取某个人的评教调查表 */
  public getEvalFormOfSomeOne(query: {
    evalPlanId: number, // 评教计划id
    empNo: number, // 人员工号
  }) {
    return this.post('/studyAndTrain/teachingQualityEval/getEvalFormOfSomeOne/pc', query)
  }

  /** 护理PC-厚街-实操管理-通过ID获取实操评分和参与人列表 */
  public getPracticalById(id: string | number) {
    return this.post('/studyAndTrain/practicalScore/getPracticalById', { id })
  }

  /** 护理PC-厚街-实操管理-查询实操评分列表 */
  public getPracticalScorePageList(query: {
    practicalType: '1' | '2' | '3', // 评分类型(1.技术类型 2.临床能力 3.工作情况)
    startDate: string, // 开始时间(yyyy-MM-dd HH:mm)
    endDate: string, // 结束时间(yyyy-MM-dd HH:mm)
    title: string, // 查询关键字
    pageSize: number, // 每页大小
    pageIndex: number, // 第几页
  }) {
    return this.post('/studyAndTrain/practicalScore/getPageList', query)
  }

  /** 护理PC-厚街-实操管理-发布成绩 */
  public setPracticalState(id: string | number) {
    return this.post('/studyAndTrain/practicalScore/setPracticalState', { id })
  }

  /** 护理PC-厚街-实操管理-获取该学员的答案和总分 */
  public getPracticalUserAnswer(params: {
    empNo: string,
    id: string | Number,
  }) {
    return this.post('/studyAndTrain/practicalScore/getPracticalUserAnswer', params)
  }

  /** 护理PC-厚街-实操管理-获取全部实评分表列表 */
  public getAllPracticalTableList() {
    return this.get('/studyAndTrain/practicalScore/getAllPracticalTableList')
  }

  /** 护理PC-厚街-实操管理-通过ID获取实评分表详细 */
  public getPracticalTableByIdpracticalTableId(practicalTableId: string | number) {
    return this.post('/studyAndTrain/practicalScore/getPracticalTableById', { practicalTableId: Number(practicalTableId) })
  }

  /**
   * 护理PC-厚街-实操管理-获取新增实评分表的内容
   * @param practicalType 评分类型(1.技术类型 2.临床能力 3.工作情况) 只有传1才有值
   * */
  public getAddPracticalTableContent(practicalType: number) {
    return this.post('/studyAndTrain/practicalScore/getAddPracticalTableContent', { practicalType })
  }

  /**
   * 护理PC-厚街-实操管理-保存或更新实评分表
   */
  public saveOrUpdatePracticalTable(params: any) {
    return this.post('/studyAndTrain/practicalScore/saveOrUpdatePracticalTable', params)
  }

  /** 
   * 护理PC-厚街-实操管理-保存或更新实操评分
   * @param params.id 实操评分主键
   * @param params.title 标题
   * @param params.startDate 开始时间（yyyy-MM-dd HH:mm）
   * @param params.endDate 结束时间（yyyy-MM-dd HH:mm）
   * @param params.practicalType 评分类型(1.技术类型 2.临床能力 3.工作情况)
   * @param params.practicalTableId 评分表ID
   * @param params.practicalList 评分人工号列表 string [] 
   * @param params.participantsList 参与人工号列表 string []
   * @param params.noticeContent 通知的信息内容
   * */
  public saveOrUpdatePracticalScore(params: any) {
    return this.post('/studyAndTrain/practicalScore/saveOrUpdatePracticalScore', params)
  }
}

export const practicalScoreEvalService = new PracticalScoreEvalService()