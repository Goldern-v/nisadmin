import demo from 'src/demo'
import layouts from 'src/layouts'
import LoginView from 'src/modules/login/LoginView'
import ResetPasswordView from 'src/modules/login/ResetPasswordView'
import FollowUpDetail from 'src/modules/mobilePage/patientFollowUp/FollowUpDetail'
import FollowUpIndex from 'src/modules/mobilePage/patientFollowUp/FollowUpIndex'
import RefresherInfoSubmit from 'src/modules/mobilePage/refresherInfoSubmit/RefresherInfoSubmit'
import SatisfiedPatSubmit from 'src/modules/mobilePage/satisfiedPatSubmit/SatisfiedPatSubmit'
import TraineeInfoSubmit from 'src/modules/mobilePage/traineeInfoSubmit/TraineeInfoSubmit'
import AnalysisDetail from 'src/modules/quality/views/analysisDetail/AnalysisDetail'
import committeeWorkReportDetail from 'src/modules/quality/views/committeeWorkReportDetail'
import React, { lazy } from 'react'
import { setLayout } from 'src/utils/route/route-utils'
import { appStore, authStore } from 'src/stores'

import { RouteItem } from '../components/RouterView'
import { specialModule } from './routerConfig/specialModule'

import demo1 from "src/demo1";

const ScheduleHomeView = lazy(() =>
  import("src/modules/schedule/views/ScheduleHome/ScheduleHomeView")
);
const NurseSettingView = lazy(() =>
  import("src/modules/schedule/views/NurseSetting/NurseSettingView")
); // 排班人员设置
const ShiftSettingView = lazy(() =>
  import("src/modules/schedule/views/ShiftSetting/ShiftSettingView")
); // 排班人员设置
const StatisticView = lazy(() => import("src/modules/statistic/StatisticView"));
const PersonnelSettingView = lazy(() =>
  import("src/modules/schedule/views/PersonnelSetting/PersonnelSettingView")
); // 人员分组

// const NurseByShiftView = lazy(() => import('src/modules/statistic/views/nurseByShift/NurseByShiftView'))
// const WhiteShiftByMonthView = lazy(() => import('src/modules/statistic/views/whiteShiftByMonth/WhiteShiftByMonthView'))
// const NeightShiftByMonthView = lazy(() => import('src/modules/statistic/views/neightShiftByMonth/NeightShiftByMonthView'))

const MealSettingView = lazy(() =>
  import("src/modules/schedule/views/MealSetting/MealSettingView")
);
const ScheduleSettingView = lazy(() =>
  import("src/modules/schedule/views/ScheduleSetting/ScheduleSettingView")
);

const BadEventView = lazy(() =>
  import("src/modules/badEvents/views/BadEventView")
);
const BadEventEditorView = lazy(() =>
  import("src/modules/badEvents/views/BadEventEditorView")
);

const Indicator = lazy(() => import("src/modules/indicator/Indicator"));

const SettingView = lazy(() => import("src/modules/setting/SettingView"));
const Sheetpage = lazy(() => import("src/modules/Sheetpage/Sheetpage"));
const AuditsManagementView = lazy(() =>
  import("src/modules/auditsManagement/AuditsManagementView")
);

// 护理绩效
const NursingPerformance = lazy(() =>
  import("src/modules/nursingPerformance/NursingPerformance")
);
const LmsView = lazy(() => import("src/modules/lms/LmsView"));
const testView = lazy(() => import("src/modules/test/testView"));
const NoticeView = lazy(() => import("src/modules/notice/NoticeView"));
const SentNoticeView = lazy(() =>
  import("src/modules/notice/page/SentNoticeView")
);
const LmsDetails = lazy(() => import("src/modules/lms/views/LmsDetails"));

//护理制度
// const NursingRules = lazy(() => import('src/modules/nursingRules/NursingRules'))
// const NursingRulesTypeIndexSetting = lazy(() => import('src/modules/nursingRules/NursingRulesTypeIndexSetting'))
// const NursingRulesTypeSetting = lazy(() => import('src/modules/nursingRules/NursingRulesTypeSetting'))
//护理制度 改版
// const NursingRulesNew = lazy(() => import('src/modules/nursingRulesNew/NursingRulesNew'))
// const NursingRulesNewDetail = lazy(() => import('src/modules/nursingRulesNew/views/NursingRulesNewDetail'))
// const NursingRulesPagePreview = lazy(() => import('src/modules/nursingRulesNew/views/NursingRulesPagePreview'))
// const NursingRulesNewEdit = lazy(() => import('src/modules/nursingRulesNew/views/NursingRulesNewEdit'))
//健康宣教
//const HealthPropagandaView = lazy(() => import('src/modules/healthPropaganda/HealthPropagandaView'))
const HealthPropagandaEdit = lazy(() =>
  import("src/modules/healthPropaganda/HealthPropagandaEdit")
);
//不良事件列表和审核流程
const BadEventsRouters = lazy(() =>
  import("src/modules/badEventsNew/BadEventsRouters")
);
const BadEventsNewDetail = lazy(() =>
  import("src/modules/badEventsNew/BadEventsNewDetail")
);
const BadEventsNewDetailNys = lazy(() =>
  import("src/modules/badEventsNew/BadEventsNewDetail_nys")
);
const BadEventsNewDetailGzsrm = lazy(() =>
  import("src/modules/badEventsNew/BadEventsNewDetail_gzsrm")
);
const BadEventsNewDetailFsxt = lazy(() =>
  import("src/modules/badEventsNew/BadEventsNewDetail_fsxt")
);
const BadEventsNewDetailCommon = lazy(() =>
  import("src/modules/badEventsNew/BadEventsNewDetailCommon")
);
//培训考核
const TrainingExamination = lazy(() =>
  import("src/modules/trainingExamination/TrainingExamination")
);
//科室借用
const DeptBorrow = lazy(() => import("src/modules/deptBorrow/DeptBorrow"));

