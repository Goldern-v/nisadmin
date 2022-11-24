import React, { useEffect, useState } from 'react'
import EditButton from 'src/modules/quality/components/EditButton'
import LevelTitle from 'src/modules/quality/components/LevelTitle'
import styled from 'styled-components'
import { observer } from 'src/vendors/mobx-react-lite'

import { useInstance } from '../../hook/useModel'
import { numberToArray } from 'src/utils/array/array'
import { SectionCon } from '../../style/section'
import { Obj } from 'src/libs/types'

export interface Props {
  sectionId: string
  sectionTitle?: string | undefined
  modalTitle?: string | undefined,
}

export default observer(function (props: Props) {
  let { sectionId, sectionTitle } = props
  const { instance } = useInstance()
  const [data, setData] = useState(instance.getSectionData(sectionId))
  let list = (data ? data.list : []) || []
  useEffect(() => {
    setData(instance.getSectionData(sectionId))
  }, [instance])

  const columns = (data ? data.tempList : []) || []
  // 存在二级结构
  const hasChild = columns.some((v: Obj) => v.children)
  const maxCol = 15
  const rowNumber = Math.ceil(list.length / maxCol) * columns.length
  return (
    <Wrapper>
      <LevelTitle level={2} text={sectionTitle} />

      <EditButton onClick={() => instance.openEditModal(sectionId)}>编辑</EditButton>
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
                return (<tr key={`tr${i}`} >
                  <td key={`td${i}-0`} colSpan={hasChild ? 2 : 1}>{item.titleRender ? item.titleRender() : item.title}</td>
                  {
                    numberToArray(maxCol).map((v1, i1) => {
                      let index = Math.floor(i / columns.length) * maxCol + i1
                      return <td key={`td${i}-${i1 + 1}`}>{list.length > index ? list[index][item.key] : ''}</td>
                    })
                  }
                </tr>)
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
                          return <td key={`td${i}-${i1}-${i2 + 2}`}>{list.length > index ? list[index][v1.key] : ''}</td>
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
    </Wrapper >
  )
})
const Wrapper = styled(SectionCon)`
  table {
    margin: 20px 30px;
    width: calc(100% - 60px);
    td {
      text-align: center;
      border: 1px solid #000;
    }
  }
`


