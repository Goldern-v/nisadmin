// import ViewHome from '../views/ViewHome'
// import ViewLogin from '../views/ViewLogin'
// import ViewUsers from '../views/ViewUsers'
import { RouteItem } from '../components/RouterView'
import LoginView from 'src/modules/login/LoginView'
import { setLayout } from 'src/utils/route/route-utils'
import layouts from 'src/layouts'
import demo from 'src/demo'
// import ScheduleView from 'src/modules/schedule/views/ScheduleView'
// import { scheduleHorizontalMenuConfig } from 'src/modules/schedule/config/scheduleHorizontalMenuConfig'
import HomeView from 'src/modules/home/HomeView'
import ScheduleHomeView from 'src/modules/schedule/views/ScheduleHome/ScheduleHomeView'
import NurseSettingView from 'src/modules/schedule/views/NurseSetting/NurseSettingView' // 排班人员设置
import ShiftSettingView from 'src/modules/schedule/views/ShiftSetting/ShiftSettingView' // 排班人员设置
import StatisticView from 'src/modules/statistic/StatisticView'
// import NurseByShiftView from 'src/modules/statistic/views/nurseByShift/NurseByShiftView'
// import WhiteShiftByMonthView from 'src/modules/statistic/views/whiteShiftByMonth/WhiteShiftByMonthView'
// import NeightShiftByMonthView from 'src/modules/statistic/views/neightShiftByMonth/NeightShiftByMonthView'

import MealSettingView from 'src/modules/schedule/views/MealSetting/MealSettingView'
import ScheduleSettingView from 'src/modules/schedule/views/ScheduleSetting/ScheduleSettingView'
import NurseFilesListView from 'src/modules/nurseFiles/views/nurseFilesList/NurseFilesListView'
import NurseFileDetail from 'src/modules/nurseFiles/views/nurseFileDetail/NurseFileDetailView'
import NurseAudit from 'src/modules/nurseFiles/views/nurseAudit/NurseAudit'

import BadEventView from 'src/modules/badEvents/views/BadEventView'
import BadEventEditorView from 'src/modules/badEvents/views/BadEventEditorView'
// import { BadEventConfig } from 'src/modules/badEvents/views/config/badEventConfig'

import { scheduleHorizontalMenuConfig } from 'src/modules/schedule-test/config/scheduleHorizontalMenuConfig'
import Indicator from 'src/modules/indicator/Indicator'
import SettingView from 'src/modules/setting/SettingView'
import AuditsManagementView from 'src/modules/auditsManagement/AuditsManagementView'

// 护理绩效
import NursingPerformance from 'src/modules/nursingPerformance/NursingPerformance'
import LmsView from 'src/modules/lms/LmsView'
import testView from 'src/modules/test/testView'
import NoticeView from 'src/modules/notice/NoticeView'
import SentNoticeView from 'src/modules/notice/page/SentNoticeView'
import LmsDetails from 'src/modules/lms/views/LmsDetails'

//护理制度
import NursingRules from 'src/modules/nursingRules/NursingRules'
//健康宣教
//import HealthPropagandaView from 'src/modules/healthPropaganda/HealthPropagandaView'
import HealthPropagandaEdit from 'src/modules/healthPropaganda/HealthPropagandaEdit'
//不良事件列表和审核流程
import BadEventsNewList from 'src/modules/badEventsNew/BadEventsNewList'
import BadEventsNewDetail from 'src/modules/badEventsNew/BadEventsNewDetail'
//科室借用
import DeptBorrow from 'src/modules/deptBorrow/DeptBorrow'

const routes: RouteItem[] = [
  setLayout('/demo', demo),
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
  // setLayout('/scheduleSetting', ScheduleSettingView, layouts.BreadcrumbLayout, [
  //   { name: '排班管理', link: '/scheduleHome' },
  //   { name: '排班编辑', link: '' }
  // ]),
  setLayout('/scheduleSetting', ScheduleSettingView, layouts.MainLayout),
  // setLayout('/statistic/护士排班统计（按班次）', NurseByShiftView, layouts.MainLayout),
  // setLayout('/statistic/护士白班统计（按月份）', WhiteShiftByMonthView, layouts.MainLayout),
  // setLayout('/statistic/护士夜班统计（按月份）', NeightShiftByMonthView, layouts.MainLayout),
  setLayout('/statistic/:name', StatisticView, layouts.MainLayout),
  // 护理绩效
  setLayout('/nursingPerformance', NursingPerformance, layouts.MainLayout),
  // setLayout('/schedule/:type', layouts.HorizontalMenuLayout, null, scheduleHorizontalMenuConfig),
  setLayout('/nurseFilesList', NurseFilesListView, layouts.MainLayout),
  setLayout('/nurseAudit', NurseAudit, layouts.MainLayout),
  setLayout('/nurseFileDetail/:type', NurseFileDetail, layouts.MainLayout),
  setLayout('/indicator/:name', Indicator, layouts.MainLayout),
  setLayout('/schedule/:type', layouts.HorizontalMenuLayout, null, scheduleHorizontalMenuConfig),

  setLayout('/badEvents/alanysis/:type', BadEventEditorView, layouts.MainLayout),
  setLayout('/badEvents/:type', BadEventView, layouts.MainLayout),
  setLayout('/auditsManagement', AuditsManagementView, layouts.MainLayout),
  setLayout('/Lms', LmsView, layouts.MainLayout),
  setLayout('/test', testView, layouts.MainLayout),
  setLayout('/notice', NoticeView, layouts.MainLayout),
  setLayout('/sentNotice', SentNoticeView, layouts.MainLayout),
  setLayout('/lmsDetails', LmsDetails, layouts.MainLayout),
  {
    path: '/statistic',
    redirect: '/statistic/护士排班表'
  },
  setLayout('/setting/:name', SettingView, layouts.MainLayout),
  setLayout('/nursingRules', NursingRules, layouts.MainLayout),
  //setLayout('/healthPropagandaView/:id', HealthPropagandaView),
  setLayout('/healthPropagandaEdit/:id', HealthPropagandaEdit),
  setLayout('/healthPropagandaEdit', HealthPropagandaEdit),
  setLayout('/badEventsNewList', BadEventsNewList, layouts.MainLayout),
  setLayout('/badEventsNewDetail/:id/:orderNo', BadEventsNewDetail, layouts.MainLayout),
  setLayout('/deptBorrow', DeptBorrow, layouts.BreadcrumbLayout, [
    { name: '排班管理', link: '/scheduleHome' },
    { name: '科室借用', link: '' }
  ]),
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
    path: '/setting',
    redirect: '/setting/typeDict'
  },
  {
    path: '/',
    redirect: '/home'
  }
]

export default routes
