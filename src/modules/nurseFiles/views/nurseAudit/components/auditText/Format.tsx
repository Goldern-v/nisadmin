import { globalModal } from 'src/global/globalModal'

export default function Format(row: any, getTableData: any) {
  switch (row.typeName) {
    case '基本信息': {
      return globalModal.auditModal.show({
        getTableData: getTableData,
        empNo: row.empNo,
        id: row.id,
        type: 'nurseInformation',
        // empNo: appStore.queryObj.empNo,
        title: '审核基础信息',
        tableFormat: [
          //
          {
            姓名: `empName`,
            工号: `empNo`
          },
          {
            性别: `sex`,
            民族: `nation`
          },
          {
            出生年月: `birthday`,
            年龄: `age`
          },
          {
            籍贯: `nativePlace`,
            职务: `job`
          },
          {
            参加工作时间: `goWorkTime`,
            最高学历: `highestEducation`
          },
          {
            技术职称: `newTitle`,
            护士执业证书编号: `zyzsNumber`
          },
          {
            身份证号: `cardNumber`,
            社会团体职务: `socialGroup`
          },
          {
            联系电话: `phone`,
            家庭住址: `address`
          },
          //
          {
            获得时间: `empName`,
            资格名称: `birthday`
          }
          // {
          //   资格证编号: `age`
          // }
        ],
        // fileData: [
        //   {
        //     附件1: info.urlImageOne,
        //     附件2: 'bbb'
        //   }
        // ],
        allData: row
      })
    }
    case '工作经历': {
      return globalModal.auditModal.show({
        getTableData: getTableData,
        id: row.id,
        type: 'nurseWorkExperience',
        title: '审核工作经历',
        tableFormat: [
          {
            起始时间: `startTime`,
            结束时间: `endTime`
          },
          {
            工作单位: `unit`,
            专业技术工作: 'professionalWork'
          },
          {
            技术职称: 'professional',
            职务: 'post'
          }
        ],
        allData: row
      })
    }
    case '特殊资格证': {
      return globalModal.auditModal.show({
        getTableData: getTableData,
        id: row.id,
        type: 'nurseSpecialQualification',
        title: '审核特殊资格证',
        tableFormat: [
          {
            获得时间: `time`,
            资格名称: `specialQualificationName`
          },
          {
            资格证编号: `specialQualificationNo`
          }
        ],
        fileData: [
          {
            附件1: row.urlImageOne
          }
        ],
        allData: row
      })
    }
    case '教育经历': {
      return globalModal.auditModal.show({
        id: row.id,
        type: 'nurseMedicalEducation',
        title: '审核教育经历',
        tableFormat: [
          {
            就读时间: `readTime`,
            毕业时间: `graduationTime`
          },
          {
            毕业学校: `graduationSchool`,
            专业: `readProfessional`
          },
          {
            学历: `education`
          }
        ],
        fileData: [
          {
            毕业证: row.urlImageOne,
            学位证: row.urlImageTwo
          }
        ],
        allData: row
      })
    }
    case '职称及层级变动': {
      return globalModal.auditModal.show({
        getTableData: getTableData,
        id: row.id,
        type: 'nurseProfessionalAndLevelChange',
        title: '审核职称及层级变动',
        tableFormat: [
          {
            职称聘用时间: `appointmentTime`,
            取得职称: `titleQualification`
          },
          {
            层级: `hierarchy`
          }
        ],
        fileData: [
          {
            附件1: row.urlImageOne
          }
        ],
        allData: row
      })
    }
    case '继续教育': {
      return globalModal.auditModal.show({
        getTableData: getTableData,
        id: row.id,
        type: 'nurseContinuingEducation',
        title: '审核继续教育',
        tableFormat: [
          {
            开始时间: `startTime`,
            结束时间: `startTime`
          },
          {
            培训单位: `trainingUnit`,
            培训内容: `trainingContent`
          }
        ],
        fileData: [
          {
            附件1: row.urlImageOne
          }
        ],
        allData: row
      })
    }
    case '著作译文论文': {
      return globalModal.auditModal.show({
        getTableData: getTableData,
        id: row.id,
        type: 'nursePaperExperience',
        title: '审核著作译文论文',
        tableFormat: [
          {
            发表日期: `publicDate`,
            题目: `title`
          },
          {
            本人排名: `rank`,
            出版或刊登物: `publication`
          }
        ],
        fileData: [
          {
            附件1: row.urlImageOne
          }
        ],
        allData: row
      })
    }
    case '所获奖励': {
      return globalModal.auditModal.show({
        getTableData: getTableData,
        id: row.id,
        type: 'nurseAwardWinning',
        title: '审核所获奖励',
        tableFormat: [
          {
            时间: `time`,
            获奖_推广创新项目名称: `awardWinningName`
          },
          {
            本人排名: `rank`,
            授奖级别: `awardlevel`
          },
          {
            批准机关: `approvalAuthority`
          }
        ],
        fileData: [
          {
            附件1: row.urlImageOne
          }
        ],
        allData: row
      })
    }
    case '年度考核结果': {
      return globalModal.auditModal.show({
        getTableData: getTableData,
        id: row.id,
        type: 'nurseYearCheck',
        title: '审核年度考核结果',
        tableFormat: [
          {
            年度: `year`,
            考核结果: `checkResult`
          }
        ],
        fileData: [
          {
            附件1: row.urlImageOne
          }
        ],
        allData: row
      })
    }
    case '医院三基考核': {
      return globalModal.auditModal.show({
        getTableData: getTableData,
        id: row.id,
        type: 'nurseHospitalsThreeBase',
        title: '审核医院三基考核',
        tableFormat: [
          {
            年度: `year`,
            理论考核成绩_分: `theoryScore`
          },
          {
            操作考核成绩_分: `technologyScore`
          }
        ],
        fileData: [
          {
            附件1: row.urlImageOne
          }
        ],
        allData: row
      })
    }
    case '工作情况登记': {
      return globalModal.auditModal.show({
        getTableData: getTableData,
        id: row.id,
        type: 'nurseRegistrationWork',
        title: '审核工作情况登记',
        tableFormat: [
          {
            年度: `year`,
            夜班: `nightShift`
          },
          {
            查房: `checkOut`,
            护理会诊: `nursingConsultation`
          },
          {
            病例讨论: `caseDiscussion`,
            个案: `individualCase`
          },
          {
            小讲课: `lecture`,
            带教: `teaching`
          },
          {
            证明人: `witness`
          }
        ],
        // fileData: [{}],
        allData: row
      })
    }
    case '附件': {
      return globalModal.auditModal.show({
        getTableData: getTableData,
        id: row.id,
        type: 'nurseAttachment',
        title: '附件审核',
        tableFormat: [],
        fileData: [
          {
            附件1: row.path
          }
        ],
        allData: row
      })
    }
  }
}
