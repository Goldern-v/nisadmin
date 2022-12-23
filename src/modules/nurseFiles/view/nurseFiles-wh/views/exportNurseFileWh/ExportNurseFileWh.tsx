import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
// import { Button } from 'antd'
import { PrintPage } from './components/PrintPage'
import printing from 'printing'
import { appStore } from 'src/stores'
import { nurseFilesService } from '../../services/NurseFilesService'

import Cover from './pages/Cover'
import BaseInfoTable from './pages/BaseInfoTable'
// import ArticleTable from './pages/ArticleTable'
// import PersonWinningTable from './pages/PersonWinningTable'
// import SpecializNurseTable from './pages/SpecializNurseTable'
import { visibleList } from './utils/visibleList'
import { TableCon } from './components/TableCon'
import { Obj } from 'src/libs/types'

export interface Props {
  empNo: string | number
  callback: (success: boolean) => any
}
const isSdljText = 'sdlj,nfsd,qzde'
const isSdlj = ['sdlj', 'nfsd', 'qzde'].includes(appStore.HOSPITAL_ID)
export default function ExportNurseFileWh(props: Props) {
  const { empNo, callback } = props
  const exportId = 'exportNurserFileWh'
  /** 加载完成 */
  const [inited, setInited]: any = useState(false)

  /** 基本信息 */
  const [baseInfo, setBaseInfo]: any = useState({})
  /** 文章 */
  const [articleList, setArticleList] = useState([] as any[])
  /** 个人获奖 */
  const [personWinningList, setPersonWinningList] = useState([] as any[])
  /** 专科护士 */
  const [specializNurseList, setSpecializNurseList] = useState([] as any[])
  /** 外出进修 */
  const [outStudyList, setOutStudyList] = useState([] as any[])
  /**继续教育及三基考试 */
  const [studyList, setStudyList] = useState<Obj[]>([])
  /**新技术、新项目情况 */
  const [technologiesAndProjects, setTechnologiesAndProjects] = useState<Obj[]>([])
  /**重大差错事故及惩罚 */
  const [majorErrors, setMajorErrors] = useState<Obj[]>([])
  /** 主持科研课题 */
  const [hostScienceCourse, setHostScienceCourse] = useState([] as any[])
  /** 参与科研课题 */
  const [goScienceCourse, setGoScienceCourse] = useState([] as any[])
  /**科研课题获奖 */
  const [scientificResearch, setScientificResearch] = useState<Obj[]>([])
  /** 专利 */
  const [patent, setPatent] = useState([] as any[])
  /** 学会任职 */
  const [learnJob, setLearnJob] = useState([] as any[])
  /** 举办继续教育培训班 */
  const [continueStudy, setContinueStudy] = useState([] as any[])
  /** 专著 */
  const [monograph, setMonograph] = useState([] as any[])
  /** 工作经历 */
  const [workExperience, setWorkExperience] = useState([] as any[])
  /** 医学学历教育 */
  const [medicalEducation, setMedicalEducation] = useState([] as any[])
  /**在院工作情况 */
  const [workRegistrationForm, setWorkRegistrationForm] = useState<Obj[]>([])
  /**职务变动 */
  const [jobChange, setJobChange] = useState<Obj[]>([])
  /** 职称变动 */
  const [title, setTitle] = useState([] as any[])
  // 岗位变动
  const [transferPost, setTransferPost] = useState([] as any[])
  /** 层级变动 */
  const [hierarchy, setHierarchy] = useState([] as any[])
  /** 编制变动 */
  const [workConversion, setWorkConversion] = useState([] as any[])

  const renderCfg = [
    {
      mainTitle: '文章',
      data: articleList,
      minRow: 5,
      columns: [
        {
          title: '发表年份',
          dataKey: 'publicYear',
          col: '60px',
        },
        {
          title: '杂志名称',
          dataKey: 'magazineName',
        },
        {
          title: '文章名称',
          dataKey: 'articleName',
        },
        {
          title: '期刊号',
          dataKey: 'periodicalNumber',
        },
        {
          title: '文章类别',
          dataKey: 'articleType',
          col: '60px',
        },
        {
          title: '收录网站',
          dataKey: 'influencingFactors',
          col: '60px',
        },
      ]
    },
    {
      mainTitle: '个人获奖',
      data: personWinningList,
      columns: [
        {
          title: '奖项名称',
          dataKey: 'winningName',
        },
        {
          title: '奖项类别',
          dataKey: 'winningType',
        },
        {
          title: '奖项级别',
          dataKey: 'winningLevel',
        },
        {
          title: '获奖时间',
          dataKey: 'winningYear',
        },
      ]
    },
    {
      mainTitle: '专科护士',
      data: specializNurseList,
      minRow: 3,
      columns: [
        {
          title: '专科护士名称',
          dataKey: 'nurseName',
        },
        {
          title: '发证单位',
          dataKey: 'cardUnit',
        },
        {
          title: '证书编号',
          dataKey: 'cardNumber',
        },
        {
          title: '级别',
          dataKey: 'nurseLevel',
        },
        {
          title: '发证时间',
          dataKey: 'cardNumberDate',
        },
      ]
    },
    {
      mainTitle: '外出进修',
      data: outStudyList,
      minRow: 3,
      columns: [
        {
          title: '进修专业',
          dataKey: 'studyMajor',
        },
        {
          title: '进修单位',
          dataKey: 'unit',
        },
        {
          title: '进修单位所属地',
          dataKey: 'unitLocal',
        },
        {
          title: '进修开始时间',
          dataKey: 'startDate',
        },
        {
          title: '进修结束时间',
          dataKey: 'endDate',
        },
      ]
    },
    ...appStore.hisMatch({
      map: {
        [isSdljText]: [
          {
            mainTitle: '继续教育及三基考试',
            data: studyList,
            minRow: 3,
            columns: [
              {
                title: '年度',
                dataKey: 'year',
              },
              {
                title: '达标情况',
                dataKey: 'standardInfo',
              },
              {
                title: '理论合格',
                dataKey: 'theoryAssess',
              },
              {
                title: '理论补考合格',
                dataKey: 'theoryAssessMakeup',
              },
              {
                title: '操作合格',
                dataKey: 'operateAssess',
              },
              {
                title: '操作补考合格',
                dataKey: 'operateAssessMakeup',
              },
            ]
          },
          {
            mainTitle: '新技术、新项目情况',
            data: technologiesAndProjects,
            minRow: 3,
            columns: [
              {
                title: '开展项目名称',
                dataKey: 'projectName',
              },
              {
                title: '技术等级',
                dataKey: 'technologyLevel',
              },
              {
                title: '开始时间',
                dataKey: 'startDate',
              },
              {
                title: '结束时间',
                dataKey: 'endDate',
              },
              {
                title: '开展例数',
                dataKey: 'numberCase',
              },
              {
                title: '项目效益',
                dataKey: 'projectBenefit',
              }
            ]
          },
          {
            mainTitle: '重大差错事故及惩罚',
            data: majorErrors,
            minRow: 3,
            columns: [
              {
                title: '时间',
                dataKey: 'startDate',
              },
              {
                title: '内容',
                dataKey: 'content',
              },
              {
                title: '备注',
                dataKey: 'remark',
              },
            ]
          },
        ],
        other: []
      },
      vague: true
    }),
    {
      mainTitle: '主持科研课题',
      data: hostScienceCourse,
      minRow: 3,
      columns: [
        {
          title: '主持课题名称',
          dataKey: 'name',
        },
        {
          title: '课题来源',
          dataKey: 'courseSource',
        },
        {
          title: '课题级别',
          dataKey: 'courseLevel',
        },
        {
          title: '承担单位',
          dataKey: 'unit',
        },
        {
          title: '课题批文号',
          dataKey: 'approvalNumber',
        },
        {
          title: '项目编号',
          dataKey: 'registerNumber',
        },
        {
          title: '开始时间',
          dataKey: 'startDate',
        },
        {
          title: '截止时间',
          dataKey: 'endDate',
        },
        {
          title: '完成情况',
          dataKey: 'courseCompletion',
        },
        {
          title: '完成时间',
          dataKey: 'completionDate',
        },
      ]
    },
    {
      mainTitle: '参与科研课题',
      data: goScienceCourse,
      minRow: 4,
      columns: [
        {
          title: '参与课题名称',
          dataKey: 'goName',
        },
        {
          title: '参与排名',
          dataKey: 'goRank',
        },
        {
          title: '课题主持人姓名',
          dataKey: 'hostName',
        },
        !isSdlj && {
          title: '课题主持人工号',
          dataKey: 'hostNo',
        },
        {
          title: '课题来源',
          dataKey: 'courseSource',
        },
        {
          title: '课题级别',
          dataKey: 'courseLevel',
        },
        {
          title: '承担单位',
          dataKey: 'unit',
        },
        {
          title: '课题批文号',
          dataKey: 'approvalNumber',
        },
        {
          title: '项目编号',
          dataKey: 'registerNumber',
        },
        {
          title: '开始时间',
          dataKey: 'startDate',
        },
        {
          title: '完成情况',
          dataKey: 'courseCompletion',
        },
        {
          title: '完成时间',
          dataKey: 'completionDate',
        },
      ]
    },
    {
      mainTitle: '科研课题获奖',
      data: scientificResearch,
      minRow: 4,
      columns: [
        {
          title: '主持/参与排名',
          dataKey: 'resultType',
        },
        {
          title: '项目名称',
          dataKey: 'resultName',
        },
        {
          title: '授予单位',
          dataKey: 'grantUnit',
        },
        {
          title: '授予时间',
          dataKey: 'grantDate',
        },
        {
          title: '奖励级别',
          dataKey: 'winningLevel',
        },
        {
          title: '奖励名称、等级',
          dataKey: 'winningName',
        },
      ]
    },
    {
      mainTitle: '专利',
      data: patent,
      minRow: 3,
      columns: [
        {
          title: '专利名称',
          dataKey: 'patentName',
        },
        {
          title: '专利排名',
          dataKey: 'patentLevel',
        },
        {
          title: '专利类型',
          dataKey: 'patentType',
        },
        {
          title: '专利号',
          dataKey: 'patentNumber',
        },
        {
          title: '发证单位',
          dataKey: 'cardUnit',
        },
        {
          title: '发证时间',
          dataKey: 'cardDate',
        },
      ]
    },
    {
      mainTitle: '学会任职',
      data: learnJob,
      minRow: 7,
      columns: [
        {
          title: '学会名称',
          dataKey: 'learnJobName',
        },
        {
          title: '学会职务',
          dataKey: 'learnPosition',
        },
        {
          title: '学会级别',
          dataKey: 'learnLevel',
        },
        {
          title: '任职开始时间',
          dataKey: 'startDate',
        },
        {
          title: '任职结束时间',
          dataKey: 'endDate',
        },
      ]
    },
    {
      mainTitle: '专著',
      data: monograph,
      minRow: 5,
      columns: [
        {
          title: '年份',
          dataKey: 'year',
        },
        {
          title: '专著名称',
          dataKey: 'monographName',
        },
        {
          title: '出版社名称',
          dataKey: 'pressName',
        },
        {
          title: '出版号',
          dataKey: 'pressNumber',
        },
        {
          title: '出版日期',
          dataKey: 'pressDate',
        },
        {
          title: '著者',
          dataKey: 'participation',
        },
      ]
    },
    {
      mainTitle: '举办继续教育培训班',
      data: continueStudy,
      minRow: 7,
      columns: [
        {
          title: '年份',
          dataKey: 'year',
        },
        {
          title: '项目名称',
          dataKey: 'projectName',
        },
        // {
        //   title: '项目号',
        //   dataKey: '项目号',
        // },
        // {
        //   title: '项目类别',
        //   dataKey: '项目类别',
        // },
        {
          title: '课时数',
          dataKey: 'courseHour',
        },
        {
          title: '学员总数',
          dataKey: 'personTotal',
        },
        // {
        //   title: '授予学分',
        //   dataKey: '授予学分',
        // },
      ]
    },
    {
      mainTitle: '工作经历',
      data: workExperience,
      minRow: 3,
      columns: [
        {
          title: '开始日期',
          dataKey: 'startTime',
        },
        {
          title: '结束日期',
          dataKey: 'endTime',
        },
        {
          title: '单位',
          dataKey: 'unit',
        },
      ]
    },
    
    {
      mainTitle: '医学学历教育',
      data: medicalEducation,
      minRow: 5,
      columns: [
        {
          title: '就读时间',
          dataKey: 'readTime',
        },
        {
          title: '毕业时间',
          dataKey: 'graduationTime',
        },
        {
          title: '毕业学校',
          dataKey: 'graduationSchool',
        },
        {
          title: '学历',
          dataKey: 'education',
        },
        {
          title: '学位',
          dataKey: 'degree',
        },
      ]
    },
    {
      mainTitle: '在院工作情况',
      data: workRegistrationForm,
      minRow: 4,
      columns: [
        {
          title: '年度',
          dataKey: 'year',
        },
        {
          title: '夜班',
          dataKey: 'nightShift',
        },
        {
          title: '查房',
          dataKey: 'checkOut',
        },
        {
          title: '护理会诊',
          dataKey: 'nursingConsultation',
        },
        {
          title: '病例讨论',
          dataKey: 'caseDiscussion',
        },
        {
          title: '个案',
          dataKey: 'individualCase',
        },
        {
          title: '小讲课',
          dataKey: 'lecture',
        },
        {
          title: '带教',
          dataKey: 'teaching',
        },
        {
          title: '证明人',
          dataKey: 'witness',
        },
      ],
    },
    {
      mainTitle: '岗位变动',
      data: transferPost,
      minRow: 4,
      columns: [
        {
          title: '原工作科室',
          dataKey: 'oldDeptName',
        },
        {
          title: '现工作科室',
          dataKey: 'newDeptName',
        },
        {
          title: '转岗时间',
          dataKey: 'transferDate',
        },
      ]
    },
    {
      mainTitle: "职称变动",
      data: title,
      minRow: 4,
      columns: [
        ...appStore.hisMatch({
          map: {
            [isSdljText]: [
              {
                title: '职称名称',
                dataKey: 'titleNew',
              },
            ],
            other: [
              {
                title: '原职称名称',
                dataKey: 'titleOld',
              },
              {
                title: '现职称名称',
                dataKey: 'titleNew',
              },
            ]
          },
          vague: true
        }),
        {
          title: '考取专业技术资格证书时间',
          dataKey: 'winNewTiTleDate',
        },
        {
          title: '聘用专业技术资格时间',
          dataKey: "employNewTiTleDate"
        }
      ]
    },
    ...appStore.hisMatch({
      map: {
        [isSdljText]: [
          {
            mainTitle: '职务变动',
            data: jobChange,
            minRow: 4,
            columns: [
              {
                title: '科室',
                dataKey: 'deptName',
              },
              {
                title: '职务',
                dataKey: 'position',
              },
              {
                title: '开始时间',
                dataKey: 'startDate',
              },
              {
                title: '结束时间',
                dataKey: 'endDate',
              },
            ]
          }
        ],
        other: []
      },
      vague: true
    }),
    {
      mainTitle: '层级变动',
      data: hierarchy,
      minRow: 4,
      columns: appStore.hisMatch({
        map: {
          [isSdljText]: [
            {
              title: "层级名称",
              dataKey: `nursehierarchyNew`
            },
            {
              title: "开始时间",
              dataKey: `startDate`,
            },
            {
              title: "结束时间",
              dataKey: `endDate`
            }
          ],
          other: [
            {
              title: "原层级名称",
              dataKey: `nursehierarchyOld`,
            },
            {
              title: "现层级名称",
              dataKey: `nursehierarchyNew`
            },
            {
              title: "现层级开始时间",
              dataKey: `startDate`
            }
          ]
        },
        vague: true
      }),
    },
    ...appStore.hisMatch({
      map: {
        [isSdljText]: [],
        other: [
          {
            mainTitle: '编制变动',
            data: workConversion,
            minRow: 3,
            columns: [
              {
                title: '原编制名称',
                dataKey: 'workConversionOld',
              },
              {
                title: '现编制名称',
                dataKey: 'workConversionNew',
              },
              {
                title: '现编制开始时间',
                dataKey: 'startDate',
              },
            ]
          },
        ]
      },
      vague: true
    }),
  ]

  const handlePrint = () => {
    let printEl = document.getElementById(exportId)
    let documentTitle = window.document.title
    window.document.title = `${isSdlj ? localStorage.getItem('empName') + '-' : ''}护理人员信息档案`

    if (printEl) printing(printEl, {
      injectGlobalCss: true,
      scanStyles: false,
      css: `
        @page {
          margin: 10mm;
        }
        *{
          color:#000;
        }
        #${exportId} {
          display:block!important;
        }
      `
    })

    setTimeout(() => window.document.title = documentTitle, 1000)
  }

  const getData = () => {
    Promise.all([
      nurseFilesService
        .nurseInformation(empNo)
        .then(res => setBaseInfo(res.data)),
      nurseFilesService
        .commonfindByEmpNoSubmit('nurseWHArticle', empNo)
        .then(res => setArticleList(res.data)),
      nurseFilesService
        .commonfindByEmpNoSubmit('nurseWHPersonWinning', empNo)
        .then(res => setPersonWinningList(res.data)),
      nurseFilesService
        .commonfindByEmpNoSubmit('nurseWHSpecializNurse', empNo)
        .then(res => setSpecializNurseList(res.data)),
      nurseFilesService
        .commonfindByEmpNoSubmit('nurseWHOutStudy', empNo)
        .then(res => setOutStudyList(res.data)),
      ...appStore.hisMatch({
        map: {
          [isSdljText]: [
            nurseFilesService.commonfindByEmpNoSubmit('nurseWHEduSanki', empNo).then((res) => {
              setStudyList(res.data)
            }),
            nurseFilesService.commonfindByEmpNoSubmit('nurseWHCarryOut', empNo).then((res) => {
              setTechnologiesAndProjects(res.data)
            }),
            nurseFilesService.commonfindByEmpNoSubmit('nurseWHPunishment', empNo).then((res) => {
              setMajorErrors(res.data)
            }),
          ],
          other: []
        },
        vague: true
      }),
      nurseFilesService
        .commonfindByEmpNoSubmit('nurseWHHostScienceCourse', empNo)
        .then(res => setHostScienceCourse(res.data)),
      nurseFilesService
        .commonfindByEmpNoSubmit('nurseWHGoScienceCourse', empNo)
        .then(res => setGoScienceCourse(res.data)),
      nurseFilesService
        .commonfindByEmpNoSubmit('nurseWHScienceResult', empNo)
        .then(res => setScientificResearch(res.data)),
      nurseFilesService
        .commonfindByEmpNoSubmit('nurseWHPatent', empNo)
        .then(res => setPatent(res.data)),
      nurseFilesService
        .commonfindByEmpNoSubmit('nurseWHLearnJob', empNo)
        .then(res => setLearnJob(res.data)),
      nurseFilesService
        .commonfindByEmpNoSubmit('nurseWHContinueStudy', empNo)
        .then(res => setContinueStudy(res.data)),
      nurseFilesService
        .commonfindByEmpNoSubmit('nurseWHMonograph', empNo)
        .then(res => setMonograph(res.data)),
      nurseFilesService
        .commonfindByEmpNoSubmit('nurseWHWorkExperience', empNo)
        .then(res => setWorkExperience(res.data)),
      nurseFilesService
        .commonfindByEmpNoSubmit('nurseWHMedicalEducation', empNo)
        .then(res => setMedicalEducation(res.data)),
      nurseFilesService
        .commonfindByEmpNoSubmit('nurseWHRegistrationWork', empNo)
        .then(res => setWorkRegistrationForm(res.data)),
      nurseFilesService
        .commonfindByEmpNoSubmit('nurseWHChanges', empNo)
        .then(res => setJobChange(res.data)),
      nurseFilesService
        .commonfindByEmpNoSubmit('nurseWHTitle', empNo)
        .then(res => setTitle(res.data)),
      nurseFilesService
        .commonfindByEmpNoSubmit('nurseWHTransferPost', empNo)
        .then(res => setTransferPost(res.data)),
      nurseFilesService
        .commonfindByEmpNoSubmit('nurseWHHierarchy', empNo)
        .then(res => setHierarchy(res.data)),
      nurseFilesService
        .commonfindByEmpNoSubmit('nurseWHWorkConversion', empNo)
        .then(res => setWorkConversion(res.data)),
    ])
      .then(() => {
        setInited(true)
        setTimeout(() => {
          handlePrint()
          setInited(false)
          callback(true)
        }, 500)
      }, () => callback(false))

  }

  useEffect(() => {
    getData()
  }, [])

  return <Wrapper id={exportId}>
    {inited && <React.Fragment>
      <PrintPage>
        <Cover baseInfo={baseInfo} />
      </PrintPage>
      <div className="render-container">
        <BaseInfoTable baseInfo={baseInfo} />
        {renderCfg.map((cfg: any, tableIdx: any) => (
          <TableCon
            key={tableIdx}
          >
            <colgroup>
              {cfg.columns.filter((it: any) => it != false).map((column: any, columnIdx: number) => (
                <col width={column.col || ''} key={`${tableIdx}-${columnIdx}-col`} />
              ))}
            </colgroup>
            <thead></thead>
            <tbody>
              <tr className="main-title-row">
                <td colSpan={cfg.columns.filter((it: any) => it != false).length}>{cfg.mainTitle}</td>
              </tr>
              <tr className="title-row">
                {cfg.columns.filter((it: any) => it != false).map((column: any, columnIdx: number) => (
                  <td key={`${tableIdx}-${columnIdx}-title`}>{column.title}</td>
                ))}
              </tr>
              {visibleList(cfg.data, cfg.minRow || 5).map((item: any, itemIdx: number) => (
                <tr
                  className="content-row"
                  key={`${tableIdx}-${itemIdx}-row`}>
                  {cfg.columns.filter((it: any) => it != false).map((column: any, columnIdx: number) => (
                    <td
                      key={`${tableIdx}-${columnIdx}-${itemIdx}-content`}>
                      {item[column.dataKey]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </TableCon>
        ))}
      </div>
    </React.Fragment>}
  </Wrapper>
}

const Wrapper = styled.div`
  display:none;
  .render-container{
    width: 660px;
    margin: auto;
    table{
      position: relative;
    }
  }
`