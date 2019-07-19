import BaseApiService from 'src/services/api/BaseApiService'
import { appStore, authStore } from 'src/stores'
export interface NurseQuery {
  deptCode?: string /** 部门编码 */
  empNo?: string /** 员工工号 */
  education: string /** 学历 */
  title: string /** 职称 */
  currentLevel: string /** 能级、层级 */
  post: string /**  当前页数  */
  pageIndex: number /**  职务  */
  pageSize: number /**   每页页数 */
  empName: string /**   每页页数 */
}

export default class QualityControlRecordApi extends BaseApiService {
  // 获取护士列表
  public async getByFormCodePC(obj: any) {
    Object.keys(obj).forEach((key: any) => {
      if (obj[key] === '全部') {
        obj[key] = ''
      }
    })
    return this.post(`/auditeNurseList/getByFormCodePC`, this.stringify(obj))
  }
  // 质控表单字典
  public async dictTemplate() {
    return this.get(`/qcItem/dict/template`)
  }
  // 字典：质控表流程状态
  public async dictChainNode() {
    return this.get(`/qcItem/dict/chainNode`)
  }
  // 质控记录单列表
  public async instanceGetPageByCondition() {
    let postData = {
      pageIndex: 1,
      pageSize: 10,
      wardCode: '',
      qcCode: '',
      nodeCode: '',
      beginDate: '',
      endDate: ''
    }
    return this.post(`/qcItem/instance/getPageByCondition`, postData)
  }
  //质控记录单列表实例详情
  public async qcItemInstanceGet() {
    let id = 63
    return this.get(`/qcItem/instance/get/${id}`)
  }
}

export const qualityControlRecordApi = new QualityControlRecordApi()
