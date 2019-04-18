import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Collapse } from 'antd'
import { observer } from 'mobx-react-lite'
import { RouteComponentProps } from 'react-router'
export interface Props extends RouteComponentProps {}
const Panel = Collapse.Panel
// 左侧列表数据
const leftListPath = [
  { name: '护士排班表', path: '/statistic/护士排班表' },
  { name: '护士排班统计（按班次）', path: '/statistic/护士排班统计（按班次）' },
  { name: '护士白班统计（按月份', path: '/statistic/护士白班统计（按月份' },
  { name: '护士夜班统计（按月份）', path: '/statistic/护士夜班统计（按月份）' },
  { name: '护士休假统计（按月份）', path: '/statistic/护士休假统计（按月份）' },
  { name: '护士节假日排班表', path: '/statistic/护士节假日排班表' },
  { name: '科室排班统计（按班次）', path: '/statistic/科室排班统计（按班次）' },
  { name: '科室白班统计（按月份）', path: '/statistic/科室白班统计（按月份）' },
  { name: '科室夜班统计（按月份）', path: '/statistic/科室夜班统计（按月份）' },
  { name: '科室休假统计（按月份）', path: '/statistic/科室休假统计（按月份）' },
  { name: '护士节假日排班人数', path: '/statistic/护士节假日排班人数' }
]
export default observer(function BedSituation (props: any) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    console.log(count, setCount)
  })
  // 左侧列表数据
  const leftListData = [
    '护士排班表',
    '护士排班统计（按班次）',
    '护士白班统计（按月份）',
    '护士夜班统计（按月份）',
    '护士休假统计（按月份）',
    '护士节假日排班表',
    '科室排班统计（按班次）',
    '科室白班统计（按月份）',
    '科室夜班统计（按月份）',
    '科室休假统计（按月份）',
    '护士节假日排班人数'
  ]
  function leftLiClick (e: any, path: string) {
    let liNode = e.target
    let allLi = liNode.parentNode.querySelectorAll('li')
    allLi.forEach((item: any) => {
      item.classList.remove('liClickClass')
    })
    liNode.classList.add('liClickClass')
    return () => props.history.push(path)
  }
  const leftListCoponet = leftListPath.map((item: any) => (
    <li key={item.name} onClick={(e) => leftLiClick(e, item.path)}>
      {item.name}
    </li>
  ))
  return (
    <Con>
      <div className='header'>排班统计</div>
      <Collapse bordered={false} accordion>
        <Panel header='排班统计' key='1'>
          {leftListCoponet}
        </Panel>
        <Panel header='xx统计' key='2'>
          {leftListCoponet}
        </Panel>
        <Panel header='xx统计' key='3'>
          {leftListCoponet}
        </Panel>
      </Collapse>
    </Con>
  )
})

const Con = styled.div`
  padding: 0 0 0 14px;
  width: 220px;
  height: 789px;
  background: rgba(248, 248, 248, 1);
  box-shadow: 3px 3px 6px 0px rgba(0, 0, 0, 0.15);
  .header {
    height: 44px;
    line-height: 44px;
    font-size: 15px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(116, 116, 116, 1);
  }
  .ant-collapse-item {
    border: none !important;
  }
  .ant-collapse-header {
    box-sizing: border-box;
    width: 100% !important;
    padding: 4px 0 4px 20px !important;
    /* width: 100%;
    height: 34px;
    line-height: 34px; */
    background-color: #f8f8f8;
    font-size: 13px !important;
  }
  .arrow {
    left: 0px !important;
  }
  .ant-collapse-content {
    background-color: #f8f8f8 !important;
    cursor: pointer;
    /* border: none !important; */
  }
  .ant-collapse-content-box {
    padding: 0 0 0 32px !important;
  }
  /* 每列的样式 */
  li {
    height: 34px;
    line-height: 34px;
  }
  /* 增添点击的样式 */
  .liClickClass {
    background-color: #e1e2e3;
  }
`
