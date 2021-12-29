import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import StatisticLeftList from './components/StatisticLeftList'
// import StatisticHeader from './components/StatisticHeader'
import store, { appStore } from 'src/stores'

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
// 科室白班统计（按季度）
import DepartmentWhiteByQuarterView from './views/departmentWhiteByQuarter/DepartmentWhiteByQuarterView'
// 科室夜班统计（按季度）
import DepartmentNightByQuarterView from './views/departmentNightByQuarter/DepartmentNightByQuarterView'
// 科室休假统计（按季度）
import DepartmentVacationByQuarterView from './views/departmentVacationByQuarter/DepartmentVacationByQuarterView'
// 科室节假日排班统计
import DepartmentHolidayScheduleView from './views/departmentHolidaySchedule/DepartmentHolidayScheduleView'
//护理质量统计
import 护理质量统计查询 from 'src/modules/quality/views/qcFormNys/护理质量统计查询'
//护士学历分布
import 护士学历分布 from './views/护士学历分布/护士学历分布'
//护士初始学历分布
import 护士初始学历分布 from './views/护士初始学历分布/护士初始学历分布'
//护士职称统计
import 护士职称统计 from './views/护士职称统计/护士职称统计'
//护士男女分布
import 护士男女分布 from './views/护士男女分布/护士男女分布'
//护士在职状态分析
import 护士工作年限分布 from './views/护士工作年限分布/护士工作年限分布'
//护士在职状态分析
import 护士在职状态分析 from './views/护士在职状态分析/护士在职状态分析'
//护士离职原因分析
import 护士离职原因分析 from './views/护士离职原因分析/护士离职原因分析'
// 发热患者统计
import FeverPatient from './views/feverPatients/FeverPatient'

// 全院护理人员一览表
import NurseList from './views/nursingStatistics/nurseList/NurseList'
import NurseList_nys from './views/nursingStatistics/nurseList_nys/NurseList'
import NurseList_jmfy from './views/nursingStatistics/nurseList_jmfy/NurseList'
import NurseList_lcey from './views/nursingStatistics/nurseList_lcey/NurseList'
// import { RouteComponentProps } from 'src/components/RouterView'
// import NurseSchedule from './components/NurseSchedule'
// import NurseScheduleByShift from './components/NurseScheduleByShift'
// import TableModel from './common/TableModel'
// export interface Props extends RouteComponentProps<{ type?: string }> {}

// 患者查询统计   大块
// 住院病人认知情况统计表
// import 住院病人认知情况统计表 from 'src/modules/statistic/PatientQueryView/住院病人认知情况统计表/住院病人认知情况统计表.tsx'

export default function StatisticView() {
  // const [shiftClass, setShiftClass] = useState(new Array())
  useEffect(() => { }, [])
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

    ...appStore.hisMatch({
      map: {
        dgxg: [{ name: '科室白班统计（按季度）', path: '/statistic/科室白班统计（按季度）', component: DepartmentWhiteByQuarterView },
        { name: '科室夜班统计（按季度）', path: '/statistic/科室夜班统计（按季度）', component: DepartmentNightByQuarterView },
        { name: '科室休假统计（按季度）', path: '/statistic/科室休假统计（按季度）', component: DepartmentVacationByQuarterView }],
        default: []
      }
    }),
    { name: '科室节假日排班表', path: '/statistic/科室节假日排班表', component: DepartmentHolidayScheduleView },
    appStore.hisMatch({
      map: {
        nys: { name: '护理人员一览表', path: '/statistic/护理人员一览表', component: NurseList_nys },
        jmfy: { name: '护理人员一览表', path: '/statistic/护理人员一览表', component: NurseList_jmfy },
        lcey: { name: '护理人员一览表', path: '/statistic/护理人员一览表', component: NurseList_lcey },
        other: { name: '护理人员一览表', path: '/statistic/护理人员一览表', component: NurseList },
      }
    }),
    //患者查询统计   大块
    { name: '护理质量统计', path: '/statistic/护理质量统计', component: 护理质量统计查询 },
    //2021-01-28 南医三 统计需求
    { name: '护士学历分布', path: '/statistic/护士学历分布', component: 护士学历分布 },
    { name: '护士初始学历分布', path: '/statistic/护士初始学历分布', component: 护士初始学历分布 },
    { name: '护士男女分布', path: '/statistic/护士男女分布', component: 护士男女分布 },
    { name: '护士工作年限分布', path: '/statistic/护士工作年限分布', component: 护士工作年限分布 },
    { name: '护士在职状态分析', path: '/statistic/护士在职状态分析', component: 护士在职状态分析 },
    { name: '护士离职原因分析', path: '/statistic/护士离职原因分析', component: 护士离职原因分析 },
    ...appStore.hisMatch({
      map: {
        jmfy: [{ name: '护士职称分布', path: '/statistic/护士职称分布', component: 护士职称统计 }],
        lcey: [{ name: '护士职称分布', path: '/statistic/护士职称分布', component: 护士职称统计 }],
        default: []
      }
    }),
    // 发热患者统计
    { name: '发热患者统计', path: '/statistic/发热患者统计', component: FeverPatient },
  ]
  // const leftNursingStatistics = [{ name: '护理人员一览表', path: '/statistic/护理人员一览表', component: NurseList }]

  let currentRoutePath = store.appStore.history.location.pathname
  let CurrentRoute = leftListPath.find((item) => item.path === currentRoutePath)
  // let NursingStatisticsRoute = leftNursingStatistics.find((item) => item.path === currentRoutePath)
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
  height: calc(100vh - 50px);
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
