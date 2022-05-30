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
        <TextArea value={report.q} onChange={(e:any) => { handleChange(e.target.value, 'q')}} autosize={{minRows: 3}} />
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
        <FishBone value={report.r} isEdit={true} onChange={(e: any) => handleChange(e, 'r')} />
      </div>
      <div>主要原因
        <span className='title-small'>
        （2-3个）
        </span>
      </div>
      <div className="ipt">
        <TextArea value={report.mr} onChange={(e:any) => { handleChange(e.target.value, 'mr')}} autosize={{minRows: 3}} />
      </div>
      <div>设定目标</div>
      <div className="ipt">
        <TextArea value={report.sign} onChange={(e:any) => { handleChange(e.target.value, 'sign')}} autosize={{minRows: 3}} />
      </div>
      <div>改善方案</div>
      <div>问题What</div>
      <div>主要原因Why</div>
      <div>对策方案How</div>
      <div>实施时间When</div>
      <div>实施地点Where</div>
      <div>负责人Who</div>
      <div className='ipt--small'>
        <TextArea value={report.what} onChange={(e:any) => { handleChange(e.target.value, 'what')}} autosize={{minRows: 3}} />
      </div>
      <div className='ipt--small'>
        <TextArea value={report.why} onChange={(e:any) => { handleChange(e.target.value, 'why')}} autosize={{minRows: 3}} />
      </div>
      <div className='ipt--small'>
        <TextArea value={report.how} onChange={(e:any) => { handleChange(e.target.value, 'how')}} autosize={{minRows: 3}} />
      </div>
      <div className='ipt--small'>
        <TextArea value={report.when} onChange={(e:any) => { handleChange(e.target.value, 'when')}} autosize={{minRows: 3}} />
      </div>
      <div className='ipt--small'>
        <TextArea value={report.where} onChange={(e:any) => { handleChange(e.target.value, 'where')}} autosize={{minRows: 3}} />
      </div>
      <div className='ipt--small'>
        <TextArea value={report.who} onChange={(e:any) => { handleChange(e.target.value, 'who')}} autosize={{minRows: 3}} />
      </div>
      <div>
        D：执行（具体措施执行情况）
      </div>
      <div className='ipt'>
        <TextArea value={report.q} onChange={(e:any) => { handleChange(e.target.value, 'q')}} autosize={{minRows: 3}} />
      </div>
      <div>
        C: 效果确认
        <span className='title-small'>
          （评价是否达到设定目标）
        </span>
      </div>
      <div className='ipt'>
        <TextArea value={report.q} onChange={(e:any) => { handleChange(e.target.value, 'q')}} autosize={{minRows: 3}} />
      </div>
      <div>
        A: 标准化内容
        <span className='title-small'>
          （科室规定/制度/流程）
        </span>
      </div>
      <div className='ipt'>
        <TextArea value={report.c} onChange={(e:any) => { handleChange(e.target.value, 'c')}} autosize={{minRows: 3}} />
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