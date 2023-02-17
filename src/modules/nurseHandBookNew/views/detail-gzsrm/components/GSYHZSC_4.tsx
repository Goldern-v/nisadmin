import React from 'react'
import styled from 'styled-components'
import { nurseHandbookRecordModel as model } from '../model'
import { DatePicker, Input } from 'antd'
import { observer } from 'mobx-react'
import { DetailCtxCon } from '../../../style'
const { TextArea } = Input
export interface Props {
}

const dateFormat = 'YYYY-MM-DD HH:mm'
/**业务学习项目 */
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
            <td>主讲人</td>
            <td>
              <Input className='cell-ipt' value={model.editorData?.v1} onChange={(e) => onChange(e, 'v1')}></Input>
            </td>
          </tr>
          <tr>
            <td>参加人数</td>
            <td colSpan={3}>
              <Input className='cell-ipt' value={model.editorData?.v2} onChange={(e) => onChange(e, 'v2')}></Input>
            </td>
          </tr>
          <tr>
            <td>学习主题</td>
            <td colSpan={3}>
              <Input className='cell-ipt' value={model.editorData?.v3} onChange={(e) => onChange(e, 'v3')}></Input>
            </td>
          </tr>
          <tr>
            <td colSpan={4}>
              <div className='label'>
                学习内容（可附课件）
              </div>
              </td>
          </tr>
          <tr>
            <td colSpan={4}>
              <TextArea rows={8} className='cell-ipt te-8' value={model.editorData?.v4} onChange={(e) => onChange(e, 'v4')}></TextArea>
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