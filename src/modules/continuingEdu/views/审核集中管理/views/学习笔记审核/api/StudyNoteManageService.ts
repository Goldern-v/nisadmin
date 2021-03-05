import BaseApiService from 'src/services/api/BaseApiService'

export default class StudyNoteManageService extends BaseApiService {
  /**357.厚街-学习笔记-获取待我审批的流程 */
  public queryToAuditPageList(query: {
    submitTimeBegin: string,
    submitTimeEnd: string,
    deptCode: string,
    keyWord: string,
    pageSize: number,
    pageIndex: number,
  }) {
    return this.post(`/studyAndTrain/studyNoteManage/queryToAuditPageList`, query)
  }

  /**358.厚街-学习笔记-获取我已审批的流程 */
  public queryAuditedPageList(query: {
    submitTimeBegin: string,
    submitTimeEnd: string,
    deptCode: string,
    keyWord: string,
    pageSize: number,
    pageIndex: number,
  }) {
    return this.post(`/studyAndTrain/studyNoteManage/queryAuditedPageList`, query)
  }

  /**362.厚街-学习笔记-获取多个学习笔记的详细信息（用于待审核页面中的批量审核） */
  public getToAuditStudyNoteDetailInfoList(taskIdList: any[]) {
    return this.post('/studyAndTrain/studyNoteManage/getToAuditStudyNoteDetailInfoList', { taskIdList })
  }

  /**363.厚街-学习笔记-获取单个学习笔记的详细信息（用于已审核列表中查看详细信息） */
  public getAuditedStudyNoteDetailInfo(noteId: any) {
    return this.post('/studyAndTrain/studyNoteManage/getAuditedStudyNoteDetailInfo', { noteId })
  }

  /**360.厚街-学习笔记-批量审核学习笔记 */
  public batchAuditStudyNotes(params: {
    taskIdList: string[],
    auditResult: number,
    auditRemark?: string
  }) {
    return this.post('/studyAndTrain/studyNoteManage/batchAuditStudyNotes', params)
  }

  /**359.厚街-学习笔记-审核学习笔记 */
  public auditStudyNote(params: {
    taskId: string,
    auditResult: number,
    auditRemark?: string
  }) {
    return this.post('/studyAndTrain/studyNoteManage/auditStudyNote', params)
  }
}

export const studyNoteManageService = new StudyNoteManageService()