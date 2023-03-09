import React from 'react'
import styled from 'styled-components'
import { nurseHandbookRecordModel as model } from '../../model'
import { DatePicker, Input } from 'antd'
import { observer } from 'mobx-react'
import { DetailCtxCon } from 'src/modules/nurseHandBookNew/style'
import moment, { isMoment } from 'moment'
import { dateFormat, LYHZSC_2_3_NAME, timeFormat } from '../../config'
import { isOfType } from 'src/utils/ts.utils'
import { ChangeOrFocus } from 'src/libs/types'
const { TextArea } = Input

const PH_1 = `(要求：有检查项目、检查，总人次、缺陷人次。其中某类缺陷几人次或重点问题为⋯，重点问题应纳入下个月护理质控计划中，体现质量持续改进。）
例：1、基础护理：检查60人次，缺陷5人次。其中床单不清洁2人次，指甲脏3人次
2、护理文书：检查 120 人次，缺陷30人次。重点问题为临时医嗎签宇不及时、体温图血压漏项。`

const PH_2 = `（要求：有参加人员发言，手写）例：
护士甲：
护士己：
护士...`
export interface Props {
}

export default observer(function (props: Props) {
  const onChangeTitle = (e: any) => {
    onChange(e, 'v1')
    model.editorTitle = e.target.value + LYHZSC_2_3_NAME
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
          {LYHZSC_2_3_NAME}
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
              <Input className='cell-ipt' value={model.editorData?.v5} onChange={(e) => onChange(e, 'v5')} />
            </td>
          </tr>
          <tr>
            <td className='ta-l' colSpan={6}>
              <div className='label'>存在缺陷及问题：</div>
              <TextArea autosize={{ minRows: 8 }} className='cell-ipt te-200' value={model.editorData?.v6} onChange={(e) => onChange(e, 'v6')} placeholder={PH_1}></TextArea>
              {/* <div contentEditable={true} className='cell-ipt ant-input ta-l' onBlur={(e) => onChange(e, 'v5')} suppressContentEditableWarning data-placeholder={PH_1}>
                {model.editorData?.v5}
              </div> */}
            </td>
          </tr>
          <tr>
            <td className='ta-l' colSpan={6}>
              <div className='label'>讨论记录（原因分析、改进措施）：</div>
              <TextArea autosize={{ minRows: 8 }} className='cell-ipt te-200' value={model.editorData?.v7} onChange={(e) => onChange(e, 'v7')} placeholder={PH_2}></TextArea>
              <div className='label'>护士长：</div>
              <TextArea autosize={{ minRows: 6 }} className='cell-ipt te-150' value={model.editorData?.v8} onChange={(e) => onChange(e, 'v8')}></TextArea>
            </td>
          </tr>
          <tr>
            <td className='ta-l' colSpan={6}>
              <div className='label'>追踪检查结果：</div>
              <TextArea autosize={{ minRows: 6 }} className='cell-ipt te-150' value={model.editorData?.v9} onChange={(e) => onChange(e, 'v9')}></TextArea>
              <div className='date-con'>
                <DatePicker className='cell-ipt'
                  format='YYYY年MM月DD日' value={model.editorData?.v10 ? moment(model.editorData?.v10) : undefined} onChange={(e) => onChange(e, 'v10')} />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </Wrapper>
  )
})

const Wrapper = styled(DetailCtxCon)`
`