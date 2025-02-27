import styled from 'styled-components'
import React, { useState, useEffect, useRef, useMemo } from 'react'
import { observer } from 'src/vendors/mobx-react-lite'
import { getModal } from '../../AnalysisDetailModal'
import EditButton from 'src/modules/quality/components/EditButton'
import TwoLevelTitle from 'src/modules/quality/components/TwoLevelTitle'
// import FishBone from './FishBone'
import { MainCon } from './style'
import MultiFileUploader from 'src/components/MultiFileUploader'

export interface Props {
  sectionId: string
  sectionTitle?: string | undefined
  modalTitle?: string | undefined,
  keyName: string
}
//
export default observer(function ImprovementProjectSection(props: Props) {
  let { sectionId, sectionTitle, keyName } = props
  const analysisDetailModal = useRef(getModal())
  let data = analysisDetailModal.current.getSectionData(sectionId)
  let report: any = (data ? data.value : {}) || {}
  // 鱼骨图图片列表
  let images = useMemo(() => {
    if (report.fishboneDiagram) {
      return [{
        path: report.fishboneDiagram,
        id: '',
        name: '',
      }]
    }
    return []
  }, [report])
  return (
    <Wrapper>
      <TwoLevelTitle text={sectionTitle}/>
      <EditButton onClick={() => analysisDetailModal.current!.openEditModal(sectionId)}>编辑</EditButton>
      <MainCon>
        <div>
          P:问题
          <span className='title-small'>
            （请简要陈述：日期、时间、事情经过）
          </span>
        </div>
        <div className="ipt fixed">
          {report.question}
        </div>
        <div>原因分析
          <span className='title-small'>
          （备注：
          人——人员 ；
          机——设备仪器；
          物——物品/药品；
          法——流程、规范、制度；
          环——环境）
          </span>
        </div>
        <div className='ipt'>
          {/* <FishBone value={report}/> */}
          <MultiFileUploader style={{marginTop: '0'}} data={images} readOnly={true} size={1} />
        </div>
        <div>主要原因
          <span className='title-small'>
          （2-3个）
          </span>
        </div>
        <div className="ipt">
          {report.mainReason}
        </div>
        <div  className='title_left'>设定目标</div>
        <div className="ipt">
          {report.setGoal}
        </div>
        <div className='title_left'>改善方案</div>
        <div>问题<div>What</div></div>
        <div style={{width:'90px'}}>主要原因Why</div>
        <div>对策方案<div>How</div></div>
        <div>实施时间<div>When</div></div>
        <div>实施地点<div>Where</div></div>
        <div>负责人<div>Who</div></div>
        <div>{report.planQuestion}</div>
        <div>{report.planMainReason}</div>
        <div>{report.planCountermeasures}</div>
        <div>{report.planImplementationTime}</div>
        <div>{report.planImplementationSite}</div>
        <div>{report.planPrincipal}</div>
        <div  className='title_left'>
          D：执行（具体措施执行情况）
        </div>
        <div className='ipt'>
          {report.implementation}
        </div>
        <div >
          C: 效果确认
          <span className='title-small'>
            （评价是否达到设定目标）
          </span>
        </div>
        <div className='ipt'>
          {report.effectConfirmed}
        </div>
        <div >
          A: 标准化内容
          <span className='title-small'>
            （科室规定/制度/流程）
          </span>
        </div>
        <div className='ipt'>
          {report.standardizedContent}
        </div>
      </MainCon>
    </Wrapper>
  )
})
const Wrapper = styled.div`
  position: relative;
  button {
    position: absolute;
    top: 0px;
    right: 20px;
  }
  .text-box {
    padding-left: 65px;
    padding-right: 15px;
    padding-bottom: 2px;
    padding-top: 2px;
  }
  .list-item {
    width: 100%;
    height: auto;
    margin: 0;
    img {
      width: 100%;
      height: auto;
    }
  }
`
