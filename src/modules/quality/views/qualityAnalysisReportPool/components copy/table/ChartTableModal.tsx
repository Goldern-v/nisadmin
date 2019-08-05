import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { Input, Radio, ColumnProps } from 'src/vendors/antd'
import BaseTable, { DoCon } from 'src/components/BaseTable'

export interface Props {
  sectionId: string
  data: any
  setData: any
}

export default function ChartTableModal(props: Props) {
  let { sectionId, setData, data } = props
  const [radiovalue, setRadiovalue] = useState('二月')
  let text = data ? data.text : ''

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
      }
    },
    {
      title: '项目',
      key: 'index',
      render(text: any, record: any, index: number) {
        return index + 1
      }
    },
    {
      title: '2月',
      key: 'index',
      dataIndex: '2'
    },
    {
      title: '3月',
      key: 'index',
      dataIndex: '3'
    },
    {
      title: '操作',
      key: 'index',
      render(text: any, record: any, index: number) {
        return (
          <DoCon>
            <span>删除</span>
          </DoCon>
        )
      }
    }
  ]
  const dataSource = [
    {
      2: 2,
      3: 3
    },
    {
      2: 2,
      3: 3
    }
  ]
  useEffect(() => {}, [])
  return (
    <Wrapper>
      <div className='button-con'>
        <Button icon='plus' size='small'>
          添加
        </Button>
      </div>

      <BaseTable
        columns={columns}
        dataSource={dataSource}
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
`

const HeadCon = styled.div``
