import React from 'react'
import styled from 'styled-components'
import { nurseHandbookRecordModel as model } from '../newModel'
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
        <div className='fw-b ta-c'>1月护理工作重点</div>
        <TextArea className='cell-ipt ' autosize={{minRows: 10}} value={model.editorData?.v1} onChange={(e) => onChange(e, 'v1')} />
        <div className='fw-b ta-c'>1月护理工作小结</div>
        <TextArea className='cell-ipt' autosize={{minRows: 10}} value={model.editorData?.v2} onChange={(e) => onChange(e, 'v2')} />

        <div className='fw-b ta-c'>2月护理工作重点</div>
        <TextArea className='cell-ipt ' autosize={{minRows: 10}} value={model.editorData?.v3} onChange={(e) => onChange(e, 'v3')} />
        <div className='fw-b ta-c'>2月护理工作小结</div>
        <TextArea className='cell-ipt' autosize={{minRows: 10}} value={model.editorData?.v4} onChange={(e) => onChange(e, 'v4')} />

        <div className='fw-b ta-c'>3月护理工作重点</div>
        <TextArea className='cell-ipt ' autosize={{minRows: 10}} value={model.editorData?.v5} onChange={(e) => onChange(e, 'v5')} />
        <div className='fw-b ta-c'>3月护理工作小结</div>
        <TextArea className='cell-ipt' autosize={{minRows: 10}} value={model.editorData?.v6} onChange={(e) => onChange(e, 'v6')} />

        <div className='fw-b ta-c'>4月护理工作重点</div>
        <TextArea className='cell-ipt ' autosize={{minRows: 10}} value={model.editorData?.v7} onChange={(e) => onChange(e, 'v7')} />
        <div className='fw-b ta-c'>4月护理工作小结</div>
        <TextArea className='cell-ipt' autosize={{minRows: 10}} value={model.editorData?.v8} onChange={(e) => onChange(e, 'v8')} />

        <div className='fw-b ta-c'>5月护理工作重点</div>
        <TextArea className='cell-ipt ' autosize={{minRows: 10}} value={model.editorData?.v9} onChange={(e) => onChange(e, 'v9')} />
        <div className='fw-b ta-c'>5月护理工作小结</div>
        <TextArea className='cell-ipt' autosize={{minRows: 10}} value={model.editorData?.v10} onChange={(e) => onChange(e, 'v10')} />

        <div className='fw-b ta-c'>6月护理工作重点</div>
        <TextArea className='cell-ipt ' autosize={{minRows: 10}} value={model.editorData?.v11} onChange={(e) => onChange(e, 'v11')} />
        <div className='fw-b ta-c'>6月护理工作小结</div>
        <TextArea className='cell-ipt' autosize={{minRows: 10}} value={model.editorData?.v12} onChange={(e) => onChange(e, 'v12')} />

        <div className='fw-b ta-c'>7月护理工作重点</div>
        <TextArea className='cell-ipt ' autosize={{minRows: 10}} value={model.editorData?.v13} onChange={(e) => onChange(e, 'v13')} />
        <div className='fw-b ta-c'>7月护理工作小结</div>
        <TextArea className='cell-ipt' autosize={{minRows: 10}} value={model.editorData?.v14} onChange={(e) => onChange(e, 'v14')} />

        <div className='fw-b ta-c'>8月护理工作重点</div>
        <TextArea className='cell-ipt ' autosize={{minRows: 10}} value={model.editorData?.v15} onChange={(e) => onChange(e, 'v15')} />
        <div className='fw-b ta-c'>8月护理工作小结</div>
        <TextArea className='cell-ipt' autosize={{minRows: 10}} value={model.editorData?.v16} onChange={(e) => onChange(e, 'v16')} />

        <div className='fw-b ta-c'>9月护理工作重点</div>
        <TextArea className='cell-ipt ' autosize={{minRows: 10}} value={model.editorData?.v17} onChange={(e) => onChange(e, 'v17')} />
        <div className='fw-b ta-c'>9月护理工作小结</div>
        <TextArea className='cell-ipt' autosize={{minRows: 10}} value={model.editorData?.v18} onChange={(e) => onChange(e, 'v18')} />

        <div className='fw-b ta-c'>10月护理工作重点</div>
        <TextArea className='cell-ipt ' autosize={{minRows: 10}} value={model.editorData?.v19} onChange={(e) => onChange(e, 'v19')} />
        <div className='fw-b ta-c'>10月护理工作小结</div>
        <TextArea className='cell-ipt' autosize={{minRows: 10}} value={model.editorData?.v20} onChange={(e) => onChange(e, 'v20')} />

        <div className='fw-b ta-c'>11月护理工作重点</div>
        <TextArea className='cell-ipt ' autosize={{minRows: 10}} value={model.editorData?.v21} onChange={(e) => onChange(e, 'v21')} />
        <div className='fw-b ta-c'>11月护理工作小结</div>
        <TextArea className='cell-ipt' autosize={{minRows: 10}} value={model.editorData?.v22} onChange={(e) => onChange(e, 'v22')} />

        <div className='fw-b ta-c'>12月护理工作重点</div>
        <TextArea className='cell-ipt ' autosize={{minRows: 10}} value={model.editorData?.v23} onChange={(e) => onChange(e, 'v23')} />
        <div className='fw-b ta-c'>12月护理工作小结</div>
        <TextArea className='cell-ipt' autosize={{minRows: 10}} value={model.editorData?.v24} onChange={(e) => onChange(e, 'v24')} />

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