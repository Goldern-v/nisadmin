import styled from 'styled-components'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { Radio, DatePicker, Button } from 'antd'
import BaseTable from 'src/components/BaseTable'
import { observer } from 'mobx-react-lite'
import { qualityControlRecordVM } from '../qualityControlRecord/QualityControlRecordVM'

import { Select } from 'src/vendors/antd'
import YearPicker from 'src/components/YearPicker'
import { numberToArray } from 'src/utils/array/array'
import moment from 'moment'
import { problemSummaryServices } from './services/ProblemSummaryServices'
import { ScrollBox } from 'src/components/common'
export interface Props extends RouteComponentProps {}

export default observer(function ProblemSummary(props: any) {
  const [tableData, setTableData] = useState([])
  const [loadingTable, setLoadingTable] = useState(false)
  const [showType, setShowType] = useState(false)
  const [effect, setEffect] = useState(true)

  const [filterObj, setFilterObj] = useState({
    year: moment(),
    month: Number(moment().format('MM')),
    type: '住院',
    sheet: '汇总表'
  })
  const [pageObj, setPageObj] = useState({
    title: '',
    component: null,
    dataSource: []
  })

  useEffect(() => {
    setEffect(true)
    getTableData()
  }, [])

  useLayoutEffect(() => {
    setEffect(false)
  }, [])

  const getTableData = (obj?: any) => {
    if (effect) {
    }
  }

  useEffect(() => {
    problemSummaryServices.getTableData(filterObj, setPageObj)
  }, [filterObj])

  return (
    <Wrapper>
      <HeaderCon>
        <LeftIcon>
          <div className='item'>
            <div className='label'>年度：</div>
            <div className='content'>
              <YearPicker
                value={filterObj.year}
                onChange={(value: any) => setFilterObj({ ...filterObj, year: value })}
              />
            </div>
          </div>
          <div className='item'>
            <div className='label'>月份：</div>
            <div className='content'>
              <Select
                style={{ width: 100 }}
                value={filterObj.month}
                onChange={(value: any) => setFilterObj({ ...filterObj, month: value })}
              >
                {numberToArray(11).map((item) => (
                  <Select.Option value={item + 1} key={item}>
                    {item + 1}
                  </Select.Option>
                ))}
              </Select>
            </div>
          </div>

          <div className='item'>
            <div className='label'>类别：</div>
            <div className='content'>
              <Select
                style={{ width: 100 }}
                value={filterObj.type}
                onChange={(value: any) => setFilterObj({ ...filterObj, type: value })}
              >
                <Select.Option value='门诊'>门诊</Select.Option>
                <Select.Option value='住院'>住院</Select.Option>
              </Select>
            </div>
          </div>
          <div className='item'>
            <Button
              type='primary'
              className='statistics'
              onClick={() => {
                problemSummaryServices.getTableData(filterObj, setPageObj)
              }}
            >
              查询
            </Button>
          </div>
        </LeftIcon>
        <RightIcon>
          <div className='item'>
            <Button
              className='excel'
              onClick={() => {
                problemSummaryServices.turnOverExcel(filterObj)
              }}
            >
              导出Excel
            </Button>
          </div>
        </RightIcon>
      </HeaderCon>
      <MidCon>
        <RadioCon>
          <Radio.Group
            buttonStyle='solid'
            value={filterObj.sheet}
            onChange={(e) => setFilterObj({ ...filterObj, sheet: e.target.value })}
          >
            <Radio.Button value='汇总表'>汇总表</Radio.Button>
            <Radio.Button value='明细表'>明细表</Radio.Button>
          </Radio.Group>
        </RadioCon>
        <Title>{pageObj.title}</Title>
        <TableCon>
          {(() => {
            let Component: any = pageObj.component
            return Component && <Component dataSource={pageObj.dataSource} loadingTable={loadingTable} />
          })()}
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
const MidCon = styled(ScrollBox)`
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
const RadioCon = styled.div`
  position: absolute;
  top: 30px;
  right: 20px;
`
const Title = styled.div`
  font-size: 20px;
  color: #333;
  font-weight: bold;
  text-align: center;
`
const Date = styled.div`
  font-size: 13px;
  color: #333;
  text-align: center;
  margin: 8px 0 5px 0;
`
const TableCon = styled.div`
  flex: 1;
  height: 0;
`
