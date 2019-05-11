import BaseApiService from 'src/services/api/BaseApiService'

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

export default class NurseFilesService extends BaseApiService {
  // 获取护士列表
  public async getByFormCodePC (obj: any) {
    Object.keys(obj).forEach((key: any) => {
      if (obj[key] === '全部') {
        obj[key] = ''
      }
    })
    return this.post(`/auditeNurseList/getByFormCodePC`, this.stringify(obj))
  }
  // 护士信息新增或者更新
  public async saveOrUpdate (obj: any) {
    return this.post(`/nurseInformation/saveOrUpdate`, obj)
  }
  // 查看护士首页信息
  public async findByEmpNo (empNo: any) {
    return this.get(`/auditeNurseFileIndex/findByEmpNo/${empNo}`)
  }
  // 查找护士基本信息
  public async getByEmpNoAudite (empNo: any) {
    return this.get(`/nurseInformation/getByEmpNoAudite/${empNo}`)
  }
  // 查找护士工作经历
  public async findByEmpNoSubmit (empNo: any) {
    return this.get(`/nurseWorkExperience/findByEmpNoSubmit/${empNo}`)
  }
  // 护士工作经历新增或更新
  public async nurseWorkExperienceSaveOrUpdatePC (obj: any) {
    return this.post(`/nurseWorkExperience/saveOrUpdatePC`, obj)
  }
  // // 查找护士特殊资格证
  // public async findByEmpNoSubmit (empNo: any) {
  //   return this.get(`/nurseWorkExperience/findByEmpNoSubmit/${empNo}`)
  // }
}

export const nurseFilesService = new NurseFilesService()
