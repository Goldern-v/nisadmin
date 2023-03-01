import React from 'react'
import styled from 'styled-components'
import { nurseHandbookRecordModel as model } from '../model'
import { Input } from 'antd'
import { observer } from 'mobx-react'
import { DetailCtxCon } from 'src/modules/nurseHandBookNew/style'
import TextArea from 'antd/es/input/TextArea'

export interface Props {
}
/**护士长季度工作计划 */
export default observer(function (props: Props) {

  const onChange = (e: any, key: string) => {
    const data = {
      ...model.editorData,
      [key]: e.target.value || e.currentTarget.innerText
    }
    model.handleEditorChange(data)
  }

  return (
    <Wrapper className='con--a4' ref={model.ctxRef}>
      <div className='title'>{model.detail?.record?.menuName}</div>
      <div>
        <div className='fw-b ta-c'>月护理工作重点</div>
        <TextArea className='cell-ipt ' autosize={{minRows: 10}} value={model.editorData?.v1} onChange={(e) => onChange(e, 'v1')} />
        <div className='fw-b ta-c'>月护理工作小结</div>
        <TextArea className='cell-ipt' autosize={{minRows: 10}} value={model.editorData?.v2} onChange={(e) => onChange(e, 'v2')} />
        <div className='f-s'>备注： *月 护理工作重点及工作小结* 包括对科室护理质量控制管理，护士培训及其他护理工作情况的记录。</div>
      </div>
    </Wrapper>
  )
})

const Wrapper = styled(DetailCtxCon)`
  pre, textarea {
    border: 1px solid #d9d9d9 !important;
    margin: 20px 0;
  }
  pre {
    min-height: 200px;
  }
`