import qs from 'qs'
import BaseApiService from 'src/services/api/BaseApiService'

const extraPath = (noteType: string, options = {
  uppercase: false
}) => {
  let _extraPath = `studyNote`
  if (noteType == '工作反思') _extraPath = `workReview`

  if (options.uppercase)
    return _extraPath.substring(0, 1).toLocaleUpperCase() + _extraPath.substring(1)

  return _extraPath
}

export default class StudyNoteManageService extends BaseApiService {
  /**357.厚街-学习笔记-获取待我审批的流程 */
  public queryToAuditPageList(query: {
    submitTimeBegin: string,
    submitTimeEnd: string,
    deptCode: string,
    keyWord: string,
    pageSize: number,
    pageIndex: number,
  }, noteType: string) {
    return this.post(`/studyAndTrain/${extraPath(noteType)}Manage/queryToAuditPageList`, query)
  }

  /**358.厚街-学习笔记-获取我已审批的流程 */
  public queryAuditedPageList(query: {
    submitTimeBegin: string,
    submitTimeEnd: string,
    deptCode: string,
    keyWord: string,
    pageSize: number,
    pageIndex: number,
  }, noteType: string) {
    return this.post(`/studyAndTrain/${extraPath(noteType)}Manage/queryAuditedPageList`, query)
  }

  /**362.厚街-学习笔记-获取多个学习笔记的详细信息（用于待审核页面中的批量审核） */
  public getToAuditStudyNoteDetailInfoList(taskIdList: any[], noteType: string) {
    return this.post(`/studyAndTrain/${extraPath(noteType)}Manage/getToAudit${extraPath(noteType, { uppercase: true })}DetailInfoList`, { taskIdList })
  }

  /**363.厚街-学习笔记-获取单个学习笔记的详细信息（用于已审核列表中查看详细信息） */
  public getAuditedStudyNoteDetailInfo(noteId: any, noteType: string) {
    let params = { workReviewId: noteId } as any
    if (noteType == '学习笔记') params = { noteId }
    return this.post(`/studyAndTrain/${extraPath(noteType)}Manage/getAudited${extraPath(noteType, { uppercase: true })}DetailInfo`, params)
  }

  /**360.厚街-学习笔记-批量审核学习笔记 */
  public batchAuditStudyNotes(params: {
    taskIdList: string[],
    auditResult: number,
    auditRemark?: string
  }, noteType: string) {
    return this.post(`/studyAndTrain/${extraPath(noteType)}Manage/batchAudit${extraPath(noteType, { uppercase: true })}s`, params)
  }

  /**359.厚街-学习笔记-审核学习笔记 */
  public auditStudyNote(params: {
    taskId: string,
    auditResult: number,
    auditRemark?: string
  }, noteType: string) {
    return this.post(`/studyAndTrain/${extraPath(noteType)}Manage/audit${extraPath(noteType, { uppercase: true })}`, params)
  }

  /** 364.厚街-学习笔记-获取学习笔记的流程任务历史(审核历史) */
  public getFlowTaskHisById(id: string | number, noteType: string) {
    let name = 'workReviewId'
    let lastPath = 'WorkReviewId'

    if (noteType == '学习笔记') {
      name = 'noteId'
      lastPath = 'NoteId'
    }

    let params = {} as any
    params[name] = id

    return this.post(`/studyAndTrain/${extraPath(noteType)}Manage/getFlowTaskHisBy${lastPath}`, qs.stringify(params))
  }
}

export const studyNoteManageService = new StudyNoteManageService()