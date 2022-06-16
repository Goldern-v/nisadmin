import { Input , DatePicker , TimePicker } from 'antd'
import { observer } from 'mobx-react'
import moment from 'moment';
import React from 'react'
import styled from 'styled-components'
import { cloneJson } from 'src/utils/json/clone'
export interface Props {
  row: any
  str: string
  index: number
  setVal: any,
  type?: 'TextArea' |'DatePicker'| 'TimePicker' | undefined
}
export default observer(function TableInput(props: Props) {
  const { str, index, type } = props
  const Con = !type ? Input : Input[type]
  const item = cloneJson(props.row)
  const onChange= (date:any, dateString:any) => {
    item[str]=dateString
    props.setVal((prev: any) => {
      const cloneData = cloneJson(prev)
      cloneData.list[index] = item
      return cloneData
    })
  };
  const onChangeTime= (time:any) => {
    item[str]=time
    props.setVal((prev: any) => {
      const cloneData = cloneJson(prev)
      cloneData.list[index] = item
      return cloneData
    })
  };
  switch (type) {
    case 'DatePicker':
    return (<Wrapper><DatePicker onChange={onChange} value={props.row[str] ? moment(props.row[str],'YYYY-MM-DD') : undefined } defaultValue={moment(new Date(),'YYYY-MM-DD' )}/></Wrapper>)
    case 'TimePicker':
    return (<Wrapper><TimePicker onChange={onChangeTime} value={props.row[str] ? moment(props.row[str],'HH:mm:ss') : undefined } defaultValue={moment(new Date(),'HH:mm:ss' )}/></Wrapper>)
    default:
      return(
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
  }
  
})

const Wrapper = styled.div`
.ant-calendar-picker {
  width: 100%;
  height: 100%;
}
`