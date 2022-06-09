import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { ColumnProps } from 'antd/lib/table'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import { cloneJson } from 'src/utils/json/clone'
import { tableCon } from '../../style/modal'
import { Input } from 'src/vendors/antd'
const { TextArea } = Input
export interface Props {
  sectionId: string
  data: any
  setData: any
}
export default function ImprovementsModal(props: Props) {
  let { sectionId, setData, data } = props
  let cloneData: any = cloneJson(data || { value: [] })
  const tableData = cloneData.value ? cloneData&&[cloneData.value] : []
  useEffect(() => { }, [])
  const columns: ColumnProps<any>[] = [
    {
      title: '上月问题',
      key: '上月问题',
      render(text, record, index) {
        return (
          <TextArea
            className='cell-ipt'
            value={record.ultQuestion || ''}
            rows={14}
            autosize={false}
            maxLength={500}
            onChange={(e) => {
              record.ultQuestion = e.target.value
              setData(cloneData)
            }}
          />
        )
      },
      align: 'center'
    },
    {
      title: '改进反馈',
      key: '上月问题',
      render(text, record, index) {
        return (
          <TextArea
            className='cell-ipt'
            rows={14}
            autosize={false}
            maxLength={500}
            value={record.improveFeedback || ''}
            onChange={(e) => {
              record.improveFeedback = e.target.value
              setData(cloneData)
            }}
          />
        )
      },
    },
  ]
  return (
    <Wrapper>
      <BaseTable columns={columns} dataSource={(tableData)} />
    </Wrapper>
  )
}
const Wrapper = styled(tableCon)`
`