//继续教育
const ContinuingEdu = lazy(() =>
  import("src/modules/continuingEdu/ContinuingEduView")
);
const ContinuingEduEmpDetail = lazy(() =>
  import("src/modules/continuingEdu/views/empDetail/Main")
);
const ContinuingEduFormCheck = lazy(() =>
  import("src/modules/continuingEdu/views/trainingSetting/formCheck/FormCheck")
);

// 护理质量
const QualityView = lazy(() => import("src/modules/quality/QualityView"));
const QualityControlRecordDetail = lazy(() =>
  import(
    "src/modules/quality/views/qualityControlRecord/qualityControlRecordDetail/QualityControlRecordDetail"
  )
);
const qualityControlRecordEdit = lazy(() =>
  import(
    "src/modules/quality/views/qualityControlRecord/qualityControlRecordEdit/QualityControlRecordEdit"
  )
);
const eventReportFormEdit = lazy(() =>
  import("src/modules/indicator/selfDeclaration/components/editPage/index")
);
const QualityAnalysisEdit = lazy(() =>
  import("src/modules/quality/views/analysis/AnalysisEdit")
);
const QualityAnalysisDetail = lazy(() =>
  import("src/modules/quality/views/analysis/AnalysisDetail")
);
const WardLogDetail = lazy(() =>
  import("src/modules/wardLog/page/wardLogDetail/WardLogDetail")
);
const WardLogEdit = lazy(() =>
  import("src/modules/wardLog/page/wardLogEdit/WardLogEdit")
);

const NursingReportDetailView = lazy(() =>
  import(
    "src/modules/quality/views/qcOne/report/NursingReportDetail/NursingReportDetailView"
  )
);
const WardLog = lazy(() => import("src/modules/wardLog/WardLog"));
const SafetyHazardsDetail = lazy(() =>
  import(
    "src/modules/quality/views/qcOne/page/safetyHazards/SafetyHazardsDetail"
  )
);
const QualityControlKeyDetail = lazy(() => import("src/modules/quality/views/qualityControlKey/qualityControlKeyDetail/QualityControlKeyDetail"));

// 病区登记本
/** 病区登记本 - 武汉市独立 */
const WardRegisterRouter = lazy(() =>
  import("src/modules/WardRegister/WardRegisterRouter")
);
/** 病区登记本 - 标准配置 */
const WardRegisterDefaultRouter = lazy(() =>
  import("src/modules/WardRegisterDefault/WardRegisterDefaultRouter")
);
//厚街敏感指标登记本
const SensitiveRegisterRouter = lazy(() =>
  import("src/modules/SensitiveRegister/SensitiveRegisterRouter")
);
const DetailsView = lazy(() =>
  import("src/modules/quality/views/checkWard/view/details/DetailsView")
);
const CommunityDetailsView = lazy(() =>
  import("src/modules/communityRounds/views/details/DetailsView")
);
const CommunityTotalDetailsView = lazy(() =>
  import("src/modules/communityRounds/views/totalDetails/TotalDetails")
);

const ImportView = lazy(() =>
  import("src/modules/quality/views/checkWard/view/import/ImportView")
);
// 学习培训--主列表页类型管理
const TypeManagementView = lazy(() =>
  import("src/modules/continuingEdu/views/mainTablePage/view/TypeManagement")
);
//学习培训--通知管理查看结果
const NotificationManagementView = lazy(() =>
  import(
    "src/modules/continuingEdu/views/notificationManagement/view/CheckResults"
  )
);
// 学习培训--厚街培训手册
const TrainingManualSetting = lazy(() =>
  import(
    "src/modules/continuingEdu/views/trainingManual/view/TrainingManualSetting"
  )
);

// 武汉首页——学习培训
const AllEduData = lazy(() =>
  import("src/modules/home-wh/components/AllEduData")
);

// 平台使用手册
const UserManualRouter = lazy(() =>
  import("src/modules/UserManual/UserManualRouter")
);

//病区文件
const DeptFileShareCatalogSetting = lazy(() =>
  import("src/modules/deptReferSetting/views/DeptFileShareCatalogSetting")
);
const QualityAnalysisReportView = lazy(() =>
  import(
    "src/modules/quality/views/qualityAnalysisReport/QualityAnalysisReportView"
  )
);
const QualityAnalysisReportViewwhyx = lazy(() =>
  import(
    "src/modules/quality/views/analysisDetail/AnalysisDetail"
  )
);
const NurseFilesView = lazy(() =>
  import("src/modules/nurseFiles/NurseFilesView")
);
const QualityAnalysisReportPoolView = lazy(() =>
  import(
    "src/modules/quality/views/qualityAnalysisReportPool/QualityAnalysisReportPoolView"
  )
);
const WorkSummaryReportView = lazy(() =>
  import("src/modules/quality/views/workSummaryReport/WorkSummaryReportView")
);
//二级质控防疫专项检查片区汇总
const 防疫专项检查片区汇总 = lazy(() =>
  import(
    "src/modules/quality/views/防疫专项检查片区汇总报告/防疫专项检查片区汇总报告"
  )
);
const 防疫专项检查汇总报告 = lazy(() =>
  import("src/modules/quality/views/防疫专项检查汇总报告/防疫专项检查汇总报告")
);

