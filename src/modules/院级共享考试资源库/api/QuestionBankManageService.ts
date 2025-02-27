import BaseApiService from 'src/services/api/BaseApiService'
import qs from 'qs';
import { fileDownload } from 'src/utils/file/file';

export default class QuestionBankManageService extends BaseApiService {
  /**院级共享考试资源库--查询列表 */
  public getQuestionBankList(query: any) {
    return this.post('/studyAndTrain/questionBankManage/getContentBySearch', query);
  }

  /**题目--给问题批量加标签&给标签批量加问题 */
  public addQuestionLabel(params: any) {
    return this.post('/studyAndTrain/questionBankManage/questionLabel/addQuestionLabel', params);
  }

  /**题目--删除题目的标签 */
  public deleteLabelByQuestionId(params: any) {
    return this.post('/studyAndTrain/questionBankManage/questionChange/deleteLabelByQuestionId', params);
  }

  /**院级共享考试资源库--第一次获取菜单栏包含的内容数量 */
  public getCountMenu(query?: any) {
    return this.get('/studyAndTrain/questionBankManage/getCountMenu', {
      params: query || { status: '', id: '' }
    });
  }

  /**题目--删除题目 */
  public deleteQuestion(params: any) {
    return this.post('/studyAndTrain/questionBankManage/questionChange/deleteQuestion', params);
  }

  /**根据题目id获取题目内容 */
  public getQuestionById(id: string) {
    return this.post('/studyAndTrain/questionBankManage/getQuestionById', { questionId: id });
  }

  /**选择题--新建或修改选择题 */
  public saveOrUpdateChoiceQuestion(params: any) {
    return this.post('/studyAndTrain/questionBankManage/questionChange/saveOrUpdateChoiceQuestion', params);
  }

  /**填空题--新建或修改填空题 */
  public saveOrUpdateFillingQuestion(params: any) {
    return this.post('/studyAndTrain/questionBankManage/questionChange/saveOrUpdateFillingQuestion', params);
  }

  /**问答题--新建或修改问答题 */
  public saveOrUpdateShortQuestion(params: any) {
    return this.post('/studyAndTrain/questionBankManage/questionChange/saveOrUpdateShortQuestion', params);
  }

  /**标签查看--修改标签 */
  public changeLabelName(params: any) {
    return this.post('/studyAndTrain/questionBankManage/questionLabel/changeLabelName', params);
  }

  /**标签查看--删除标签,是否删除题目 */
  public deleteLabelByLabelIdList(params: any) {
    return this.post('/studyAndTrain/questionBankManage/questionLabel/deleteLabelByLabelIdList', params);
  }

  /**标签查看--隐藏或者显示标签 */
  public hideOrShowLabelByLabelIdList(params: any) {
    return this.post('/studyAndTrain/questionBankManage/questionLabel/hideOrShowLabelByLabelIdList', params);
  }

  /**标签查看--新建标签 */
  public createQuestionLabel(params: any) {
    return this.post('/studyAndTrain/questionBankManage/questionLabel/createQuestionLabel', params);
  }

  /**标签查看--根据标签id查看题目 */
  public getQuestionsByLabelId(query: any) {
    return this.post('/studyAndTrain/questionBankManage/questionLabel/getQuestionsByLabelId', query);
  }

  /**导入记录--导入记录修改 */
  public updateUploadName(query: any) {
    return this.post('/studyAndTrain/questionBankManage/updateUploadName', query);
  }

  /**导入记录--删除导入记录 */
  public deleteUploadRecord(query: any) {
    return this.post('/studyAndTrain/questionBankManage/deleteUploadRecord', query);
  }

  /**导入记录--隐藏或者显示导入记录 */
  public hideOrShowUpload(query: any) {
    return this.post('/studyAndTrain/questionBankManage/hideOrShowUpload', query);
  }

  /**导入记录--根据导入记录id查看题目 */
  public getQuestionsByBankIdAndQuestionType(query: any) {
    return this.post('/studyAndTrain/questionBankManage/getQuestionsByBankIdAndQuestionType', query);
  }

  /**导入题库 */
  public uploadQuestionBank(formData: any) {
    return this.post('/studyAndTrain/questionBankManage/uploadQuestionBank', formData);
  }

  /**导入记录-更改导入批次的标签 */
  public updateLabelsForQuestionBank(params: any) {
    return this.post('/studyAndTrain/questionBankManage/questionLabel/updateLabelsForQuestionBank', params);
  }

  /**导入题库模板下载路径 */
  public getUploadQuestionBankTemplate() {
    return this.get('/studyAndTrain/questionBankManage/getTemplate', { responseType: 'blob' });
  }

  /**回收站--题目复原 */
  public recoverRecord(params: any) {
    return this.post('/studyAndTrain/questionBankManage/recycleBin/recoverRecord', params);
  }

  /**回收站--题目永久删除 */
  public entireDeleteQuestion(params: any) {
    return this.post('/studyAndTrain/questionBankManage/recycleBin/entireDeleteQuestion', params);
  }

  /**院级共享考试资源库--错题反馈 */
  public getWrongQustionListBySearch(query: any) {
    return this.post('/studyAndTrain/questionBankManage/getContentBySearch', query);
  }

  /**错题反馈--标记已读--2020-04-29废弃 */
  // public handleWrongQuestionMark(query: any) {
  //   return this.post('/studyAndTrain/questionBankManage/wrongQuestionReply/handleQuestion', query);
  // }
  /**院级共享考试资源库--错题反馈--待我处理 */
  // public getWrongQustionHandleList(query: any) {
  //   return this.post('/studyAndTrain/questionBankManage/wrongQuestionReply/getPendingPage', query)
  // }
  /**院级共享考试资源库--错题反馈--我已处理 */
  // public getWrongQustionSolvedList(query: any) {
  //   return this.post('/studyAndTrain/questionBankManage/wrongQuestionReply/getSolvedPage', query)
  // }
  /**院级共享考试资源库--错题反馈--标记解决 */
  public handleWrongQuestionMark(params: {
    flowId: string,
    handleContent?: string,
    [p: string]: any
  }) {
    return this.post('/studyAndTrain/questionBankManage/wrongQuestionReply/handleErrorFeedback', {
      ...params,
      nodeCode: "pending_audit"
    });
  }

  /**厚街 (新建接口)20201202-按照查询条件导出题目 */
  public exportQuestionsBySearchParams(query: any) {
    return this.post(
      '/studyAndTrain/questionBankManage/exportQuestionsBySearchParams',
      query,
      { responseType: 'blob' }
    )
      .then(res => fileDownload(res));
  }

  /**厚街 (新建接口)20201202-根据题目id导出题目 */
  public exportQuestionsByIds(ids: any[]) {
    return this.post(
      '/studyAndTrain/questionBankManage/exportQuestionsByIds',
      { ids },
      { responseType: 'blob' }
    )
      .then(res => fileDownload(res));
  }

  /**厚街 题库收藏 */
  public handleFavorites(ids: any[]) {
    return this.post('studyAndTrain/questionBankManage/collectQuestion', { questionIdList: ids },)
  }
}

export const questionBankManageService = new QuestionBankManageService();