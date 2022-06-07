import styled from 'styled-components'
import React, { useState, useEffect, useRef } from 'react'
import { observer } from 'src/vendors/mobx-react-lite'
import { getModal } from '../../AnalysisDetailModal'
import BaseTable from 'src/components/BaseTable'
import { createPropertySignature } from 'typescript'
import { Input } from 'antd'
import { tableCon } from '../../style/modal'
import { cloneJson } from 'src/utils/json/clone'

export interface Props {
  sectionId: string
  data: any
  setData: any
}

export default observer(function NursingJobEvalTableModal(props: Props) {
  let { setData, data } = props
  let value: any[] = (data ? data.value : []) || []
  let cloneData: any = cloneJson(data || { list: [] })

  const TextArea = Input.TextArea
  const columns = [
    {
      key: 'deptName',
      title: '科室',
      width: 110,
      render(text: any, row: any) {
        return <Input type="text" className='cell-ipt' value={row.deptName} onChange={(e: any) => {
          row.deptName = e.target.value
          setData(cloneData)
        }} />
      }
    },
    {
      key: 'empName',
      title: '护士长',
      width: 80,
      render(text: any, row: any) {
        return <Input type="text" className='cell-ipt' value={row.empName} onChange={(e: any) => {
          row.empName = e.target.value
          setData(cloneData)
        }} />
      }
    },
    {
      key: 'score',
      title: '得分',
      width: 80,
      render(text: any, row: any) {
        return <Input type="text" className='cell-ipt' value={row.score} onChange={(e: any) => {
          row.score = e.target.value
          setData(cloneData)
        }} />
      }
    },
    {
      key: 'mq',
      title: '主要问题',
      width: 200,
      render(text: any, row: any) {
        return <TextArea className='cell-ipt' value={row.mq} onChange={(e: any) => {
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

