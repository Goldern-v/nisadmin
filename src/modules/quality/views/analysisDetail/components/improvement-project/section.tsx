import styled from 'styled-components'
import React, { useState, useEffect, useRef } from 'react'
import { observer } from 'src/vendors/mobx-react-lite'
import { getModal } from '../../AnalysisDetailModal'
import EditButton from 'src/modules/quality/components/EditButton'
import TwoLevelTitle from 'src/modules/quality/components/TwoLevelTitle'
import FishBone from './FishBone'
import { MainCon } from './style'

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
        <div className="ipt">
          {report.q}
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
          <FishBone value={report.r}/>
        </div>
        <div>主要原因
          <span className='title-small'>
          （2-3个）
          </span>
        </div>
        <div className="ipt">
          {report.mr}
        </div>
        <div>设定目标</div>
        <div className="ipt">
          {report.sign}
        </div>
        <div>改善方案</div>
        <div>问题What</div>
        <div>主要原因Why</div>
        <div>对策方案How</div>
        <div>实施时间When</div>
        <div>实施地点Where</div>
        <div>负责人Who</div>
        <div>{report.what}</div>
        <div>{report.why}</div>
        <div>{report.how}</div>
        <div>{report.when}</div>
        <div>{report.where}</div>
        <div>{report.who}</div>
        <div>
          D：执行（具体措施执行情况）
        </div>
        <div className='ipt'></div>
        <div>
          C: 效果确认
          <span className='title-small'>
            （评价是否达到设定目标）
          </span>
        </div>
        <div className='ipt'></div>
        <div>
          A: 标准化内容
          <span className='title-small'>
            （科室规定/制度/流程）
          </span>
        </div>
        <div className='ipt'></div>
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
`