//病区管理
const WardManagementView = lazy(() =>
  import("src/modules/wardManagement/WardManagementView")
);
const PersonnelManagementView = lazy(() =>
  import("src/modules/personnelManagement/PersonnelManagementView")
);
const EditArrangePage = lazy(() =>
  import(
    "src/modules/personnelManagement/views/arrangeHome/page/EditArrangePage/EditArrangePage"
  )
);
//健康宣教报告
const HealthEducationReportView = lazy(() =>
  import("src/modules/healthEducationReport/QualityAnalysisReportView")
);
//健康宣教编辑改版
const HealthPropagandaEditNew = lazy(() =>
  import("src/modules/healthPropaganda/HealthPropagandaEditNew")
);
const QcOneRouter = lazy(() => import("src/modules/quality/QcOneRouter"));
const QcOneRouterHj = lazy(() => import("src/modules/quality/QcOneRouter_hj"));
const QcOneRouterDghl = lazy(() => import("src/modules/quality/QcOneRouter_dghl"));
const QcOneRouterNys = lazy(() =>
  import("src/modules/quality/QcOneRouter_nys")
);
const QcOneRouterWhyx = lazy(() => import("src/modules/quality/QcOneRouter_whyx"));
const QcOneRouterGzsrm = lazy(() => import("src/modules/quality/QcOneRouter_Gzsrm"));
const QcTwoRouter = lazy(() => import("src/modules/quality/QcTwoRouter"));
const CommunityRoundsRouter = lazy(() =>
  import("src/modules/communityRounds/CommunityRoundsRouter")
);
const QcThreeRouter = lazy(() => import("src/modules/quality/QcThreeRouter"));
const QcFunRouter = lazy(() => import("src/modules/quality/QcFunRouter"));
// 社区查房
const CheckWardRouter = lazy(() =>
  import("src/modules/quality/CheckWardRouter")
);

const GoodOrBadRouter = lazy(()=> import("src/modules/quality/goodOrBadEvent/GoodOrBadRouter"));
const WholePrint = lazy(()=> import("src/modules/quality/goodOrBadEvent/WholePrint"));
//护士长手册
const NurseHandBookRouter = lazy(() =>
  import("src/modules/nurseHandBook/NurseHandBookRouter")
);
//护士长手册3.0
const NurseHandBookRouterNew = lazy(() =>
  import("src/modules/nurseHandBookNew/NurseHandBookRouter")
);
// 护士长手册表单详情（无审核）
const NurseHandBookFormPage = lazy(() => import("src/modules/nurseHandBookNew/components/NurseHandBookFormPage"))
// 护士长手册表单详情（有审核）
const NurseHandBookFormPageAudit = lazy(() => import("src/modules/nurseHandBookNew/components/NurseHandBookFormPageAudit"))
// 护士长手册详情
const NurseHandBookDetailView = lazy(() => import("src/modules/nurseHandBook/components/NurseHandBookDetailView"))
//护士长满意度调查
const NurseSatisfactionSurveyRouter = lazy(() =>
  import("src/modules/nurseSatisfactionSurvey/NurseSatisfactionSurveyRouter")
);
const checkWardRecordViewGzsrm = lazy(() =>
  import("src/modules/quality/views/scoringRecord/RecordView/index-gzsrm")
)



// 贵州护长季度查房分析报告表
const checkWardQuarterViewGzsrm = lazy(() =>
  import("src/modules/quality/views/wardQuarter_gzsrm/wardQuarter_gzsrm")
)

// 贵州-行政查房
const administrativeWardView = lazy(() =>
  import("src/modules/quality/views/administrativeWard/RecordView")
)

// 贵州-安全检查表
const safetyChecklistView = lazy(() =>
  import("src/modules/quality/views/safetyChecklist/table")
)

const administrativeqcThree = lazy(() =>
  import("src/modules/quality/views/administrativeWard/RecordView")
)
const checkWardRecordView = lazy(() =>
  import("src/modules/quality/views/scoringRecord/RecordView/index")
)

const checkWardwardsView = lazy(() =>
  import("src/modules/quality/views/scoringRecord/wardsView")
)
/** 月度查房统计报告详情 */
const 月护长查房反馈表详情 = lazy(() => import("src/modules/quality/views/qcJmfy/特殊时段查房统计报告/月护长查房反馈表/月护长查房反馈表详情"))
const QueryStatisticsRouter = lazy(() =>
  import("src/modules/quality/QueryStatisticsRouter")
);
//一级质控报告
const NursingQualityCheckEdit = lazy(() =>
  import(
    "src/modules/quality/views/qcOne/page/nursingQualityCheck/NursingQualityCheckEdit"
  )
);
const NurseMeetingRecordEdit = lazy(() =>
  import(
    "src/modules/quality/views/qcOne/page/nurseMeetingRecord/NurseMeetingRecordEdit"
  )
);
const NurseMeetingRecordDetail = lazy(() =>
  import(
    "src/modules/quality/views/qcOne/page/nurseMeetingRecord/NurseMeetingRecordDetail"
  )
);
const BadEventRecordEdit = lazy(() =>
  import(
    "src/modules/quality/views/qcOne/page/badEventRecord/BadEventRecordEdit"
  )
);
const BadEventRecordDetail = lazy(() =>
  import(
    "src/modules/quality/views/qcOne/page/badEventRecord/BadEventRecordDetail"
  )
);

