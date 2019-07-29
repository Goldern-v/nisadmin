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
import PersonnelSettingView from 'src/modules/schedule/views/PersonnelSetting/PersonnelSettingView' // 人员分组

// import NurseByShiftView from 'src/modules/statistic/views/nurseByShift/NurseByShiftView'
// import WhiteShiftByMonthView from 'src/modules/statistic/views/whiteShiftByMonth/WhiteShiftByMonthView'
// import NeightShiftByMonthView from 'src/modules/statistic/views/neightShiftByMonth/NeightShiftByMonthView'

import MealSettingView from 'src/modules/schedule/views/MealSetting/MealSettingView'
import ScheduleSettingView from 'src/modules/schedule/views/ScheduleSetting/ScheduleSettingView'

import NurseFilesListView from 'src/modules/nurseFiles/views/nurseFilesList/NurseFilesListView'
import NurseFileDetailView from 'src/modules/nurseFiles/views/nurseFileDetail/NurseFileDetailView'
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
import NursingRulesTypeIndexSetting from 'src/modules/nursingRules/NursingRulesTypeIndexSetting'
import NursingRulesTypeSetting from 'src/modules/nursingRules/NursingRulesTypeSetting'
//健康宣教
//import HealthPropagandaView from 'src/modules/healthPropaganda/HealthPropagandaView'
import HealthPropagandaEdit from 'src/modules/healthPropaganda/HealthPropagandaEdit'
//不良事件列表和审核流程
import BadEventsNewList from 'src/modules/badEventsNew/BadEventsNewList'
import BadEventsNewDetail from 'src/modules/badEventsNew/BadEventsNewDetail'
//培训考核
import TrainingExamination from 'src/modules/trainingExamination/TrainingExamination'
//科室借用
import DeptBorrow from 'src/modules/deptBorrow/DeptBorrow'
//继续教育
import ContinuingEdu from 'src/modules/continuingEdu/ContinuingEduView'
import ContinuingEduEmpDetail from 'src/modules/continuingEdu/views/empDetail/Main'
// 护理质量
import QualityView from 'src/modules/quality/QualityView'
import QualityControlRecordDetail from 'src/modules/quality/views/qualityControlRecord/qualityControlRecordDetail/QualityControlRecordDetail.tsx'
import QualityAnalysisEdit from 'src/modules/quality/views/analysis/AnalysisEdit'
import QualityAnalysisDetail from 'src/modules/quality/views/analysis/AnalysisDetail'
import { nurseFileModule } from './routerConfig/nurseFileModule'
//病区文件
import DeptFileShareCatalogSetting from 'src/modules/deptReferSetting/views/DeptFileShareCatalogSetting'
import QualityAnalysisReportView from 'src/modules/quality/views/qualityAnalysisReport/QualityAnalysisReportView'

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
  setLayout('/personnelSetting', PersonnelSettingView, layouts.BreadcrumbLayout, [
    { name: '排班管理', link: '/scheduleHome' },
    { name: '人员分组', link: '' }
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
  /** 档案模块 */
  ...nurseFileModule,
  setLayout('/indicator/:name', Indicator, layouts.MainLayout),
  setLayout('/schedule/:type', layouts.HorizontalMenuLayout, null, scheduleHorizontalMenuConfig),

  setLayout('/badEvents/alanysis/:type/:name', BadEventEditorView, layouts.MainLayout),
  setLayout('/badEvents/:type', BadEventView, layouts.MainLayout),
  setLayout('/Lms', LmsView, layouts.MainLayout),
  // 培训考核
  setLayout('/trainingExamination/:type', TrainingExamination, layouts.MainLayout),
  {
    path: '/trainingExamination',
    redirect: '/trainingExamination/人员管理'
  },
  setLayout('/notice', NoticeView, layouts.MainLayout),
  setLayout('/sentNotice', SentNoticeView, layouts.MainLayout),
  setLayout('/lmsDetails', LmsDetails, layouts.MainLayout),
  {
    path: '/statistic',
    redirect: '/statistic/护士排班表'
  },
  setLayout('/setting/:name', SettingView, layouts.MainLayout),
  setLayout('/nursingRules', NursingRules, layouts.MainLayout),
  setLayout('/nursingRulesTypeSetting', NursingRulesTypeSetting, layouts.BreadcrumbLayout, [
    { name: '护理制度建设', link: '/nursingRules' },
    { name: '类型设置', link: '' }
  ]),
  setLayout('/nursingRulesTypeIndexSetting', NursingRulesTypeIndexSetting, layouts.BreadcrumbLayout, [
    { name: '护理制度建设', link: '/nursingRules' },
    { name: '目录设置', link: '' }
  ]),
  //setLayout('/healthPropagandaView/:id', HealthPropagandaView),
  setLayout('/healthPropagandaEdit/:id', HealthPropagandaEdit),
  setLayout('/healthPropagandaEdit', HealthPropagandaEdit),
  setLayout('/badEventsNewList', BadEventsNewList, layouts.MainLayout),
  setLayout('/badEventsNewDetail/:id/:orderNo', BadEventsNewDetail, layouts.MainLayout),
  setLayout('/deptBorrow', DeptBorrow, layouts.BreadcrumbLayout, [
    { name: '排班管理', link: '/scheduleHome' },
    { name: '科室借用', link: '' }
  ]),
  setLayout('/continuingEdu/:pannelName', ContinuingEdu, layouts.MainLayout),
  setLayout('/continuingEduEmpDetail/:pannelName', ContinuingEduEmpDetail, layouts.MainLayout),
  // 护理质量
  setLayout('/quality/:name', QualityView, layouts.MainLayout),
  setLayout('/qualityControlRecordDetail/:id', QualityControlRecordDetail, layouts.MainLayout),
  setLayout('/qualityAnalysisDetail/:id', QualityAnalysisDetail, layouts.BreadcrumbLayout, [
    { name: '护理质量', link: '/quality' },
    { name: '分析报告', link: '/quality/analysis' },
    { name: '报告详情', link: '' }
  ]),
  setLayout('/qualityAnalysisEdit/:id', QualityAnalysisEdit, layouts.BreadcrumbLayout, [
    { name: '护理质量', link: '/quality' },
    { name: '分析报告', link: '/quality/analysis' },
    { name: '编辑分析报告', link: '' }
  ]),
  setLayout('/qualityAnalysisEdit', QualityAnalysisEdit, layouts.BreadcrumbLayout, [
    { name: '护理质量', link: '/quality' },
    { name: '分析报告', link: '/quality/analysis' },
    { name: '创建分析报告', link: '' }
  ]),
  setLayout('/deptFileShareCatalogSetting', DeptFileShareCatalogSetting, layouts.BreadcrumbLayout, [
    { name: '系统设置', link: '/setting' },
    { name: '病区文件', link: '/setting/病区文件' },
    { name: '目录设置', link: '' }
  ]),
  setLayout('/qualityAnalysisReport', QualityAnalysisReportView, layouts.MainLayout),
  {
    path: '/continuingEdu',
    redirect: '/continuingEdu/人员管理'
  },
  {
    path: '/continuingEduEmpDetail',
    redirect: '/continuingEduEmpDetail/baseinfo'
  },
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
    redirect: '/setting/扁平管理设置'
  },
  {
    path: '/quality',
    redirect: '/quality/qualityControlRecord'
  },
  // {
  //   path: '/QualityControlRecordDetail',
  //   redirect: '/QualityControlRecordDetail/baseInfo'
  // },

  {
    path: '/',
    redirect: '/home'
  }
]

export default routes
