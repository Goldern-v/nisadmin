import BaseApiService from "src/services/api/BaseApiService";
import { appStore, authStore } from "src/stores";
import { nurseFileDetailViewModal } from "../views/nurseFileDetail/NurseFileDetailViewModal";
import qs from 'qs'
export interface NurseQuery {
  deptCode?: string /** 部门编码 */;
  empNo?: string /** 员工工号 */;
  education: string /** 学历 */;
  zybz: string /** 科室属性 */;
  title: string /** 职称 */;
  currentLevel: string /** 能级、层级 */;
  post: string /**  当前页数  */;
  pageIndex: number /**  职务  */;
  pageSize: number /**   每页页数 */;
  empName: string /**   每页页数 */;
}

export default class NurseFilesService extends BaseApiService {
  private getSuffix() {
    return appStore.selfNurseFile ? 'findByEmpNo' : 'findByEmpNoSubmit'
  }
  // 获取护士列表
  public async getByFormCodePC(obj: any) {
    Object.keys(obj).forEach((key: any) => {
      if (obj[key] === "全部") {
        obj[key] = "";
      }
    });
    return this.post(`/auditeNurseList/getByFormCodePC`, this.stringify(obj));
  }

  // 查看护士首页信息
  public async findByEmpNo(empNo: any) {
    return this.get(`/auditeNurseFileIndex/findByEmpNo/${empNo}`);
  }
  /** 查看护士首页信息 个人*/
  public async findByEmpNoSelf(empNo: any) {
    return this.get(`/nurseFileIndex/findByEmpNo/${empNo}/123456`)
  }
  // getByEmpNoAudite
  // 1查找护士基本信息 护长
  public async nurseInformation(empNo: any) {
    nurseFileDetailViewModal.pageSpinning = true;
    return this.get(`/nurseInformation/getByEmpNoAudite/${empNo}`).then(res => {
      nurseFileDetailViewModal.pageSpinning = false;
      return res;
    });
  }
  /** 1查找护士基本信息 个人*/
  public async nurseInformationSelf(empNo: any) {
    nurseFileDetailViewModal.pageSpinning = true;
    return this.get(`/nurseInformation/getByEmpNo/${empNo}`).then(res => {
      nurseFileDetailViewModal.pageSpinning = false;
      return res;
    });
  }
  // 1-1护士基本信息信息更新
  public async saveOrUpdate(obj: any) {
    return this.post(`/nurseInformation/saveOrUpdatePC`, obj);
  }
  // 2 查找护士工作经历 //护长
  public async nurseWorkExperience(empNo: any) {
    nurseFileDetailViewModal.pageSpinning = true;
    return this.get(`/nurseWorkExperience/${this.getSuffix()}/${empNo}`).then(
      res => {
        nurseFileDetailViewModal.pageSpinning = false;
        return res;
      }
    );
  }
  // 2-1护士工作经历新增或更新 //护长
  public async nurseWorkExperienceAdd(obj: any) {
    return this.post(`/nurseWorkExperience/saveOrUpdatePC`, obj);
  }
  // 3// 查找护士特殊资格证 //护长
  public async nurseSpecialQualification(empNo: any) {
    nurseFileDetailViewModal.pageSpinning = true;
    return this.get(
      `/nurseSpecialQualification/${this.getSuffix()}/${empNo}`
    ).then(res => {
      nurseFileDetailViewModal.pageSpinning = false;
      return res;
    });
  }
  // 3-1护士特殊资格证 新增 //护长
  public async nurseSpecialQualificationAdd(obj: any) {
    return this.post(`/nurseSpecialQualification/saveOrUpdatePC`, obj);
  }
  // 4//查找护士教育经历
  public async nurseMedicalEducation(empNo: any) {
    nurseFileDetailViewModal.pageSpinning = true;
    return this.get(`/nurseMedicalEducation/${this.getSuffix()}/${empNo}`).then(
      res => {
        nurseFileDetailViewModal.pageSpinning = false;
        return res;
      }
    );
  }
  // 4-1 教育经历新增/更新
  public async userEducatAdd(obj: any) {
    return this.post(`/nurseMedicalEducation/saveOrUpdatePC`, obj);
  }
  // 4-2 教育经历有附件上传
  public async uploadFileUserEducat(getFile: any) {
    const trancePostData = new FormData();
    trancePostData.append("file", getFile);
    trancePostData.append("empNo", appStore.queryObj.empNo);

    trancePostData.append("type", "2");

    if ((authStore.user && authStore.user.post) == "护长") {
      trancePostData.append("auditedStatus", "waitAuditedNurse");
    } else if ((authStore.user && authStore.user.post) == "护理部") {
      trancePostData.append("auditedStatus", "waitAuditedDepartment");
    }

    return this.post(`/file/uploadNurse`, trancePostData);
  }

