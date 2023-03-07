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
/**护理不良事件讨论分析改进记录 */
export default observer(function (props: Props) {
  const onChangeTitle = (e: any) => {
    onChange(e, 'v1')
    model.editorTitle = e.target.value + model.detail?.record?.menuName
  }
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
      <div className='title-con'>
        <Input className='title' value={model.editorData?.v1} onChange={(e) => onChangeTitle(e)} />
        <div className='title'>
          {model.detail?.record?.menuName}
        </div>
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
                format={dateFormat} value={model.editorData?.v2 ? moment(model.editorData?.v2) : undefined} onChange={(e) => onChange(e, 'v2')} />
            </td>
            <td>地点</td>
            <td>
              <Input className='cell-ipt' value={model.editorData?.v3} onChange={(e) => onChange(e, 'v3')} />
            </td>
            <td>主持人</td>
            <td>
              <Input className='cell-ipt' value={model.editorData?.v4} onChange={(e) => onChange(e, 'v4')} />
            </td>
          </tr>
          <tr>
            <td>参加人员</td>
            <td colSpan={5}>
              <TextArea className='cell-ipt' autosize={{ minRows: 2 }} value={model.editorData?.v5} onChange={(e) => onChange(e, 'v5')} />
            </td>
          </tr>
          <tr>
            <td className='ta-l' colSpan={6}>
              <div className='label'>事件经过：</div>
              <TextArea autosize={{ minRows: 8 }} className='cell-ipt te-200' value={model.editorData?.v6} onChange={(e) => onChange(e, 'v6')}></TextArea>
            </td>
          </tr>
          <tr>
            <td className='ta-l' colSpan={6}>
              <div className='label'>讨论记录（原因分析、改进措施）</div>
              <TextArea autosize={{ minRows: 8 }} className='cell-ipt te-200' value={model.editorData?.v7} onChange={(e) => onChange(e, 'v7')}></TextArea>
              <div className='date-con'>
                <div className='label'>记录人：</div>
                <Input className='cell-ipt' value={model.editorData?.v8} onChange={(e) => onChange(e, 'v8')}></Input>
              </div>
            </td>
          </tr>
          <tr>
            <td className='ta-l' colSpan={6}>
              <div className='label'>追踪检查结果：</div>
              <TextArea autosize={{ minRows: 6 }} className='cell-ipt te-150' value={model.editorData?.v9} onChange={(e) => onChange(e, 'v9')}></TextArea>
              <div className='date-con'>
                <div className='label'>护士长：</div>
                <Input className='cell-ipt' value={model.editorData?.v10} onChange={(e) => onChange(e, 'v10')}></Input>
              </div>
              <div className='date-con'>
                <DatePicker className='cell-ipt'
                  format={dateFormat2} value={model.editorData?.v11 ? moment(model.editorData?.v11) : undefined} onChange={(e) => onChange(e, 'v11')} />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </Wrapper>
  )
})

const Wrapper = styled(DetailCtxCon)`
.date-con {
  .cell-ipt {
    width: 120px;
  }
}
`