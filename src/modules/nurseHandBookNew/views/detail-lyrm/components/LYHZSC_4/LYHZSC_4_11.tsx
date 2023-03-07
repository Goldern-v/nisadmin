import React from 'react'
import styled from 'styled-components'
import { nurseHandbookRecordModel as model } from '../../model'
import { observer } from 'mobx-react'
import { DetailCtxCon } from 'src/modules/nurseHandBookNew/style'
import TextArea from 'antd/es/input/TextArea'
import { dateFormat } from '../../config'
import { isMoment } from 'moment'
import { isOfType } from 'src/utils/ts.utils'
import { ChangeOrFocus } from 'src/libs/types'


export interface Props {
}
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
      <div className='title'>
        {model.detail?.record?.menuName}
      </div>
      <TextArea className='cell-ipt ' autosize={{ minRows: 20 }} value={model.editorData?.v1} onChange={(e) => onChange(e, 'v1')} />
      <div className="f-s">
        {`备注：1、填写悲者对科室护理人员的妆诉，包括书面，日头及其他形式的投诉等。
2、记录内容包括时问、投诉者、被投诉人、投诉事由及处理结果等。`}
      </div>
    </Wrapper>
  )
})

const Wrapper = styled(DetailCtxCon)`
  pre:not(.ant-calendar-picker-input), textarea {
    border: 1px solid #d9d9d9 !important;
  }

  pre {
    min-height: 80%;
  }
`