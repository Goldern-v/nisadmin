
import { observer } from 'mobx-react'
import React, { useMemo } from 'react'
import { Obj } from 'src/libs/types'
import styled from 'styled-components'

export interface Props {
  list: Obj[]
  deptList: Obj[]
}
export default observer(function (props: Props) {
  const { list = [], deptList = [] } = props
  const calcObj = useMemo(() => {
    let key = ''
    let count = 0
    let obj: Obj = {}
    list.forEach(((v, i) => {
      if (key !== v.title) {
        obj[key] && (obj[key].count = count)
        obj[v.title] = {
          index: i,
          count: 0
        }
        count = 0
        key = v.title
      }
      count++
      if (i == list.length - 1) {
        obj[key].count = count
        return
      }
    }))
    return obj
  }, [list])
  return (
    <Wrapper>
      <colgroup>
        <col width='8%' />
        <col width='12%' />
      </colgroup>
      <tbody>
        <tr>
          <td colSpan={2}>项目\科室</td>
          {
            deptList.map((v: Obj, i: number) => (
              <td key={`title-${i}`}>{v.name}</td>
            ))
          }
          {/* <td>急诊科</td>
          <td>发热门诊</td>
          <td>儿内科</td>
          <td>妇科</td>
          <td>乳腺科</td>
          <td>产三区</td>
          <td>产二区</td>
          <td>家外区</td>
          <td>产一区</td>
          <td>产房</td>
          <td>小儿外科</td>
          <td>新生儿科</td>
          <td>手术室</td> */}
          <td>平均分</td>
        </tr>
        {
          list.map((v: Obj, i: number) => (
            <tr key={i}>
              {calcObj[v.title].index === i && <td rowSpan={calcObj[v.title].count}>{v.title}</td>}
              <td>{v.subTitle}</td>
              {
                deptList.map((v1: Obj, i1: number) => (
                  <td key={`val-${i}-${i1}`}>{v[v1.code]}</td>
                ))
              }
              <td>{v.avg}</td>
            </tr>
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