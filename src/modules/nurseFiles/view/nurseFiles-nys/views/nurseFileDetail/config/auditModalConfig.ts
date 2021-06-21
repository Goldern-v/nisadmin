import { globalModal } from 'src/global/globalModal'

export function openAuditModal(title: string, row: any, getTableData: any) {

  switch (title) {
    case "基本信息": {
      return globalModal.auditModal.show({
        getTableData: getTableData,
        empNo: row.empNo,
        id: row.id,
        type: "nurseInformation",
        title: "审核基础信息",
        tableFormat: [
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
            护士执业证书编号: `zyzsNumber`,
            护士执业证书有效截止日期: `zyzsEffectiveUpDate`,
          },
          {
            技术职称: `newTitle`,
            身份证号: `cardNumber`,
          },
          {
            学术任职: `socialGroup`,
            手机号: `phone`,
          },
          {
            家庭住址: `address`,
            来院工作时间: "goHospitalWorkDate",
          },
          {
            工作编制: "workConversion",
            纳编时间: "enrolDate"
          },
          {
            是否返聘员工: "hireEmployees",
            第一学历: "firstDegree",
          },
          {
            开始从事护理时间: "zyzsNursingPostDate",
            获取执业证书开始时间: "zyzsDate"
          }
        ],
        fileData: [
          {
            个人头像: row.nearImageUrl
          },
          ...(row.zyzsUrl
            ? row.zyzsUrl.split(",").map((item: any, index: number) => {
              return {
                ["附件" + (index + 1)]: item
              };
            })
            : [])
        ],
        allData: row
      });
    }
    case "工作经历": {
      return globalModal.auditModal.show({
        getTableData: getTableData,
        empNo: row.empNo,
        id: row.id,
        type: "nurseWorkExperience",
        title: "审核工作经历",
        tableFormat: [
          {
            起始时间: `startTime`,
            结束时间: `endTime`
          },
          {
            单位: `unit`,
            专业技术工作: "professionalWork"
          },
          {
            技术职称: "professional",
            职务: "post"
          }
        ],
        allData: row
      });
    }
    case "特殊资格证": {
      return globalModal.auditModal.show({
        getTableData: getTableData,
        empNo: row.empNo,
        id: row.id,
        type: "nurseSpecialQualification",
        title: "审核特殊资格证",
        tableFormat: [
          {
            获得时间: `time`,
            资格名称: `specialQualificationName`
          },
          {
            资格证编号: `specialQualificationNo`
          }
        ],
        fileData: row.urlImageOne
          ? row.urlImageOne.split(",").map((item: any, index: number) => {
            return {
              ["附件" + (index + 1)]: item
            };
          })
          : [],
        allData: row
      });
    }
    case "教育经历": {
      return globalModal.auditModal.show({
        empNo: row.empNo,
        getTableData: getTableData,
        id: row.id,
        type: "nurseMedicalEducation",
        title: "审核教育经历",
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
        fileData: row.urlImageOne
          ? row.urlImageOne.split(",").map((item: any, index: number) => {
            return {
              ["附件" + (index + 1)]: item
            };
          })
          : [],
        allData: row
      });
    }
    case "职称及层级": {
      return globalModal.auditModal.show({
        empNo: row.empNo,
        getTableData: getTableData,
        id: row.id,
        type: "nurseProfessionalAndLevelChange",
        title: "审核职称及层级",
        tableFormat: [
          {
            职称聘用时间: `appointmentTime`,
            取得职称: `titleQualification`
          },
          {
            层级: `hierarchy`
          }
        ],
        fileData: row.urlImageOne
          ? row.urlImageOne.split(",").map((item: any, index: number) => {
            return {
              ["附件" + (index + 1)]: item
            };
          })
          : [],
        allData: row
      });
    }
    case "继续教育": {
      return globalModal.auditModal.show({
        empNo: row.empNo,
        getTableData: getTableData,
        id: row.id,
        type: "nurseContinuingEducation",
        title: "审核继续教育",
        tableFormat: [
          {
            开始时间: `startTime`,
            结束时间: `startTime`
          },
          {
            培训单位: `trainingUnit`,
            培训内容: `trainingContent`
          },
          {
            学习类型: `studyType`,
            学分: `credit`
          },
          {
            学时: `hours`,
          },
        ],
        fileData: row.urlImageOne
          ? row.urlImageOne.split(",").map((item: any, index: number) => {
            return {
              ["附件" + (index + 1)]: item
            };
          })
          : [],
        allData: row
      });
    }
    case '考核':
      return globalModal.auditModal.show({
        empNo: row.empNo,
        getTableData: getTableData,
        id: row.id,
        type: "nurseCheckFile",
        title: "审核考核",
        tableFormat: [
          {
            开始时间: 'startTime',
            结束时间: 'endTime',
          },
          {
            考核内容: 'checkContent',
            考核成绩: 'checkScore',
          },
        ],
        fileData: row.urlImageOne
          ? row.urlImageOne.split(",").map((item: any, index: number) => {
            return {
              ["附件" + (index + 1)]: item
            };
          })
          : [],
        allData: row
      })
    case '著作':
      return globalModal.auditModal.show({
        empNo: row.empNo,
        getTableData: getTableData,
        id: row.id,
        type: "nurseLiterature",
        title: "审核著作",
        tableFormat: [
          {
            登记号: 'registerNumber',
            作品名称: 'name',
          },
          {
            作品类型: 'types',
            著作权人: 'copyrightOwner',
          },
          {
            登记日期: 'registerDate',
            发表日期: 'publicDate',
          },
          {
            出版或刊登物: 'publishMaterial',
          },
        ],
        fileData: row.urlImageOne
          ? row.urlImageOne.split(",").map((item: any, index: number) => {
            return {
              ["附件" + (index + 1)]: item
            };
          })
          : [],
        allData: row
      })
    case '论文':
      return globalModal.auditModal.show({
        empNo: row.empNo,
        getTableData: getTableData,
        id: row.id,
        type: "nursePaper",
        title: "审核论文",
        tableFormat: [
          {
            论文类别: 'types',
            论文名称: 'name',
          },
          {
            发表日期: 'publicDate',
            作者: 'owner',
          },
          {
            本人排名: 'range',
            出版或刊登物: 'publishMaterial',
          },
        ],
        fileData: row.urlImageOne
          ? row.urlImageOne.split(",").map((item: any, index: number) => {
            return {
              ["附件" + (index + 1)]: item
            };
          })
          : [],
        allData: row
      })
    case "所获奖励": {
      return globalModal.auditModal.show({
        empNo: row.empNo,
        getTableData: getTableData,
        id: row.id,
        type: "nurseAwardWinning",
        title: "审核所获奖励",
        tableFormat: [
          {
            获奖时间: `time`,
            奖项名称: `awardWinningName`
          },
          {
            本人排名: `rank`,
            奖项级别: `awardlevel`
          },
          {
            授奖机构: `approvalAuthority`
          }
        ],
        fileData: row.urlImageOne
          ? row.urlImageOne.split(",").map((item: any, index: number) => {
            return {
              ["附件" + (index + 1)]: item
            };
          })
          : [],
        allData: row
      });
    }
    case "年度考核结果": {
      return globalModal.auditModal.show({
        empNo: row.empNo,
        getTableData: getTableData,
        id: row.id,
        type: "nurseYearCheck",
        title: "审核年度考核结果",
        tableFormat: [
          {
            年度: `year`,
            考核结果: `checkResult`
          }
        ],
        fileData: row.urlImageOne
          ? row.urlImageOne.split(",").map((item: any, index: number) => {
            return {
              ["附件" + (index + 1)]: item
            };
          })
          : [],
        allData: row
      });
    }
    case "医院三基考核": {
      return globalModal.auditModal.show({
        empNo: row.empNo,
        getTableData: getTableData,
        id: row.id,
        type: "nurseHospitalsThreeBase",
        title: "审核医院三基考核",
        tableFormat: [
          {
            年度: `year`,
            理论考核成绩_分: `theoryScore`
          },
          {
            操作考核成绩_分: `technologyScore`
          }
        ],
        fileData: row.urlImageOne
          ? row.urlImageOne.split(",").map((item: any, index: number) => {
            return {
              ["附件" + (index + 1)]: item
            };
          })
          : [],
        allData: row
      });
    }
    case "工作情况登记": {
      return globalModal.auditModal.show({
        empNo: row.empNo,
        getTableData: getTableData,
        id: row.id,
        type: "nurseRegistrationWork",
        title: "审核工作情况登记",
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
      });
    }
    case "附件": {
      return globalModal.auditModal.show({
        empNo: row.empNo,
        getTableData: getTableData,
        id: row.id,
        type: "nurseAttachment",
        title: "附件审核",
        tableFormat: [],
        fileData: row.path
          ? row.path.split(",").map((item: any, index: number) => {
            return {
              ["附件" + (index + 1)]: item
            };
          })
          : [],
        allData: row
      });
    }
    case '外出进修':
      {
        return globalModal.auditModal.show({
          empNo: row.empNo,
          getTableData: getTableData,
          id: row.id,
          type: 'nurseOutStudy',
          title: '审核外出进修',
          tableFormat: [
            {
              进修专业: `studyMajor`,
              进修单位: `unit`
            },
            {
              进修单位所属地: `unitLocal`,
              进修开始时间: `startDate`
            },
            {
              进修结束时间: `endDate`,
              '进修时长(天)': `studyHour`
            }
          ],
          fileData: row.urlImageOne
            ? row.urlImageOne.split(',').map((item: any, index: number) => {
              return {
                ['附件' + (index + 1)]: item
              }
            })
            : [],
          allData: row
        })
      }
    case '专科护士':
      {
        return globalModal.auditModal.show({
          empNo: row.empNo,
          getTableData: getTableData,
          id: row.id,
          type: 'nurseJuniorSpecialFile',
          title: '审核专科护士',
          tableFormat: [
            {
              获得时间: `time`,
              文件类型: `specialFileName`
            }
          ],
          fileData: row.urlImageOne
            ? row.urlImageOne.split(',').map((item: any, index: number) => {
              return {
                ['附件' + (index + 1)]: item
              }
            })
            : [],
          allData: row
        })
      }
  }
}
