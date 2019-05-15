import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import StatisticLeftList from './components/StatisticLeftList'
import StatisticHeader from './components/StatisticHeader'
import store from 'src/stores'

// 护士排班表
import NurseSchedulingView from './views/nurseScheduling/NurseSchedulingView'
// 护士排班统计（按班次）
import NurseByShiftView from './views/nurseByShift/NurseByShiftView'
// 护士白班统计（按月份)
import NurseWhiteShiftByMonthView from './views/nurseWhiteShiftByMonth/NurseWhiteShiftByMonthView'
// 护士夜班统计（按月份）
import NurseNightShiftByMonthView from './views/nurseNightShiftByMonth/NurseNightShiftByMonthView'
// 护士休假统计（按月份）
import NurseVacationByMonthView from './views/nurseVacationByMonth/NurseVacationByMonthView'
// 护士节假日排班表
import NurseHolidayScheduleView from './views/nurseHolidaySchedule/NurseHolidayScheduleView'
// 科室排班统计（按班次）
import DepartmentByShiftView from './views/departmentByShift/DepartmentByShiftView'
// 科室白班统计（按月份）
import DepartmentWhiteByMonthView from './views/departmentWhiteByMonth/DepartmentWhiteByMonthView'
// 科室夜班统计（按月份）
import DepartmentNightByMonthView from './views/departmentNightByMonth/DepartmentNightByMonthView'
// 科室休假统计（按月份）
import DepartmentVacationByMonthView from './views/departmentVacationByMonth/DepartmentVacationByMonthView'
// 科室节假日排班统计
import DepartmentHolidayScheduleView from './views/departmentHolidaySchedule/DepartmentHolidayScheduleView'

// 全院护理人员一览表
import NurseList from './views/nursingStatistics/nurseList/NurseList'
// import { RouteComponentProps } from 'src/components/RouterView'
// import NurseSchedule from './components/NurseSchedule'
// import NurseScheduleByShift from './components/NurseScheduleByShift'
// import TableModel from './common/TableModel'
// export interface Props extends RouteComponentProps<{ type?: string }> {}
export default function StatisticView () {
  const [count, setCount] = useState(0)
  const [shiftClass, setShiftClass] = useState(new Array())
  useEffect(() => {
    console.log(count, setCount, shiftClass)
  }, [])
  // const getShiftClass = (shiftclass: any) => {
  //   setShiftClass(shiftClass)
  // }
  const leftListPath = [
    { name: '护士排班表', path: '/statistic/护士排班表', component: NurseSchedulingView },
    { name: '护士排班统计（按班次）', path: '/statistic/护士排班统计（按班次）', component: NurseByShiftView },
    {
      name: '护士白班统计（按月份)',
      path: '/statistic/护士白班统计（按月份）',
      component: NurseWhiteShiftByMonthView
    },
    {
      name: '护士夜班统计（按月份）',
      path: '/statistic/护士夜班统计（按月份）',
      component: NurseNightShiftByMonthView
    },
    {
      name: '护士休假统计（按月份）',
      path: '/statistic/护士休假统计（按月份）',
      component: NurseVacationByMonthView
    },
    { name: '护士节假日排班表', path: '/statistic/护士节假日排班表', component: NurseHolidayScheduleView },
    { name: '科室排班统计（按班次）', path: '/statistic/科室排班统计（按班次）', component: DepartmentByShiftView },
    {
      name: '科室白班统计（按月份）',
      path: '/statistic/科室白班统计（按月份）',
      component: DepartmentWhiteByMonthView
    },
    {
      name: '科室夜班统计（按月份）',
      path: '/statistic/科室夜班统计（按月份）',
      component: DepartmentNightByMonthView
    },
    {
      name: '科室休假统计（按月份）',
      path: '/statistic/科室休假统计（按月份）',
      component: DepartmentVacationByMonthView
    },
    { name: '科室节假日排班表', path: '/statistic/科室节假日排班表', component: DepartmentHolidayScheduleView },
    { name: '护理人员一览表', path: '/statistic/护理人员一览表', component: NurseList }
  ]
  const leftNursingStatistics = [{ name: '护理人员一览表', path: '/statistic/护理人员一览表', component: NurseList }]

  let currentRoutePath = store.appStore.history.location.pathname
  let CurrentRoute = leftListPath.find((item) => item.path === currentRoutePath)
  let NursingStatisticsRoute = leftNursingStatistics.find((item) => item.path === currentRoutePath)
  return (
    <Con>
      {/* <StatisticLeftList {...props} aa='11' /> */}
      <ConLeft>
        <StatisticLeftList />
      </ConLeft>
      <ConRight>
        {/* <StatisticHeader /> */}
        <StatisticMid>
          {/* 对应表 */}
          {CurrentRoute && CurrentRoute.component ? <CurrentRoute.component /> : <NurseSchedulingView />}
          {/* <NurseNightShiftByMonthView /> */}
        </StatisticMid>
      </ConRight>
    </Con>
  )
}

const Con = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: stretch;
  background: rgba(248, 248, 248, 1);
  overflow: hidden;
`
const ConLeft = styled.div`
  width: 200px;
  z-index: 1;
  background: rgba(248, 248, 248, 1);
  box-shadow: 3px 7px 7px 0px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(228, 228, 228, 1);
  /* border: 1px solid red; */
  border-top: 0;
  overflow: auto;
  ::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 6px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 4px;
  }
  ::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 5px;
    box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.2);
    background: rgba(0, 0, 0, 0.2);
  }
  /*定义滚动条轨道 内阴影+圆角*/
  ::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    box-shadow: inset 0 0 5px #ffffff;
    border-radius: 5px;
    background-color: #ffffff;
  }
`
const ConRight = styled.div`
  flex: 1;
  width: 0;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`
const StatisticMid = styled.div`
  flex: 1;
  height: 0;
  /* margin: 14px;
  padding: 15px 30px;
  background-color: #fff;
  border-radius: 5px;
  border: 1px solid rgba(161, 175, 179, 1); */
`
