import BaseApiService from 'src/services/api/BaseApiService'
import { appStore } from 'src/stores'
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
    return this.post(`/nurseInformation/saveOrUpdatePC`, obj)
  }
  // 查看护士首页信息
  public async findByEmpNo (empNo: any) {
    return this.get(`/auditeNurseFileIndex/findByEmpNo/${empNo}`)
  }
  // 1查找护士基本信息 护长
  public async nurseInformation (empNo: any) {
    return this.get(`/nurseInformation/getByEmpNo/${empNo}`)
  }
  // 2 查找护士工作经历 //护长
  public async nurseWorkExperience (empNo: any) {
    return this.get(`/nurseWorkExperience/findByEmpNoSubmit/${empNo}`)
  }
  // 2-1护士工作经历新增或更新 //护长
  public async nurseWorkExperienceAdd (obj: any) {
    return this.post(`/nurseWorkExperience/saveOrUpdatePC`, obj)
  }
  // 3// 查找护士特殊资格证 //护长
  public async nurseSpecialQualification (empNo: any) {
    return this.get(`/nurseSpecialQualification/findByEmpNoSubmit/${empNo}`)
  }
  // 3-1护士特殊资格证 新增 //护长
  public async nurseSpecialQualificationAdd (obj: any) {
    return this.post(`/nurseSpecialQualification/saveOrUpdatePC`, obj)
  }
  // 4//查找护士教育经历
  public async userEducat (empNo: any) {
    return this.get(`/nurseMedicalEducation/findByEmpNoSubmit/${empNo}`)
  }
  // 4-1 教育经历新增/更新
  public async userEducatAdd (obj: any) {
    return this.post(`/nurseMedicalEducation/saveOrUpdatePC`, obj)
  }
  // 4-2 有附件上传
  public async uploadFileUserEducat (getFile: any) {
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
    return this.post(`/file/uploadNurse`, trancePostData)
  }

  // 5//查找护士职称及层级变动-单个(护长)
  public async nurseProfessionalAndLevelChange (empNo: any) {
    return this.get(`/nurseProfessionalAndLevelChange/findByEmpNoSubmit/${empNo}`)
  }
  // 5-1 新增护士职称及层级变动
  public async nurseProfessionalAndLevelChangeAdd (obj: any) {
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
  public async nurseContinuingEducation (empNo: any) {
    return this.get(`/nurseContinuingEducation/findByEmpNoSubmit/${empNo}`)
  }
  // 6-1 查找护士继续教育列表（护式）新增
  public async nurseContinuingEducationAdd (obj: any) {
    return this.post(`/nurseContinuingEducation/saveOrUpdatePC`, obj)
  }
  // 7 查找护士主要著作、译文、论文发表情况-列表(护长)
  public async nursePaperExperience (empNo: any) {
    return this.get(`/nursePaperExperience/findByEmpNoSubmit/${empNo}`)
  }
  // 7-1 护士主要著作、译文、论文发表情况新增或更新(护士)
  public async nursePaperExperienceAdd (obj: any) {
    return this.post(`/nursePaperExperience/saveOrUpdatePC`, obj)
  }
  // 8查找护士获奖情况-列表(护长)
  public async nurseAwardWinning (empNo: any) {
    return this.get(`/nurseAwardWinning/findByEmpNoSubmit/${empNo}`)
  }
  // 8-1护士获奖情况新增或更新(网页护长)
  public async nurseAwardWinningAdd (obj: any) {
    return this.post(`/nurseAwardWinning/saveOrUpdatePC`, obj)
  }
  // 9查找护士护理不良行为记录列表（护长）
  public async nurseBehaviorRecord (empNo: any) {
    return this.get(`/nurseBehaviorRecord/findByEmpNoSubmit/${empNo}`)
  }
  // 9-1护士护理不良行为记录增或更新(网页护长)
  public async nurseBehaviorRecordAdd (obj: any) {
    return this.post(`/nurseBehaviorRecord/saveOrUpdatePC`, obj)
  }
  // 10 查找护士 年度考核结果-列表(护长)
  public async nurseYearCheck (empNo: any) {
    return this.get(`/nurseYearCheck/findByEmpNoSubmit/${empNo}`)
  }
  // 10-1 护士 年度考核结果 新增或更新(网页护长)
  public async nurseYearCheckAdd (obj: any) {
    return this.post(`/nurseYearCheck/saveOrUpdatePC`, obj)
  }
  // 11 查找护士医院三基考核-列表(护长)
  public async nurseHospitalsThreeBase (empNo: any) {
    return this.get(`/nurseHospitalsThreeBase/findByEmpNoSubmit/${empNo}`)
  }
  // 11-1护士医院三基考核新增或更新(网页护长)
  public async nurseHospitalsThreeBaseAdd (obj: any) {
    return this.post(`/nurseHospitalsThreeBase/saveOrUpdatePC`, obj)
  }
  // 12 查找护士临床护理工作情况登记-列表(护长)
  public async nurseRegistrationWork (empNo: any) {
    return this.get(`/nurseRegistrationWork/findByEmpNoSubmit/${empNo}`)
  }
  // 12-1护士临床护理工作情况新增或更新(网页护长)
  public async nurseRegistrationWorkAdd (obj: any) {
    return this.post(`/nurseRegistrationWork/saveOrUpdatePC`, obj)
  }
  // 13 查找护士附件情况(护长)
  public async nurseAttachment (empNo: any) {
    return this.get(`/nurseAttachment/findByEmpNo//${empNo}`)
  }

  // 15 新增添加附件
  // 该接口有问题
  public async fileAdd (obj: any) {
    this.stringify(obj)
    return this.post(`file/uploadNurse`, obj)
  }
}

export const nurseFilesService = new NurseFilesService()
