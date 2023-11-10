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
  nurseWHWorkExperience: '工作经历',
  nurseWHMedicalEducation: '医学学历教育',
  nurseWHRegistrationWork: '在院工作情况',
  nurseWHChanges: '职务变动',
  nurseWHEduSanki: '继续教育及三基考试',
  nurseWHCarryOut: '新技术、新项目开展情况',
  nurseWHPunishment: '重大差错事故及惩罚',
  nurseWHRewardExperience: '立功嘉奖',

  NurseWHQualificationIn: '资质管理（院内）', // 审核的是开头大写
  nurseWHQualificationIn: '资质管理（院内）', // 我的档案是小写（哭）
  nurseWHQualificationOut: '资质管理（院外）',
  NurseWHQualificationOut: '资质管理（院外）', // 同院内资质一样的问题
}

let titleCE: any = reverseKeyValue(titleEC)

export const getTitle = (title: string) => {
  // console.log(title, 889)
  if (titleCE[title] || titleEC[title]) {
    return titleCE[title] || titleEC[title]
  } else {
    console.error('错误标题:', title)
  }
}
