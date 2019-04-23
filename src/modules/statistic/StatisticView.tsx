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
    // console.log(3333)
    // console.log(shiftClass)
    console.log(store.appStore.history.location.pathname, 9999)
  })
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
    { name: '科室节假日排班统计', path: '/statistic/科室节假日排班统计', component: DepartmentHolidayScheduleView }
  ]
  const leftNursingStatistics = [{ name: '护理人员一览表', path: '/statistic/护理人员一览表', component: NurseList }]

  let currentRoutePath = store.appStore.history.location.pathname
  let CurrentRoute = leftListPath.find((item) => item.path === currentRoutePath)
  let NursingStatisticsRoute = leftNursingStatistics.find((item) => item.path === currentRoutePath)
  return (
    <Con>
      {/* <StatisticLeftList {...props} aa='11' /> */}
      <StatisticLeftList />
      <StatisticRightCon>
        <StatisticHeader />
        <StatisticMid>
          {/* 对应表 */}
          {CurrentRoute && CurrentRoute.component && <CurrentRoute.component />}
          {NursingStatisticsRoute && NursingStatisticsRoute.component && <NursingStatisticsRoute.component />}
          {/* <NurseNightShiftByMonthView /> */}
        </StatisticMid>
      </StatisticRightCon>
    </Con>
  )
}

const Con = styled.div`
  /* width: 100%; */
  display: flex;
  background: rgba(248, 248, 248, 1);
  overflow: hidden;
`
const StatisticRightCon = styled.div`
  flex: 1;
`
const StatisticMid = styled.div`
  margin: 14px;
  padding: 18px 10px;
  height: 712px;
  background-color: #fff;
  /* height: 330px; */
  /* background: rgba(255, 255, 255, 1); */
  border-radius: 5px;
  border: 1px solid rgba(161, 175, 179, 1);
  overflow: hidden;
`