const StarRatingReportEdit = lazy(() =>
  import(
    "src/modules/quality/views/qcOne/report/StarRatingReport/StarRatingReportEdit"
  )
);
const StarRatingYearReportEdit = lazy(() =>
  import(
    "src/modules/quality/views/qcOne/report/StarRatingYearReport/StarRatingYearReportEdit"
  )
);

const BadEventReportEdit = lazy(() =>
  import(
    "src/modules/quality/views/qcOne/report/BadEventReport/BadEventReportEdit"
  )
);

const PatientVisitQuarterEdit = lazy(() =>
  import(
    "src/modules/quality/views/qcOne/report/PatientVisitQuarter/PatientVisitQuarterEdit"
  )
);

const PatientVisitMonthEdit = lazy(() =>
  import(
    "src/modules/quality/views/qcOne/report/PatientVisitMonth/PatientVisitMonthEdit"
  )
);

const QcCheckContentSetting = lazy(() =>
  import(
    "src/modules/quality/views/qcOne/page/nursingQualityCheck/QcCheckContentSetting"
  )
);

const CheckWardReportView = lazy(() =>
  import("src/modules/quality/views/checkWard/view/report/CheckWardReportView")
);

const SafetyCheckEdit = lazy(() =>
  import("src/modules/quality/views/qcOne/report/SafetyCheck/SafetyCheckEdit")
);
const nightChargingReport = lazy(() =>
  import(
    "src/modules/personnelManagement/views/arrangeHome/page/nightChargingReport/StarRatingReportEdit"
  )
);
const nightChargingReportJmfy = lazy(() => import('src/modules/personnelManagement/views/arrangeHome/page/nightChargingReportJmfy/nightChargingReportJmfy'))

//学习培训查看结果
const StudyResultReview = lazy(() =>
  import(
    "src/modules/continuingEdu/views/trainingResult/views/studyResultReview/StudyResultReview"
  )
);
const TrainingResultReview = lazy(() =>
  import(
    "src/modules/continuingEdu/views/trainingResult/views/trainingResultReview/TrainingResultReview"
  )
);
const TestingResultReview = lazy(() =>
  import(
    "src/modules/continuingEdu/views/trainingResult/views/testingResultReview/TestingResultReview"
  )
);
const OperateResultReview = lazy(() =>
  import(
    "src/modules/continuingEdu/views/trainingResult/views/operateResultReview/OperateResultReview"
  )
);
const PracticeResultReview = lazy(() =>
  import(
    "src/modules/continuingEdu/views/trainingResult/views/practiceResultReview/PracticeResultReview"
  )
);
const SimulateResultReview = lazy(() =>
  import(
    "src/modules/continuingEdu/views/trainingResult/views/simulateResultReview/SimulateResultReview"
  )
);
const SocialpractiseResultReview = lazy(() =>
  import(
    "src/modules/continuingEdu/views/trainingResult/views/socialpractiseResultReview/SocialpractiseResultReview"
  )
);
//学习培训查看信息
const TrainingInfoReview = lazy(() =>
  import(
    "src/modules/continuingEdu/views/trainingInfoReview/TrainingInfoReview"
  )
);
//学习培训-在线学习信息查看
const OnlineLearningReview = lazy(() =>
  import(
    "src/modules/continuingEdu/views/onlineLearning/views/onlineLearningReview/OnlineLearningReview"
  )
);
//学习培训-在线学习考试 练习
const ExamOrExercise = lazy(() =>
  import(
    "src/modules/continuingEdu/views/onlineLearning/views/examOrExercise/ExamOrExercise"
  )
);

//学习培训-在线学习考试(查看试卷)
const ExamScore = lazy(() =>
  import(
    "src/modules/continuingEdu/views/onlineLearning/views/examScore/ExamScore"
  )
);

//学习培训-学习资源-典型案例审核详情(厚街)
const 典型案例库审核详情 = lazy(() =>
  import(
    "src/modules/continuingEdu/views/学习资源/典型案例库/典型案例库审核详情"
  )
);

//学习培训-晋级申请表（亚心）
const PromotionDetail = lazy(() =>
  import(
    "src/modules/continuingEdu/views/promotionDedait/promotionDetait"
  )
);
//审核管理-晋级申请表（亚心）
const PromotionAduit = lazy(() =>
  import(
    "src/modules/continuingEdu/views/promotionAduit/promotionAudit"
  )
);

//进出感染区统计
const InfectedAreasCount = lazy(() =>
  import("src/modules/infectedAreasCount/InfectedAreasCount")
);
const InfectedAreasCountDetail = lazy(() =>
  import("src/modules/infectedAreasCount/InfectedAreasCountDetail")
);

//不良事件管理模块
//不良事件统计报告
const BadEventReportView = lazy(() =>
  import("src/modules/badEventsNew/views/BadEventReport/BadEventReportView")
);

//不良事件统计报告-贵州
const BadEventReportViewGzsrm = lazy(() =>
  import("src/modules/badEventsNew/views/BadEventReport_gzsrm/BadEventReportView")
);

