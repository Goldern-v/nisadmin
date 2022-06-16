import styled from 'styled-components'
import React, { useState, useEffect, useRef } from 'react'
import { observer } from 'src/vendors/mobx-react-lite'
import BaseTable from 'src/components/BaseTable'
import { Input, message } from 'antd'
import { tableCon } from '../../style/modal'
import { cloneJson } from 'src/utils/json/clone'
import moment from 'moment'

export interface Props {
  sectionId: string
  data: any
  setData: any
}
const TextArea = Input.TextArea

export default observer(function EmWorkStatisticTableModal(props: Props) {
  let { setData, data } = props
  let value: any[] = (data ? data.value : []) || []
  let cloneData: any = cloneJson(data || { list: [] })
  let Year:string = moment().format('YYYY')

  const columns = [
    {
      key: 'deptName',
      dataIndex: 'deptName',
      title: '质量项目',
      width: 110,
    },
    {
      
      key: 'mq',
      dataIndex: 'mq',
      title: Number(Year) - 1 + '年' ,
      width: 110,
    },
    {
      
      key: 'empName',
      dataIndex: 'empName',
      title: Year + '年',      
      width: 200,
      render(text: any, row: any) {
        return <TextArea className='cell-ipt' value={row.score} onChange={(e: any) => {
          if (e.target.value.length > 500) {
            message.warn('最多500个字')
            return
          }
          row.score = e.target.value
          setData(cloneData)
        }} />
      }
    },
    {
      key: 'mq',
      title: '效果评价',
      width: 200,
      render(text: any, row: any) {
        return <TextArea className='cell-ipt' value={row.mq} onChange={(e: any) => {
          if (e.target.value.length > 500) {
            message.warn('最多500个字')
            return
          }
          row.mq = e.target.value
          setData(cloneData)
        }} />
      }
    },
  ]
  
  return (
    <Wrapper>
      <BaseTable dataSource={value} columns={columns} />
    </Wrapper>
  )
})
const Wrapper = styled(tableCon)`
`

