import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Collapse } from 'antd'
import store from 'src/stores'
import PerformanceDataSelect from '../common/PerformanceDataSelect'
import createModal from 'src/libs/createModal'
import AddNPModal from '../modal/AddNPModal'
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

const addNPModal = createModal(AddNPModal)

export default function BedSituation () {
  const [count, setCount] = useState(0)
  useEffect(() => {
    
    // console.log(store.appStore.history.location.pathname, 3333)
  })
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
  // // 层级子组件
  // const leftListComponent = leftListPath.map((item: any) => (
  //   <li key={item.name} onClick={(e) => leftLiClick(e, item.path)}>
  //     {item.name}
  //   </li>
  // ))

  // const leftListNursePathComponent = leftListNursePath.map((item: any) => (
  //   <li key={item.name} onClick={(e) => leftLiClick(e, item.path)}>
  //     {item.name}
  //   </li>
  // ))
  // const leftListPatientQueryPathComponent = leftListPatientQueryPath.map((item: any) => (
  //   <li key={item.name} onClick={(e) => leftLiClick(e, item.path)}>
  //     {item.name}
  //   </li>
  // ))
  // 数据
  const PerformanceDateList = [
    { name: '2019年3月', path: '/NursingPerformance/2019年3月' },
    { name: '2019年2月', path: '/NursingPerformance/2019年2月' },
    { name: '2019年1月', path: '/NursingPerformance/2019年1月' }
  ]
  // DOM
  const PerformanceDateListDom = PerformanceDateList.map((item: any, index: any) => {
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
  return (
    <Con>
      <HeadCon>
        <div className='header'>护理绩效</div>
        <PerformanceDataSelectCon>
          <PerformanceDataSelect />
        </PerformanceDataSelectCon>
      </HeadCon>
      <MidCon>{PerformanceDateListDom}</MidCon>
      <BottomCon onClick={() => addNPModal.show()}>创建新的绩效</BottomCon>
      <addNPModal.Component />
    </Con>
  )
}

const Con = styled.div`
  /* 要加上 */
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;

  /* 每列的样式 */
  li {
    list-style: none;
    padding-left: 14px;
    height: 34px;
    line-height: 34px;
    cursor: pointer;
  }
  /* li:nth-of-type(1) {
    background-color: #5bbe98;
    color: white;
  } */
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
const HeadCon = styled.div`
  height: 100px;
  border-bottom: 1px solid #e4e9eb;
  .header {
    padding-left: 14px;
    height: 44px;
    line-height: 44px;
    font-size: 15px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(116, 116, 116, 1);
  }
`

const MidCon = styled.div`
  padding-top: 10px;
  flex: 1;
  height: 0;
  li {
  }
`
const PerformanceDataSelectCon = styled.div``
const BottomCon = styled.div`
  height: 40px;
  line-height: 40px;
  text-align: center;
  background: rgba(91, 190, 152, 1);
  font-size: 13px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  cursor: pointer;
`
