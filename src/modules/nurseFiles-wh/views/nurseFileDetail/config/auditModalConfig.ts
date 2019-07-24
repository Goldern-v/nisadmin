import { globalModal } from 'src/global/globalModal'

export function openAuditModal(title: string, row: any, callBack: any) {
  switch (title) {
    case '文章':
      {
        globalModal.auditModal.show({
          getTableData: callBack,
          id: row.id,
          type: 'nurseWHArticle',
          title: '审核文章',
          tableFormat: [
            {
              发表年份: `publicYear`,
              杂志名称: `magazineName`
            },
            {
              文章名称: `articleName`,
              期刊号: `periodicalNumber`
            },
            {
              卷号: `volumeNumber`,
              起止页码: `pageNumber`
            },
            {
              文章类别: `articleType`,
              论文收录网站: `influencingFactors`
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
      break
    case '所获奖励':
      {
        globalModal.auditModal.show({
          getTableData: callBack,
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
      break
    case '继续教育':
      {
        globalModal.auditModal.show({
          getTableData: callBack,
          id: row.id,
          type: 'nurseWHContinueStudy',
          title: '审核继续教育信息',
          tableFormat: [
            {
              年份: `year`,
              继续教育项目负责人: `projectPerson`
            },
            {
              项目名称: `projectName`,
              项目号: `projectNumber`
            },
            {
              项目级别: `projectLevel`,
              课时数: `courseHour`
            },
            {
              学员总数: `personTotal`,
              学院分布区域: `schoolArea`
            },
            {
              学院职称分布: `personTitleArea`
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
      break
    case '医学学历教育':
      {
        globalModal.auditModal.show({
          getTableData: callBack,
          id: row.id,
          type: 'nurseWHMedicalEducation',
          title: '审核医学学历教育',
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
            ? row.urlImageOne.split(',').map((item: any, index: number) => {
                return {
                  ['附件' + (index + 1)]: item
                }
              })
            : [],
          allData: row
        })
      }
      break
    case '主持科研课题':
      {
        globalModal.auditModal.show({
          getTableData: callBack,
          id: row.id,
          type: 'nurseWHHostScienceCourse',
          title: '审核主持科研课题',
          tableFormat: [
            {
              主持课题名称: `name`,
              课题来源: `courseSource`
            },
            {
              课题级别: `courseLevel`,
              承担单位: `unit`
            },
            {
              课题批文号: `approvalNumber`,
              登记号: `registerNumber`
            },
            {
              授予单位: `grantUnit`,
              开始时间: `startDate`
            },
            {
              结束时间: `endDate`,
              完成情况: `courseCompletion`,
              '立项/结题/验收/鉴定时间': `completionDate`
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
      break
    case '参与科研课题':
      {
        globalModal.auditModal.show({
          getTableData: callBack,
          id: row.id,
          type: 'nurseWHGoScienceCourse',
          title: '审核参与信息',
          tableFormat: [
            {
              参于课题名称: `goName`,
              课题主持人姓名: `hostName`
            },
            {
              课题主持人工号: `hostNo`,
              参与排名: `goRank`
            },
            {
              课题来源: `courseSource`,
              课题级别: `courseLevel`
            },
            {
              承担单位: `unit`,
              课题批文号: `approvalNumber`
            },
            {
              登记号: `registerNumber`,
              授予单位: `grantUnit`
            },
            {
              完成情况: `courseCompletion`,
              开始时间: `startDate`
            },
            {
              结束时间: `endDate`,
              '立项/结题/验收/鉴定时间': `completionDate`
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
      break
    case '学会任职':
      {
        globalModal.auditModal.show({
          getTableData: callBack,
          id: row.id,
          type: 'nurseWHLearnJob',
          title: '审核学会任职',
          tableFormat: [
            {
              任职学会名称: `learnJobName`,
              学会职位: `learnPosition`
            },
            {
              学会级别: `learnLevel`,
              起始时间: `startDate`
            },
            {
              结束时间: `endDate`
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
      break
    case '离职':
      {
        globalModal.auditModal.show({
          getTableData: callBack,
          id: row.id,
          type: 'nurseWHLeave',
          title: '审核离职',
          tableFormat: [
            {
              职称: `title`,
              学历: `education`
            },
            {
              出生日期: `birthday`,
              年龄: `age`
            },
            {
              取得护士执业资格证书时间并从事护理岗位时间: `zyzsDate`,
              离职时间: `leaveDate`
            },
            {
              层级: `hierarchy`
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
      break
    case '专著':
      {
        globalModal.auditModal.show({
          getTableData: callBack,
          id: row.id,
          type: 'nurseWHMonograph',
          title: '审核专著',
          tableFormat: [
            {
              年份: 'year',
              专著名称: `monographName`
            },
            {
              出版社名称: `pressName`,
              出版号: `pressNumber`
            },
            {
              出版日期: `pressDate`,
              参编: `participation`
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
      break
    case '外出进修':
      {
        globalModal.auditModal.show({
          getTableData: callBack,
          id: row.id,
          type: 'nurseWHOutStudy',
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
              进修时长: `studyHour`
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
      break
    case '编制变动':
      {
        globalModal.auditModal.show({
          getTableData: callBack,
          id: row.id,
          type: 'nurseWHWorkConversion',
          title: '审核编制变动信息',
          tableFormat: [
            {
              开始时间: `startDate`,
              结束时间: `endDate`
            },
            {
              现编制: `workConversion`
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
      break
    case '专利':
      {
        globalModal.auditModal.show({
          getTableData: callBack,
          id: row.id,
          type: 'nurseWHPatent',
          title: '审核专利',
          tableFormat: [
            {
              专利名称: `patentName`,
              专利号: `patentNumber`
            },
            {
              发证单位: `cardUnit`,
              发证时间: `cardDate`
            },
            {
              专利类型: `patentType`,
              是否成果转化: `isResultTransfor`
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
      break
    case '个人获奖':
      {
        globalModal.auditModal.show({
          getTableData: callBack,
          id: row.id,
          type: 'nurseWHPersonWinning',
          title: '审核个人获奖',
          tableFormat: [
            {
              获奖名称: `winningName`,
              获奖类别: `winningType`
            },
            {
              获奖级别: `winningLevel`,
              获奖年份: `winningYear`
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
      break
    case '职称变动':
      {
        globalModal.auditModal.show({
          getTableData: callBack,
          id: row.id,
          type: 'nurseWHTitle',
          title: '审核职称变动信息',
          tableFormat: [
            {
              开始时间: `startDate`,
              结束时间: `endDate`
            },
            {
              现职称: `title`
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
      break
    case '岗位变动':
      {
        globalModal.auditModal.show({
          getTableData: callBack,
          id: row.id,
          type: 'nurseWHPersonWinning',
          title: '审核岗位变动信息',
          tableFormat: [
            {
              开始时间: `startDate`,
              结束时间: `endDate`
            },
            {
              现岗位: ``
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
      break
    case '层级变动':
      {
        globalModal.auditModal.show({
          getTableData: callBack,
          id: row.id,
          type: 'nurseWHHierarchy',
          title: '审核层级变动信息',
          tableFormat: [
            {
              开始时间: `startDate`,
              结束时间: `endDate`
            },
            {
              现层级: `nursehierarchy`
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
      break
    case '科研课题成果':
      {
        globalModal.auditModal.show({
          getTableData: callBack,
          id: row.id,
          type: 'nurseWHScienceResult',
          title: '审核科研课题成果',
          tableFormat: [
            {
              获奖类别: `resultType`,
              成果名称: `resultName`
            },
            {
              属于单位: `grantUnit`,
              授予时间: `grantDate`
            },
            {
              奖励级别: `winningLevel`,
              奖励名称: `winningName`
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
      break
    case '专科护士':
      {
        globalModal.auditModal.show({
          getTableData: callBack,
          id: row.id,
          type: 'nurseWHSpecializNurse',
          title: '审核专科护士信息',
          tableFormat: [
            {
              专科护士名称: `nurseName`,
              发证单位: `cardUnit`
            },
            {
              证书编号: `cardNumber`,
              专科护士级别: `nurseLevel`
            },
            {
              发证时间: `cardNumberDate`
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
      break
    case '岗位变动':
      {
        globalModal.auditModal.show({
          getTableData: callBack,
          id: row.id,
          type: 'nurseWHTransferPost',
          title: '审核岗位变动信息',
          tableFormat: [
            {
              原工作室: `oldDeptName`,
              现工作室: `newDeptName`
            },
            {
              岗位变动时间: `transferDate`
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
      break
    case '工作经历':
      {
        globalModal.auditModal.show({
          getTableData: callBack,
          id: row.id,
          type: 'nurseWHWorkExperience',
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
      break
    case '临床护理工作情况登记表':
      {
        globalModal.auditModal.show({
          getTableData: callBack,
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
      break
  }
}
