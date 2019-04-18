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
import MealSettingView from 'src/modules/schedule/views/MealSetting/MealSettingView'
import ScheduleSettingView from 'src/modules/schedule/views/ScheduleSetting/ScheduleSettingView'
import NurseFilesListView from 'src/modules/nurseFiles/views/nurseFilesList/NurseFilesListView'
import NurseFileDetail from 'src/modules/nurseFiles/views/nurseFileDetail/NurseFileDetail'
import { scheduleHorizontalMenuConfig } from 'src/modules/schedule-test/config/scheduleHorizontalMenuConfig'

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
  setLayout('/statistic', StatisticView, layouts.MainLayout),

  setLayout('/mealSetting', MealSettingView, layouts.BreadcrumbLayout, [
    { name: '排班管理', link: '/scheduleHome' },
    { name: '班次套餐设置', link: '' }
  ]),
  setLayout('/scheduleSetting', ScheduleSettingView, layouts.BreadcrumbLayout, [
    { name: '排班管理', link: '/scheduleHome' },
    { name: '编辑排班', link: '' }
  ]),
  // setLayout('/schedule/:type', layouts.HorizontalMenuLayout, null, scheduleHorizontalMenuConfig),
  setLayout('/nurseFilesList', NurseFilesListView, layouts.MainLayout),
  setLayout('/nurseFileDetail/:type', NurseFileDetail, layouts.MainLayout),
  setLayout('/schedule/:type', layouts.HorizontalMenuLayout, null, scheduleHorizontalMenuConfig),
  {
    path: '/nurseFileDetail',
    redirect: '/nurseFileDetail/baseInfo'
  },
  {
    path: '/',
    redirect: '/home'
  }
]

export default routes
