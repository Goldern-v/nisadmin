import { reverseKeyValue } from 'src/utils/object/object'

let titleEC: any = {
  NurseInformation: '基本信息',
  NurseWorkExperience: '工作经历',
  NurseProfessionalAndLevelChange: '职称及层级',
  NurseMedicalEducation: '教育经历',
  NurseContinuingEducation: '继续教育',
  NurseLiterature: '著作',
  NursePaper: '论文',
  NurseAwardWinning: '所获奖励',
  NurseCheckFile: '考核',
  NurseRegistrationWork: '工作情况登记',
  NurseJuniorSpecialFile: '专科护士',
  NurseOutStudy: '外出进修',
}

let titleCE: any = reverseKeyValue(titleEC)

export const getTitle = (title: string) => {
  if (titleCE[title] || titleEC[title]) {
    return titleCE[title] || titleEC[title]
  } else {
    console.error('错误标题:', title)
  }
}
