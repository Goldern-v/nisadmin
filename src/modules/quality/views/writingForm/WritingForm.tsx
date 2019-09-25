import styled from 'styled-components'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { Radio, DatePicker, Button } from 'antd'
import BaseTable from 'src/components/BaseTable'
import { observer } from 'mobx-react-lite'
import { qualityControlRecordVM } from 'src/modules/quality/views/qualityControlRecord/QualityControlRecordVM'
import { fileDownload } from 'src/utils/file/file'
import { writingFormService } from './services/queryStatisticsServices'
import { PageTitle } from 'src/components/common'
export interface Props extends RouteComponentProps {}

export default observer(function WritingForm(props: any) {
  const [tableData, setTableData] = useState([])
  const [loadingTable, setLoadingTable] = useState(false)
  // const [date]
  const columns: any[] = [
    {
      title: '科室',
      dataIndex: 'wardName',
      width: 180,
      align: 'left'
    },
    {
      title: '已查表单数',
      dataIndex: 'recordSize',
      width: 120,
      align: 'center'
    },
    {
      title: '住院号',
      width: 120,
      dataIndex: 'detailList',

      render(text: any, rocord: any, index: number) {
        return text.map((item: any, index: number) => {
          return (
            <div key={index} className='cell'>
              {item.inpNo}
            </div>
          )
        })
      }
    },
    {
      title: '提交日期',
      dataIndex: 'detailList',
      width: 150,
      render(text: any, rocord: any, index: number) {
        return text.map((item: any, index: number) => {
          return (
            <div key={index} className='cell'>
              {item.evalDate}
            </div>
          )
        })
      }
    }
  ]

  useEffect(() => {
    getTableData()
  }, [])

  const getTableData = () => {
    setLoadingTable(true)
    writingFormService
      .docWrite({
        beginDate: qualityControlRecordVM.filterDate[0],
        endDate: qualityControlRecordVM.filterDate[1]
      })
      .then((res) => {
        setTableData(res.data)
        setLoadingTable(false)
      })
  }

  return (
    <Wrapper>
      <HeaderCon>
        <LeftIcon>
          <PageTitle>文件书写统计表</PageTitle>
        </LeftIcon>
        <RightIcon>
          <div className='item'>
            <div className='label'>日期：</div>
            <div className='content'>
              <DatePicker.RangePicker
                value={qualityControlRecordVM.filterDate}
                onChange={(value) => {
                  qualityControlRecordVM.filterDate = value
                  getTableData()
                }}
                style={{ width: 220 }}
              />
            </div>
          </div>

          <div className='item'>
            <Button type='primary' className='statistics' onClick={getTableData}>
              查询
            </Button>
          </div>
        </RightIcon>
      </HeaderCon>
      <MidCon>
        <Title>归档文件书写提交表单统计</Title>
        <TableCon>
          <BaseTable surplusHeight={240} loading={loadingTable} dataSource={tableData} columns={columns} />
        </TableCon>
      </MidCon>
    </Wrapper>
  )
})

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  background: rgba(242, 242, 242, 1);
  display: flex;
  flex-direction: column;
  .item {
    display: inline-block;
    margin-right: 15px;
    vertical-align: middle;
    & > div {
      display: inline-block;
      vertical-align: middle;
    }
    .label {
    }
    .content {
      .year-picker {
        width: 75px;
      }
      .recode-type-select {
        min-width: 200px;
      }
      .month-select {
        width: 72px;
      }
    }
    .statistics {
      border-color: #fff;
    }
  }
  .cell {
    margin: 0 -8px;
    padding: 5px;
    text-align: center;
    & + .cell {
      border-top: 1px solid rgb(232, 232, 232);
    }
  }
`
const LeftIcon = styled.div`
  height: 55px;
  float: left;
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
  float: right;
  font-size: 13px;
  position: relative;
  font-size: 13px;
  color: #333333;
  padding: 0 0 0 15px;
  display: flex;
  align-items: center;
`

const HeaderCon = styled.div`
  height: 55px;
  align-items: center;
`
const MidCon = styled.div`
  box-sizing: border-box;
  flex: 1;
  height: 0;
  margin: 0 15px 5px 15px;
  box-shadow: ${(p) => p.theme.$shadow};
  background-color: #fff;
  border-radius: 5px;
  padding-top: 25px;
  display: flex;
  flex-direction: column;
  position: relative;
`

const Title = styled.div`
  font-size: 20px;
  color: #333;
  font-weight: bold;
  text-align: center;
`

const TableCon = styled.div`
  /* width: 700px; */
  margin: 0 auto;
`
