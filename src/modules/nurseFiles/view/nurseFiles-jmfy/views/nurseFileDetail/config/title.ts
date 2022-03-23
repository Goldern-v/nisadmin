import { reverseKeyValue } from 'src/utils/object/object'

let titleEC: any = {
  User: '基本信息',
  NurseWorkExperience: '工作经历',
  NurseSpecialQualification: '特殊资格证',
  NurseMedicalEducation: '教育经历',
  NurseProfessionalAndLevelChange: '职称及层级变动',
  NurseContinuingEducation: '继续教育',
  NursePaperExperience: '著作译文论文',
  NurseAwardWinning: '所获奖励',
  NurseYearCheck: '年度考核结果',
  NurseHospitalsThreeBase: '医院三基考核',
  NurseRegistrationWork: '工作情况登记',
  NurseJuniorSpecialFile: '专科护士',
  NurseAttachment: '附件',
  NurseOutStudy: '外出进修',
  NurseJMFYRotatingDepartment: '轮科经历'
}

let titleCE: any = reverseKeyValue(titleEC)

export const getTitle = (title: string) => {
  if (titleCE[title] || titleEC[title]) {
    return titleCE[title] || titleEC[title]
  } else {
    console.error('错误标题:', title)
  }
}
