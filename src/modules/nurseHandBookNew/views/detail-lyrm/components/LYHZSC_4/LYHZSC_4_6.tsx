import React from 'react'
import styled from 'styled-components'
import { nurseHandbookRecordModel as model } from '../../model'
import { DatePicker, Input } from 'antd'
import { observer } from 'mobx-react'
import { DetailCtxCon } from 'src/modules/nurseHandBookNew/style'
import moment, { isMoment } from 'moment'
import { dateFormat, timeFormat } from '../../config'
import { isOfType } from 'src/utils/ts.utils'
import { ChangeOrFocus, Obj } from 'src/libs/types'
import cloneDeep from 'lodash/cloneDeep'
const { TextArea } = Input

export interface Props {
}
const formatVal = (e: any) => {
  let value: any = e
  if (isMoment(e)) {
    value = e.format(dateFormat)
  } else if (isOfType<ChangeOrFocus>(e, 'target')) {
    value = e.target.value || e.currentTarget.innerText
  }
  return value
}
/**护患沟通记录 */
export default observer(function (props: Props) {
  const onChange = (e: any, key: string) => {

    const data = {
      ...model.editorData,
      [key]: formatVal(e)
    }
    model.handleEditorChange(data)
  }
  const onChangeList = (e: any, config: Obj) => {
    const { index, key } = config
    const newData = cloneDeep(model.editorData)
    newData.list[index][key] = formatVal(e)
    model.handleEditorChange(newData)
  }

  return (
    <Wrapper className='con--a4' ref={model.ctxRef}>
      <div className='title'>
        {model.detail?.record?.menuName}
      </div>
      <table>
        <colgroup>
          <col width='17%' />
          <col width='15%' />
          <col />
        </colgroup>
        <tbody>
          <tr>
            <td className='ta-c'>时 间</td>
            <td className='ta-c'>姓名、住院号</td>
            <td className='ta-c'>意见及建议</td>
          </tr>
          {
            (model?.editorData?.list || []).map((v: Obj, i: number) => (
              <tr key={i}>
                <td>
                  <DatePicker className='cell-ipt' showTime={{ format: timeFormat }}
                    format={dateFormat} value={v?.v1 ? moment(v?.v1) : undefined} onChange={(e) => onChangeList(e, { index: i, key: 'v1' })} />
                </td>
                <td>
                  <Input className='cell-ipt' value={v.v2} onChange={(e) => onChangeList(e, { index: i, key: 'v2' })} />
                </td>
                <td>
                  <TextArea className='cell-ipt' autosize={{ minRows: 1 }} value={v.v3} onChange={(e) => onChangeList(e, { index: i, key: 'v3' })} />
                </td>
              </tr>
            ))
          }
          <tr>
            <td colSpan={3}>
            处理意见及落实情况：
              <TextArea className='cell-ipt te-60' autosize={{ minRows: 2 }} value={model.editorData?.v1} onChange={(e) => onChange(e, 'v1')} />
            </td>
          </tr>
        </tbody>
      </table>
      <div className='f-s'>备注：，护土长至少每半月与患者沟通，征求意见建议 1次，并做好记录。</div>
    </Wrapper>
  )
})

const Wrapper = styled(DetailCtxCon)`
table td {
  text-align: left;
}
`