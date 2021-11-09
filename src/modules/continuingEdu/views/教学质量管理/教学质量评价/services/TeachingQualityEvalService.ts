import BaseApiService from 'src/services/api/BaseApiService'

class TeachingQualityEvalService extends BaseApiService {
  /**386.pc端-厚街-教学质量评价-评教统计-导出某个评教计划的统计详细信息 */
  public exportEvalPlanStatDetailListByPage(query: {
    evalPlanId: number, // 评教计划id
    keyWord: string, // 搜索关键字
    pageSize?: number, // 每页大小
    pageIndex?: number, // 第几页
  }) {
    return this.post('/studyAndTrain/teachingQualityEval/exportEvalPlanStatDetailListByPage', query, { responseType: 'blob' })
  }

  /**385.pc端-厚街-教学质量评价-评教计划-获取某个人的评教调查表 */
  public getEvalFormOfSomeOne(query: {
    evalPlanId: number, // 评教计划id
    empNo: number, // 人员工号
  }) {
    return this.post('/studyAndTrain/teachingQualityEval/getEvalFormOfSomeOne/pc', query)
  }

  /**384.pc端-厚街-教学质量评价-评教统计-获取某个评教计划的统计详细信息 */
  public queryEvalPlanStatDetailListByPage(query: {
    evalPlanId: number, // 评教计划id
    submitTimeBegin: string, // 提交时间-开始
    submitTimeEnd: string, // 提交时间-结束
    keyWord: string, // 搜索关键字
    pageSize: number, // 每页大小
    pageIndex: number, // 第几页
  }) {
    return this.post('/studyAndTrain/teachingQualityEval/queryEvalPlanStatDetailListByPage', query)
  }

  /**383.pc端-厚街-教学质量评价-评教统计-获取评教计划统计列表（分页查询） */
  public queryEvalPlanStatListByPage(query: {
    evalType: '1' | '2' | '3', // 评分类型（评教计划类型） “1”实习生带教评价 “2”规培生带教评价 “3”临床护理教学质量督导
    beginTime: string, // 开始时间
    endTime: string, // 结束时间
    keyWord: string, // 查询关键字
    pageSize: number, // 每页大小
    pageIndex: number, // 第几页
  }) {
    return this.post('/studyAndTrain/teachingQualityEval/queryEvalPlanStatListByPage', query)
  }
  /**376.护理app-厚街-教学质量评价-评教计划-保存评教计划 */
  public saveOrUpdateEvalPlan(query: {
    evalType: '1' | '2' | '3', // 评分类型（评教计划类型） “1”实习生带教评价 “2”规培生带教评价 “3”临床护理教学质量督导
    title: string, // 标题
    beginTime: string, // 开始时间
    endTime: string, // 结束时间
    evalPersonList: Array<{
      empNo: string | Number,
      empName: string
    }>

  }) {
    return this.post('/studyAndTrain/teachingQualityEval/saveOrUpdateEvalPlan', query)
  }
}

export const teachingQualityEvalService = new TeachingQualityEvalService()