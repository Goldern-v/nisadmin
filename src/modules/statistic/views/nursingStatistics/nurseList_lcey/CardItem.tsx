import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { numberToArray } from 'src/utils/array/array'
export interface Props {
  data: any,
  showYear: Boolean,
}
const TITLE_COLOR: any = {
  培训护士: '#D3D2D7',
  见习期护士: '#D3D2D7',
  护士: '#43B965',
  护师: '#6B9AE2',
  主管护师: '#9C6BC1',
  副主任护师: '#F6201A',
  主任护师: '#EF8B46'
}
export default function CardItem(props: Props) {
  useEffect(() => { })
  const star = require("./收藏.png")
  const adapter = (list: any[] = []) => {
    if (!list) return [[{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},]]
    let length = 30
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
      let titles = [null, '', '护士', '护师', '主管护师', '副主任护师', '主任护师']
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
                  className="relative-box"
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
                  <div
                    style={{
                      display: obj.isNurseHead ? 'block' : 'none',
                      width: '16px',
                      position: "absolute",
                      top: 0,
                      right: 0,
                    }}>
                    <img style={{ width: '100%' }} src={star} alt="" />
                  </div>
                  <div
                    style={{
                      display: props.showYear && obj.goWorkTime || obj.goWorkTime === 0 ? 'block' : 'none',
                      width: '100%',
                      position: "relative",
                      left: 0,
                      textAlign: 'center'
                    }}>
                    {`${obj.goWorkTime}\n年`}
                  </div>
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
  .relative-box{
    position:relative;
  }
  width: 100%;
  /* height: 100%; */
  margin: 15px 10px;
  cursor:default;
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
