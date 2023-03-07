import React from 'react'
import styled from 'styled-components'
import { nurseHandbookRecordModel as model } from '../../model'
import { DatePicker, Input } from 'antd'
import { observer } from 'mobx-react'
import { DetailCtxCon } from 'src/modules/nurseHandBookNew/style'
import { ChangeOrFocus, Obj } from 'src/libs/types'
import cloneDeep from 'lodash/cloneDeep'
import moment, { isMoment } from 'moment'
import { dateFormat, dateFormat2, dateFormat3 } from '../../config'
import { isOfType } from 'src/utils/ts.utils'
import { authStore } from 'src/stores'

const DATES = ['周一', '周二', '周三', '周四', '周五']
export interface Props {
}
export default observer(function (props: Props) {

  const onChange = (e: any) => {
    const newData = cloneDeep(model.editorData)
    const [d1, d2] = e
    newData.v1 = d1 ? d1.format(dateFormat) : null
    newData.v2 = d2 ? d2.format(dateFormat) : null
    model.handleEditorChange(newData)
  }
  const onChange1 = (e: any, config: Obj) => {
    const { index, key } = config
    const newData = cloneDeep(model.editorData)
    let value: any = e
    if (isMoment(e)) {
      value = e.format(dateFormat)
    } else if (key === 'v4') {
      value = newData.v3[index][key] ? '' : authStore.user?.empName
    } else if (isOfType<ChangeOrFocus>(e, 'target')) {
      value = e.target.value || e.currentTarget.innerText
    }
    newData.v3[index][key] = value
    model.handleEditorChange(newData)
  }
  const onChange2 = (e: any, config: Obj) => {
    const { index, key } = config
    const newData = cloneDeep(model.editorData)
    let value: any = e
    if (isMoment(e)) {
      value = e.format(dateFormat)
    } else if (isOfType<ChangeOrFocus>(e, 'target')) {
      value = e.target.value || e.currentTarget.innerText
    }
    newData.v4[index][key] = value
    model.handleEditorChange(newData)
  }

  return (
    <Wrapper className='con--a4' ref={model.ctxRef}>
      <div className='title'>
        {model.detail?.record?.menuName}
      </div>
      <div className="date-con">
        带教时间：
        <DatePicker.RangePicker format={dateFormat2} value={model.editorData?.v1 ? [moment(model.editorData?.v1), moment(model.editorData?.v2)] : []} onChange={(e: any) => onChange(e)} />
      </div>
      <table>
        <colgroup>
          <col width='6%' />
          <col width='6%' />
          <col width='6%' />
          <col width='50%' />
          <col width='10%' />
          <col width='12%' />
          <col width='10%' />
        </colgroup>
        <tbody>
          <tr>
            <td>周次</td>
            <td>项目</td>
            <td colSpan={2}>计划内容</td>
            <td>负责人</td>
            <td>落实时间</td>
            <td>护士长签名</td>
          </tr>
          {
            (model.editorData?.v3 || []).map((v: Obj, i: number) => {
              return (
                <tr key={i}>
                  {i % 3 == 0 && i + 1 !== model.editorData?.v3?.length && <>
                    <td rowSpan={3}>{DATES[i / 3]}</td>
                    <td rowSpan={2}>晨会提问</td>
                  </>}
                  {i % 3 == 2 && <td>业务讲座</td>}
                  {i + 1 == model.editorData?.v3?.length && <>
                    <td></td>
                    <td>教学查房</td>
                  </>}
                  <td colSpan={2}>
                    <Input className='cell-ipt ta-c' value={v.v1} onChange={(e) => onChange1(e, { index: i, key: 'v1' })} />
                  </td>
                  <td>
                    <Input className='cell-ipt ta-c' value={v.v2} onChange={(e) => onChange1(e, { index: i, key: 'v2' })} />
                  </td>
                  <td>
                    <DatePicker className='cell-ipt'
                      format={dateFormat3} value={v.v3 ? moment(v.v3) : undefined} onChange={(e) => onChange1(e, { index: i, key: 'v3' })} />
                  </td>
                  <td onClick={(e) => onChange1(e, { index: i, key: 'v4' })}>{v.v4}</td>
                </tr>
              )
            })
          }
          <tr>
            <td colSpan={7}>带教学生情况</td>
          </tr>
          <tr>
            <td colSpan={3}>院校</td>
            <td colSpan={3}>学生姓名</td>
            <td>人数</td>
          </tr>
          {
            (model.editorData?.v4 || []).map((v: Obj, i: number) => {
              return (
                <tr key={i}>
                  <td colSpan={3}>
                    <Input className='cell-ipt ta-c' value={v.v1} onChange={(e) => onChange2(e, { index: i, key: 'v1' })} />
                  </td>
                  <td colSpan={3}>
                    <Input className='cell-ipt ta-c' value={v.v2} onChange={(e) => onChange2(e, { index: i, key: 'v2' })} />
                  </td>
                  <td><Input className='cell-ipt ta-c' value={v.v3} onChange={(e) => onChange2(e, { index: i, key: 'v3' })} /></td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </Wrapper>
  )
})

const Wrapper = styled(DetailCtxCon)`
.date-con {
  width: 320px;
  white-space: nowrap;
  margin-bottom: 10px;
}
.ant-calendar-picker-icon {
  display: none;
}
`