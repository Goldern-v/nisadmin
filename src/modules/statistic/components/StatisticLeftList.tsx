import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Collapse } from 'antd'
import store from 'src/stores'

// import { RouteComponentProps } from 'src/components/RouterView'
// export interface Props extends RouteComponentProps<{ type?: string }> {
//   aa: string
// }
const Panel = Collapse.Panel
// 左侧列表数据
const leftListPath = [
  { name: '护士排班表', path: '/statistic/护士排班表' },
  { name: '护士排班统计（按班次）', path: '/statistic/护士排班统计（按班次）' },
  { name: '护士白班统计（按月份)', path: '/statistic/护士白班统计（按月份）' },
  { name: '护士夜班统计（按月份）', path: '/statistic/护士夜班统计（按月份）' },
  { name: '护士休假统计（按月份）', path: '/statistic/护士休假统计（按月份）' },
  { name: '护士节假日排班表', path: '/statistic/护士节假日排班表' },
  { name: '科室排班统计（按班次）', path: '/statistic/科室排班统计（按班次）' },
  { name: '科室白班统计（按月份）', path: '/statistic/科室白班统计（按月份）' },
  { name: '科室夜班统计（按月份）', path: '/statistic/科室夜班统计（按月份）' },
  { name: '科室休假统计（按月份）', path: '/statistic/科室休假统计（按月份）' },
  { name: '科室节假日排班表', path: '/statistic/科室节假日排班表' }
]
const leftListNursePath = [
  { name: '护理人员统计', path: '/statistic/护理人员统计' },
  { name: '护理人员一览表', path: '/statistic/护理人员一览表' },
  { name: '科室护士明细表', path: '/statistic/科室护士明细表' },
  { name: '科室护士结构信息汇总表', path: '/statistic/科室护士结构信息汇总表' },
  { name: '护士离职率', path: '/statistic/护士离职率' }
]

const leftListPatientQueryPath = [
  { name: '患者查询', path: '/statistic/患者查询' },
  { name: '住院病人认知情况', path: '/statistic/住院病人认知情况' },
  { name: '床位使用情况统计表', path: '/statistic/床位使用情况统计表' },
  { name: '病区流转', path: '/statistic/病区流转' },
  { name: '在院患者病情统计表', path: '/statistic/在院患者病情统计表' },
  { name: '出院病人统计表', path: '/statistic/出院病人统计表' },
  { name: '住院执行单统计表', path: '/statistic/护理人员统计' },
  { name: '患者分布统计表', path: '/statistic/护理人员统计' }
]
export default function BedSituation () {
  const [count, setCount] = useState(0)
  useEffect(() => {
    console.log(count, setCount)
    // console.log(store.appStore.history.location.pathname, 3333)
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
    '科室节假日排班表'
  ]
  function leftLiClick (ev: any, path: string) {
    let liNode = ev.target
    let allLi = liNode.parentNode.querySelectorAll('li')
    allLi.forEach((item: any) => {
      item.classList.remove('liClickClass')
    })
    liNode.classList.add('liClickClass')
    // console.log(path)
    // props.history.push(path)
    // return () => props.history.push(path)
    store.appStore.history.push(path)
  }
  // 组件
  const leftListComponent = leftListPath.map((item: any, index: number) => {
    if (index === 0) {
      return (
        <li key={item.name} className='liClickClass' onClick={(e) => leftLiClick(e, item.path)}>
          {item.name}
        </li>
      )
    } else {
      return (
        <li key={item.name} onClick={(e) => leftLiClick(e, item.path)}>
          {item.name}
        </li>
      )
    }
  })

  const leftListNursePathComponent = leftListNursePath.map((item: any) => (
    <li key={item.name} onClick={(e) => leftLiClick(e, item.path)}>
      {item.name}
    </li>
  ))
  const leftListPatientQueryPathComponent = leftListPatientQueryPath.map((item: any) => (
    <li key={item.name} onClick={(e) => leftLiClick(e, item.path)}>
      {item.name}
    </li>
  ))
  return (
    <Con>
      <div className='header'>排班统计</div>
      <Collapse bordered={false} accordion defaultActiveKey={['1']}>
        <Panel header='排班统计' key='1'>
          {leftListComponent}
        </Panel>
        <Panel header='护理人员统计' key='2'>
          {leftListNursePathComponent}
        </Panel>
        <Panel header='患者查询统计' key='3'>
          {leftListPatientQueryPathComponent}
        </Panel>
      </Collapse>
    </Con>
  )
}

const Con = styled.div`
  /* padding: 0 0 0 14px; */
  /* width: 220px;
  height: 789px;
  overflow: auto;
  background: rgba(248, 248, 248, 1);
  box-shadow: 3px 3px 6px 0px rgba(0, 0, 0, 0.15); */

  .header {
    padding-left: 14px;
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
    padding: 4px 0 4px 34px !important;
    /* width: 100%;
    height: 34px;
    line-height: 34px; */
    background-color: #f8f8f8;
    font-size: 13px !important;
  }
  .ant-collapse-header:hover {
    background-color: #5bbe98;
    color: white;
  }
  /* 箭头左偏 */
  .ant-collapse-arrow {
    /* left: 0 !important; */
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
    padding: 0 !important;
  }
  /* 每列的样式 */
  li {
    padding-left: 44px;
    height: 34px;
    line-height: 34px;
  }
  li:hover {
    background-color: #5bbe98;
    color: white;
  }
  /* 增添点击的样式 */
  .liClickClass {
    background-color: #5bbe98;
    color: white;
  }
`
