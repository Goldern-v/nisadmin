import styled from 'styled-components'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { Radio, DatePicker, Button, message } from 'antd'
import BaseTable from 'src/components/BaseTable'
import { observer } from 'mobx-react-lite'
import { qualityControlRecordVM } from 'src/modules/quality/views/qualityControlRecord/QualityControlRecordVM'
import { fileDownload } from 'src/utils/file/file'
import { writingFormService } from './services/queryStatisticsServices'
import { PageTitle } from 'src/components/common'
import service from 'src/services/api'
import { Select } from 'src/vendors/antd'
export interface Props extends RouteComponentProps {}

export default observer(function WritingForm(props: any) {
  const [tableData, setTableData] = useState([])
  const [loadingTable, setLoadingTable] = useState(false)
  const [selectedDept, setSelectedDept] = useState('')
  const [deptList, setDeptList] = useState([])
  // const [date]
  const columns: any[] = [
    {
      title: '病区',
      dataIndex: 'wardName',
      width: 180,
      align: 'left'
    },
    {
      title: '工号',
      dataIndex: 'empNo',
      width: 120,
      align: 'center'
    },
    {
      title: '姓名',
      width: 120,
      dataIndex: 'empName',
      align: 'center'
    },
    {
      title: '护理会诊数',
      dataIndex: 'countConsultation',
      width: 120,
      align: 'center'
    }
  ]

  const exportExcel = () => {
    let data = {
      beginDate: qualityControlRecordVM.consultationDate[0].format('YYYY-MM-DD'),
      endDate: qualityControlRecordVM.consultationDate[1].format('YYYY-MM-DD'),
      wardCode: selectedDept
    }
    writingFormService.exportExcel(data).then((res) => {
      fileDownload(res)
    })
  }

  useEffect(() => {
    service.commonApiService.getNursingUnitAll().then((res) => {
      setDeptList(res.data.deptList)
    })
    getTableData()
  }, [])

  const getTableData = () => {
    setLoadingTable(true)
    if (
      qualityControlRecordVM.consultationDate &&
      qualityControlRecordVM.consultationDate[0] &&
      qualityControlRecordVM.consultationDate[1]
    ) {
      writingFormService
        .docWrite({
          beginDate: qualityControlRecordVM.consultationDate[0].format('YYYY-MM-DD'),
          endDate: qualityControlRecordVM.consultationDate[1].format('YYYY-MM-DD'),
          wardCode: selectedDept
        })
        .then((res) => {
          setTableData(res.data)
          setLoadingTable(false)
        })
    } else {
      message.warning('时间不能为空')
    }
  }

  return (
    <Wrapper>
      <HeaderCon>
        <LeftIcon>
          <PageTitle>护理会诊单统计</PageTitle>
        </LeftIcon>
        <RightIcon>
          <div className='item'>
            <div className='label'>日期：</div>
            <div className='content'>
              <DatePicker.RangePicker
                allowClear={false}
                value={qualityControlRecordVM.consultationDate}
                onChange={(value) => {
                  qualityControlRecordVM.consultationDate = value
                  getTableData()
                }}
                style={{ width: 220 }}
              />
            </div>
          </div>
          <div className='item'>
            <div className='label'>病区：</div>
            <div className='content'>
              <Select style={{ width: 200 }} value={selectedDept} onChange={(val: any) => setSelectedDept(val)}>
                <Select.Option value=''>全部</Select.Option>
                {deptList.map((item: any) => (
                  <Select.Option value={item.code} key={item.code}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </div>
          </div>

          <div className='item'>
            <Button type='primary' className='statistics' onClick={getTableData}>
              查询
            </Button>
          </div>
          <div className='item'>
            <Button
              className='excel'
              onClick={() => {
                exportExcel()
              }}
            >
              导出Excel
            </Button>
          </div>
        </RightIcon>
      </HeaderCon>
      <MidCon>
        <Title>护理会诊单统计</Title>
        <TableCon>
          <BaseTable
            type={['index']}
            surplusHeight={240}
            loading={loadingTable}
            dataSource={tableData}
            columns={columns}
          />
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
  /* height: 0; */
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
