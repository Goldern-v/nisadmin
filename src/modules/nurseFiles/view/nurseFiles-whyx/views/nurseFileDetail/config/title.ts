import { reverseKeyValue } from 'src/utils/object/object'

let titleEC: any = {
  nurseWHArticle: '文章',
  nurseWHPersonWinning: '个人获奖',
  nurseWHSpecializNurse: '专科护士',
  nurseWHOutStudy: '外出进修',
  nurseWHHostScienceCourse: '主持科研课题',
  nurseWHGoScienceCourse: '参与科研课题',
  nurseWHScienceResult: '科研课题获奖',
  nurseWHPatent: '专利',
  nurseWHLearnJob: '学会任职',
  nurseWHSocialJob: '社会兼职',
  nurseWHMonograph: '专著',
  nurseWHContinueStudy: '举办继续教育培训班',
  nurseWHLeave: '离职',
  nurseWHTransferPost: '岗位变动',
  nurseWHTitle: '职称变动',
  nurseWHHierarchy: '层级变动',
  nurseWHWorkConversion: '编制变动',
  nurseWHInformation: '基本信息',
  nurseWHWorkExperienceOut: '院外工作经历',
  nurseWHWorkExperienceIn: '院内工作经历',
  // nurseWHWorkExperience: '院外工作经历',
  nurseWHMedicalEducation: '医学学历教育',
  nurseWHRegistrationWork: '在院工作情况',
  NurseWHQualificationIn: '院内工作资质', // 审核的是开头大写
  nurseWHQualificationIn: '院内工作资质', // 我的档案是小写（哭）
  nurseWHQualificationOut: '院外工作资质',
  NurseWHQualificationOut: '院外工作资质', // 同院内资质一样的问题
  nurseWHInnovationDept: '科室创新',
  NurseWHInnovationDept: '科室创新', // 同院内资质一样的问题
  // NurseWHPersonStatus: '人员状态',
  // nurseWHPersonStatus: '人员状态'
}

let titleCE: any = reverseKeyValue(titleEC)

export const getTitle = (title: string) => {
  if (titleCE[title] || titleEC[title]) {
    return titleCE[title] || titleEC[title]
  } else {
    console.error('错误标题:', title)
  }
}
