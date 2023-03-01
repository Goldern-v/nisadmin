import React, { memo, useMemo } from 'react'
import styled from 'styled-components'
import { nurseHandbookRecordModel as model } from '../model'
import { DatePicker, Input } from 'antd'
import { observer } from 'mobx-react'
import { DetailCtxCon } from 'src/modules/nurseHandBookNew/style'
import { ChangeOrFocus, Obj } from 'src/libs/types'
import cloneDeep from 'lodash/cloneDeep'
import { dateFormat, dateFormat3, tableConConfig } from '../config'

import moment, { isMoment } from 'moment'
import { isOfType } from 'src/utils/ts.utils'

export interface Props {
}
const ChildCon = memo((props: any) => {
  const { value, component, ...other } = props
  switch (component) {
    case 'DataPicker':
      return (
        <DatePicker className='cell-ipt'
          format={dateFormat3} value={value ? moment(value) : undefined} {...other} />)
    default:
      return <Input className='cell-ipt ta-c' value={value} {...other} />
  }
}, (prev: any, next: any) => {
  return prev?.value == next?.value
})
/**表格类表单 */
export default observer(function (props: Props) {

  const columns = useMemo(() => tableConConfig[model.detail?.record?.menuCode]?.columns || [], [model.id])
  const config = useMemo(() => tableConConfig[model.detail?.record?.menuCode] || {}, [model.id])
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
        {model.detail?.record?.[config?.titleType || 'menuName']}
      </div>
      <table>
        <colgroup>
          {
            columns.map((v: Obj, i: number) => (
              <col key={i} {...(v.width ? { width: v.width } : {})} />
            ))
          }
        </colgroup>
        <thead>
          <tr>
            {
              columns.map((v: Obj, i: number) => (
                <td key={i}>{v.title}</td>
              ))
            }
          </tr>
        </thead>
        <tbody>
          {
            (model.editorData || []).map((v: Obj, i: number) => {
              return (
                <tr key={i}>
                  {
                    columns.map((v1: Obj, i1: number) => (
                      <td key={`${i}-${i1}`}>
                        <ChildCon {...{
                          component: v1.component,
                          value: v[`v${i1}`],
                          onChange: (e: any) => onChange(e, { index: i, key: `v${i1}` })
                        }} />
                      </td>
                    ))
                  }
                </tr>
              )
            })
          }
        </tbody>
      </table>
      {config?.tip && <div className='fs-s'>{config?.tip}</div>}
    </Wrapper>
  )
})

const Wrapper = styled(DetailCtxCon)`

`