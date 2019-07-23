import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { Input, Radio, ColumnProps, AutoComplete } from 'src/vendors/antd'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import { cloneJson } from 'src/utils/json/clone'
import { LastImproveItem } from '../../types'

export interface Props {
  sectionId: string
  data: any
  setData: any
}

export default function 上月质量问题弹窗(props: Props) {
  let { sectionId, setData, data } = props
  let cloneData: any = cloneJson(data || { list: [] })

  const updateData = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (setData) {
      setData({
        text: e.target.value
      })
    }
  }

  const columns: ColumnProps<any>[] = [
    {
      title: '序号',
      key: 'index',
      render(text: any, record: any, index: number) {
        return index + 1
      },
      width: 50,
      align: 'center'
    },
    {
      title: '项目',
      key: '项目',
      render(text: any, record: LastImproveItem, index: number) {
        return (
          <input
            type='text'
            className='cell-input'
            value={record.itemImproveDesc || record.itemName}
            onChange={(e) => {
              record.itemImproveDesc = e.target.value
              setData(cloneData)
            }}
          />
        )
      },
      width: 300
    },
    {
      title: '评分',
      key: '评分',
      render(text: any, record: LastImproveItem, index: number) {
        return (
          <AutoComplete
            value={record.result}
            dataSource={['A', 'B', 'C', 'D']}
            className={'cell-input text-center'}
            onChange={(value) => {
              record.result = value + ''
              setData(cloneData)
            }}
          />
        )
      },
      width: 80
    },

    {
      title: '操作',
      key: '操作',
      width: 80,
      render(text: any, record: any, index: number) {
        return (
          <DoCon>
            <span
              onClick={() => {
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
      id: '',
      itemCode: '',
      itemName: '',
      itemImproveDesc: '',
      result: ''
    })
    setData(cloneData)
  }
  useEffect(() => {}, [])
  return (
    <Wrapper>
      <div className='button-con'>
        <Button icon='plus' size='small' onClick={addItem}>
          添加
        </Button>
      </div>

      <BaseTable
        columns={columns}
        dataSource={cloneData.list}
        wrapperStyle={{
          padding: 0,
          paddingTop: 20
        }}
      />
    </Wrapper>
  )
}
const Wrapper = styled.div`
  position: relative;
  text {
    min-height: 200px !important;
    resize: none;
  }
  .button-con {
    position: absolute;
    top: -13px;
    right: 0;
  }

  .cell-input input,
  input.cell-input {
    width: 100%;
    height: 100%;
    border: 0;
    outline: none;
    background: transparent;
    padding: 0 5px;
    border-radius: 0;
    &:focus {
      background: ${(p) => p.theme.$mlc};
    }
  }

  td {
    padding: 0 !important;
  }
  .text-center input {
    text-align: center;
  }
`

const HeadCon = styled.div``
