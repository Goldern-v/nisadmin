import React, { forwardRef, useImperativeHandle, useState } from 'react'
import styled from 'styled-components'
import { nurseHandbookRecordModel as model } from '../model'
import { DatePicker, Input } from 'antd'
import { observer } from 'mobx-react'
import { DetailCtxCon } from '../../../style'
export interface Props {
}

const dateFormat = 'YYYY-MM-DD HH:mm'
/**公休会记录 */
export default observer(function (props: Props) {

  const onChange = (e: any, key: string) => {
    if (key === 'editorTime') {
      return model.editorTime = e
    }
    const newData = {
      ...model.editorData,
      [key]: e.target.value
    }
    model.handleEditorChange(newData)
  }

  return (
    <Wrapper ref={model.ctxRef}  style={{ pointerEvents: model.allowEdit ? 'auto' : 'none' }}>
      <table>
        <colgroup>
          <col width='20%' />
          <col width='20%' />
          <col width='20%' />
          <col width='20%' />
        </colgroup>
        <thead>
          <tr>
            <th className='title' colSpan={4}>{model.detail?.record?.menuName}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>时间</td>
            <td>
              <DatePicker
                className='cell-ipt'
                showTime={{ format: 'HH:mm' }}
                format={dateFormat}
                value={model.editorTime
                  ? model.editorTime : undefined} onChange={(e) => onChange(e, 'editorTime')} />
            </td>
            <td>主持人</td>
            <td>
              <Input className='cell-ipt' value={model.editorData?.v1} onChange={(e) => onChange(e, 'v1')}></Input>
            </td>
          </tr>
          <tr>
            <td>参加人员</td>
            <td colSpan={3}>
              <Input className='cell-ipt' value={model.editorData?.v2} onChange={(e) => onChange(e, 'v2')}></Input>
            </td>
          </tr>

          <tr>
            <td colSpan={4}>
              <div className='label'>
                会议内容
              </div>
            </td>
          </tr>
          <tr>
            <td>本科室需解决的问题</td>
            <td colSpan={3}>
              <div contentEditable={true} className='cell-ipt ant-input' onBlur={(e) => onChange(e, 'v3')}>
                {model.editorData?.v3}
              </div>
            </td>
          </tr>
          <tr>
            <td>本科室已解决的问题</td>
            <td colSpan={3}>
              <div contentEditable={true} className='cell-ipt ant-input' onBlur={(e) => onChange(e, 'v4')}>
                {model.editorData?.v4}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </Wrapper >
  )
})

const Wrapper = styled(DetailCtxCon)`
  th {
    line-height: 32px;
  }
  td {
    text-align: left !important;
  }
`