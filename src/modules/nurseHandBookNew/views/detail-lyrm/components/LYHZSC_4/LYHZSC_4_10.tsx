import React from 'react'
import styled from 'styled-components'
import { nurseHandbookRecordModel as model } from '../../model'
import { DatePicker, Input } from 'antd'
import { observer } from 'mobx-react'
import { DetailCtxCon } from 'src/modules/nurseHandBookNew/style'
import { ChangeOrFocus, Obj } from 'src/libs/types'
import cloneDeep from 'lodash/cloneDeep'
import { dateFormat, dateFormat3 } from '../../config'
import moment, { isMoment } from 'moment'
import { isOfType } from 'src/utils/ts.utils'
import { genders } from '../../enums'
import SelectFilter from 'src/components/SelectFilter'


export interface Props {
}
export default observer(function (props: Props) {

  const onChange = (e: any, config: Obj) => {
    const { index, key } = config
    console.log('test-e', e)
    const newData = cloneDeep(model.editorData)
    let value: any = e
    if (isMoment(e)) {
      value = e.format(dateFormat)
    } else if (isOfType<ChangeOrFocus>(e, 'target')) {
      value = e.target.value || e.currentTarget.innerText
    }
    newData[index][key] = value
    model.handleEditorChange(newData)
  }

  return (
    <Wrapper className='con--a4' ref={model.ctxRef}>
      <div className='title'>
        {model.detail?.record?.menuName}
      </div>
      <table>
        <colgroup>
          <col width='15%' />
          <col width='10%' />
          <col width='5%' />
          <col width='5%' />
          <col width='10%' />
          <col width='13%' />
          <col />
          <col width='6%' />
          <col width='6%' />
        </colgroup>
        <thead>
          <tr>
            <th rowSpan={2}>医院</th>
            <th rowSpan={2}>姓名</th>
            <th rowSpan={2}>性别</th>
            <th rowSpan={2}>年龄</th>
            <th rowSpan={2}>职称</th>
            <th rowSpan={2}>进修时间</th>
            <th rowSpan={2}>进修主要内容</th>
            <th colSpan={2}>进修结束考试成缋</th>
          </tr>
          <tr>
            <th>理论</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {
            (model.editorData || []).map((v: Obj, i: number) => {
              return (
                <tr>
                  <td>
                    <Input className='cell-ipt ta-c' value={v.v1} onChange={(e) => onChange(e, { index: i, key: 'v1' })} />
                  </td>
                  <td>
                    <Input className='cell-ipt ta-c' value={v.v2} onChange={(e) => onChange(e, { index: i, key: 'v2' })} />
                  </td>
                  <td>
                    <SelectFilter className='cell-ipt ta-c' list={genders} value={v.v3} onChange={(e) => onChange(e, { index: i, key: 'v3' })} />
                  </td>
                  <td><Input className='cell-ipt ta-c' value={v.v4} onChange={(e) => onChange(e, { index: i, key: 'v4' })} /></td>
                  <td>
                    <Input className='cell-ipt ta-c' value={v.v5} onChange={(e) => onChange(e, { index: i, key: 'v5' })} />
                  </td>
                  <td>
                    <DatePicker className='cell-ipt'
                      format={dateFormat3} value={v.v6 ? moment(v.v6) : undefined} onChange={(e) => onChange(e, { index: i, key: 'v6' })} />
                  </td>
                  <td>
                    <Input className='cell-ipt ta-c' value={v.v7} onChange={(e) => onChange(e, { index: i, key: 'v7' })} />
                  </td>
                  <td><Input className='cell-ipt ta-c' value={v.v8} onChange={(e) => onChange(e, { index: i, key: 'v8' })} /></td>
                  <td><Input className='cell-ipt ta-c' value={v.v9} onChange={(e) => onChange(e, { index: i, key: 'v9' })} /></td>
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
.ant-calendar-picker-icon {
  display: none;
}
`