// 护理随访整体模块
const NursingFollowUp = lazy(() => import("src/modules/nursingFollowUp/NursingFollowUpRouter"))
// 护理随访详情
const FollowUpDetailView = lazy(() => import("src/modules/nursingFollowUp/views/followUpDetailView/FollowUpDetailView"))
// 护士长满意度调查详情
const NurseSatisfactionSurveyDetailView = lazy(() => import("src/modules/nurseSatisfactionSurvey/components/NurseSatisfactionSurveyDetailView"))
//移动端界面
//移动端界面-患者满意度调查表提交
//单点登录
const SingleSignOnDefault = lazy(() => import("src/modules/SingleSignOn/default/SingleSignOnDefault"))
const SingleSignOnGzsrm = lazy(() => import("src/modules/SingleSignOn/gzsrm/SingleSignOnGzsrm"))
// 移动端界面-患者随访问卷首页
const routes: RouteItem[] = [
  setLayout("/demo", demo),
  setLayout("/demo1", demo1),
  setLayout("/Sheetpage", Sheetpage),

  setLayout("/login", LoginView),
  setLayout("/resetpassword", ResetPasswordView),
  setLayout("/traineeInfoSubmit", TraineeInfoSubmit),
  setLayout("/refresherInfoSubmit", RefresherInfoSubmit),
  setLayout("/satisfiedPatSubmit", SatisfiedPatSubmit),
  setLayout("/followUpIndex", FollowUpIndex),
  setLayout("/followUpDetail", FollowUpDetail),

  ...specialModule,
  setLayout("/autoLogin", appStore.hisMatch({
    map: {
      gzsrm: SingleSignOnGzsrm,
      default: SingleSignOnDefault
    }
  })),
  setLayout("/scheduleHome", ScheduleHomeView, layouts.MainLayout),

  setLayout("/nurseSetting", NurseSettingView, layouts.BreadcrumbLayout, [
    { name: "排班管理", link: "/scheduleHome" },
    { name: "排班人员设置", link: "" }
  ]),
  setLayout("/shiftSetting", ShiftSettingView, layouts.BreadcrumbLayout, [
    { name: "排班管理", link: "/scheduleHome" },
    { name: "班次设置", link: "" }
  ]),
  setLayout("/shiftSetting", ShiftSettingView, layouts.HorizontalMenuLayout, [
    { name: "排班管理", link: "/scheduleHome" },
    { name: "班次设置", link: "" }
  ]),

  setLayout("/mealSetting", MealSettingView, layouts.BreadcrumbLayout, [
    { name: "排班管理", link: "/scheduleHome" },
    { name: "班次套餐设置", link: "" }
  ]),
  setLayout(
    "/personnelSetting",
    PersonnelSettingView,
    layouts.BreadcrumbLayout,
    [
      { name: "排班管理", link: "/scheduleHome" },
      { name: "人员分组", link: "" }
    ]
  ),

  setLayout("/scheduleSetting", ScheduleSettingView, layouts.MainLayout),

  setLayout("/statistic/:name", StatisticView, layouts.MainLayout),
  // 护理绩效
  setLayout("/nursingPerformance", NursingPerformance, layouts.MainLayout),
  setLayout("/indicator/:name", Indicator, layouts.MainLayout),
  // setLayout('/schedule/:type', layouts.HorizontalMenuLayout, null, scheduleHorizontalMenuConfig),
  setLayout(
    "/badEvents/alanysis/:type/:name",
    BadEventEditorView,
    layouts.MainLayout
  ),
  setLayout("/badEvents/:type", BadEventView, layouts.MainLayout),
  setLayout("/Lms", LmsView, layouts.MainLayout),
  // 培训考核
  setLayout(
    "/trainingExamination/:type",
    TrainingExamination,
    layouts.MainLayout
  ),
  setLayout("/studyResultReview", StudyResultReview, layouts.MainLayout),
  setLayout("/trainingResultReview", TrainingResultReview, layouts.MainLayout),
  setLayout("/testingResultReview", TestingResultReview, layouts.MainLayout),
  setLayout("/operateResultReview", OperateResultReview, layouts.MainLayout),
  setLayout("/practiceResultReview", PracticeResultReview, layouts.MainLayout),
  setLayout("/simulateResultReview", SimulateResultReview, layouts.MainLayout),
  setLayout("/trainingInfoReview", TrainingInfoReview, layouts.MainLayout),
  setLayout("/onlineLearningReview", OnlineLearningReview, layouts.MainLayout),
  setLayout("/examOrExercise", ExamOrExercise, layouts.MainLayout),
  setLayout("/continuingEdu/examOrExercise", PromotionDetail, layouts.MainLayout),
  setLayout("/examScore", ExamScore, layouts.MainLayout),

  setLayout(
    "/socialpractiseResultReview",
    SocialpractiseResultReview,
    layouts.MainLayout
  ),
  setLayout(
    "/continuingEduFormCheck",
    ContinuingEduFormCheck,
    layouts.MainLayout
  ),
  {
    path: "/trainingExamination",
    redirect: "/trainingExamination/人员管理"
  },
  /**  */
  setLayout("/notice", NoticeView, layouts.MainLayout),
  setLayout("/sentNotice", SentNoticeView, layouts.MainLayout),
  setLayout("/lmsDetails", LmsDetails, layouts.MainLayout),
  // 统计查询重定向
  ...appStore.hisMatch({
    map: {
      gzsrm: [
        {
          path: "/statistic",
          redirect: "/statistic/发热患者统计"
        }
      ],
      other: [
        {
          path: "/statistic",
          redirect: "/statistic/护士排班表"
        },
      ]
    }
  }),
  setLayout("/setting/:name", SettingView, layouts.MainLayout),
  // setLayout('/nursingRules', NursingRules, layouts.MainLayout),
  // setLayout('/nursingRulesTypeSetting', NursingRulesTypeSetting, layouts.BreadcrumbLayout, [
  //   { name: '护理制度建设', link: '/nursingRules' },
  //   { name: '类型设置', link: '' }
  // ]),
  // setLayout('/nursingRulesTypeIndexSetting', NursingRulesTypeIndexSetting, layouts.BreadcrumbLayout, [
  //   { name: '护理制度建设', link: '/nursingRules' },
  //   { name: '目录设置', link: '' }
  // ]),
  // setLayout('/nursingRulesNew', NursingRulesNew, layouts.MainLayout),
  // setLayout('/nursingRulesNewDetail', NursingRulesNewDetail, layouts.MainLayout),
  // setLayout('/NursingRulesPagePreView', NursingRulesPagePreview, layouts.MainLayout),
  // setLayout('/nursingRulesNewEdit', NursingRulesNewEdit, layouts.MainLayout),
  setLayout("/healthPropagandaEditNew/:id", HealthPropagandaEditNew),
  setLayout("/healthPropagandaEditNew", HealthPropagandaEditNew),
  // setLayout('/healthPropagandaEdit/:id', HealthPropagandaEdit),
  // setLayout('/healthPropagandaEdit', HealthPropagandaEdit),
  setLayout("/badEventsNew", BadEventsRouters, layouts.MainLayout),
  setLayout(
    "/badEventsNewDetail/:id/:orderNo",
    appStore.hisMatch({
      map: {
        nys: BadEventsNewDetailNys,
        gzsrm: BadEventsNewDetailGzsrm,
        hj: BadEventsNewDetail,
        fsxt: BadEventsNewDetailFsxt,
        other: BadEventsNewDetailCommon
        // fqfybjy: BadEventsNewDetailCommon,
        // yczyy: BadEventsNewDetailCommon,
        // other: BadEventsNewDetail,
      }
    }),
    layouts.MainLayout
  ),
  setLayout(
    "/badEventsNewDetail/:id",
    appStore.hisMatch({
      map: {
        gzsrm: BadEventsNewDetailGzsrm,
        // fqfybjy: BadEventsNewDetailCommon,
        // yczyy: BadEventsNewDetailCommon,
        // other: BadEventsNewDetail
        fsxt: BadEventsNewDetailFsxt,
        nys: BadEventsNewDetail,
        hj: BadEventsNewDetail,
        other: BadEventsNewDetailCommon
      }
    }),
    layouts.MainLayout
  ),
  setLayout("/deptBorrow", DeptBorrow, layouts.BreadcrumbLayout, [
    { name: "排班管理", link: "/scheduleHome" },
    { name: "科室借用", link: "" }
  ]),
  setLayout("/continuingEdu/:pannelName", ContinuingEdu, layouts.MainLayout),
  setLayout(
    "/continuingEduEmpDetail/:pannelName",
    ContinuingEduEmpDetail,
    layouts.MainLayout
  ),
  setLayout("/典型案例库审核详情", 典型案例库审核详情, layouts.MainLayout),
  // 护理质量
  setLayout("/quality/:name", QualityView, layouts.MainLayout),
  setLayout(
    "/qualityControlRecordDetail/:id",
    QualityControlRecordDetail,
    layouts.MainLayout
  ),
  setLayout(
    "/qualityControlRecordEdit",
    qualityControlRecordEdit,
    layouts.MainLayout
  ),
  setLayout(
    "/QualityControlKeyDetail",
    QualityControlKeyDetail,
    layouts.MainLayout
  ),
  setLayout(
    "/eventReportFormEdit",
    eventReportFormEdit,
    layouts.MainLayout
  ),
  setLayout(
    "/qualityScheduleRecordDetails/:id",
    DetailsView,
    layouts.MainLayout
  ),
  setLayout(
    "/CommunityDetailsView/:id",
    CommunityDetailsView,
    layouts.MainLayout
  ),
  setLayout(
    "/CommunityTotalDetailsView/:id",
    CommunityTotalDetailsView,
    layouts.MainLayout
  ),
  setLayout("/qualityScheduleImport", ImportView, layouts.MainLayout),
  setLayout("/typeManagement", TypeManagementView, layouts.MainLayout),
  setLayout(
    "/notificationManagement",
    NotificationManagementView,
    layouts.MainLayout
  ),
  setLayout(
    "/trainingManualSetting",
    TrainingManualSetting,
    layouts.MainLayout
  ),
  setLayout("/allEduData", AllEduData, layouts.MainLayout),

  setLayout(
    "/qualityAnalysisDetail/:id",
    QualityAnalysisDetail,
    layouts.BreadcrumbLayout,
    [
      { name: "护理质量", link: "/quality" },
      { name: "分析报告", link: "/quality/analysis" },
      { name: "报告详情", link: "" }
    ]
  ),
  setLayout(
    "/qualityAnalysisEdit/:id",
    QualityAnalysisEdit,
    layouts.BreadcrumbLayout,
    [
      { name: "护理质量", link: "/quality" },
      { name: "分析报告", link: "/quality/analysis" },
      { name: "编辑分析报告", link: "" }
    ]
  ),
  setLayout(
    "/qualityAnalysisEdit",
    QualityAnalysisEdit,
    layouts.BreadcrumbLayout,
    [
      { name: "护理质量", link: "/quality" },
      { name: "分析报告", link: "/quality/analysis" },
      { name: "创建分析报告", link: "" }
    ]
  ),
  setLayout(
    "/deptFileShareCatalogSetting",
    DeptFileShareCatalogSetting,
    layouts.BreadcrumbLayout,
    [
      { name: "系统设置", link: "/setting" },
      { name: "病区文件", link: "/setting/病区文件" },
      { name: "目录设置", link: "" }
    ]
  ),
  setLayout(
    "/qualityAnalysisReport",
    ['whyx'].includes(appStore.HOSPITAL_ID)?QualityAnalysisReportViewwhyx: QualityAnalysisReportView,
    // QualityAnalysisReportView,
    layouts.MainLayout
  ),
  // 一二级质控问题汇总详情
  setLayout(
    "/analysisDetail",
    AnalysisDetail,
    layouts.MainLayout
  ),
  setLayout(
    "/committeeWorkReportDetail",
    committeeWorkReportDetail,
    layouts.MainLayout
  ),
  setLayout(
    "/qualityAnalysisReportPool",
    QualityAnalysisReportPoolView,
    layouts.MainLayout
  ),
  setLayout(
    "/workSummaryReportView",
    WorkSummaryReportView,
    layouts.MainLayout
  ),
  setLayout("/防疫专项检查片区汇总", 防疫专项检查片区汇总, layouts.MainLayout),
  setLayout("/防疫专项检查汇总报告", 防疫专项检查汇总报告, layouts.MainLayout),
  /** 档案模块 */
  setLayout("/nurseFile/:path", NurseFilesView, layouts.MainLayout),
  setLayout("/wardManagement/:name", WardManagementView, layouts.MainLayout),

  /** 编辑排班 */
  setLayout(
    "/personnelManagement/EditArrangePage",
    EditArrangePage,
    layouts.MainLayout
  ),

  setLayout(
    "/personnelManagement",
    PersonnelManagementView,
    layouts.MainLayout
  ),

  /** 健康宣教报告 */
  setLayout(
    "/healthEducationReport",
    HealthEducationReportView,
    layouts.MainLayout
  ),

  /** 一级查房 */
  setLayout(
    "/qcOne/safetyHazardsDetail",
    SafetyHazardsDetail,
    layouts.MainLayout,
    {
      style: { background: "#fff" }
    }
  ),
  setLayout(
    "/qcOne/nursingReportDetail",
    NursingReportDetailView,
    layouts.MainLayout
  ),
  setLayout("/qcOne", QcOneRouter, layouts.MainLayout),
  setLayout("/qcOneHj", QcOneRouterHj, layouts.MainLayout),
  setLayout("/qcOneDghl", QcOneRouterDghl, layouts.MainLayout),
  setLayout("/qcOneNys", QcOneRouterNys, layouts.MainLayout),
  setLayout("/qcOneWhyx", QcOneRouterWhyx, layouts.MainLayout),
  setLayout("/qcOneGzsrm", QcOneRouterGzsrm, layouts.MainLayout),
  setLayout("/qcTwo", QcTwoRouter, layouts.MainLayout),
  setLayout(
    "/communityRoundsRouter/:pannelName",
    CommunityRoundsRouter,
    layouts.MainLayout
  ),
  setLayout("/qcThree", QcThreeRouter, layouts.MainLayout),
  setLayout("/qcFun", QcFunRouter, layouts.MainLayout),
  setLayout("/checkWard/recordView", checkWardRecordView, layouts.MainLayout),
  setLayout("/PromotionAduit", PromotionAduit, layouts.MainLayout),
  setLayout("/checkWard/recordViewGZ", checkWardRecordViewGzsrm, layouts.MainLayout),
  setLayout("/checkWard/QuarterViewGZ", checkWardQuarterViewGzsrm, layouts.MainLayout),
  setLayout("/checkWard/wardsView", checkWardwardsView, layouts.MainLayout),
  setLayout("/goodOrBadRouter", GoodOrBadRouter, layouts.MainLayout),
  setLayout("/goodOrBadWholePrint", WholePrint,layouts.MainLayout),
  setLayout("/administrative/qcTwo/recordView", administrativeWardView, layouts.MainLayout),
  setLayout("/safetyChecklist/qcTwo/checkView", safetyChecklistView, layouts.MainLayout),
  setLayout("/administrative/qcThree/recordView", administrativeqcThree, layouts.MainLayout),
  setLayout("/checkWard/月护长查房反馈表详情", 月护长查房反馈表详情, layouts.MainLayout),
  setLayout("/checkWard", CheckWardRouter, layouts.MainLayout),
  setLayout("/queryStatistics", QueryStatisticsRouter, layouts.MainLayout),
  setLayout("/nurseHandBook", NurseHandBookRouter, layouts.MainLayout),
  setLayout("/nurseHandBookNew", NurseHandBookRouterNew, layouts.MainLayout),
  setLayout("/nurseSatisfactionSurvey", NurseSatisfactionSurveyRouter, layouts.MainLayout),
  setLayout("/nurseSatisfactionSurveyDetailView", NurseSatisfactionSurveyDetailView, layouts.MainLayout),
  setLayout("/nurseHandBookDetailView", NurseHandBookDetailView, layouts.MainLayout),
  setLayout("/NurseHandBookFormPage", NurseHandBookFormPage, layouts.MainLayout),
  setLayout("/NurseHandBookFormPageAudit", NurseHandBookFormPageAudit, layouts.MainLayout),
  setLayout("/UserManual", UserManualRouter, layouts.MainLayout),
  ...appStore.hisMatch({
    map: {
      'wh': [
        setLayout("/wardRegister", WardRegisterRouter, layouts.MainLayout),
      ],
      default: [
        setLayout("/wardRegister", WardRegisterDefaultRouter, layouts.MainLayout),
      ]
    },
    vague: true
  }),
  setLayout("/sensitiveRegister", SensitiveRegisterRouter, layouts.MainLayout),
  /**一级质控 */
  setLayout(
    "/nursingQualityCheckEdit",
    NursingQualityCheckEdit,
    layouts.MainLayout
  ),
  setLayout(
    "/nurseMeetingRecordEdit",
    NurseMeetingRecordEdit,
    layouts.MainLayout
  ),
  setLayout(
    "/nurseMeetingRecordDetail",
    NurseMeetingRecordDetail,
    layouts.MainLayout
  ),
  setLayout("/badEventRecordEdit", BadEventRecordEdit, layouts.MainLayout),
  setLayout("/badEventRecordDetail", BadEventRecordDetail, layouts.MainLayout),
  setLayout("/starRatingReportEdit", StarRatingReportEdit, layouts.MainLayout),
  setLayout(
    "/starRatingYearReportEdit",
    StarRatingYearReportEdit,
    layouts.MainLayout
  ),
  setLayout("/badEventReportEdit", BadEventReportEdit, layouts.MainLayout),
  setLayout(
    "/patientVisitQuarterEdit",
    PatientVisitQuarterEdit,
    layouts.MainLayout
  ),
  setLayout(
    "/patientVisitMonthEdit",
    PatientVisitMonthEdit,
    layouts.MainLayout
  ),
  setLayout("/safetyCheckEdit", SafetyCheckEdit, layouts.MainLayout),
  setLayout("/wardLog", WardLog, layouts.MainLayout),
  setLayout(
    "/qcCheckContentSetting",
    QcCheckContentSetting,
    layouts.BreadcrumbLayout,
    [
      { name: "一级质控", link: "/qcOne" },
      { name: "病区质量检查", link: "/qcOne/nursingQualityCheck" }
    ]
  ),
  setLayout("/WardLogDetail", WardLogDetail, layouts.MainLayout),
  setLayout("/WardLogEdit", WardLogEdit),
  setLayout("/checkWardReportView", CheckWardReportView, layouts.MainLayout),
  ...appStore.hisMatch({
    map: {
      jmfy: [
        setLayout("/nightChargingReport", nightChargingReportJmfy, layouts.MainLayout)
      ],
      default: [
        setLayout("/nightChargingReport", nightChargingReport, layouts.MainLayout)
      ]
    }
  }),
  setLayout("/InfectedAreasCount", InfectedAreasCount, layouts.MainLayout),
  setLayout("/BadEventReportView", BadEventReportView, layouts.MainLayout),
  {
    path: "/nurseFile",
    redirect: "/nurseFile/onTheJob"
  },
  setLayout(
    "/InfectedAreasCountDetail",
    InfectedAreasCountDetail,
    layouts.MainLayout
  ),
  setLayout("/nursingFollowUp", NursingFollowUp, layouts.MainLayout),
  setLayout("/nursingFollowUpDetail", FollowUpDetailView, layouts.MainLayout),
  {
    path: "/nurseFile",
    redirect: "/nurseFile/onTheJob"
  },
  {
    path: "/continuingEdu",
    redirect: "/continuingEdu/人员管理"
  },
  {
    path: "/communityRoundsRouter",
    redirect: "/communityRoundsRouter/checkWardRecord"
  },
  {
    path: "/continuingEduEmpDetail",
    redirect: "/continuingEduEmpDetail/baseinfo"
  },
  {
    path: "/badEvents",
    redirect: "/badEvents/search"
  },
  {
    path: "/nurseFileDetail",
    redirect: "/nurseFileDetail/baseInfo"
  },
  {
    path: "/selfNurseFile",
    redirect: "/selfNurseFile/baseInfo"
  },
  // {
  //   path: "/indicator",
  //   redirect: "/indicator/床护比统计"
  // },
  {
    path: "/indicator",
    redirect: "/indicator/护理质量相关数据"
  },
  ...appStore.hisMatch({
    map: {
      "gzsrm,lyrm,gdtj,whfk": [
        {
          path: "/setting",
          redirect: "/setting/健康宣教字典"
        },
        setLayout("/BadEventReportViewGzsrm", BadEventReportViewGzsrm, layouts.MainLayout),
      ],
      other: [
        {
          path: "/setting",
          redirect: "/setting/扁平管理设置"
        }
      ],
    },
    vague: true,
  }),
  {
    path: "/wardManagement",
    redirect: "/wardManagement/扁平管理设置"
  },
  ...appStore.hisMatch({
    map: {
      "gdtj,whfk": [
        {
          path: "/",
          redirect: "/setting"
        }
      ],
      other: [
        {
          path: "/",
          redirect: "/home"
        }
      ],
    },
    vague: true,
  }),
];

export default routes;
