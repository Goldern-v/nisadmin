import BaseApiService from 'src/services/api/BaseApiService';

export interface getPageI {
  deptCode: string
  beginTime: string
  endTime: string
}
export interface saveI extends Record<string, any> {
  "id"?: number
  "deptCode": string
  "deptName": string
  "keyPoint": string | null
  "problem": string | null
  "reason": string | null
  "measure": string | null
  "effects": string | null
}
export interface getPageO extends saveI {
  "createTime"?: string
  "wardCode"?: string
  "wardName"?: string
  "creatorNo"?: string | null
  "creatorName"?: string | null
  "updateNo"?: string | null
  "updateName"?: string | null
  "updateTime"?: string | null
}
export default class QualityControlKeyApi extends BaseApiService {
  /**
   * 新增或修改
   * @param params
   * {
   * "id":"3", -- 仅在更新时传id
   * "wardCode":"042302", -- 暂时传病区code，后期可能会改为片区code，
   * "wardName":"骨一科护理单元",-- 暂时传病区名称，后期可能会改为片区名称，
   * "keyPoint":"你好哇", -- 质控重点
   * "problem":"555", -- 存在问题
   * "reason":"555", -- 原因分析
   * "measure":"555", -- 改进措施
   * "effects":"555" -- 成效分析
   * }
   * @returns 
   */
  public async saveOrUpdate(params: any) {
    
    return this.post(`/qcKeyPoint/saveOrUpdate`, params)
  }
  /**
   * 查询片区质控重点列表
   * @param params
   * {
   * "wardCode":"051202", -- 暂时用病区code，后期可能会改
   * "beginTime":"2022-01-04 16:14:00", -- 开始时间
   * "endTime":"2022-01-04 18:14:00" -- 结束时间
   * }
   * @returns
   * {
      "id": 4,
      "createTime": "2022-01-04 17:14",
      "wardCode": "051202",
      "wardName": "妇科护理单元",
      "deptCode": "",
      "deptName": "",
      "keyPoint": "hello哇",
      "problem": "111",
      "reason": "111",
      "measure": "111",
      "effects": "111",
      "creatorNo": "admin",
      "creatorName": "管理员",
      "updateNo": "",
      "updateName": "",
      "updateTime": null
    },
   */
  public async getPage(params: getPageI) {
    
    return this.post(`/qcKeyPoint/getPage`, params)
  }
  /**
   * 根据id查看详情
   * @param id 
   * @returns 
   */
  public async getDetail(id: string) {
    
    return this.get(`/qcKeyPoint/get/${id}`)
  }
  /**
   * 根据id删除
   * @param id 
   * @returns 
   */
  public async deleteItem(id: number) {
    
    return this.get(`/qcKeyPoint/delete/${id}`)
  }
  /**
   * 获取当前的片区code
   * @returns code
   */
  public getCurBigDept() {
    return this.get('/qcKeyPoint/getUserBigDept')
  }
}
export const qualityControlKeyApi = new QualityControlKeyApi()