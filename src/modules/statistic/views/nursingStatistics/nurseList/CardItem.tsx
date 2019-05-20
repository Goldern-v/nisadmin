import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { numberToArray } from 'src/utils/array/array'
export interface Props {
  data: any
}
enum TITLE_COLOR {
  '培训护士' = '#D3D2D7',
  '护士' = '#43B965',
  '护师' = '#6B9AE2',
  '主管护师' = '#9C6BC1',
  '副主任护师' = '#F6201A',
  '主任护师' = '#EF8B46'
}
export default function CardItem (props: Props) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    console.log(count, setCount)
  })

  const adapter = (list: any[] = []) => {
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
  let data = props.data && adapter(props.data.users)
  console.log(props, 'propspropsprops')
  console.log(data, 'datadata')
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
                      ? TITLE_COLOR[obj.title]
                        ? { background: TITLE_COLOR[obj.title] }
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
  margin: 15px 10px;
  table {
    border-collapse: collapse;
    &,
    td,
    tr {
      border: 1px solid #454545ff;
    }
    td {
      width: 30px;
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
