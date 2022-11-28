import styled from 'styled-components'
import React from 'react'
import { Input } from 'src/vendors/antd'

import { useInstance } from '../../hook/useModel'
import { numberToArray } from 'src/utils/array/array'
import { cloneJson } from 'src/utils/json/clone'
import { Obj } from 'src/libs/types'

export interface Props {
  sectionId: string
  data: any
  setData: any
}
interface UpdateDataIn {
  value: string,
  index: number,
  key: string
}
export default function (props: Props) {
  let { sectionId, setData, data } = props
  // const { instance } = useInstance()
  // let section = instance.getSection(sectionId)
  let list = (data ? data.list : []) || []
  const columns = (data ? data.tempList : []) || []
  // 存在二级结构
  const hasChild = columns.some((v: Obj) => v.children)

  const maxCol = 15
  const rowNumber = Math.ceil(list.length / maxCol) * columns.length

  const updateData = ({ value, index, key }: UpdateDataIn) => {
    if (setData) {
      const item = { ...list[index] }
      item[key] = value
      setData((prev: any) => {
        const cloneData = cloneJson(prev)
        cloneData.list[index] = item
        cloneData.tempList = columns
        return cloneData
      })
    }
  }
  return (
    <Wrapper>
      <table>
        <colgroup>
          <col width={60}></col>
          {hasChild && <col width={30}></col>}
          {
            numberToArray(maxCol).map(v => (
              <col></col>
            ))
          }
        </colgroup>
        <tbody>
          {
            numberToArray(rowNumber).map((v: any, i: number) => {
              let item = columns[i % columns.length]
              let child = item.children
              if (!child)
                return <tr key={`tr${i}`}>
                  <td key={`td${i}-0`} colSpan={hasChild ? 2 : 1}>{item.titleRender ? item.titleRender() : item.title}</td>
                  {numberToArray(maxCol).map((v1, i1) => {
                    let index = Math.floor(i / columns.length) * maxCol + i1
                    return <td key={`td${i}-${i1 + 1}`}>{list.length > index ? <Input value={list[index][item.key]} onChange={(e) => updateData({ value: e.target.value, index, key: item.key })} /> : ''}</td>
                  })
                  }
                </tr>
              // 如果是二级构造
              return <>
              {
                child.map((v1: any, i1: number) => {

                  return <tr key={`tr${i}-${i1}`}>
                    {i1 === 0 && <td key={`td${i}-${i1}-0`} rowSpan={child.length}>{item.title}</td>}
                    <td key={`td${i}-${i1}-1`}>{v1.title}</td>
                    {
                      numberToArray(maxCol).map((v2, i2) => {
                        let index = Math.floor(i / columns.length) * maxCol + i2
                        return <td key={`td${i}-${i1}-${i2 + 2}`}>{list.length > index ? <Input value={list[index][v1.key]} onChange={(e) => updateData({ value: e.target.value, index, key: v1.key })} /> : ''}</td>
                      })
                    }
                  </tr>
                })
              }
            </>
            })
          }
        </tbody>
      </table>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  table {
    margin: 15px;
    width: calc(100% - 30px);
    td {
      text-align: center;
      border: 1px solid #000;
    }
    .ant-input {
      padding: 5px;
      height: 100%;
      border-radius: 0px;
      border: none;
      outline: none;
      :focus {
        outline: none;
        box-shadow: none;
        background: ${p => p.theme.$mlc};
      }
    }
  }
  
`
