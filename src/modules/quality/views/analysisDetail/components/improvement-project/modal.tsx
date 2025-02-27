import { Input } from 'antd'
import React, { useState, useEffect, useRef, useMemo } from 'react'
import { observer } from 'src/vendors/mobx-react-lite'
import styled from 'styled-components'
import { getModal } from '../../AnalysisDetailModal'
import FishBone from './FishBone'
import { DatePicker } from 'antd';
import { MainCon } from './style'
import MultiFileUploader from 'src/components/MultiFileUploader'
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
  // const handleChangeFishBone = (e: any) => {
  //   if (setData) {
  //     setData({
  //       value: e
  //     })
  //   }
  // }
  const TextArea = Input.TextArea
  return (
    <ModalMainCon>
      <div>
        P:问题
        <span className='title-small'>
          （请简要陈述：日期、时间、事情经过）
        </span>
      </div>
      <div className="ipt fixed">
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
        {/* <FishBone value={report} isEdit={true} onChange={(e: any) => handleChangeFishBone(e, )} /> */}
        <MultiFileUploader style={{marginTop: '0'}} type="summaryReport" maxSize={2097152} typeList={['jpeg','png', 'jpg', 'gif']} data={images} onChange={(e: any[])=> handleChange(e.length > 0 ? e[0].path : '', 'fishboneDiagram')} size={1} />
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
      <div>问题<div>What</div></div>
      <div>主要原因<div>Why</div></div>
      <div>对策方案<div>How</div></div>
      <div>实施时间<div>When</div></div>
      <div>实施地点<div>Where</div></div>
      <div>负责人<div>Who</div></div>
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
        <TextArea value={report.planImplementationTime } onChange={(e:any) => { handleChange(e.target.value, 'planImplementationTime')}} autosize={{minRows: 3}} />
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
  .list-item {
    width: calc(100% - 30px);
    height: auto;
    margin: 0;
    img {
      width: 100%;
      height: auto;
    }
  }
`