import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'src/vendors/antd'
import { ColumnProps } from 'antd/lib/table'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import { cloneJson } from 'src/utils/json/clone'
import { tableCon } from '../../style/modal'

export interface Props {
  sectionId: string
  data: any
  setData: any
}
export default function ImprovementsModal(props: Props) {
  let { sectionId, setData, data } = props
  let cloneData: any = cloneJson(data || { list: [] })
  useEffect(() => { }, [])
  const columns: ColumnProps<any>[] = [
    {
      title: '上月问题',
      key: '上月问题',
      render(text, record, index) {
        return (
          <input
            type='text'
            className='cell-ipt'
            value={record.question|| ''}
            onChange={(e) => {
              record.question = e.target.value
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
          <input
            type='text'
            className='cell-ipt'
            value={record.feetback|| ''}
            onChange={(e) => {
              record.feetback = e.target.value
              setData(cloneData)
            }}
          />
        )
      },
      width: 200
    },
    {
      title: '操作',
      key: '操作',
      width: 80,
      render(text: any, record: any, index: number) {
        return (
          <DoCon>
            <span
              onClick={(e) => {
                cloneData.list.splice(index, 1)
                setData(cloneData)
              }}
            >
              删除
            </span>
          </DoCon>
        )
      }
    }
  ]

  const addItem = () => {
    cloneData.list.push({
      question: '',
      feetback: '',
    })
    setData(cloneData)
  }
  return (
    <Wrapper>
      <Button icon='plus' size='small' onClick={addItem}>
        添加
      </Button>
      <BaseTable columns={columns} dataSource={(cloneData.list || [])} />
    </Wrapper>
  )
}
const Wrapper = styled(tableCon)`
`
