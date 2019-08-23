import BaseApiService from 'src/services/api/BaseApiService'
import qs from 'qs';

export default class QuestionBankManageService extends BaseApiService {
  /**题库管理--查询列表 */
  public getQuestionBankList(query: any) {
    return this.post('/questionBankManage/getContentBySearch', query);
  }
  /**题目--给问题批量加标签&给标签批量加问题 */
  public addQuestionLabel(params: any) {
    return this.post('/questionLabel/addQuestionLabel', params);
  }
  /**题目--删除题目的标签 */
  public deleteLabelByQuestionId(params: any) {
    return this.post('/questionChange/deleteLabelByQuestionId', params);
  }
  /**题库管理--第一次获取菜单栏包含的内容数量 */
  public getCountMenu() {
    return this.get('/questionBankManage/getCountMenu');
  }
  /**题目--删除题目 */
  public deleteQuestion(params: any) {
    return this.post('/questionChange/deleteQuestion', params);
  }
  /**根据题目id获取题目内容 */
  public getQuestionById(id: string) {
    return this.post('/questionBankManage/getQuestionById', { questionId: id });
  }
  /**选择题--新建或修改选择题 */
  public saveOrUpdateChoiceQuestion(params: any) {
    return this.post('/questionChange/saveOrUpdateChoiceQuestion', params);
  }
  /**填空题--新建或修改填空题 */
  public saveOrUpdateFillingQuestion(params: any) {
    return this.post('/questionChange/saveOrUpdateFillingQuestion', params);
  }
  /**问答题--新建或修改问答题 */
  public saveOrUpdateShortQuestion(params: any) {
    return this.post('/questionChange/saveOrUpdateShortQuestion', params);
  }
  /**标签查看--修改标签 */
  public changeLabelName(params: any) {
    return this.post('/questionLabel/changeLabelName', params);
  }
  /**标签查看--删除标签,是否删除题目 */
  public deleteLabelByLabelIdList(params: any) {
    return this.post('/questionLabel/deleteLabelByLabelIdList', params);
  }
  /**标签查看--隐藏或者显示标签 */
  public hideOrShowLabelByLabelIdList(params: any) {
    return this.post('/questionLabel/hideOrShowLabelByLabelIdList', params);
  }
  /**标签查看--根据标签id查看题目 */
  public getQuestionsByLabelId(query: any) {
    return this.post('/questionLabel/getQuestionsByLabelId', query);
  }
  /**导入记录--导入记录修改 */
  public updateUploadName(query: any) {
    return this.post('/questionBankManage/updateUploadName', query);
  }
  /**导入记录--删除导入记录 */
  public deleteUploadRecord(query: any) {
    return this.post('/questionBankManage/deleteUploadRecord', query);
  }
  /**导入记录--隐藏或者显示导入记录 */
  public hideOrShowUpload(query: any) {
    return this.post('/questionBankManage/hideOrShowUpload', query);
  }
  /**导入记录--根据导入记录id查看题目 */
  public getQuestionsByBankIdAndQuestionType(query: any) {
    return this.post('/questionBankManage/getQuestionsByBankIdAndQuestionType', query);
  }
  /**导入题库 */
  public uploadQuestionBank(formData: any) {
    return this.post('/questionBankManage/uploadQuestionBank', formData);
  }
  /**导入题库模板下载路径 */
  public getUploadQuestionBankTemplate() {
    return this.get('/questionBankManage/getTemplate');
  }
  /**回收站--题目复原 */
  public recoverRecord(params: any) {
    return this.post('/recycleManage/recoverRecord', params);
  }
  /**回收站--题目永久删除 */
  public entireDeleteQuestion(params: any) {
    return this.post('/recycleManage/entireDeleteQuestion', params);
  }
  /**题库管理--错题反馈 */
  public getWrongQustionListBySearch(query: any) {
    return this.post('/questionBankManage/getContentBySearch', query);
  }
  /**错题反馈--标记已读 */
  public handleWrongQuestionMark(query: any) {
    return this.post('/questionBankManage/handleQuestion', query);
  }
}

export const questionBankManageService = new QuestionBankManageService();