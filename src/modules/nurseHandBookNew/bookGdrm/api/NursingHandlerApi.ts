import BaseApiService from 'src/services/api/BaseApiService'
import qs from 'qs';

export default class NursingHandlerApi extends BaseApiService {
  /**获取两级 科室 */
  public async getDeptList(){
    return this.get('/handBook/common/treeDept')
  }
  /**保存工作职责内容 */
  public async saveWorkInfo(query: any) {
    return this.post('/handBook/responsibilities/save', query);
  }
  /**工作职责列表 */
  public async getWorkInfoList(query: any) {
    return this.post('/handBook/responsibilities/list', query);
  }
  /**删除工作职责内容 */
  public async delWorkInfoItem(query: any) {
    return this.post('/handBook/responsibilities/delete', query);
  }
  /**创建工作总结/计划 */
  public async recordCreate(query: any) {
    return this.post('/handBook/record/create', query);
  }
  /**工作计划/总结列表 */
  public async recordList(query: any) {
    return this.post('/handBook/record/list', query);
  }
  /**保存/提交工作总结/计划 */
  public async recordSave(query: any) {
    return this.post('/handBook/record/save', query);
  }
  /**详情/工作总结/计划 */
  public async recordDetail(query: any) {
    return this.post('/handBook/record/detail', query);
  }
  /**节点审核 */
  public async recordHandNode(query: any) {
    return this.post('/handBook/record/handNode', query);
  }
   /**删除  工作总结/计划 */
   public async recordDelete(query: any) {
    // return this.post('/handBook/record/delete',query);
    return this.get('/handBook/record/delete?id='+query)
  }
  /**撤销提交  工作总结/计划 */
  public async recordCancel(query: any) {
    return this.post('/handBook/record/cancel',query);
  }
  /**word文件导出  工作总结/计划 */
  public async recordWordExport(query: any) {
    return this.post(
      `/handBook/record/wordExport`,
      query,
      {
        responseType: "blob"
      }
    );
    // return this.post('/handBook/record/wordExport',query);
  }
  /**word文件导入  工作总结/计划 */
  public async recordWordImport(filename:any) {
    let newFormData = new FormData()
    newFormData.set('file', filename)
    return this.post(`/handBook/record/wordImport`, newFormData);
  }
  /**上传附件  工作总结/计划 */
  public async nurseHandBookAttachment(filename:any) {
    let newFormData = new FormData()
    newFormData.set('file', filename)
    return this.post('/file/uploadAttachment/nurseHandBook',newFormData);
  }
}
export const nursingHandlerApi = new NursingHandlerApi();