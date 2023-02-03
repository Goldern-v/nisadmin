export default interface User {
  age: string;
  auditor: true;
  birthday: string;
  cardNo: string;
  createTime: string;
  creatorNo: string;
  currentLevel: string;
  currentLevelTime: string;
  deptCode: string;
  deptName: string;
  education: string;
  eligion: string;
  empName: string;
  empNo: string;
  employMode: string;
  employTime: string;
  entryDate: string;
  groupId: string;
  icon: string;
  id: 999;
  initialEducation: string;
  initialEducationTime: string;
  job: string;
  leaveDate: string;
  licenseNumber: string;
  licenseNumberTime: string;
  motherBabyCertificat: string;
  motherBabyCertificatTime: string;
  nation: string;
  nowEducation: string;
  nowEducationTime: string;
  nursingStaff: true;
  phone: string;
  plannedImmunityCertificat: string;
  plannedImmunityTime: string;
  politicalOutlook: string;
  post: string;
  postType: string;
  qualificationTime: string;
  roleJurisdict: string;
  roles: string;
  sex: string;
  signature: string;
  specialist: string;
  specialistNurseCertificat: string;
  specialistTrainEndTime: string;
  specialistTrainStartTime: string;
  status: string;
  superuser: true;
  takeWorkTime: string;
  title: string;
  workYear: string;
  roleManageCode: string;
  roleManageCodeList: string[];
  nativePlace: string;
  nearImageUrl: string; //头像
  roleManage: string; //是否有权限进入管理系统
  wsp?: string; // 密码加密
  userType: string; //是否为实习生 1——实习生
  nurseHierarchy: string;
}
