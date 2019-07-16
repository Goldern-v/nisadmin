/**
 * @date: 2019-03-28
 * @author: laiweijun
 * @name: 护理管理系统-共用接口
 * @api: /schShiftUser/
 * @description:
 * 接口包含以下内容:  按 增删改查 顺序如下:
 * 0.获取护理单元列表
 */

import BaseApiService from './BaseApiService'
import { fileDownload } from 'src/utils/file/file'
type EntityType = 'mail'
export default class CommonApiService extends BaseApiService {
  // 0.获取护理单元列表
  public async getUintList() {
    return this.get(`/user/nursingUnit`)
  }
  public async uploadFile(obj: any) {
    const trancePostData = new FormData()
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        trancePostData.append(key, obj[key])
      }
    }
    return this.post(`/file/uploadNurse`, trancePostData)
  }

  /** 获取字典 */
  public dictInfo(code: string) {
    return this.post(`/dept/dictInfo`, this.stringify({ code }))
  }

  /** 根据科室获取人员列表 */
  public groupByDeptInDeptList(deptCode?: string, keyword?: String) {
    return this.post(`/user/groupByDeptInDeptList`, { deptCode, keyword })
  }
  /** 根据职称获取人员列表 */
  public groupByTitleInDeptList(title?: string, keyword?: String) {
    return this.post(`/user/groupByTitleInDeptList`, { title, keyword })
  }
  /** 根据职务获取人员列表 */
  public groupByJobInDeptList(job?: string, keyword?: String) {
    return this.post(`/user/groupByJobInDeptList`, { job, keyword })
  }
  /** 根据职务获取人员列表 */
  public groupByLevelInDeptList(currentLevel?: string, keyword?: String) {
    return this.post(`/user/groupByLevelInDeptList`, { currentLevel, keyword })
  }
  /** 根据用户名获取人员列表 */
  public searchUser(empName: string) {
    return this.post(`/user/search`, { empName })
  }
  /** 获取默认科室人员列表 */
  public defaultDeptUser(keyword?: String) {
    return this.post(`/user/defaultDeptUser`, { keyword })
  }
  /** 上传附件 */
  public uploadAttachment(entityType: EntityType, file: any) {
    return this.post(`/file/uploadAttachment/${entityType}`, file)
  }
  /** 下载文件并导出 */
  public getFileAndDown(path: string) {
    return this.get(path, { responseType: 'blob' }).then((res) => {
      fileDownload(res)
    })
  }
}
