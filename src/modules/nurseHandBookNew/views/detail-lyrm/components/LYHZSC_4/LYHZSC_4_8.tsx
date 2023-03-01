import React from 'react'
import styled from 'styled-components'
import { nurseHandbookRecordModel as model } from '../../model'
import { observer } from 'mobx-react'
import { DetailCtxCon } from 'src/modules/nurseHandBookNew/style'
import TextArea from 'antd/es/input/TextArea'
import { dateFormat, dateFormat2, phD } from '../../config'
import moment, { isMoment } from 'moment'
import { isOfType } from 'src/utils/ts.utils'
import { ChangeOrFocus } from 'src/libs/types'
import { DatePicker } from 'antd'

export interface Props {
}
/**反馈意见记录 */
export default observer(function (props: Props) {

  const onChange = (e: any, key: string) => {
    let value: any = e
    if (isMoment(e)) {
      value = e.format(dateFormat)
    } else if (isOfType<ChangeOrFocus>(e, 'target')) {
      value = e.target.value || e.currentTarget.innerText
    }
    const data = {
      ...model.editorData,
      [key]: value
    }
    model.handleEditorChange(data)
  }

  return (
    <Wrapper className='con--a4' ref={model.ctxRef}>
      <div className='title'>主管部门反馈意见记录</div>
      <div>
        <div className='fw-b ta-c'>主管部门反馈意见记录：</div>
        <TextArea className='cell-ipt ' autosize={{ minRows: 10 }} value={model.editorData?.v1} onChange={(e) => onChange(e, 'v1')} />
        <div className='date-con'>

        <DatePicker className='cell-ipt' placeholder={phD}
          format={dateFormat2} value={model.editorData?.v2 ? moment(model.editorData?.v2) : undefined} onChange={(e) => onChange(e, 'v2')} />
        </div>
        <div className='fw-b ta-c'>反馈意见记录：</div>
        <TextArea className='cell-ipt' autosize={{ minRows: 10 }} value={model.editorData?.v3} onChange={(e) => onChange(e, 'v3')} />
        <div className='date-con'>

        <DatePicker className='cell-ipt' placeholder={phD}
          format={dateFormat2} value={model.editorData?.v4 ? moment(model.editorData?.v4) : undefined} onChange={(e) => onChange(e, 'v2')} />
        </div>
        <div className=''></div>
      </div>
    </Wrapper>
  )
})

const Wrapper = styled(DetailCtxCon)`
  pre:not(.ant-calendar-picker-input), textarea {
    border: 1px solid #d9d9d9 !important;
    margin: 20px 0;
  }

  pre:not(.ant-calendar-picker-input) {
    min-height: 200px;
  }
`