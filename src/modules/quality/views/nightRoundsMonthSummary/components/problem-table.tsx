
import { Select } from 'antd'
import { observer } from 'mobx-react'
import React, { useMemo } from 'react'
import { Obj } from 'src/libs/types'
import { currentMonth } from 'src/utils/date/rangeMethod'
import styled from 'styled-components'
import moment from "moment";

export interface Props {
  data: Obj
  date: string
  changeType: Function
}
export default observer(function (props: Props) {
  const { data, date, changeType } = props
  const selectOpts = () => {
    return [
      {
        code: 0,
        name: '全部未落实',
      },
      {
        code: 1,
        name: '部分落实',
      },
      {
        code: 2,
        name: '全部落实',
      },
    ].map(v => (
      <Select.Option key={v.code} value={v.code}>{v.name}</Select.Option>
    ))
  }
  const months = useMemo(() => {
    const arr = currentMonth(moment(date)).map(v => v.format('YYYY年MM月DD日'))
    return arr.join('-')
  }, [date])
  return (
    <Wrapper>
      <colgroup>
        <col width='20%' />
        <col width='20%' />
        <col width='20%' />
        <col width='10%' />
        <col width='15%' />
        <col width='10%' />
      </colgroup>
      <tbody>
        <tr>
          <td colSpan={6}>日期: {months}</td>
        </tr>
        <tr>
          <td>科别</td>
          <td>存在问题</td>
          <td>整改建议</td>
          <td>科室负责人</td>
          <td>当前日期</td>
          <td>护理部追踪效果</td>
        </tr>
        {
          Object.keys(data).map((v: string, i: number) => (
            <>
              {data[v].map((v1: Obj, i1: number) => (
                <tr key={`${i}-${i1}`}>
                  {!i1 && <td rowSpan={data[v.length]}>{v1.deptName}</td>}
                  <td>{v1.problem}</td>
                  <td>{v1.proposal}</td>
                  <td>{v1.liablePersonName}</td>
                  <td>{v1.submitTime}</td>
                  <td>
                    <Select size='small' value={v1.achieveType} onChange={(e: any) => changeType(e, v1)}>
                      {selectOpts()}
                    </Select>
                  </td>
                </tr>
              ))}
            </>
          ))
        }
      </tbody>
    </Wrapper >
  )
})

const Wrapper = styled.table`
  width: 100%;
  border: 1px solid #000;
  td {
    line-height: 24px;
    text-align: center;
    border: 1px solid #000;
  }
`