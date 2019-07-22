import BaseApiService from 'src/services/api/BaseApiService'
import { appStore, authStore } from 'src/stores'
import { nurseFileDetailViewModal } from '../views/nurseFileDetail/NurseFileDetailViewModal'
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
    Object.keys(obj).forEach((key: any) => {
      if (obj[key] === '全部') {
        obj[key] = ''
      }
    })
    return this.post(`/auditeNurseList/getByFormCodePC`, this.stringify(obj))
  }

  // 查看护士首页信息
  public async findByEmpNo(empNo: any) {
    return this.get(`/auditeNurseFileIndex/findByEmpNo/${empNo}`)
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
  // 1-1护士基本信息信息更新
  public async saveOrUpdate(obj: any) {
    return this.post(`/nurseWHInformation/saveOrUpdatePC`, obj)
  }
  // 2 查找护士工作经历 //护长
  public async nurseWorkExperience(empNo: any) {
    nurseFileDetailViewModal.pageSpinning = true
    return this.get(`/nurseWorkExperience/findByEmpNoSubmit/${empNo}`).then((res) => {
      nurseFileDetailViewModal.pageSpinning = false
      return res
    })
  }
  // 2-1护士工作经历新增或更新 //护长
  public async nurseWorkExperienceAdd(obj: any) {
    return this.post(`/nurseWorkExperience/saveOrUpdatePC`, obj)
  }
  // 3// 查找护士特殊资格证 //护长
  public async nurseSpecialQualification(empNo: any) {
    nurseFileDetailViewModal.pageSpinning = true
    return this.get(`/nurseSpecialQualification/findByEmpNoSubmit/${empNo}`).then((res) => {
      nurseFileDetailViewModal.pageSpinning = false
      return res
    })
  }
  // 3-1护士特殊资格证 新增 //护长
  public async nurseSpecialQualificationAdd(obj: any) {
    return this.post(`/nurseSpecialQualification/saveOrUpdatePC`, obj)
  }
  // 4//查找护士教育经历
  public async nurseMedicalEducation(empNo: any) {
    nurseFileDetailViewModal.pageSpinning = true
    return this.get(`/nurseMedicalEducation/findByEmpNoSubmit/${empNo}`).then((res) => {
      nurseFileDetailViewModal.pageSpinning = false
      return res
    })
  }
  // 4-1 教育经历新增/更新
  public async userEducatAdd(obj: any) {
    return this.post(`/nurseMedicalEducation/saveOrUpdatePC`, obj)
  }
  // 4-2 教育经历有附件上传
  public async uploadFileUserEducat(getFile: any) {
    // let postData = {
    //   file: getFile,
    //   empNo: appStore.queryObj.empNo,
    //   type: 2
    // }
    // let trancePostData = this.stringify(postData)
    const trancePostData = new FormData()
    trancePostData.append('file', getFile)
    trancePostData.append('empNo', appStore.queryObj.empNo)

    trancePostData.append('type', '2')

    if (authStore!.user!.post == '护长') {
      trancePostData.append('auditedStatus', 'waitAuditedNurse')
    } else if (authStore!.user!.post == '护理部') {
      trancePostData.append('auditedStatus', 'waitAuditedDepartment')
    }

    return this.post(`/file/uploadNurse`, trancePostData)
  }

  // 5//查找护士职称及层级变动-单个(护长)
  public async nurseProfessionalAndLevelChange(empNo: any) {
    nurseFileDetailViewModal.pageSpinning = true
    return this.get(`/nurseProfessionalAndLevelChange/findByEmpNoSubmit/${empNo}`).then((res) => {
      nurseFileDetailViewModal.pageSpinning = false
      return res
    })
  }
  // 5-1 新增护士职称及层级变动
  public async nurseProfessionalAndLevelChangeAdd(obj: any) {
    return this.post(`/nurseProfessionalAndLevelChange/saveOrUpdatePC`, obj)
  }
  // 5-2 护士职称及层级变动附件上传
  // public async uploadFileUserEducat (getFile: any) {
  //   const trancePostData = new FormData()
  //   trancePostData.append('file', getFile)
  //   trancePostData.append('empNo', appStore.queryObj.empNo)
  //   trancePostData.append('type', '2')
  //   return this.post(`/file/uploadNurse`, trancePostData)
  // }
  // 6//查找护士继续教育列表（护长）
  public async nurseContinuingEducation(empNo: any) {
    nurseFileDetailViewModal.pageSpinning = true
    return this.get(`/nurseContinuingEducation/findByEmpNoSubmit/${empNo}`).then((res) => {
      nurseFileDetailViewModal.pageSpinning = false
      return res
    })
  }
  // 6-1 查找护士继续教育列表（护式）新增
  public async nurseContinuingEducationAdd(obj: any) {
    nurseFileDetailViewModal.pageSpinning = true
    return this.post(`/nurseContinuingEducation/saveOrUpdatePC`, obj).then((res) => {
      nurseFileDetailViewModal.pageSpinning = false
      return res
    })
  }
  // 7 查找护士主要著作、译文、论文发表情况-列表(护长)
  public async nursePaperExperience(empNo: any) {
    nurseFileDetailViewModal.pageSpinning = true
    return this.get(`/nursePaperExperience/findByEmpNoSubmit/${empNo}`).then((res) => {
      nurseFileDetailViewModal.pageSpinning = false
      return res
    })
  }
  // 7-1 护士主要著作、译文、论文发表情况新增或更新(护士)
  public async nursePaperExperienceAdd(obj: any) {
    return this.post(`/nursePaperExperience/saveOrUpdatePC`, obj)
  }
  // 8查找护士获奖情况-列表(护长)
  public async nurseAwardWinning(empNo: any) {
    nurseFileDetailViewModal.pageSpinning = true
    return this.get(`/nurseAwardWinning/findByEmpNoSubmit/${empNo}`).then((res) => {
      nurseFileDetailViewModal.pageSpinning = false
      return res
    })
  }
  // 8-1护士获奖情况新增或更新(网页护长)
  public async nurseAwardWinningAdd(obj: any) {
    return this.post(`/nurseAwardWinning/saveOrUpdatePC`, obj)
  }
  // 9查找护士护理不良行为记录列表（护长）
  public async nurseBehaviorRecord(empNo: any) {
    nurseFileDetailViewModal.pageSpinning = true
    return this.get(`/nurseBehaviorRecord/findByEmpNoSubmit/${empNo}`).then((res) => {
      nurseFileDetailViewModal.pageSpinning = false
      return res
    })
  }
  // 9-1护士护理不良行为记录增或更新(网页护长)
  public async nurseBehaviorRecordAdd(obj: any) {
    return this.post(`/nurseBehaviorRecord/saveOrUpdatePC`, obj)
  }
  // 10 查找护士 年度考核结果-列表(护长)
  public async nurseYearCheck(empNo: any) {
    nurseFileDetailViewModal.pageSpinning = true
    return this.get(`/nurseYearCheck/findByEmpNoSubmit/${empNo}`).then((res) => {
      nurseFileDetailViewModal.pageSpinning = false
      return res
    })
  }
  // 10-1 护士 年度考核结果 新增或更新(网页护长)
  public async nurseYearCheckAdd(obj: any) {
    return this.post(`/nurseYearCheck/saveOrUpdatePC`, obj)
  }
  // 11 查找护士医院三基考核-列表(护长)
  public async nurseHospitalsThreeBase(empNo: any) {
    nurseFileDetailViewModal.pageSpinning = true
    return this.get(`/nurseHospitalsThreeBase/findByEmpNoSubmit/${empNo}`).then((res) => {
      nurseFileDetailViewModal.pageSpinning = false
      return res
    })
  }
  // 11-1护士医院三基考核新增或更新(网页护长)
  public async nurseHospitalsThreeBaseAdd(obj: any) {
    return this.post(`/nurseHospitalsThreeBase/saveOrUpdatePC`, obj)
  }
  // 12 查找护士临床护理工作情况登记-列表(护长)
  public async nurseRegistrationWork(empNo: any) {
    nurseFileDetailViewModal.pageSpinning = true
    return this.get(`/nurseRegistrationWork/findByEmpNoSubmit/${empNo}`).then((res) => {
      nurseFileDetailViewModal.pageSpinning = false
      return res
    })
  }
  // 12-1护士临床护理工作情况新增或更新(网页护长)
  public async nurseRegistrationWorkAdd(obj: any) {
    return this.post(`/nurseRegistrationWork/saveOrUpdatePC`, obj)
  }
  // 13 查找护士附件情况(护长)
  public async nurseAttachment(empNo: any) {
    nurseFileDetailViewModal.pageSpinning = true
    return this.get(`/nurseAttachment/findByEmpNoSubmit/${empNo}`).then((res) => {
      nurseFileDetailViewModal.pageSpinning = false
      return res
    })
  }
  // 13-1 护士附件情况新增或更新(网页护长)
  public async nurseAttachmentAdd(obj: any) {
    return this.post(`/nurseAttachment/saveOrUpdate`, obj)
  }

  // 15 新增添加附件
  // 该接口有问题
  public async fileAdd(obj: any) {
    this.stringify(obj)
    return this.post(`file/uploadNurse`, obj)
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
    return this.post(`/auditeNurseFileIndex/findListAuditePC`, this.stringify(obj))
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
    return this.post(`/auditeNurseFileIndex/findListAuditePC`, this.stringify(obj))
  }

  /** 科室调动 */
  public updateDeptCode(obj: any) {
    return this.post(`/nurseInformation/updateDeptCode`, obj)
  }

  /** 武汉新增 */
  /** 文章 */
  public nurseWHArticle(empNo: any) {
    nurseFileDetailViewModal.pageSpinning = true
    return this.get(`/nurseWHArticle/findByEmpNo/${empNo}`).then((res) => {
      nurseFileDetailViewModal.pageSpinning = false
      return res
    })
  }


  /** zk-专科护士 */
  public nurseWHSpecializNurse(empNo: any) {
    nurseFileDetailViewModal.pageSpinning = true
    return this.get(`/nurseWHSpecializNurse/findByEmpNo/${empNo}`).then((res) => {
      nurseFileDetailViewModal.pageSpinning = false
      return res
    })
  }
  // zk-1 专科护士新增或更新(护士)
  public async nurseWHSpecializNurseSaveOrUpdate(obj: any) {
    return this.post(`/nurseWHSpecializNurse/saveOrUpdate`, obj)
  }


  /** zg-转岗 */
  public nurseWHTransferPost(empNo: any) {
    nurseFileDetailViewModal.pageSpinning = true
    return this.get(`/nurseWHTransferPost/findByEmpNo/${empNo}`).then((res) => {
      nurseFileDetailViewModal.pageSpinning = false
      return res
    })
  }
  // zg-1 转岗新增或更新(护士)
  public async nurseWHTransferPostSaveOrUpdate(obj: any) {
    return this.post(`/nurseWHTransferPost/saveOrUpdate`, obj)
  }
  // zg-2 获取全部科室单元
  public async getDeptList() {
    return this.get(`/user/nursingUnit/all`);
  }


  /** cy-参与科研课题 */
  public nurseWHGoScienceCourse(empNo: any) {
    nurseFileDetailViewModal.pageSpinning = true
    return this.get(`/nurseWHGoScienceCourse/findByEmpNo/${empNo}`).then((res) => {
      nurseFileDetailViewModal.pageSpinning = false
      return res
    })
  }
  // cy-1 参与科研课题新增或更新(护士)
  public async nurseWHGoScienceCourseSaveOrUpdate(obj: any) {
    return this.post(`/nurseWHGoScienceCourse/saveOrUpdate`, obj)
  }


  /** jx-继续教育 */
  public nurseWHContinueStudy(empNo: any) {
    nurseFileDetailViewModal.pageSpinning = true
    return this.get(`/nurseWHContinueStudy/findByEmpNo/${empNo}`).then((res) => {
      nurseFileDetailViewModal.pageSpinning = false
      return res
    })
  }
   // jx-1 参与科研课题新增或更新(护士)
  public async nurseWHContinueStudySaveOrUpdate(obj: any) {
    return this.post(`/nurseWHContinueStudy/saveOrUpdate`, obj)
  }

  
  /** zc-职称变动 */
  public nurseWHTitle(empNo: any) {
    nurseFileDetailViewModal.pageSpinning = true
    return this.get(`/nurseWHTitle/findByEmpNo/${empNo}`).then((res) => {
      nurseFileDetailViewModal.pageSpinning = false
      return res
    })
  }
   // zc-1 职称变动新增或更新(护士)
  public async nurseWHTitleSaveOrUpdate(obj: any) {
    return this.post(`/nurseWHTitle/saveOrUpdate`, obj)
  }


  /** cj-层级变动 */
  public nurseWHHierarchy(empNo: any) {
    nurseFileDetailViewModal.pageSpinning = true
    return this.get(`/nurseWHHierarchy/findByEmpNo/${empNo}`).then((res) => {
      nurseFileDetailViewModal.pageSpinning = false
      return res
    })
  }
   // cj-1 层级变动新增或更新(护士)
  public async nurseWHHierarchySaveOrUpdate(obj: any) {
    return this.post(`/nurseWHHierarchy/saveOrUpdate`, obj)
  }
  
  
  /** gw-岗位变动 */
  public lll(empNo: any) {
    nurseFileDetailViewModal.pageSpinning = true
    return this.get(`/lll/findByEmpNo/${empNo}`).then((res) => {
      nurseFileDetailViewModal.pageSpinning = false
      return res
    })
  }
   // gw-1 岗位变动新增或更新(护士)
  public async lllSaveOrUpdate(obj: any) {
    return this.post(`/lll/saveOrUpdate`, obj)
  }
 
  
  /** bz-编制变动 */
  public nurseWHWorkConversion(empNo: any) {
    nurseFileDetailViewModal.pageSpinning = true
    return this.get(`/nurseWHWorkConversion/findByEmpNo/${empNo}`).then((res) => {
      nurseFileDetailViewModal.pageSpinning = false
      return res
    })
  }
  // bz-1 编制变动新增或更新(护士)
  public async nurseWHWorkConversionSaveOrUpdate(obj: any) {
    return this.post(`/nurseWHWorkConversion/saveOrUpdate`, obj)
  }


  // 8-1护士获奖情况新增或更新(网页护长)
  public async nurseWHArticleSaveOrUpdate(obj: any) {
    return this.post(`/nurseWHArticle/saveOrUpdate`, obj)
  }
  // 个人获奖
  // 2-1 个人获奖-列表(护长)
  public async nurseWHPersonWinning(empNo: any) {
    nurseFileDetailViewModal.pageSpinning = true
    return this.get(`/nurseWHPersonWinning/findByEmpNoSubmit/${empNo}`).then((res) => {
      nurseFileDetailViewModal.pageSpinning = false
      return res
    })
  }
  // 2-2 个人获奖新增或更新(网页护长)
  public async nurseWHPersonWinningSaveOrUpdate(obj: any) {
    return this.post(`/nurseWHPersonWinning/saveOrUpdate`, obj)
  }
  // 外出进修
  // 4-1 外出进修-列表(护长)
  public async nurseWHOutStudy(empNo: any) {
    nurseFileDetailViewModal.pageSpinning = true
    return this.get(`/nurseWHOutStudy/findByEmpNoSubmit/${empNo}`).then((res) => {
      nurseFileDetailViewModal.pageSpinning = false
      return res
    })
  }
  //4-2 外出进修新增或更新(网页护长)
  public async nurseWHOutStudySaveOrUpdate(obj: any) {
    return this.post(`/nurseWHOutStudy/saveOrUpdate`, obj)
  }
  // 主持科研课题
  // 5-1 主持科研课题-列表(护长)
  public async nurseWHHostScienceCourse(empNo: any) {
    nurseFileDetailViewModal.pageSpinning = true
    return this.get(`/nurseWHHostScienceCourse/findByEmpNoSubmit/${empNo}`).then((res) => {
      nurseFileDetailViewModal.pageSpinning = false
      return res
    })
  }
  // 5-2 主持科研课题新增或更新(网页护长)
  public async nurseWHHostScienceCourseSaveOrUpdate(obj: any) {
    return this.post(`/nurseWHHostScienceCourse/saveOrUpdate`, obj)
  }
  /** 专利列表 */
  public nurseWHPatent(empNo: any) {
    nurseFileDetailViewModal.pageSpinning = true
    return this.get(`/nurseWHPatent/findByEmpNoSubmit/${empNo}`).then((res) => {
      nurseFileDetailViewModal.pageSpinning = false
      return res
    })
  }
  //7 科研课题成果
  //7-1 科研课题成果-列表(护长)
  public async nurseWHScienceResult(empNo: any) {
    nurseFileDetailViewModal.pageSpinning = true
    return this.get(`/nurseWHScienceResult/findByEmpNoSubmit/${empNo}`).then((res) => {
      nurseFileDetailViewModal.pageSpinning = false
      return res
    })
  }
  /** 专利更新 */
  public async nurseWHPatentSaveOrUpdate(obj: any) {
    return this.post(`/nurseWHPatent/saveOrUpdate`, obj)
  }
  /** 统一列表 */
  public commonfindByEmpNoSubmit(type: string, empNo: any) {
    nurseFileDetailViewModal.pageSpinning = true
    return this.get(`/${type}/findByEmpNoSubmit/${empNo}`).then((res) => {
      nurseFileDetailViewModal.pageSpinning = false
      return res
    })
  }
  /** 统一更新 */
  public async commonSaveOrUpdate(type: string, obj: any) {
    return this.post(`/${type}/saveOrUpdate`, obj)
  }
  // 7-2 科研课题成果新增或更新(网页护长)
  public async nurseWHScienceResultSaveOrUpdate(obj: any) {
    return this.post(`/nurseWHScienceResult/saveOrUpdate`, obj)
  }
}

export const nurseFilesService = new NurseFilesService()
