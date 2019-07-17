import styled from 'styled-components'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import QueryStatisticsHeader from './components/QueryStatisticsHeader'
import { Radio, message } from 'antd'
import QueryStatisticsTable from './components/QueryStatisticsTable'
export interface Props extends RouteComponentProps {}

export default function QueryStatistics() {
  let [startDate, setStartDate] = useState('2019-7-1')
  let [endDate, setEndDate] = useState('2019-7-16')
  let [showType, setShowType] = useState('按科室')
  useLayoutEffect(() => {
    setShowType('按科室')
    // try {
    // } catch (error) {}
    onload()
  }, [showType])
  const onload = async () => {
    setStartDate(startDate)
    setEndDate(endDate)
  }
  return (
    <Wrapper>
      <HeaderCon>
        <QueryStatisticsHeader />
      </HeaderCon>
      <MidCon>
        <RadioCon>
          <Radio.Group value={showType} buttonStyle='solid' onChange={(e: any) => setShowType(e.target.value)}>
            <Radio.Button value='按科室'>按科室</Radio.Button>
            <Radio.Button value='按表单'>按表单</Radio.Button>
          </Radio.Group>{' '}
        </RadioCon>
        <Title>医院质量检查表单统计表</Title>
        <Date>
          日期：{startDate} 至 {endDate}
        </Date>
        <TableCon>
          <QueryStatisticsTable />
        </TableCon>
      </MidCon>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  background: rgba(242, 242, 242, 1);
  display: flex;
  flex-direction: column;
`
const HeaderCon = styled.div`
  /* height: 66px; */
`
const MidCon = styled.div`
  box-sizing: border-box;
  flex: 1;
  height: 0;
  margin: 0 15px 5px 15px;
  box-shadow: ${(p) => p.theme.$shadow};
  background-color: #fff;
  border-radius: 5px;
  /* padding: 20px; */
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  position: relative;
`
const RadioCon = styled.div`
  position: absolute;
  top: 20px;
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
`
const TableCon = styled.div`
  flex: 1;
  height: 0;
`
