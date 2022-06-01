import { Input } from 'antd'
import { observer } from 'mobx-react'
import React from 'react'
import styled from 'styled-components'
import { cloneJson } from 'src/utils/json/clone'

export interface Props {
  row: any
  str: string
  index: number
  setVal: any,
  type?: 'TextArea' | undefined
}
export default observer(function TableInput(props: Props) {
  const { str, index, type } = props
  const Con = !type ? Input : Input[type]
  const item = cloneJson(props.row)
  return (
    <Con value={props.row[str]} onChange={
      (e: any)=> {
        item[str] = e.target.value
        props.setVal((prev: any) => {
          const cloneData = cloneJson(prev)
          cloneData.list[index] = item
          return cloneData
        })
      }
    }/>
  )
})

const Wrapper = styled.div`

`