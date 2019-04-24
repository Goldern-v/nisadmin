import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Collapse } from 'antd'
import store from 'src/stores'

const Panel = Collapse.Panel
// 左侧列表数据
const leftListPath = [
  { name: '床护比统计', path: '/indicator/床护比统计' },
  { name: '护患比统计', path: '/indicator/护患比统计' },
  { name: '24小时平均护理时数', path: '/indicator/24小时平均护理时数' },
  { name: '不同级别护士配置', path: '/indicator/不同级别护士配置' },
  { name: '护士离职率', path: '/indicator/护士离职率' },
  { name: '住院患者跌倒发生率', path: '/indicator/住院患者跌倒发生率' },
  { name: '院内压疮发生率', path: '/indicator/院内压疮发生率' },
  { name: '住院患者身体约束率', path: '/indicator/住院患者身体约束率' },
  { name: '插管患者非计划拔管发生率', path: '/indicator/插管患者非计划拔管发生率' },
  { name: '导尿管相关尿路感染发生率', path: '/indicator/导尿管相关尿路感染发生率' },
  { name: '中心导管相关血流感染发生率', path: '/indicator/中心导管相关血流感染发生率' },
  { name: '呼吸机相关性肺炎发生率', path: '/indicator/呼吸机相关性肺炎发生率' },
  { name: '产科护理质量数据', path: '/indicator/产科护理质量数据' }
]
const leftListNursePath = [
  { name: '高危药物静脉外渗率', path: '/indicator/高危药物静脉外渗率' },
  { name: '输血/输液反应倒数', path: '/indicator/输血输液反应倒数' },
  { name: '非计划拔管发生率', path: '/indicator/非计划拔管发生率' },
  { name: '导管相关血液感染发生率', path: '/indicator/导管相关血液感染发生率' },
  { name: '尿管相关泌尿系感染发生率', path: '/indicator/尿管相关泌尿系感染发生率' },
  { name: '手术相关肺部感染发生率', path: '/indicator/手术相关肺部感染发生率' },
  { name: '患者入院前已有压疮统计', path: '/indicator/患者入院前已有压疮统计' },
  { name: '入院时压疮高风险患者评估率', path: '/indicator/入院时压疮高风险患者评估率' },
  { name: '住院压疮高风险压疮发生率', path: '/indicator/住院压疮高风险压疮发生率' },
  { name: '住院患者手术室压疮发生率', path: '/indicator/住院患者手术室压疮发生率' },
  { name: '排便失禁患者失禁性皮炎发生率', path: '/indicator/排便失禁患者失禁性皮炎发生率' },
  { name: '跌倒坠床高风险患者评估率', path: '/indicator/跌倒坠床高风险患者评估率' },
  { name: '住院患者跌倒发生率', path: '/indicator/住院患者跌倒发生率' },
  { name: '住院患者跌倒坠床伤害程度', path: '/indicator/住院患者跌倒坠床伤害程度' },
  { name: '住院患者误吸高风险评估率', path: '/indicator/住院患者误吸高风险评估率' },
  { name: '住院高风险患者误吸发生率', path: '/indicator/住院高风险患者误吸发生率' },
  { name: '患者走失高风险患者评估率', path: '/indicator/患者走失高风险患者评估率' },
  { name: '患者走失发生率', path: '/indicator/患者走失发生率' },
  { name: '患者足下垂的发生率', path: '/indicator/患者足下垂的发生率' }
]

const leftListPatientQueryPath = [{ name: '新生儿烧伤、烫伤发生率', path: '/indicator/新生儿烧伤烫伤发生率' }]
const leftListPatientQueryPath4 = [
  { name: '查对制度落实合格率', path: '/indicator/查对制度落实合格率' },
  { name: '护理不良事件报告处理符合率', path: '/indicator/护理不良事件报告处理符合率' },
  { name: '使用药物错误的发生率', path: '/indicator/使用药物错误的发生率' },
  { name: '急救设备器材及药品完好合格率', path: '/indicator/急救设备器材及药品完好合格率' },
  { name: '无菌物品合格率', path: '/indicator/无菌物品合格率' },
  { name: '器械清洗合格率', path: '/indicator/器械清洗合格率' },
  { name: '包装合格率', path: '/indicator/包装合格率' },
  { name: '湿包发生率', path: '/indicator/湿包发生率' }
]
export default function StatisticLeftList () {
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
    '护士节假日排班人数'
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
  const leftListComponent = leftListPath.map((item: any) => (
    <li key={item.name} onClick={(e) => leftLiClick(e, item.path)}>
      {item.name}
    </li>
  ))

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
  const leftListPatientQueryPathComponent4 = leftListPatientQueryPath4.map((item: any) => (
    <li key={item.name} onClick={(e) => leftLiClick(e, item.path)}>
      {item.name}
    </li>
  ))
  return (
    <Con>
      {/* <div className='header'>排班统计</div> */}
      <Collapse bordered={false} accordion defaultActiveKey={['1']}>
        <Panel header='护理敏感质量指标' key='1'>
          {leftListComponent}
        </Panel>
        <Panel header='临床护理质量指标' key='2'>
          {leftListNursePathComponent}
        </Panel>
        <Panel header='专科护理质量指标' key='3'>
          {leftListPatientQueryPathComponent}
        </Panel>
        <Panel header='护理工作质量指标' key='4'>
          {leftListPatientQueryPathComponent4}
        </Panel>
      </Collapse>
    </Con>
  )
}

const Con = styled.div`
  position: relative;
  padding-top: 10px;
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
  .ant-collapse-arrow {
    left: 6px !important;
  }
  .ant-collapse-header {
    box-sizing: border-box;
    width: 100% !important;
    padding: 4px 0 4px 24px !important;
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
    padding-left: 24px;
    height: 34px;
    line-height: 34px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 13px;
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
