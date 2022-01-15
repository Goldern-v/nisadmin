import { globalModal } from 'src/global/globalModal'
import { appStore } from 'src/stores'

export function openAuditModal(title: string, row: any, callBack: any) {
  switch (title) {
    case '基本信息':
      {
        globalModal.auditModal.show({
          empNo: row.empNo || row.commiterNo,
          id: row.id,
          type: 'nurseWHInformation',
          getTableData: callBack,
          title: '审核基础信息',
          tableFormat: [
            {
              民族: 'nation',
              籍贯: 'nativePlace',
            },
            {
              工号: 'empNo',
              身份证号: 'cardNumber',
            },
            {
              政治面貌: 'politicsLook',
              出生年月: 'birthday',
            },
            {
              年龄: 'age',
              婚姻状况: 'maritalstatus',
            },
            {
              生育情况: 'fertility',
              手机号: 'phone',
            },
            {
              现住址: 'address',
              参加工作时间: 'takeWorkTime',
            },
            {
              最近入职时间: 'hiredate',
              来院工作时间: 'goHospitalWorkDate',
            },
            {
              护士执业证书编号: 'zyzsNumber',
              取得护士执业证书时间: 'zyzsDate',
            },
            {
              本院注册时间: 'registerdate',
              护士执业证书有效期: 'zyzsEffectiveUpDate',
            },
            {
              取得执业证书并从事护理岗位时间: 'zyzsNursingPostDate',
              初始学历: 'initialEducation',
            },
            {
              最高学历: 'highestEducation',
              取得最高学历时间: 'highestEducationDate',
            },
            {
              最高学位: 'highestEducationDegree',
              最高职称: 'newTitle',
            },
            {
              评职日期: 'employNewTiTleDate',
              职务: 'job',
              // 现职务任职起始时间: jobStartDate,
            },
            {
              现职务任职起始时间: 'jobStartDate',
              护理层级: 'nursingLevel',
            },
            {
              护理层级起始时间: 'nursingLevelStartDate',
              院内工作区域: 'workAddress',
            },
            {
              工作护理单元: 'deptName',
              鞋码大小: 'shoeSize',
            },
            {
              工作服码数: 'workClothesSize',
            },
            {
              部门类型: 'depttype',
              人员类别: 'emptype'
            },
            {
              职工类型: 'worktype',
              是否已转正: 'formalemp'
            },
            {
              合同类型: 'contracttype',
              合同到期时间: 'contractexdate'
            }

          ],
          // table:,
          fileData: [
            {
              个人头像: row.nearImageUrl
            },
            ...(row.zyzsUrl
              ? row.zyzsUrl.split(',').map((item: any, index: number) => {
                return {
                  ['执业证书' + (index + 1)]: item
                }
              })
              : [])
          ],
          allData: row
        })
      }
      break
    case '人员状态':
      {
        globalModal.auditModal.show({
          empNo: row?.empNo || row?.commiterNo,
          id: row.id,
          type: 'nurseWHPersonStatus',
          getTableData: callBack,
          title: '审核人员状态',
          tableFormat: [
            {
              岗位状态: 'status',
              状态原因: 'reason'
            },

          ],
          allData: row
        })
      }
      break
    case '文章':
      {
        globalModal.auditModal.show({
          getTableData: callBack,
          empNo: row.empNo || row.commiterNo,
          id: row.id,
          type: 'nurseWHArticle',
          title: '审核文章',
          tableFormat: [
            {
              杂志名称: `magazineName`,
              文章名称: `articleName`,
            },
            {
              期刊年月: 'journal',
              作者: `articleAuthor`,
            },
            {
              卷期号: `volumeNumber`,
              起止页码: `pageNumber`,
            },
            {
              
              文章类别: `articleType`,
              论文收录网站: `influencingFactors`,
            },
          ],
          fileFormat: {
            封面扫描件: `urlImageOne`,
            目录扫描件: `urlImageThree`,
            正文扫描件: `urlImageFour`,
            封底扫描件: `urlImageFive`,
            网络下载件: `urlImageTwo`,
          },
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
          empNo: row.empNo || row.commiterNo,
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
    case '举办继续教育培训班':
      {
        globalModal.auditModal.show({
          getTableData: callBack,
          id: row.id,
          empNo: row.empNo || row.commiterNo,
          type: 'nurseWHContinueStudy',
          title: '审核举办继续教育培训班',
          tableFormat: [
            {
              项目名称: `projectName`,
              项目负责人: `projectPerson`
            },
            {
              举办开始时间: `hostStartDate`,
              举办结束时间: `hostEndDate`,
            },
            {
              // 项目级别: `projectLevel`,
              学员职称分布: `personTitleArea`,
              课时数: `courseHour`
            },
            {
              学员总数: `personTotal`,
              学员分布区域: `schoolArea`
            },
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
          empNo: row.empNo || row.commiterNo,
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
              就读学历: `education`,
              学位: `degree`
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
          empNo: row.empNo || row.commiterNo,
          type: 'nurseWHHostScienceCourse',
          title: '审核主持科研课题',
          tableFormat: [
            {
              主持科研课题: `name`,
              课题来源: `courseSource`
            },
            {
              课题级别: `courseLevel`,
              课题类别: `subjectType`
            },
            {
              承担单位: `unit`,
              课题批文号: `approvalNumber`,
            },
            {
              登记号: `registerNumber`,
              开始时间: `startDate`,
              // 授予单位: `grantUnit`,
            },
            {
              截止时间: `endDate`,
              完成情况: `courseCompletion`,
            },
            {
              时间: `completionDate`
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
          empNo: row.empNo || row.commiterNo,
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
              截止时间: `endDate`,
              时间: `completionDate`
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
          empNo: row.empNo || row.commiterNo,
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
          empNo: row.empNo || row.commiterNo,
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
              取得护士执业证书时间并从事护理岗位时间: `zyzsDate`,
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
          empNo: row.empNo || row.commiterNo,
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
              著者: `participation`
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
          empNo: row.empNo || row.commiterNo,
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
      break
    case '编制变动':
      {
        globalModal.auditModal.show({
          getTableData: callBack,
          id: row.id,
          empNo: row.empNo || row.commiterNo,
          type: 'nurseWHWorkConversion',
          title: '审核编制变动信息',
          tableFormat: [
            {
              现编制开始时间: `startDate`,
              原编制名称: `workConversionOld`
            },
            {
              现编制名称: `workConversionNew`
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
          empNo: row.empNo || row.commiterNo,
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
            },
            {
              专利个人排名: `patentLevel`,
              授权公告日: `grantNoticeDate`
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
          empNo: row.empNo || row.commiterNo,
          type: 'nurseWHPersonWinning',
          title: '审核个人获奖',
          tableFormat: [
            {
              奖项名称: `winningName`,
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
          empNo: row.empNo || row.commiterNo,
          type: 'nurseWHTitle',
          title: '审核职称变动信息',
          tableFormat: [
            {
              原职称名称: `titleOld`,
              现职称名称: `titleNew`
            },
            {
              考取专业资格证书时间: `winNewTiTleDate`,
              聘用专业技术资格时间: `employNewTiTleDate`
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
          empNo: row.empNo || row.commiterNo,
          type: 'nurseWHTransferPost',
          title: '审核岗位变动信息',
          tableFormat: [
            {
              原工作科室: `oldDeptName`,
              现工作科室: `newDeptName`
            },
            {
              现科室隶属部门: `deptBeDepartment`,
              转岗时间: `transferDate`
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
          empNo: row.empNo || row.commiterNo,
          type: 'nurseWHHierarchy',
          title: '审核层级变动信息',
          tableFormat: [
            {
              原层级名称: `nursehierarchyOld`,
              现层级名称: `nursehierarchyNew`
            },
            {
              现层级开始时间: `startDate`
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
    case '科研课题获奖':
      {
        globalModal.auditModal.show({
          getTableData: callBack,
          id: row.id,
          empNo: row.empNo || row.commiterNo,
          type: 'nurseWHScienceResult',
          title: '审核科研课题获奖',
          tableFormat: [
            {
              获奖类别: `resultType`,
              成果名称: `resultName`
            },
            {
              授予单位: `grantUnit`,
              授予时间: `grantDate`
            },
            {
              奖励级别: `winningLevel`,
              '奖励名称、等级': `winningName`
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
          empNo: row.empNo || row.commiterNo,
          type: 'nurseWHSpecializNurse',
          title: '审核专科护士信息',
          tableFormat: [
            {
              专科护士名称: `nurseName`,
              发证单位: `cardUnit`
            },
            {
              证书编号: `cardNumber`,
              级别: `nurseLevel`
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
          empNo: row.empNo || row.commiterNo,
          type: 'nurseWHTransferPost',
          title: '审核岗位变动信息',
          tableFormat: [
            {
              原工作室: `oldDeptName`,
              现工作室: `newDeptName`
            },
            {
              转岗时间: `transferDate`
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
    // case '院外工作经历':
    //   {
    //     globalModal.auditModal.show({
    //       getTableData: callBack,
    //       id: row.id,
    //       empNo: row.empNo || row.commiterNo,
    //       type: 'nurseWHWorkExperience',
    //       title: '审核院外工作经历',
    //       tableFormat: [
    //         {
    //           开始时间: `startTime`,
    //           '结束时间(空则为至今)': `endTime`
    //         },
    //         {
    //           单位: `unit`,
    //           科室: 'department'
    //         }
    //       ],

    //       allData: row
    //     })
    //   }
    //   break
    case '工作经历':
      {
        globalModal.auditModal.show({
          getTableData: callBack,
          id: row.id,
          empNo: row.empNo || row.commiterNo,
          type: 'nurseWHWorkExperience',
          title: '审核工作经历',
          tableFormat: [
            {
              开始时间: `startTime`,
              '结束时间(空则为至今)': `endTime`
            },
            {
              单位: `unit`,
              科室: 'department'
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
          empNo: row.empNo || row.commiterNo,
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
    case '院外工作资质':
      {
        globalModal.auditModal.show({
          getTableData: callBack,
          id: row.id,
          empNo: row.empNo || row.commiterNo,
          type: 'nurseWHQualificationOut', // todo
          title: '审核工作情况登记',
          tableFormat: [
            {
              证书名称: `certificateName`,
              级别: `grade`
            },
            {
              发证单位: `issueUnit`,
              发证时间: `issueDate`
            },
            {
              证书编号: `certificateNo`,
              证书有效期: `validityDate`
            }
          ],
          fileData: row.urlImageOne
            ? row.urlImageOne.split(',').map((item: any, index: number) => {
              return {
                ['附件' + (index + 1)]: item
              }
            })
            : [],
          // fileData: [{}],
          allData: row
        })
      }
      break
    case '院内工作资质':
      {
        globalModal.auditModal.show({
          getTableData: callBack,
          id: row.id,
          empNo: row.empNo || row.commiterNo,
          type: 'nurseWHQualificationIn',
          title: '审核工作情况登记',
          tableFormat: [
            {
              授权类别: `grantType`,
              授权名称: `grantName`
            },
            {
              认证部门: `certificateUnit`,
              认证时间: `certificateDate`
            },
            {
              证书编号: `certificateNo`,
              有效期: `validityDate`
            }
          ],
          fileData: row.urlImageOne
            ? row.urlImageOne.split(',').map((item: any, index: number) => {
              return {
                ['附件' + (index + 1)]: item
              }
            })
            : [],
          // fileData: [{}],
          allData: row
        })
      }
      break
    case '科室创新':
      {
        globalModal.auditModal.show({
          empNo: row.empNo || row.commiterNo,
          id: row.id,
          type: 'nurseWHInnovationDept', // todo
          getTableData: callBack,
          title: '审核基础信息',
          tableFormat: [
            {
              申报人: 'declarant',
              申报科室: 'declarantDeptName',
            },
            {
              申报时间: 'declarantDate',
              登记单位: 'registerUnit',
            },
            {
              登记号: 'registerNo',
              参与成员: 'participants',
            },
            {
              创新类别: 'innovationType',
              创新级别: 'innovationGrade',
            },
            {
              推广区域: 'promotionArea',
            },
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
    
  }
}
