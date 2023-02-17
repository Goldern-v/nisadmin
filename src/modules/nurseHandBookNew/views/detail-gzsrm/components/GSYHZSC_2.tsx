import React from 'react'
import styled from 'styled-components'
import { nurseHandbookRecordModel as model } from '../model'
import { Input } from 'antd'
import { observer } from 'mobx-react'
import { DetailCtxCon } from '../../../style'
import { Obj } from 'src/libs/types'
import cloneDeep from 'lodash/cloneDeep'
const { TextArea } = Input
export interface Props {
}

/**护士长月工作计划 */
export default observer(function (props: Props) {

  const onChange = (e: any, config: Obj) => {
    const { index , key } = config
    const newData = cloneDeep(model.editorData)
    newData[index][key] = e.target.value
    model.handleEditorChange(newData)
  }

  return (
    <Wrapper ref={model.ctxRef}  style={{ pointerEvents: model.allowEdit ? 'auto' : 'none' }}>
      <div className='title'>护士长月工作计划</div>
      <table>
        <colgroup>
          <col width='10%' />
          <col width='5%' />
          <col />
          <col width='10%' />
          <col width='15%' />
          <col width='10%' />
          <col width='10%' />
        </colgroup>
        <thead>
          <tr>
            <th className='ta-l' colSpan={7}>背景：医院、科室发展规划、年度计划。</th>
          </tr>
          <tr>
            <th>工作目标</th>
            <th>序号</th>
            <th>目标分解工作任务</th>
            <th>完成时间/频次</th>
            <th>责任人</th>
            <th>落实情况</th>
            <th>备注</th>
          </tr>
        </thead>
        <tbody>
          {
            (model.editorData || []).map((v: Obj, i: number) => {
              return (
                <>
                  <tr key={i}>
                    {v.title !== undefined && <td rowSpan={4} key={`${i}-0`}>
                      <TextArea className='cell-ipt' rows={8} value={v.title} onChange={(e) => onChange(e, { index: i, key: 'title' })}></TextArea>
                    </td>}
                    <td key={`${i}-1`}>{i % 4 + 1}</td>
                    <td key={`${i}-2`}>
                      <TextArea className='cell-ipt' value={v.v1} onChange={(e) => onChange(e, { index: i, key: 'v1' })}></TextArea>
                    </td>
                    <td key={`${i}-3`}>
                      <Input className='cell-ipt' value={v.v2} onChange={(e) => onChange(e, { index: i, key: 'v2' })}></Input>
                    </td>
                    <td key={`${i}-4`}>
                      <Input className='cell-ipt' value={v.v3} onChange={(e) => onChange(e, { index: i, key: 'v3' })}></Input>
                    </td>
                    <td key={`${i}-5`}>
                      <Input className='cell-ipt' value={v.v4} onChange={(e) => onChange(e, { index: i, key: 'v4' })}></Input>
                    </td>
                    <td key={`${i}-6`}>
                      <TextArea className='cell-ipt' value={v.v5} onChange={(e) => onChange(e, { index: i, key: 'v5' })}></TextArea>
                    </td>
                  </tr>
                </>
              )
            })
          }
        </tbody>
      </table>
    </Wrapper>
  )
})

const Wrapper = styled(DetailCtxCon)`
  th {
    line-height: 32px;
  }
  /* textarea {
    min-height: 80px;
    height: auto;
  } */
`