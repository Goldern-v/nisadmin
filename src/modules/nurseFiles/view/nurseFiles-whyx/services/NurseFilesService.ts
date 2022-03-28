import BaseApiService from 'src/services/api/BaseApiService'
import { appStore, authStore } from 'src/stores'
import { nurseFileDetailViewModal } from '../views/nurseFileDetail/NurseFileDetailViewModal'
import { isSelf } from '../views/nurseFileDetail/views/BaseInfo'
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
  public async getByFormCodePC(obj: any) {
    // Object.keys(obj).forEach((key: any) => {
    //   if (obj[key] === '全部') {
    //     obj[key] = ''
    //   }
    // })
    return this.post(`/auditeNurseListWH/getByFormCodePC`, obj)
  }
  // 导出护士列表
  public async countExcel(obj: any, onDownloadProgress: (progressEvent: any) => void) {
    return this.post(`/auditeNurseListWH/${appStore.HOSPITAL_ID === 'gxjb' ? 'countExcelForJB' : 'countExcel'}`, obj, {
      responseType: 'blob',
      onDownloadProgress: onDownloadProgress
    })
  }

  // 查看护士首页信息
  public async findByEmpNo(empNo: any) {
    return this.get(`/auditeNurseFileIndexWH/findByEmpNo/${empNo}`)
  }
  // 查看护士首页信息 个人
  public async findByEmpNoSelf(empNo: any) {
    return this.get(`/nurseFileIndexWH/findByEmpNo/${empNo}/123456`)
  }
  // getByEmpNoAudite
  // 1查找护士基本信息 护长
  public async nurseInformation(empNo: any) {
    nurseFileDetailViewModal.pageSpinning = true
    return this.get(`/nurseWHInformation/findByEmpNoSubmit/${empNo}`).then((res) => {
      nurseFileDetailViewModal.pageSpinning = false
      return res
    })
  }
  // 1查找护士基本信息 个人
  public async nurseInformationSelf(empNo: any) {
    nurseFileDetailViewModal.pageSpinning = true
    // console.log(this, 'thisthis')
    return this.get(`/nurseWHInformation/findByEmpNo/${empNo}`).then((res) => {
      nurseFileDetailViewModal.pageSpinning = false
      return res
    })
  }

  /** 护士档案列表 新增护士 */
  public async addNewNurse(obj: any) {
    return this.post(`/nurseWHInformation/saveOrUpdatePC`, obj)
  }

  // 1-1护士基本信息信息更新
  public async saveOrUpdate(obj: any) {
    return this.post(`/nurseWHInformation/saveOrUpdate`, obj)
  }

  /** 审核列表 */
  public auditeStatusNurse(status: string, pageIndex: number) {
    let obj = {
      status,
      deptCode: authStore.selectedDeptCode,
      empNo: appStore.queryObj.empNo,
      pageIndex,
      pageSize: 10
    }
    return this.post(`/auditeNurseFileIndexWH/findListAuditePC`, this.stringify(obj))
  }

  /** 审核科室列表 */
  public auditeStatusNurseInDept(status: string, pageIndex: number, pageSize: number, searchText?: any) {
    let obj = {
      status,
      deptCode: authStore.selectedDeptCode,
      pageIndex,
      searchText,
      pageSize
    }
    return this.post(`/auditeNurseFileIndexWH/findListAuditePC`, this.stringify(obj))
  }

  /** 科室调动 */
  public updateDeptCode(obj: any) {
    return this.post(`/nurseInformation/updateDeptCode`, obj)
  }
  /** 离职/退休 */
  public updateNurseLeave(obj: any) {
    return this.post(`/nurseInformation/updateNurseLeave`, obj)
  }

  /** 武汉新增 */
  /** 文章 */

  /** 统一列表 */
  public commonfindByEmpNoSubmit(type: string, empNo: any) {
    nurseFileDetailViewModal.pageSpinning = true
    if (isSelf() || type === 'nurseWHAcademic' || type === 'nurseWHSpecializNurse' || type === 'nurseWHOutStudy') {
      return this.get(`/${type}/findByEmpNo/${empNo}`).then((res) => {
        nurseFileDetailViewModal.pageSpinning = false
        return res
      })
    } else {
      return this.get(`/${type}/findByEmpNoSubmit/${empNo}`).then((res) => {
        nurseFileDetailViewModal.pageSpinning = false
        return res
      })
    }
  }
  /** 统一更新 */
  public async commonSaveOrUpdate(type: string, obj: any) {
    if (type === 'nurseWHOutStudy' || type === 'nurseWHAcademic') return this.post(`/${type}/saveOrUpdateYaXin`, obj)
    else return this.post(`/${type}/saveOrUpdate`, obj)
  }
  /** 统一删除 */
  public async commonDelById(type: string, id: any) {
    return this.get(`/${type}/delById/${id}`)
  }
  /** 待我审核 */
  public findNurseFilePendingFlow(empNo: any, pageIndex: any, pageSize: any) {
    return this.post(`/auditeNurseFileIndexWH/findNurseFilePendingFlow`, this.stringify({ empNo, pageIndex, pageSize }))
  }
  /** 我已审核 */
  public findNurseFileProcessedFlow(empNo: any, pageIndex: any, pageSize: any) {
    return this.post(
      `/auditeNurseFileIndexWH/findNurseFileProcessedFlow`,
      this.stringify({ empNo, pageIndex, pageSize })
    )
  }

  /** 籍贯搜索 */
  public nurseNativePlaceFindByName(nativePlaceName: any) {
    return this.post(`/nurseNativePlace/findByName`, { nativePlaceName: nativePlaceName, pageSize: 20, pageIndex: 1 })
  }

  /** 根据科室获取科室人员 */
  public async getUsers(code: any) {
    return this.get(`/dept/users/${code}`)
  }

  public async getAllUsers() {
    return this.get(`/dept/allUsers/getAll`)
  }
  

}

export const nurseFilesService = new NurseFilesService()
