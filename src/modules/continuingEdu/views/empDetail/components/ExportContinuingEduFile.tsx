import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import OnePage from './page/OnePage'
import TwoPage from './page/TwoPage'
import BaseInfo from './page/BaseInfo'
import LevelChange from './page/LevelChange'
import ContinuingEducation from './page/ContinuingEducation'
import Writings from './page/Writings'
import Awards from './page/Awards'
import BadEvent from './page/BadEvent'
import ExaminationResults from './page/ExaminationResults'
import ThreeBases from './page/ThreeBases'
import WorkRegistrationForm from './page/WorkRegistrationForm'
// import { nurseFilesService } from '../../services/NurseFilesService'
import printing from 'printing'
import { empManageService } from "../api/EmpManageService"
import PrintPage from './PrintPage'

export interface Props {
  empNo: string
  onCallBack?: () => any
}

export default function ExportContinuingEduFile(props: Props) {
  /** 加载完成 */
  const [inited, setInited]: any = useState(false)

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

  let fileRef: any = React.createRef<HTMLDivElement>()

  const getData = () => {
    let fileForm = fileRef.current
    empManageService.getEmpDetail({ empNo: props.empNo || '' }).then(res => {
      let user = res.data;
      setBaseInfo({
        ...user,
        sexual: user.sexual == 0 ? '男' : '女',
      })
    })
    empManageService.getAllStudyTrainList(props.empNo).then((res) => {
      // let newArr = res.data.classHourRecord.concat(res.data.creditRecord)
      // .concat(res.data.examRecord).
      // concat(res.data.exerciseRecord).
      // concat(res.data.practiseRecord).
      // concat(res.data.socialPractiseRecord).
      // concat(res.data.studyNote).
      // concat(res.data.studyRecord).
      // concat(res.data.teachingRecord).
      // concat(res.data.trainRecord).
      // concat(res.data.workReview).
      // concat(res.data.wtRecord)
      setThreeBaseList(res.data.examRecord)
      setInited(true)
      setTimeout(() => {
        let _title = document.title
        document.title = '个人学习档案信息档案'
        printing(fileForm, {
          injectGlobalCss: true,
          scanStyles: false,
          css: `
          @page {
            margin: 0;
          }
          `
        })
        setTimeout(() => {
          document.title = _title
        }, 500)

        props.onCallBack && props.onCallBack()
      }, 500)
    })
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <Wrapper ref={fileRef}>
      {inited && (
        <React.Fragment>
          <PrintPage>
            <OnePage baseInfo={baseInfo} />
          </PrintPage>
          {/* <PrintPage pageIndex={2}>
            <TwoPage />
          </PrintPage> */}
          <PrintPage pageIndex={3}>
            <BaseInfo baseInfo={baseInfo} />
          </PrintPage>
          {/* <PrintPage pageIndex={4}>
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
          <PrintPage pageIndex={8}>
            <BadEvent />
          </PrintPage>
          <PrintPage pageIndex={9}>
            <ExaminationResults yearCheckList={yearCheckList} />
          </PrintPage> */}
          <PrintPage pageIndex={10}>
            <ThreeBases threeBaseList={threeBaseList} />
          </PrintPage>
          {/* <PrintPage pageIndex={11}>
            <WorkRegistrationForm registrationWorkList={registrationWorkList} />
          </PrintPage> */}
        </React.Fragment>
      )}
    </Wrapper>
  )
}
const Wrapper = styled.div``
