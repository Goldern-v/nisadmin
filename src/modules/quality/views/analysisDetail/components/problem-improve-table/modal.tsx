import styled from 'styled-components'
import React, { useState, useEffect, useRef } from 'react'
import { observer } from 'src/vendors/mobx-react-lite'
import BaseTable from 'src/components/BaseTable'
import { Input, message } from 'antd'
import { tableCon } from '../../style/modal'
import { cloneJson } from 'src/utils/json/clone'

export interface Props {
  sectionId: string
  data: any
  setData: any
}

export default observer(function ProblemImproveTableModal(props: Props) {
  let { setData, data } = props
  let value: any[] = (data ? data.value : []) || []
  let cloneData: any = cloneJson(data || { list: [] })

  const TextArea = Input.TextArea
  const columns = [
    {
      key: 'deptName',
      title: '质量项目',
      width: 110,
    },
    {
      key: 'empName',
      title: '主要问题（汇总A、B-A类问题）',
      width: 110,
    },
    {
      key: 'score',
      title: '原因分析及整改措施',
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