  // 5//查找护士职称及层级变动-单个(护长)
  public async nurseProfessionalAndLevelChange(empNo: any) {
    nurseFileDetailViewModal.pageSpinning = true;
    return this.get(
      `/nurseProfessionalAndLevelChange/${this.getSuffix()}/${empNo}`
    ).then(res => {
      nurseFileDetailViewModal.pageSpinning = false;
      return res;
    });
  }
  // 5-1 新增护士职称及层级变动
  public async nurseProfessionalAndLevelChangeAdd(obj: any) {
    return this.post(`/nurseProfessionalAndLevelChange/saveOrUpdatePC`, obj);
  }

  // 6//查找护士继续教育列表（护长）
  public async nurseContinuingEducation(empNo: any) {
    nurseFileDetailViewModal.pageSpinning = true;
    return this.get(
      `/nurseContinuingEducation/${this.getSuffix()}/${empNo}`
    ).then(res => {
      nurseFileDetailViewModal.pageSpinning = false;
      return res;
    });
  }
  // 6-1 查找护士继续教育列表（护式）新增
  public async nurseContinuingEducationAdd(obj: any) {
    nurseFileDetailViewModal.pageSpinning = true;
    return this.post(`/nurseContinuingEducation/saveOrUpdatePC`, obj).then(
      res => {
        nurseFileDetailViewModal.pageSpinning = false;
        return res;
      }
    );
  }
  // 7 查找护士主要著作、译文、论文发表情况-列表(护长)
  public async nursePaperExperience(empNo: any) {
    nurseFileDetailViewModal.pageSpinning = true;
    return this.get(`/nursePaperExperience/${this.getSuffix()}/${empNo}`).then(
      res => {
        nurseFileDetailViewModal.pageSpinning = false;
        return res;
      }
    );
  }
  // 7-1 护士主要著作、译文、论文发表情况新增或更新(护士)
  public async nursePaperExperienceAdd(obj: any) {
    return this.post(`/nursePaperExperience/saveOrUpdatePC`, obj);
  }
  // 8查找护士获奖情况-列表(护长)
  public async nurseAwardWinning(empNo: any) {
    nurseFileDetailViewModal.pageSpinning = true;
    return this.get(`/nurseAwardWinning/${this.getSuffix()}/${empNo}`).then(
      res => {
        nurseFileDetailViewModal.pageSpinning = false;
        return res;
      }
    );
  }
  // 8-1护士获奖情况新增或更新(网页护长)
  public async nurseAwardWinningAdd(obj: any) {
    return this.post(`/nurseAwardWinning/saveOrUpdatePC`, obj);
  }
  // 9查找护士护理不良行为记录列表（护长）
  public async nurseBehaviorRecord(empNo: any) {
    nurseFileDetailViewModal.pageSpinning = true;
    return this.get(`/nurseBehaviorRecord/${this.getSuffix()}/${empNo}`).then(
      res => {
        nurseFileDetailViewModal.pageSpinning = false;
        return res;
      }
    );
  }
  // 9-1护士护理不良行为记录增或更新(网页护长)
  public async nurseBehaviorRecordAdd(obj: any) {
    return this.post(`/nurseBehaviorRecord/saveOrUpdatePC`, obj);
  }
  // 10 查找护士 年度考核结果-列表(护长)
  public async nurseYearCheck(empNo: any) {
    nurseFileDetailViewModal.pageSpinning = true;
    return this.get(`/nurseYearCheck/${this.getSuffix()}/${empNo}`).then(res => {
      nurseFileDetailViewModal.pageSpinning = false;
      return res;
    });
  }
  // 10-1 护士 年度考核结果 新增或更新(网页护长)
  public async nurseYearCheckAdd(obj: any) {
    return this.post(`/nurseYearCheck/saveOrUpdatePC`, obj);
  }
  // 11 查找护士医院三基考核-列表(护长)
  public async nurseHospitalsThreeBase(empNo: any) {
    nurseFileDetailViewModal.pageSpinning = true;
    return this.get(`/nurseHospitalsThreeBase/${this.getSuffix()}/${empNo}`).then(
      res => {
        nurseFileDetailViewModal.pageSpinning = false;
        return res;
      }
    );
  }
  // 11-1护士医院三基考核新增或更新(网页护长)
  public async nurseHospitalsThreeBaseAdd(obj: any) {
    return this.post(`/nurseHospitalsThreeBase/saveOrUpdatePC`, obj);
  }
  // 12 查找护士临床护理工作情况登记-列表(护长)
  public async nurseRegistrationWork(empNo: any) {
    nurseFileDetailViewModal.pageSpinning = true;
    return this.get(`/nurseRegistrationWork/${this.getSuffix()}/${empNo}`).then(
      res => {
        nurseFileDetailViewModal.pageSpinning = false;
        return res;
      }
    );
  }
  // 12-1护士临床护理工作情况新增或更新(网页护长)
  public async nurseRegistrationWorkAdd(obj: any) {
    return this.post(`/nurseRegistrationWork/saveOrUpdatePC`, obj);
  }
  // 13 查找护士附件情况(护长)
  public async nurseAttachment(empNo: any) {
    nurseFileDetailViewModal.pageSpinning = true;
    return this.get(`/nurseAttachment/${this.getSuffix()}/${empNo}`).then(res => {
      nurseFileDetailViewModal.pageSpinning = false;
      return res;
    });
  }
  // 13-1 护士附件情况新增或更新(网页护长)
  public async nurseAttachmentAdd(obj: any) {
    return this.post(`/nurseAttachment/saveOrUpdate`, obj);
  }

