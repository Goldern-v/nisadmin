import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import Table from './components/Table'
import { reportViewModal } from './ReportViewModal'
import { TableHeadCon } from 'src/components/BaseTable'
import { Place } from 'src/components/common'
import { PageTitle } from 'src/components/common'
import { Button, DatePicker} from 'antd'
const { RangePicker } = DatePicker
export interface Props {}

export default function ReportView() {
  useEffect(() => {
    reportViewModal.init()
  }, [])
  return (
    <Wrapper>
      <Head>
        <LeftIcon>
            <PageTitle>护理查询分析报告</PageTitle>
        </LeftIcon>
        <RightIcon>
          <span>查房日期：</span>
          <RangePicker
            style={{ width: 250 }}
            value={reportViewModal.selectedDate}
            onChange={(date) => {
              reportViewModal.selectedDate = date
              reportViewModal.onload()
            }}
          />
          <Place />
          <Button onClick={() => reportViewModal.onload()} className='checkButton' >查询</Button>
          <Button>打印</Button>
        </RightIcon>
      </Head>
      <Table />
      
    </Wrapper>
  )
}
const Wrapper = styled.div``
const Head = styled(TableHeadCon)`
  justify-content: space-between;
  .ant-select {
    width: 150px;
    margin-right: 20px;
  }
  .ant-calendar-picker {
    margin-right: 20px;
  }
  button {
    margin-left: 10px;
  }
  .checkButton {
    margin-left: 0px;
  }

`
const LeftIcon = styled.div`
  height: 55px;
  font-size: 13px;
  position: relative;
  font-size: 13px;
  color: #333333;
  padding: 0 0 0 15px;
  display: flex;
  align-items: center;
`

const RightIcon = styled.div`
  height: 55px;
  font-size: 13px;
  position: relative;
  font-size: 13px;
  color: #333333;
  padding: 0 0 0 15px;
  display: flex;
  align-items: center;
`
