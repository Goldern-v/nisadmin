import styled from 'styled-components'
import React, { useState, useEffect, useRef } from 'react'
import { Button } from 'antd'
import OnePage from './page/OnePage'
import TwoPage from './page/TwoPage'
import PrintPage from './components/PrintPage'
import BaseInfo from './page/BaseInfo'
import LevelChange from './page/LevelChange'
import ContinuingEducation from './page/ContinuingEducation'
import Writings from './page/Writings'
import Awards from './page/Awards'
import BadEvent from './page/BadEvent'
import ExaminationResults from './page/ExaminationResults'
import ThreeBases from './page/ThreeBases'
import WorkRegistrationForm from './page/WorkRegistrationForm'
import { nurseFilesService } from '../../services/NurseFilesService'
import printing from 'printing'
import { message } from 'src/vendors/antd'
export interface Props {
  empNo: string
  onCallBack?: (payload?: any) => any
}

export default function ExportNurseFile(props: Props) {
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
  /** 图片列表 */
  const [imgPageList, setImgPageList]: any[] = useState([])

  let fileRef: any = useRef()

  const getData = () => {
    let fileForm = fileRef.current
    Promise.all([
      nurseFilesService.nurseInformation(props.empNo).then((res) => {
        setBaseInfo(res.data)
        return res.data
      }),
      nurseFilesService.nurseWorkExperience(props.empNo).then((res) => {
        setExperienceList(res.data)
        return res.data
      }),
      nurseFilesService.nurseMedicalEducation(props.empNo).then((res) => {
        setMedicalEducatioList(res.data)
        return res.data
      }),
      nurseFilesService.nurseProfessionalAndLevelChange(props.empNo).then((res) => {
        setLevelChangeList(res.data)
        return res.data
      }),
      nurseFilesService.nurseContinuingEducation(props.empNo).then((res) => {
        setContinuingEducationList(res.data)
        return res.data
      }),
      nurseFilesService.nursePaperExperience(props.empNo).then((res) => {
        setPaperExperienceList(res.data)
        return res.data
      }),
      nurseFilesService.nurseYearCheck(props.empNo).then((res) => {
        setYearCheckList(res.data)
        return res.data
      }),
      nurseFilesService.nurseHospitalsThreeBase(props.empNo).then((res) => {
        setThreeBaseList(res.data)
        return res.data
      }),
      nurseFilesService.nurseAwardWinning(props.empNo).then((res) => {
        setAwardWinningList(res.data)
        return res.data
      }),
      nurseFilesService.nurseRegistrationWork(props.empNo).then((res) => {
        setRegistrationWorkList(res.data)
        return res.data
      })
    ]).then((res) => {
      return handleImgPreload(res)
    })
      .then((res: any) => {
        setInited(true)
        setTimeout(() => {
          let _title = document.title
          document.title = res.empName + '信息档案'
          printing(fileForm, {
            injectGlobalCss: true,
            scanStyles: false,
            css: `
          @media print {
            .print-content{
              display: block;
            }
          }
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
      }, err => {
        if (err.path) message.error(`图片 ${err.path[0].currentSrc} 获取失败`)

        props.onCallBack && props.onCallBack(err)
      })
  }

  /** 附件图片预加载 */
  const handleImgPreload = (payload: any[]) => {
    let imgPreLoadUrlList = [] as string[]
    for (let i = 0; i < payload.length; i++) {
      let current = payload[i]
      if (current instanceof Array) {
        for (let j = 0; j < current.length; j++) {
          let item = current[j]
          if (item.urlImageOne) imgPreLoadUrlList = imgPreLoadUrlList.concat(item.urlImageOne.split(','))
          if (item.urlImageTwo) imgPreLoadUrlList = imgPreLoadUrlList.concat(item.urlImageTwo.split(','))
        }
      } else {
        if (current.zyzsUrl) imgPreLoadUrlList = imgPreLoadUrlList.concat(current.zyzsUrl.split(','))
      }
    }

    imgPreLoadUrlList = imgPreLoadUrlList.filter((url: string) => url)

    return new Promise((resolve, reject) => {
      if (imgPreLoadUrlList.length <= 0) {
        resolve(payload[0])
      } else {
        Promise.all(imgPreLoadUrlList.map((url: string) => {
          return new Promise((_resolve, _reject) => {
            let newImg = new Image()
            newImg.onload = (res: any) => _resolve(res.path[0])
            newImg.onerror = (err) => _reject(err)
            newImg.src = url
          })
        }))
          .then((resArr: any[]) => {
            let newImgPageList = [[]] as any[]
            let currentPageHeight = 0

            for (let i = 0; i < resArr.length; i++) {
              let currentImg = resArr[i]
              let currentPage = newImgPageList[newImgPageList.length - 1]
              let finalImgHeight = currentImg.naturalHeight > 460 ? 480 : currentImg.naturalHeight + 20

              currentPageHeight += finalImgHeight

              if (currentPageHeight > 960) {
                currentPageHeight = finalImgHeight
                newImgPageList.push([currentImg])
              } else {
                currentPage.push(currentImg)
              }
            }

            setImgPageList(newImgPageList)

            resolve(payload[0])
          }, err => reject(err))
      }
    })
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <Wrapper ref={fileRef} className="print-content">
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
          <PrintPage pageIndex={8}>
            <BadEvent />
          </PrintPage>
          <PrintPage pageIndex={9}>
            <ExaminationResults yearCheckList={yearCheckList} />
          </PrintPage>
          <PrintPage pageIndex={10}>
            <ThreeBases threeBaseList={threeBaseList} />
          </PrintPage>
          <PrintPage pageIndex={11}>
            <WorkRegistrationForm registrationWorkList={registrationWorkList} />
          </PrintPage>
          {imgPageList.map((imgArr: any[], idx0: number) => (
            <PrintPage pageIndex={idx0 + 1 + 11} key={idx0}>
              {imgArr.map((img: any, idx1) => (
                <img
                  src={img.currentSrc}
                  style={{ maxHeight: 460, maxWidth: '100%', margin: '10px auto' }}
                  key={`${idx0}-${idx1}`} />
              ))}
            </PrintPage>
          ))}
        </React.Fragment>
      )}
    </Wrapper>
  )
}
const Wrapper = styled.div`
  display:none;
`
