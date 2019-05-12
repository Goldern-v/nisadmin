import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import LeftMenu from 'src/components/LeftMenu'
// 左侧列表数据
const LEFT_MENU_CONFIG = [
  {
    title: '排班统计',
    children: [
      { title: '护士排班表', path: '/statistic/护士排班表' },
      { title: '护士排班统计（按班次）', path: '/statistic/护士排班统计（按班次）' },
      { title: '护士白班统计（按月份)', path: '/statistic/护士白班统计（按月份）' },
      { title: '护士夜班统计（按月份）', path: '/statistic/护士夜班统计（按月份）' },
      { title: '护士休假统计（按月份）', path: '/statistic/护士休假统计（按月份）' },
      { title: '护士节假日排班表', path: '/statistic/护士节假日排班表' },
      { title: '科室排班统计（按班次）', path: '/statistic/科室排班统计（按班次）' },
      { title: '科室白班统计（按月份）', path: '/statistic/科室白班统计（按月份）' },
      { title: '科室夜班统计（按月份）', path: '/statistic/科室夜班统计（按月份）' },
      { title: '科室休假统计（按月份）', path: '/statistic/科室休假统计（按月份）' },
      { title: '科室节假日排班表', path: '/statistic/科室节假日排班表' }
    ]
  },
  {
    title: '护理人员统计',
    children: [
      { title: '护理人员统计', path: '/statistic/护理人员统计' },
      { title: '护理人员一览表', path: '/statistic/护理人员一览表' },
      { title: '科室护士明细表', path: '/statistic/科室护士明细表' },
      { title: '科室护士结构信息汇总表', path: '/statistic/科室护士结构信息汇总表' },
      { title: '护士离职率', path: '/statistic/护士离职率' }
    ]
  },
  {
    title: '患者查询统计',
    children: [
      { title: '患者查询', path: '/statistic/患者查询' },
      { title: '住院病人认知情况', path: '/statistic/住院病人认知情况' },
      { title: '床位使用情况统计表', path: '/statistic/床位使用情况统计表' },
      { title: '病区流转', path: '/statistic/病区流转' },
      { title: '在院患者病情统计表', path: '/statistic/在院患者病情统计表' },
      { title: '出院病人统计表', path: '/statistic/出院病人统计表' },
      { title: '住院执行单统计表', path: '/statistic/护理人员统计' },
      { title: '患者分布统计表', path: '/statistic/护理人员统计' }
    ]
  }
]
export default function BedSituation () {
  const [count, setCount] = useState(0)
  useEffect(() => {
    console.log(count, setCount)
  })
  return (
    <Con>
      <LeftMenu config={LEFT_MENU_CONFIG} menuTitle='统计查询' />
    </Con>
  )
}

const Con = styled.div`
  height: 100%;
  position: relative;
  background: #f8f8f8;
  box-shadow: 3px 7px 7px 0px rgba(0, 0, 0, 0.1);
  border-top: 0;
`
