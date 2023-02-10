import { globalModal } from 'src/global/globalModal'
import { Obj } from 'src/libs/types'
import { appStore } from 'src/stores'
const isSdljText = 'sdlj,nfsd,qzde'
const isSdlj = ['sdlj', 'nfsd', 'qzde'].includes(appStore.HOSPITAL_ID)
export function openAuditModal(title: string, row: any, callBack: any,btnText?:string) {
  switch (title) {
    case '基本信息':
      {
        globalModal.auditModal.show({
          empNo: row.empNo || row.commiterNo,
          id: row.id,
          type: 'nurseWHInformation',
          getTableData: callBack,
          title: '审核基础信息',
          btnText:btnText || '',
          tableFormat: (() => {
            switch(appStore.HOSPITAL_ID) {
              case 'fsxt':
                return [
                  {
                    "民族": 'nation',
                    "籍贯": 'nativePlace',
                  },
                  {
                    "工号": 'empNo',
                    "身份证号": 'cardNumber',
                  },
                  {
                    "政治面貌": 'politicsLook',
                    "出生年月": 'birthday',
                  },
                  {
                    "年龄": 'age',
                    "手机号": 'phone',
                  },
                  {
                    "参加工作时间": 'goWorkTime',
                    "来院工作时间": 'goHospitalWorkDate',
                  },
                  {
                    "护士执业证书编号": 'zyzsNumber',
                    "取得护士执业证书时间": 'zyzsDate',
                  },
                  {
                    "取得执业证书并从事护理岗位时间": 'zyzsNursingPostDate',
                    "最高学历": 'highestEducation',
                  },
                  {
                    "职务": 'job',
                    "现职务任职起始时间": 'jobStartDate',
                  },
                  {
                    "工作护理单元": 'deptName',
                    "鞋码": 'shoeSize',
                  },
                  ...appStore.hisMatch({
                    map: {
                      925: [
                        {
                          '身高': 'height',
                          '护士服尺码': 'nurse_dress_size',
                        },
                        {
                          '家庭住址': 'address',
                          '合同截至日期': 'contract_due_date',
                        }

                      ],
                      fsxt: [
                        {
                          在读学历: 'current_education_background',
                          已取得最高学历毕业时间: 'last_education_graduation_time',
                        },
                        {
                          执业注册有效期: 'licensed_of_practice_time',
                          资格证书编号: 'hdry_qua_cer_no',
                        },
                      ],
                      other: []
                    },
                  }),
                  {
                    "鞋款式": "nurse_shoes_style",
                    '夏装-上衣': 'summer_jacket_size'
                  },
                  {
                    "夏装-裤子": "summer_trousers_size",
                    "冬装-上衣": "winter_jacket_size",
                  },
                  {
                    "冬装-裤子": "winter_trousers_size",
                    "夏装-医生款": "summer_isolation_suit_size",
                  },
                  {
                    "冬装-医生款": "winter_isolation_suit_size",
                  },
                ]
              case '925':
                return [
                  {
                    "民族": 'nation',
                    "籍贯": 'nativePlace',
                  },
                  {
                    "工号": 'empNo',
                    "身份证号": 'cardNumber',
                  },
                  {
                    "政治面貌": 'politicsLook',
                    "出生年月": 'birthday',
                  },
                  {
                    "年龄": 'age',
                    "手机号": 'phone',
                  },
                  {
                    "来院工作时间": 'goHospitalWorkDate',
                    "护士执业证书编号": 'zyzsNumber'
                  },
                  {
                    "取得护士执业证书时间": 'zyzsDate',
                    "最高学历": 'highestEducation'
                  },
                  {
                    "最高学历学位": 'highestEducationDegree',
                    "职务": 'job'
                  },
                  {
                    "现职称" : 'newTitle',
                    "现职务任职起始时间": 'jobStartDate'
                  },
                  {
                    "工作护理单元": 'deptName',
                    "鞋码": 'shoeSize',
                  },
                  {
                    '身高': 'height',
                    '护士服尺码': 'nurse_dress_size',
                  },
                  {
                    '家庭住址': 'address',
                    '合同截至日期': 'contract_due_date',
                  },
                  {
                    "立功表现": 'meritorious_performance',
                    "新入职护士带教资质与实习生带教资质": 'teaching_qualification'
                  },
                  {
                    "鞋款式": "nurse_shoes_style",
                    '夏装-上衣': 'summer_jacket_size'
                  },
                  {
                    "夏装-裤子": "summer_trousers_size",
                    "冬装-上衣": "winter_jacket_size",
                  },
                  {
                    "冬装-裤子": "winter_trousers_size",
                    "夏装-医生款": "summer_isolation_suit_size",
                  },
                  {
                    "冬装-医生款": "winter_isolation_suit_size",
                  },
                ]
              default:
                return [
                  {
                    "姓名": 'empName',
                    "性别": 'sex'
                  },
                  {
                    "民族": 'nation',
                    "籍贯": 'nativePlace'
                  },
                  {
                    "工号": 'empNo',
                    "身份证号": 'cardNumber'
                  },
                  {
                    "政治面貌": 'politicsLook',
                    "出生年月": 'birthday'
                  },
                  {
                    "年龄": 'age',
                    "手机号": 'phone'
                  },
                  {
                    "参加工作时间": 'takeWorkTime',
                    "护士执业证书编号": 'zyzsNumber'
                  },

                  {
                    "取得护士执业证书时间": 'zyzsDate',
                    ...isSdlj ? {"参加护理工作时间": 'zyzsNursingPostDate'} : {"取得执业证书并从事护理岗位时间": 'zyzsNursingPostDate'},
                  },
                  {
                    "护士执业证书有效截止日期": 'zyzsEffectiveUpDate',
                    ...'dghm' === appStore.HOSPITAL_ID ? {"家庭住址": 'address'} : {"初始学历": 'initialEducation'}
                  },
                  {
                    "最高学历": 'highestEducation',
                    "取得最高学历时间": 'highestEducationDate'
                  },
                  {
                    "最高学历学位": 'highestEducationDegree',
                    "职务": 'job'
                  },
                  {
                    "现职务任职起始时间": 'jobStartDate',
                    ...['wjgdszd'].includes(appStore.HOSPITAL_ID)?{"编制科室": 'workAddress'}:{"院内工作地点": 'workAddress'},
                  },
                  ...appStore.hisMatch({
                    map: {
                      [isSdljText]: [{
                        "工作护理单元": 'deptName',
                        "夏季鞋码大小": 'shoeSize',
                      }],
                      other: []
                    },
                    vague: true
                  }),
                  (() => {
                    switch (appStore.HOSPITAL_ID) {
                      case 'gxjb':
                        return {
                          "工作护理单元": 'deptName',
                          "家庭住址": 'address'
                        }
                      case 'sdlj':
                      case 'qzde':
                        return {
                          "冬季鞋码大小": 'winter_shoe_size',
                        }
                      case 'dghm':
                        return {
                          "工作护理单元": 'deptName',
                          "家庭住址": 'address'
                        };
                      default:
                        return {
                          "工作护理单元": 'deptName',
                          "鞋码大小": 'shoeSize'
                        };
                    }
                  })(),
                  ...appStore.hisMatch({
                    map: {
                      'qhwy,whhk,dglb': [{
                        "护理学会会员证号": 'membershipCardNumber',
                      }],

                      other: []
                    },
                    vague: true
                  }),
                  // 无效
                  // ...appStore.hisMatch({
                  //   map: {
                  //     'fsxt,925': [
                  //       {
                  //         "夏装-裤子": "summer_trousers_size",
                  //         "冬装-上衣": "winter_jacket_size",
                  //       },
                  //       {
                  //         "冬装-裤子": "winter_trousers_size",
                  //         "夏装-医生款": "summer_isolation_suit_size",
                  //       },
                  //       {
                  //         "冬装-医生款": "winter_isolation_suit_size",
                  //         "鞋款式": "nurse_shoes_style",
                  //       },
                  //       {
                  //         "鞋码": "shoeSize",
                  //       }
                  //     ],
                  //     other: []
                  //   },
                  //   vague:true,
                  // }),
                  ...appStore.hisMatch({
                    map: {
                      'gzsrm': [{
                        "职称": 'newTitle'
                      }],
                      'lyrm,stmz': [
                        {
                          '个人住址': 'address'
                        }
                      ],
                      'dghm': [
                        {
                          '现职称': 'newTitle',
                          '取得现有职称时间': 'newTitleDate'
                        }
                      ],
                      other: []
                    },
                    vague: true
                  })
                ]
            }
          })(),
          // table:,
          fileData: [
            {
              "个人头像": row.nearImageUrl
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
              "发表年份": `publicYear`,
              "杂志名称": `magazineName`
            },
            {
              "文章名称": `articleName`,
              "期刊号": `periodicalNumber`
            },
            {
              "卷号": `volumeNumber`,
              "起止页码": `pageNumber`
            },
            {
              "文章类别": `articleType`,
              "作者": `articleAuthor`,
            },
            {
              "论文收录网站": `influencingFactors`
            }
          ],
          fileFormat: {
            "文章扫描件": `urlImageOne`,
            "网络下载件": `urlImageTwo`
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
              "时间": `time`,
              "获奖_推广创新项目名称": `awardWinningName`
            },
            {
              "本人排名": `rank`,
              "授奖级别": `awardlevel`
            },
            {
              "批准机关": `approvalAuthority`
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
              "年份": `year`,
              "项目名称": `projectName`,

            },
            {
              "项目号": `projectNumber`,
              "项目级别": `projectLevel`,
            },
            ...appStore.hisMatch({
              map: {
                [isSdljText]: [
                  {
                    "授予学分": `creditGranted`
                  }
                ],
                other: [
                  {
                    "课时数": `courseHour`,
                    "学员总数": `personTotal`,
                  },
                  {
                    "学员分布区域": `schoolArea`,
                    "学员职称分布": `personTitleArea`
                  },
                ]
              },
              vague: true
            }),
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
              "就读时间": `readTime`,
              "毕业时间": `graduationTime`
            },
            {
              "毕业学校": `graduationSchool`,
              "专业": `readProfessional`
            },
            {
              "就读学历": `education`,
              "学位": `degree`
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
              "主持科研课题": `name`,
              "课题来源": `courseSource`
            },
            {
              "课题级别": `courseLevel`,
              "承担单位": `unit`
            },
            {
              "课题批文号": `approvalNumber`,
              "登记号": `registerNumber`
            },
            {
              "授予单位": `grantUnit`,
              "开始时间": `startDate`
            },
            {
              "截止时间": `endDate`,
              "完成情况": `courseCompletion`,
              "时间": `completionDate`
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
          tableFormat: appStore.hisMatch({
            map: {
              [isSdljText]: [
                {
                  参于课题名称: `goName`,
                  课题主持人姓名: `hostName`,
                },
                {
                  参与排名: `goRank`,
                  课题来源: `courseSource`,
                },
                {
                  课题级别: `courseLevel`,
                  承担单位: `unit`,
                },
                {
                  课题批文号: `approvalNumber`,
                  登记号: `registerNumber`,
                },
                {
                  授予单位: `grantUnit`,
                  完成情况: `courseCompletion`,
                },
                {
                  开始时间: `startDate`,
                  截止时间: `endDate`,
                },
              ],
              other: [
                {
                  参于课题名称: `goName`,
                  课题主持人姓名: `hostName`,
                },
                {
                  课题主持人工号: `hostNo`,
                  参与排名: `goRank`,
                },
                {
                  课题来源: `courseSource`,
                  课题级别: `courseLevel`,
                },
                {
                  承担单位: `unit`,
                  课题批文号: `approvalNumber`,
                },
                {
                  登记号: `registerNumber`,
                  授予单位: `grantUnit`,
                },
                {
                  完成情况: `courseCompletion`,
                  开始时间: `startDate`,
                },
                {
                  截止时间: `endDate`,
                  时间: `completionDate`,
                },
              ],
            },
            vague: true,
          }),
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
              "任职学会名称": `learnJobName`,
              "学会职位": `learnPosition`
            },
            {
              "学会级别": `learnLevel`,
              "起始时间": `startDate`
            },
            {
              "结束时间": `endDate`
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
    case '社会兼职':
      {
        globalModal.auditModal.show({
          getTableData: callBack,
          id: row.id,
          empNo: row.empNo || row.commiterNo,
          type: 'nurseWHSocialJob',
          title: '审核社会兼职',
          tableFormat: [
            {
              "社会兼职名称": `socialJobName`,
              "兼职级别": `socialLevel`,
            },
            {
              "起始时间": `startDate`,
              "结束时间": `endDate`
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
              "职称": `title`,
              "学历": `education`
            },
            {
              "出生日期": `birthday`,
              "年龄": `age`
            },
            {
              "取得护士执业证书时间并从事护理岗位时间": `zyzsDate`,
              "离职时间": `leaveDate`
            },
            {
              "层级": `hierarchy`
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
              "年份": 'year',
              "专著名称": `monographName`
            },
            {
              "出版社名称": `pressName`,
              "出版号": `pressNumber`
            },
            {
              "出版日期": `pressDate`,
              "著者": `participation`
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
              "进修专业": `studyMajor`,
              "进修单位": `unit`
            },
            {
              "进修单位所属地": `unitLocal`,
              "进修开始时间": `startDate`
            },
            {
              "进修结束时间": `endDate`,
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
              "现编制开始时间": `startDate`,
              "原编制名称": `workConversionOld`
            },
            {
              "现编制名称": `workConversionNew`
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
              "专利名称": `patentName`,
              "专利号": `patentNumber`
            },
            {
              "发证单位": `cardUnit`,
              "发证时间": `cardDate`
            },
            {
              "专利类型": `patentType`,
              "是否成果转化": `isResultTransfor`
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
              "奖项名称": `winningName`,
              "获奖类别": `winningType`
            },
            {
              "获奖级别": `winningLevel`,
              "获奖年份": `winningYear`
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
            !isSdlj ? {
              "原职称名称": `titleOld`,
              "现职称名称": `titleNew`
            } : {
              "职称名称": `titleNew`,
              '证书编号': `titleNumber`
            },
            {
              "考取专业资格证书时间": `winNewTiTleDate`,
              "聘用专业技术资格时间": `employNewTiTleDate`
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
    case '职务变动':
      {
        globalModal.auditModal.show({
          getTableData: callBack,
          id: row.id,
          empNo: row.empNo || row.commiterNo,
          type: 'nurseWHChanges',
          title: '审核职务变动信息',
          tableFormat: [
            {
              "科室": `deptName`,
              "职务": `position`
            },
            {
              "开始时间": `startDate`,
              "结束时间": `endDate`
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
            !isSdlj ? {
              "原工作科室": `oldDeptName`,
              "现工作科室": `newDeptName`
            } : {
              "开始时间": `transferDate`,
              "结束时间": `endDate`
            },
            isSdlj ? {
              "科室": (data: Obj) => {
                return data.newDeptName || data.newDeptCode
              },
              "考核成绩": `deptBeDepartment`
            } :
            {
              "现科室隶属部门": `deptBeDepartment`,
              "转岗时间": `transferDate`
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
    case '层级变动':
      {
        globalModal.auditModal.show({
          getTableData: callBack,
          id: row.id,
          empNo: row.empNo || row.commiterNo,
          type: 'nurseWHHierarchy',
          title: '审核层级变动信息',
          tableFormat: appStore.hisMatch({
            map: {
              [isSdljText]: [
                {
                  "层级名称": `nursehierarchyNew`
                },
                {
                  "开始时间": `startDate`,
                  "结束时间": `endDate`
                }
              ],
              other: [
                {
                  "原层级名称": `nursehierarchyOld`,
                  "现层级名称": `nursehierarchyNew`
                },
                {
                  "现层级开始时间": `startDate`
                }
              ]
            },
            vague: true
          }),
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
              "获奖类别": `resultType`,
              "成果名称": `resultName`
            },
            {
              "授予单位": `grantUnit`,
              "授予时间": `grantDate`
            },
            {
              "奖励级别": `winningLevel`,
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
              "专科护士名称": `nurseName`,
              "发证单位": `cardUnit`
            },
            {
              "证书编号": `cardNumber`,
              "级别": `nurseLevel`
            },
            {
              "发证时间": `cardNumberDate`
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
              "原工作室": `oldDeptName`,
              "现工作室": `newDeptName`
            },
            {
              "转岗时间": `transferDate`
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
          empNo: row.empNo || row.commiterNo,
          type: 'nurseWHWorkExperience',
          title: '审核工作经历',
          tableFormat: [
            {
              "开始时间": `startTime`,
              '结束时间(空则为至今)': `endTime`
            },
            {
              "单位": `unit`
              // 专业技术工作: 'professionalWork'
            }
            // {
            //   技术职称: 'professional',
            //   职务: 'post'
            // }
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
              "年度": `year`,
              "夜班": `nightShift`
            },
            {
              "查房": `checkOut`,
              "护理会诊": `nursingConsultation`
            },
            {
              "病例讨论": `caseDiscussion`,
              "个案": `individualCase`
            },
            {
              "小讲课": `lecture`,
              "带教": `teaching`
            },
            {
              "证明人": `witness`
            }
          ],
          // fileData: [{}],
          allData: row
        })
      }
      break
    case '继续教育及三基考试':
      {
        globalModal.auditModal.show({
          getTableData: callBack,
          id: row.id,
          empNo: row.empNo || row.commiterNo,
          type: 'nurseWHEduSanki',
          title: '审核继续教育学分统计及三基考试情况',
          tableFormat: [
            {
              "三基考核情况理论考核": `theoryAssess`,
              "三基考核情况理论补考": `theoryAssessMakeup`,

            },
            {
              "三基考核情况操作考核": `operateAssess`,
              "三基考核情况操作补考": `operateAssessMakeup`
            },
            {
              "年度": `year`,
              "继续教育是否达标": `standardInfo`
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
    case '新技术、新项目开展情况':
      {
        globalModal.auditModal.show({
          getTableData: callBack,
          id: row.id,
          empNo: row.empNo || row.commiterNo,
          type: 'nurseWHCarryOut',
          title: '审核新技术新项目开展情况',
          tableFormat: [
            {
              "开展项目名称": `projectName`,
              "技术等级": `technologyLevel`,

            },
            {
              "开始时间": `startDate`,
              "结束时间": `endDate`
            },
            {
              "开展例数": `numberCase`,
              "项目效益": `projectBenefit`,
            }
          ],
          allData: row
        })
      }
      break
    case '重大差错事故及惩罚':
      {
        globalModal.auditModal.show({
          getTableData: callBack,
          id: row.id,
          empNo: row.empNo || row.commiterNo,
          type: 'nurseWHPunishment',
          title: '审核重差错事故及惩罚',
          tableFormat: [
            {
              "时间": `startDate`,
              "内容": `content`,

            },
            {
              "备注": `remark`,
            },
          ],
          allData: row
        })
      }
      break
    case '在院工作情况':
    {
      globalModal.auditModal.show({
        getTableData: callBack,
        id: row.id,
        empNo: row.empNo || row.commiterNo,
        type: 'nurseWHRegistrationWork',
        title: '审核在院工作情况',
        tableFormat: [
          {
            "年度": `year`,
            "夜班": `nightShift`
          },
          {
            "查房": `checkOut`,
            "护理会诊": `nursingConsultation`
          },
          {
            "病例讨论": `caseDiscussion`,
            "个案": `individualCase`
          },
          {
            "小讲课": `lecture`,
            "带教": `teaching`
          },
          {
            "证明人": `witness`,
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
  }
}
