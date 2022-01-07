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
  nurseWHMonograph: '专著',
  nurseWHContinueStudy: '举办继续教育培训班',
  nurseWHLeave: '离职',
  nurseWHTransferPost: '岗位变动',
  nurseWHTitle: '职称变动',
  nurseWHHierarchy: '层级变动',
  nurseWHWorkConversion: '编制变动',
  nurseWHInformation: '基本信息',
  nurseWHWorkExperience: '院外工作经历',
  nurseWHInnaiWorkExperience: '院内工作经历', // todo
  nurseWHMedicalEducation: '医学学历教育',
  nurseWHRegistrationWork: '在院工作情况',
  nurseInnaiQualification: '院内工作资质',
  nurseOutQualification: '院外工作资质',
  nurseWardInnovate: '科室创新' // todo
}

let titleCE: any = reverseKeyValue(titleEC)

export const getTitle = (title: string) => {
  if (titleCE[title] || titleEC[title]) {
    return titleCE[title] || titleEC[title]
  } else {
    console.error('错误标题:', title)
  }
}
