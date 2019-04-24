// import ViewHome from '../views/ViewHome'
// import ViewLogin from '../views/ViewLogin'
// import ViewUsers from '../views/ViewUsers'
import { RouteItem } from '../components/RouterView'
import LoginView from 'src/modules/login/LoginView'
import { setLayout } from 'src/utils/route/route-utils'
import layouts from 'src/layouts'
// import ScheduleView from 'src/modules/schedule/views/ScheduleView'
// import { scheduleHorizontalMenuConfig } from 'src/modules/schedule/config/scheduleHorizontalMenuConfig'
import HomeView from 'src/modules/home/HomeView'
import ScheduleHomeView from 'src/modules/schedule/views/ScheduleHome/ScheduleHomeView'
import NurseSettingView from 'src/modules/schedule/views/NurseSetting/NurseSettingView' // 排班人员设置
import ShiftSettingView from 'src/modules/schedule/views/ShiftSetting/ShiftSettingView' // 排班人员设置
import StatisticView from 'src/modules/statistic/StatisticView'
import NurseByShiftView from 'src/modules/statistic/views/nurseByShift/NurseByShiftView'
// import WhiteShiftByMonthView from 'src/modules/statistic/views/whiteShiftByMonth/WhiteShiftByMonthView'
// import NeightShiftByMonthView from 'src/modules/statistic/views/neightShiftByMonth/NeightShiftByMonthView'

import MealSettingView from 'src/modules/schedule/views/MealSetting/MealSettingView'
import ScheduleSettingView from 'src/modules/schedule/views/ScheduleSetting/ScheduleSettingView'
import NurseFilesListView from 'src/modules/nurseFiles/views/nurseFilesList/NurseFilesListView'
import NurseFileDetail from 'src/modules/nurseFiles/views/nurseFileDetail/NurseFileDetailView'

import BadEventView from 'src/modules/badEvents/views/BadEventView'
import BadEventEditorView from 'src/modules/badEvents/views/BadEventEditorView'
// import { BadEventConfig } from 'src/modules/badEvents/views/config/badEventConfig'

import { scheduleHorizontalMenuConfig } from 'src/modules/schedule-test/config/scheduleHorizontalMenuConfig'
import Indicator from 'src/modules/indicator/Indicator'

const routes: RouteItem[] = [
  setLayout('/login', LoginView),
  setLayout('/home', HomeView, layouts.MainLayout),
  setLayout('/scheduleHome', ScheduleHomeView, layouts.MainLayout),
  // setLayout('/nurseSetting', NurseSettingView, layouts.MainLayout),
  setLayout('/nurseSetting', NurseSettingView, layouts.BreadcrumbLayout, [
    { name: '排班管理', link: '/scheduleHome' },
    { name: '排班人员设置', link: '' }
  ]),
  setLayout('/shiftSetting', ShiftSettingView, layouts.BreadcrumbLayout, [
    { name: '排班管理', link: '/scheduleHome' },
    { name: '班次设置', link: '' }
  ]),
  setLayout('/shiftSetting', ShiftSettingView, layouts.HorizontalMenuLayout, [
    { name: '排班管理', link: '/scheduleHome' },
    { name: '班次设置', link: '' }
  ]),

  setLayout('/mealSetting', MealSettingView, layouts.BreadcrumbLayout, [
    { name: '排班管理', link: '/scheduleHome' },
    { name: '班次套餐设置', link: '' }
  ]),
  setLayout('/scheduleSetting', ScheduleSettingView, layouts.BreadcrumbLayout, [
    { name: '排班管理', link: '/scheduleHome' },
    { name: '排班编辑', link: '' }
  ]),
  // setLayout('/statistic/护士排班统计（按班次）', NurseByShiftView, layouts.MainLayout),
  // setLayout('/statistic/护士白班统计（按月份）', WhiteShiftByMonthView, layouts.MainLayout),
  // setLayout('/statistic/护士夜班统计（按月份）', NeightShiftByMonthView, layouts.MainLayout),
  setLayout('/statistic/', StatisticView, layouts.MainLayout),
  // setLayout('/schedule/:type', layouts.HorizontalMenuLayout, null, scheduleHorizontalMenuConfig),
  setLayout('/nurseFilesList', NurseFilesListView, layouts.MainLayout),
  setLayout('/nurseFileDetail/:type', NurseFileDetail, layouts.MainLayout),
  setLayout('/indicator/:name', Indicator, layouts.MainLayout),
  setLayout('/schedule/:type', layouts.HorizontalMenuLayout, null, scheduleHorizontalMenuConfig),

  setLayout('/badEvents/alanysis/:type', BadEventEditorView, layouts.MainLayout),
  setLayout('/badEvents/:type', BadEventView, layouts.MainLayout),
  // {
  //   path: '/statistic',
  //   redirect: '/statistic/护士排班统计（按班次）'
  // },
  {
    path: '/badEvents',
    redirect: '/badEvents/search'
  },
  {
    path: '/nurseFileDetail',
    redirect: '/nurseFileDetail/baseInfo'
  },
  {
    path: '/indicator',
    redirect: '/indicator/床护比统计'
  },
  {
    path: '/',
    redirect: '/home'
  }
]

export default routes
