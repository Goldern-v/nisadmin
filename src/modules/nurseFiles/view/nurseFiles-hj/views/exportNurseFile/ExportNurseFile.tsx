import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import OnePage from './page/OnePage'
import ImgPrint from './page/ImgPrint'
import TwoPage from './page/TwoPage'
import PrintPage from './components/PrintPage'
import BaseInfo from './page/BaseInfo'
import LevelChange from './page/LevelChange'
import ContinuingEducation from './page/ContinuingEducation'
import Writings from './page/Writings'
import Awards from './page/Awards'
import ExaminationResults from './page/ExaminationResults'
import ThreeBases from './page/ThreeBases'
import { nurseFilesService } from '../../services/NurseFilesService'
import printing from 'printing'
export interface Props {
  empNo: string
  onCallBack?: () => any
}

export default function ExportNurseFile(props: Props) {
  /** 加载完成 */
  const [inited, setInited]: any = useState(false)
  /** 页码列表 */
  const [startPage, setStartPage]: any = useState([])
  const [startPageKeys, setStartPageKeys]: any = useState([])

  /** 基本信息 */
  const [baseInfo, setBaseInfo]: any = useState({})
  /** 工作经历 */
  const [experienceList, setExperienceList]: any = useState([])
  /** 教育经历 */
  const [medicalEducatioList, setMedicalEducatioList]: any = useState([])
  /** 层级变动 */
  const [levelChangeList, setLevelChangeList]: any = useState([])
  /** 继续教育 */
  const [continuingEducationList, setContinuingEducationList]: any = useState([])
  /** 著作 */
  const [paperExperienceList, setPaperExperienceList]: any = useState([])
  /** 所获奖励 */
  const [awardWinningList, setAwardWinningList]: any = useState([])
  /** 年度考核结果 */
  const [yearCheckList, setYearCheckList]: any = useState([])
  /** 三季考核 */
  const [threeBaseList, setThreeBaseList]: any = useState([])
  /** 工作情况登记 */
  const [registrationWorkList, setRegistrationWorkList]: any = useState([])
  /** 附件 */
  const [fileImgList, setFileImgList]: any = useState([])

  let fileRef: any = React.createRef<HTMLDivElement>()

  const getData = () => {
    let fileForm = fileRef.current
    Promise.all([
      nurseFilesService.nurseInformation(props.empNo).then((res) => {
        setBaseInfo(res.data)
        return res.data
      }),
      nurseFilesService.nurseWorkExperience(props.empNo).then((res) => setExperienceList(res.data)),
      nurseFilesService.nurseMedicalEducation(props.empNo).then((res) => setMedicalEducatioList(res.data)),
      nurseFilesService.nurseProfessionalAndLevelChange(props.empNo).then((res) => setLevelChangeList(res.data)),
      nurseFilesService.nurseContinuingEducation(props.empNo).then((res) => setContinuingEducationList(res.data)),
      nurseFilesService.nursePaperExperience(props.empNo).then((res) => setPaperExperienceList(res.data)),
      nurseFilesService.nurseYearCheck(props.empNo).then((res) => setYearCheckList(res.data)),
      nurseFilesService.nurseHospitalsThreeBase(props.empNo).then((res) => setThreeBaseList(res.data)),
      nurseFilesService.nurseAwardWinning(props.empNo).then((res) => setAwardWinningList(res.data)),
      nurseFilesService.nurseRegistrationWork(props.empNo).then((res) => setRegistrationWorkList(res.data)),
      nurseFilesService.nurseAttachment(props.empNo).then((res) =>{
        let data: any = [
          {
            content: '学历毕业证复印件',
            number: res.data.filter((item: any) => item.type === '2').length,
            status: '',
            filterData: res.data
              .filter((item: any) => item.type === '2')
              .map((item: any) => item.path)
              .reduce((prev: any, curr: any) => {
                let arr = curr ? curr.split(',') : []
                return [...prev, ...arr]
              }, []),
            fileName: '学历毕业证复印件',
            type: '2'
          },
          {
            content: '执业证复印件',
            number: res.data.filter((item: any) => item.type === '3').length,
            status: '',
            filterData: res.data
              .filter((item: any) => item.type === '3')
              .map((item: any) => item.path)
              .reduce((prev: any, curr: any) => {
                let arr = curr ? curr.split(',') : []
                return [...prev, ...arr]
              }, []),
            fileName: '执业证复印件',
            type: '3'
          },
          {
            content: '资格证复印件',
            number: res.data.filter((item: any) => item.type === '4').length,
            status: '',
            filterData: res.data
              .filter((item: any) => item.type === '4')
              .map((item: any) => item.path)
              .reduce((prev: any, curr: any) => {
                let arr = curr ? curr.split(',') : []
                return [...prev, ...arr]
              }, []),
            fileName: '资格证复印件',
            type: '4'
          },
          // {
          //   content: '职称聘用证明',
          //   number: res.data.filter((item: any) => item.type === '5').length,
          //   status: '',
          //   filterData: res.data
          //     .filter((item: any) => item.type === '5')
          //     .map((item: any) => item.path)
          //     .reduce((prev: any, curr: any) => {
          //       let arr = curr ? curr.split(',') : []
          //       return [...prev, ...arr]
          //     }, []),
          //   fileName: '职称聘用证明',
          //   type: '5'
          // },
          // {
          //   content: '层级晋级表',
          //   number: res.data.filter((item: any) => item.type === '6').length,
          //   status: '',
          //   filterData: res.data
          //     .filter((item: any) => item.type === '6')
          //     .map((item: any) => item.path)
          //     .reduce((prev: any, curr: any) => {
          //       let arr = curr ? curr.split(',') : []
          //       return [...prev, ...arr]
          //     }, []),
          //   fileName: '层级晋级表',
          //   type: '6'
          // },
          // {
          //   content: '护理会诊人员资质认定表',
          //   number: res.data.filter((item: any) => item.type === '7').length,
          //   status:
          //     res.data.filter((item: any) => item.type === '7')[0] &&
          //     res.data.filter((item: any) => item.type === '7')[0].auditedStatusName,
          //   filterData: res.data
          //     .filter((item: any) => item.type === '7')
          //     .map((item: any) => item.path)
          //     .reduce((prev: any, curr: any) => {
          //       let arr = curr ? curr.split(',') : []
          //       return [...prev, ...arr]
          //     }, []),
          //   fileName: '护理会诊人员资质认定表',
          //   statusColor:
          //     res.data.filter((item: any) => item.type === '7')[0] &&
          //     res.data.filter((item: any) => item.type === '7')[0].statusColor,
          //   isShow:
          //     res.data.filter((item: any) => item.type === '7')[0] &&
          //     res.data.filter((item: any) => item.type === '7')[0].isShow,
          //   path:
          //     res.data.filter((item: any) => item.type === '7')[0] &&
          //     res.data.filter((item: any) => item.type === '7')[0].path,
          //   id:
          //     res.data.filter((item: any) => item.type === '7')[0] &&
          //     res.data.filter((item: any) => item.type === '7')[0].id,
          //   empNo:
          //     res.data.filter((item: any) => item.type === '7')[0] &&
          //     res.data.filter((item: any) => item.type === '7')[0].empNo,
          //   saveStatus:
          //     res.data.filter((item: any) => item.type === '7')[0] &&
          //     res.data.filter((item: any) => item.type === '7')[0].saveStatus,
          //   empName:
          //     res.data.filter((item: any) => item.type === '7')[0] &&
          //     res.data.filter((item: any) => item.type === '7')[0].empName,
          //   type: '7'
          // },
          // {
          //   content: '厚街医院护理人员执业准入资格备案表',
          //   number: res.data.filter((item: any) => item.type === '8').length,
          //   status:
          //     res.data.filter((item: any) => item.type === '8')[0] &&
          //     res.data.filter((item: any) => item.type === '8')[0].auditedStatusName,
          //   filterData: res.data
          //     .filter((item: any) => item.type === '8')
          //     .map((item: any) => item.path)
          //     .reduce((prev: any, curr: any) => {
          //       let arr = curr ? curr.split(',') : []
          //       return [...prev, ...arr]
          //     }, []),
          //   fileName: '厚街医院护理人员执业准入资格备案表',
          //   statusColor:
          //     res.data.filter((item: any) => item.type === '8')[0] &&
          //     res.data.filter((item: any) => item.type === '8')[0].statusColor,
          //   isShow:
          //     res.data.filter((item: any) => item.type === '8')[0] &&
          //     res.data.filter((item: any) => item.type === '8')[0].isShow,
          //   path:
          //     res.data.filter((item: any) => item.type === '8')[0] &&
          //     res.data.filter((item: any) => item.type === '8')[0].path,
          //   id:
          //     res.data.filter((item: any) => item.type === '8')[0] &&
          //     res.data.filter((item: any) => item.type === '8')[0].id,
          //   empNo:
          //     res.data.filter((item: any) => item.type === '8')[0] &&
          //     res.data.filter((item: any) => item.type === '8')[0].empNo,
          //   saveStatus:
          //     res.data.filter((item: any) => item.type === '8')[0] &&
          //     res.data.filter((item: any) => item.type === '8')[0].saveStatus,
          //   empName:
          //     res.data.filter((item: any) => item.type === '8')[0] &&
          //     res.data.filter((item: any) => item.type === '8')[0].empName,
          //   type: '8'
          // },
          // {
          //   content: '高风险诊疗技术操作人员资质申请表',
          //   number: res.data.filter((item: any) => item.type === '9').length,
          //   status:
          //     res.data.filter((item: any) => item.type === '9')[0] &&
          //     res.data.filter((item: any) => item.type === '9')[0].auditedStatusName,
          //   filterData: res.data
          //     .filter((item: any) => item.type === '9')
          //     .map((item: any) => item.path)
          //     .reduce((prev: any, curr: any) => {
          //       let arr = curr ? curr.split(',') : []
          //       return [...prev, ...arr]
          //     }, []),
          //   fileName: '高风险诊疗技术操作人员资质申请表',
          //   statusColor:
          //     res.data.filter((item: any) => item.type === '9')[0] &&
          //     res.data.filter((item: any) => item.type === '9')[0].statusColor,
          //   isShow:
          //     res.data.filter((item: any) => item.type === '9')[0] &&
          //     res.data.filter((item: any) => item.type === '9')[0].isShow,
          //   id:
          //     res.data.filter((item: any) => item.type === '9')[0] &&
          //     res.data.filter((item: any) => item.type === '9')[0].id,
          //   path:
          //     res.data.filter((item: any) => item.type === '9')[0] &&
          //     res.data.filter((item: any) => item.type === '9')[0].path,
          //   empNo:
          //     res.data.filter((item: any) => item.type === '9')[0] &&
          //     res.data.filter((item: any) => item.type === '9')[0].empNo,
          //   saveStatus:
          //     res.data.filter((item: any) => item.type === '9')[0] &&
          //     res.data.filter((item: any) => item.type === '9')[0].saveStatus,
          //   empName:
          //     res.data.filter((item: any) => item.type === '9')[0] &&
          //     res.data.filter((item: any) => item.type === '9')[0].empName,
          //   type: '9'
          // }
        ]
        let dataARR:any = [],pageList:any = [],pageEnd = 9
        data.map((item:any)=>{
          if(item.filterData.length>0){
            dataARR.push(item)
            pageEnd += parseInt(item.filterData.length)
            pageList.push(pageEnd)
          }
        })
        // const pageKeys = Object.keys(dataARR)
        pageList[0]=10
        setFileImgList(dataARR)
        setStartPage(pageList)
        // setStartPageKeys(pageKeys)
      })
    ]).then((res) => {
      setInited(true)
      setTimeout(() => {
        // let _title = document.title
        document.title = res[0].empName + '信息档案'
        printing(fileForm, {
          injectGlobalCss: true,
          scanStyles: false,
          css: `
          @page {
            margin: 0;
          }
          `
        })
        // setTimeout(() => {
        //   document.title = _title
        // }, 500)

        props.onCallBack && props.onCallBack()
      }, 500)
    })
  }

  let flag = false

  useEffect(() => {
    getData()
  }, [])

  const imgPrintObj = fileImgList.map((item:any,index:any)=>{
    return (
      item.filterData.length>0 &&
        <ImgPrint startPage={startPage} startIndex={index} key={index} imgObj={item} />
    )
  })

  return (
    <Wrapper ref={fileRef}>
      {inited && (
        <React.Fragment>
          <PrintPage>
            <OnePage baseInfo={baseInfo} />
          </PrintPage>
          <PrintPage pageIndex={2}>
            <TwoPage />
          </PrintPage>
          <PrintPage pageIndex={3}>
            <BaseInfo baseInfo={baseInfo} experienceList={experienceList} />
          </PrintPage>
          <PrintPage pageIndex={4}>
            <LevelChange medicalEducatioList={medicalEducatioList} levelChangeList={levelChangeList} />
          </PrintPage>
          <PrintPage pageIndex={5}>
            <ContinuingEducation continuingEducationList={continuingEducationList} />
          </PrintPage>
          <PrintPage pageIndex={6}>
            <Writings paperExperienceList={paperExperienceList} />
          </PrintPage>
          <PrintPage pageIndex={7}>
            <Awards awardWinningList={awardWinningList} />
          </PrintPage>
          {/* <PrintPage pageIndex={8}>
            <BadEvent />
          </PrintPage> */}
          <PrintPage pageIndex={8}>
            <ExaminationResults yearCheckList={yearCheckList} />
          </PrintPage>
          <PrintPage pageIndex={9}>
            <ThreeBases threeBaseList={threeBaseList} />
          </PrintPage>
          {imgPrintObj}
          {/* <PrintPage pageIndex={11}>
            <WorkRegistrationForm registrationWorkList={registrationWorkList} />
          </PrintPage> */}
        </React.Fragment>
      )}
    </Wrapper>
  )
}
const Wrapper = styled.div``
