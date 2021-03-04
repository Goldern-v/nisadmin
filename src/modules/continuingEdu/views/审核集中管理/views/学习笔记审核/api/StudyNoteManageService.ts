import BaseApiService from 'src/services/api/BaseApiService'

export default class StudyNoteManageService extends BaseApiService {
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
}

export const studyNoteManageService = new StudyNoteManageService()