  // 15 新增添加附件
  // 该接口有问题
  public async fileAdd(obj: any) {
    this.stringify(obj);
    return this.post(`file/uploadNurse`, obj);
  }

  /** 审核列表 */
  public auditeStatusNurse(status: string, pageIndex: number) {
    let obj = {
      status,
      deptCode: authStore.selectedDeptCode,
      empNo: appStore.queryObj.empNo,
      pageIndex,
      pageSize: 10
    };
    return this.post(
      `/auditeNurseFileIndex/findListAuditePC`,
      this.stringify(obj)
    );
  }

  /** 审核科室列表 */
  public auditeStatusNurseInDept(
    status: string,
    pageIndex: number,
    pageSize: number,
    searchText?: any
  ) {
    let obj = {
      status,
      deptCode: authStore.selectedDeptCode,
      pageIndex,
      searchText,
      pageSize
    };
    return this.post(
      `/auditeNurseFileIndex/findListAuditePC`,
      this.stringify(obj)
    );
  }

  /** 科室调动 */
  public updateDeptCode(obj: any) {
    return this.post(`/nurseInformation/updateDeptCode`, obj);
  }
  /** 离职/退休 */
  public updateNurseLeave(obj: any) {
    return this.post(`/nurseInformation/updateNurseLeave`, obj);
  }
  /** 导出护士基本信息 */
  public auditeNurseListExcel(obj: any) {
    Object.keys(obj).forEach((key: any) => {
      if (obj[key] === "全部") {
        obj[key] = "";
      }
    });
    return this.post(`/auditeNurseList/excel`, this.stringify(obj), {
      responseType: "blob"
    });
  }
  /** 导出护士证书 */
  public exportAttachment(obj: any) {
    Object.keys(obj).forEach((key: any) => {
      if (obj[key] === "全部") {
        obj[key] = "";
      }
    });
    return this.get(`/auditeNurseList/exportAttachment?${qs.stringify(obj)}`, {
      responseType: "blob"
    });
  }
}

export const nurseFilesService = new NurseFilesService();
