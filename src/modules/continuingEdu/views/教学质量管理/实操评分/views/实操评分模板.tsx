import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { Place } from 'src/components/common'
import BaseTable from 'src/components/BaseTable'
import { ColumnProps } from 'src/vendors/antd'
export interface Props { }

export default function 实操评分模板() {

  const [tableData, setTableData] = useState()

  const columns: ColumnProps<any>[] = [
    {
      title: '序号',
      key: 'id',
      width: 50,
      align: 'center',
      render: (text: string, record: any, idx: number) => idx + 1
    },
  ]

  return <Wrapper>
    <HeaderCon>
      <Title>评分标准模板</Title>
      <Place />
      <Button>返回</Button>
    </HeaderCon>
    <MainCon>
      <BaseTable
        dataSource={tableData}
        columns={columns} />
    </MainCon>
  </Wrapper>
}

const Wrapper = styled.div`
`

const HeaderCon = styled.div`
  align-items: center;
  color: #333;
  height: 32px;
  display: flex;
  padding: 0 15px;
  margin: 10px 0;
`

const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #333;
`

const MainCon = styled.div`
  height: calc( 100vh - 115px);
  padding: 0 15px;
`