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
    return this.post('/questionBankManage/getQuestionById', { qusetionId: id });
  }
}

export const questionBankManageService = new QuestionBankManageService();