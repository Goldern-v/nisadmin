import { Input } from 'antd'
import React, { useState, useEffect, useRef } from 'react'
import { observer } from 'src/vendors/mobx-react-lite'
import styled from 'styled-components'
import { getModal } from '../../AnalysisDetailModal'
import FishBone from './FishBone'
import { MainCon } from './style'
export interface Props {
  sectionId: string
  data: any
  setData: any
}
// 
export default observer(function ImprovementProjectModal(props: Props) {
  let { sectionId, setData, data } = props
  const analysisDetailModal = useRef(getModal())

  let report: any = (data ? data.value : {}) || {}
  const handleChange = (e: any, key: string) => {
    if (setData) {
      setData({
        value: {
          ...report,
          [key]: e
        }
      })
    }
  }
  const handleChangeFishBone = (e: any) => {
    if (setData) {
      setData({
        value: e
      })
    }
  }
  const TextArea = Input.TextArea
  return (
    <ModalMainCon>
      <div>
        P:问题
        <span className='title-small'>
          （请简要陈述：日期、时间、事情经过）
        </span>
      </div>
      <div className="ipt">
        <TextArea value={report.question} onChange={(e:any) => { handleChange(e.target.value, 'question')}} autosize={{minRows: 3}} />
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
        <FishBone value={report} isEdit={true} onChange={(e: any) => handleChangeFishBone(e, )} />
      </div>
      <div>主要原因
        <span className='title-small'>
        （2-3个）
        </span>
      </div>
      <div className="ipt">
        <TextArea value={report.mainReason} onChange={(e:any) => { handleChange(e.target.value, 'mainReason')}} autosize={{minRows: 3}} />
      </div>
      <div>设定目标</div>
      <div className="ipt">
        <TextArea value={report.setGoal} onChange={(e:any) => { handleChange(e.target.value, 'setGoal')}} autosize={{minRows: 3}} />
      </div>
      <div>改善方案</div>
      <div>问题What</div>
      <div>主要原因Why</div>
      <div>对策方案How</div>
      <div>实施时间When</div>
      <div>实施地点Where</div>
      <div>负责人Who</div>
      <div className='ipt--small'>
        <TextArea value={report.planQuestion} onChange={(e:any) => { handleChange(e.target.value, 'planQuestion')}} autosize={{minRows: 3}} />
      </div>
      <div className='ipt--small'>
        <TextArea value={report.planMainReason} onChange={(e:any) => { handleChange(e.target.value, 'planMainReason')}} autosize={{minRows: 3}} />
      </div>
      <div className='ipt--small'>
        <TextArea value={report.planCountermeasures} onChange={(e:any) => { handleChange(e.target.value, 'planCountermeasures')}} autosize={{minRows: 3}} />
      </div>
      <div className='ipt--small'>
        <TextArea value={report.planImplementationTime} onChange={(e:any) => { handleChange(e.target.value, 'planImplementationTime')}} autosize={{minRows: 3}} />
      </div>
      <div className='ipt--small'>
        <TextArea value={report.planImplementationSite} onChange={(e:any) => { handleChange(e.target.value, 'planImplementationSite')}} autosize={{minRows: 3}} />
      </div>
      <div className='ipt--small'>
        <TextArea value={report.planPrincipal} onChange={(e:any) => { handleChange(e.target.value, 'planPrincipal')}} autosize={{minRows: 3}} />
      </div>
      <div>
        D：执行（具体措施执行情况）
      </div>
      <div className='ipt'>
        <TextArea value={report.implementation} onChange={(e:any) => { handleChange(e.target.value, 'implementation')}} autosize={{minRows: 3}} />
      </div>
      <div>
        C: 效果确认
        <span className='title-small'>
          （评价是否达到设定目标）
        </span>
      </div>
      <div className='ipt'>
        <TextArea value={report.effectConfirmed} onChange={(e:any) => { handleChange(e.target.value, 'effectConfirmed')}} autosize={{minRows: 3}} />
      </div>
      <div>
        A: 标准化内容
        <span className='title-small'>
          （科室规定/制度/流程）
        </span>
      </div>
      <div className='ipt'>
        <TextArea value={report.standardizedContent} onChange={(e:any) => { handleChange(e.target.value, 'standardizedContent')}} autosize={{minRows: 3}} />
      </div>
    </ModalMainCon>
  )
})
const ModalMainCon = styled(MainCon)`
  margin: 0;
  .ipt, .ipt--small {
    padding: 0px;
  }
`