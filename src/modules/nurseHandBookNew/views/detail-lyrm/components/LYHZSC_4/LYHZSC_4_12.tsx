import React from 'react'
import styled from 'styled-components'
import { nurseHandbookRecordModel as model } from '../../model'
import { DatePicker, Input } from 'antd'
import { observer } from 'mobx-react'
import { DetailCtxCon } from 'src/modules/nurseHandBookNew/style'
import moment, { isMoment } from 'moment'
import { dateFormat, dateFormat2, timeFormat } from '../../config'
import { isOfType } from 'src/utils/ts.utils'
import { ChangeOrFocus } from 'src/libs/types'
const { TextArea } = Input

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
      <table>
        <colgroup>
          <col width='10%' />
          <col width='20%' />
          <col width='10%' />
          <col width='20%' />
          <col width='10%' />
          <col width='20%' />
        </colgroup>
        <tbody>
          <tr>
            <td>时间</td>
            <td>
              <DatePicker className='cell-ipt' showTime={{ format: timeFormat }}
                format={dateFormat2} value={model.editorData?.v1 ? moment(model.editorData?.v1) : undefined} onChange={(e) => onChange(e, 'v1')} />
            </td>
            <td>姓名</td>
            <td>
              <Input className='cell-ipt' value={model.editorData?.v2} onChange={(e) => onChange(e, 'v2')} />
            </td>
            <td>住院号</td>
            <td>
              <Input className='cell-ipt' value={model.editorData?.v3} onChange={(e) => onChange(e, 'v3')} />
            </td>
          </tr>
          <tr>
            <td>诊断</td>
            <td colSpan={5}>
              <TextArea className='cell-ipt' autosize={{ minRows: 2 }} value={model.editorData?.v4} onChange={(e) => onChange(e, 'v4')} />
            </td>
          </tr>
          <tr>
            <td>观察者</td>
            <td colSpan={5}>
              <TextArea autosize={{ minRows: 2 }} className='cell-ipt' value={model.editorData?.v5} onChange={(e) => onChange(e, 'v5')}></TextArea>
            </td>
          </tr>
          <tr>
            <td className='ta-l' colSpan={6}>
              <div className='label'>案例记录与分析：</div>
              <TextArea autosize={{ minRows: 8 }} className='cell-ipt te-200' value={model.editorData?.v6} onChange={(e) => onChange(e, 'v6')}></TextArea>
            </td>
          </tr>
        </tbody>
      </table>
      <div className='fs-s'>备注：“案例记录” 主要记录观察、处理过程及患者转归。</div>
    </Wrapper>
  )
})

const Wrapper = styled(DetailCtxCon)`
.date-con {
  display: flex;
  justify-content: flex-end;
  margin-left: auto;
  .cell-ipt {
    width: 140px;
  }
}
`