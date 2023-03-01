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
      注：每组护生实习结束前，由护士长负责征求护生对本病区带教工作的意见和建议，实习组长汇总意见和建议填写带教反馈记录，并签名。
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