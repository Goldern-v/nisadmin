import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { numberToArray } from 'src/utils/array/array'
export interface Props {
  data: any
}
const TITLE_COLOR: any = {
  其他: '#D3D2D7',
  N4: '#43B965',
  N3: '#6B9AE2',
  N2: '#9C6BC1',
  N1: '#F6201A',
  N0: '#EF8B46'
}
export default function CardItem(props: Props) {
  useEffect(() => {})

  const adapter = (list: any[] = []) => {
    if (!list) return [[{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]]
    let length = 10
    let result: any[] = []
    for (let i = 0; i < list.length; i += length) {
      let index = i / length
      for (let j = 0; j < length; j++) {
        if (!result[index]) result[index] = []
        let obj: any = list[i + j] || {}
        result[index].push(obj)
      }
    }
    if (result.length == 0) {
      return [[{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]]
    }
    return result
  }

  let deptName = props.data && props.data.deptName
  let userSortList: any[] = ((props.data && props.data.users) || [])
    .map((item: any) => {
      let titles = [null,'', '其他', 'N4', 'N3', 'N2', 'N1', 'N0']
      item.titleScore = titles.indexOf(item.title) || 0
      return item
    })
    .sort((a: any, b: any) => b.titleScore - a.titleScore)
  let data = props.data && adapter(userSortList || [])

  if (!data) return <div />
  return (
    <Wrapper>
      <table>
        <tbody>
          <tr>
            <td rowSpan={10} className='dept-name'>
              {deptName}
            </td>
          </tr>
          {data.map((item: any, index: number) => (
            <tr key={index}>
              {item.map((obj: any, i: number) => (
                <td
                  key={i}
                  style={
                    obj.empName
                      ? TITLE_COLOR[obj.nurseHierarchy]
                        ? { background: TITLE_COLOR[obj.nurseHierarchy] }
                        : { background: '#EEEEEEFF' }
                      : {}
                  }
                >
                  {obj.empName}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  /* height: 100%; */
  margin: 15px 10px;
  table {
    /* width: 33.33%; */
    border-collapse: collapse;
    &,
    td,
    tr {
      border: 1px solid #454545ff;
    }
    td {
      box-sizing: border-box;
      min-width: 30px;
      max-width: 30px;
      height: 105px;
      text-align: center;
      vertical-align: middle;
      font-size: 12px;
      color: #000000ff;
      padding: 8px;
      word-break: break-all;
      &.dept-name {
        background: #234ba4ff;
        font-size: 15px;
        color: #fff;
      }
    }
  }
`
