import React from 'react'
import styled from 'styled-components'
import { nurseHandbookRecordModel as model } from '../../model'
import { Checkbox, DatePicker, Input } from 'antd'
import { observer } from 'mobx-react'
import { DetailCtxCon } from 'src/modules/nurseHandBookNew/style'
import { ChangeOrFocus, Obj } from 'src/libs/types'
import cloneDeep from 'lodash/cloneDeep'
import CheckboxGroup from 'antd/es/checkbox/Group'
import { dateFormat, dateFormat3 } from '../../config'

import moment, { isMoment } from 'moment'
import { isOfType } from 'src/utils/ts.utils'

export interface Props {
}
export default observer(function (props: Props) {

  const onChange = (e: any, config: Obj) => {
    const { index, key } = config
    let value: any = e
    if (isMoment(e)) {
      value = e.format(dateFormat)
    } else if (isOfType<ChangeOrFocus>(e, 'target')) {
      value = e.target.value || e.currentTarget.innerText
    } else if (e instanceof Array) {
      value = e.join(',')
    }
    const newData = cloneDeep(model.editorData)
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
          <col width='15%' />
          <col width='15%' />
          <col />
        </colgroup>
        <thead>
          <tr>
            <th>时间</th>
            <th>被表扬者</th>
            <th>患者姓名</th>
            <th>表扬形式</th>
          </tr>
        </thead>
        <tbody>
          {
            (model.editorData || []).map((v: Obj, i: number) => {
              return (
                <tr key={i}>
                  <td>
                  <DatePicker className='cell-ipt'
                      format={dateFormat3} value={v.v1 ? moment(v.v1) : undefined} onChange={(e) => onChange(e, { index: i, key: 'v1' })} />
                  </td>
                  <td>
                    <Input className='cell-ipt ta-c' value={v.v2} onChange={(e) => onChange(e, { index: i, key: 'v2' })} />
                  </td>
                  <td>
                    <Input className='cell-ipt ta-c' value={v.v3} onChange={(e) => onChange(e, { index: i, key: 'v3' })} />
                  </td>
                  <td>
                  <CheckboxGroup value={(v.v4 || '').split(',')} onChange={(e) => onChange(e, { index: i, key: 'v4' })}>
                  {(['表扬信','锦旗','口头','其他形式']).map((v1: string, i1: number) => {
                    return (
                      <Checkbox
                        key={i1}
                        value={v1}
                        className="choiceCss"
                      >
                        {v1}
                      </Checkbox>
                    );
                  })}
                </CheckboxGroup>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
        <div className='fs-s'>备注：填写患者对科室护理人员的表扬，包括书面、口头及其他形式的表扬等。</div>
    </Wrapper>
  )
})

const Wrapper = styled(DetailCtxCon)`

`