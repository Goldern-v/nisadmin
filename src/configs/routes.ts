import React, { lazy } from "react";
// import ViewHome from '../views/ViewHome'
// import ViewLogin from '../views/ViewLogin'
// import ViewUsers from '../views/ViewUsers'
import { RouteItem } from "../components/RouterView";
import LoginView from "src/modules/login/LoginView";
import { setLayout } from "src/utils/route/route-utils";
import layouts from "src/layouts";
import demo from "src/demo";
import demo1 from "src/demo1";

import { specialModule } from "./routerConfig/specialModule";
import { appStore, authStore } from "src/stores";
// import ScheduleView from 'src/modules/schedule/views/ScheduleView'
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

// const NurseFilesListView = lazy(() => import('src/modules/nurseFiles/views/nurseFilesList/NurseFilesListView'))
// const NurseFileDetailView = lazy(() => import('src/modules/nurseFiles/views/nurseFileDetail/NurseFileDetailView'))
// const NurseAudit = lazy(() => import('src/modules/nurseFiles/views/nurseAudit/NurseAudit'

const BadEventView = lazy(() =>
  import("src/modules/badEvents/views/BadEventView")
);
const BadEventEditorView = lazy(() =>
  import("src/modules/badEvents/views/BadEventEditorView")
);

const Indicator = lazy(() => import("src/modules/indicator/Indicator"));

const SettingView = lazy(() => import("src/modules/setting/SettingView"));
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
// const EditArrangePage = lazy(() => import('src/modules/personnelManagement/views/arrangeHome/page/EditArrangePage/EditArrangePage'
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
const QcOneRouterNys = lazy(() =>
  import("src/modules/quality/QcOneRouter_nys")
);
const QcTwoRouter = lazy(() => import("src/modules/quality/QcTwoRouter"));
const CommunityRoundsRouter = lazy(() =>
  import("src/modules/communityRounds/CommunityRoundsRouter")
);
const QcThreeRouter = lazy(() => import("src/modules/quality/QcThreeRouter"));
// 社区查房
const CheckWardRouter = lazy(() =>
  import("src/modules/quality/CheckWardRouter")
);
const checkWardRecordView = lazy(() =>
  import("src/modules/quality/views/scoringRecord/RecordView")
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

//移动端界面
import TraineeInfoSubmit from "src/modules/mobilePage/traineeInfoSubmit/TraineeInfoSubmit"
import RefresherInfoSubmit from "src/modules/mobilePage/refresherInfoSubmit/RefresherInfoSubmit"
//移动端界面-患者满意度调查表提交
import SatisfiedPatSubmit from "src/modules/mobilePage/satisfiedPatSubmit/SatisfiedPatSubmit"

//单点登录
const SingleSignOnDefault = lazy(() => import("src/modules/SingleSignOn/default/SingleSignOnDefault"))
const SingleSignOnGzsrm = lazy(() => import("src/modules/SingleSignOn/gzsrm/SingleSignOnGzsrm"))

const routes: RouteItem[] = [
  setLayout("/demo", demo),
  setLayout("/demo1", demo1),

  setLayout("/login", LoginView),
  setLayout("/traineeInfoSubmit", TraineeInfoSubmit),
  setLayout("/refresherInfoSubmit", RefresherInfoSubmit),
  setLayout("/satisfiedPatSubmit", SatisfiedPatSubmit),
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
  {
    path: "/statistic",
    redirect: "/statistic/护士排班表"
  },
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
        other: BadEventsNewDetail
      }
    }),
    layouts.MainLayout
  ),
  setLayout(
    "/badEventsNewDetail/:id",
    appStore.hisMatch({
      map: {
        gzsrm: BadEventsNewDetailGzsrm,
        other: BadEventsNewDetail
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
    QualityAnalysisReportView,
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
  setLayout("/qcOneNys", QcOneRouterNys, layouts.MainLayout),
  setLayout("/qcTwo", QcTwoRouter, layouts.MainLayout),
  setLayout(
    "/communityRoundsRouter/:pannelName",
    CommunityRoundsRouter,
    layouts.MainLayout
  ),
  setLayout("/qcThree", QcThreeRouter, layouts.MainLayout),
  setLayout("/checkWard/recordView", checkWardRecordView, layouts.MainLayout),
  setLayout("/checkWard/月护长查房反馈表详情", 月护长查房反馈表详情, layouts.MainLayout),
  setLayout("/checkWard", CheckWardRouter, layouts.MainLayout),
  setLayout("/queryStatistics", QueryStatisticsRouter, layouts.MainLayout),
  setLayout("/UserManual", UserManualRouter, layouts.MainLayout),
  ...appStore.hisMatch({
    map: {
      wh: [
        setLayout("/wardRegister", WardRegisterRouter, layouts.MainLayout),
      ],
      default: [
        setLayout("/wardRegister", WardRegisterDefaultRouter, layouts.MainLayout),
      ]
    }
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
  {
    path: "/nurseFile",
    redirect: "/nurseFile/onTheJob"
  },
  {
    path: "/continuingEdu",
    redirect: "/continuingEdu/人员管理"
  },
  // setLayout("/continuingEdu", ContinuingEdu, layouts.MainLayout),
  // {
  //   path: "/continuingEdu",
  //   redirect: "/continuingEdu/审核发布"
  // },
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
      gzsrm: [
        {
          path: "/setting",
          redirect: "/setting/健康宣教字典"
        }
      ],
      other: [
        {
          path: "/setting",
          redirect: "/setting/扁平管理设置"
        }
      ],
    }
  }),
  {
    path: "/wardManagement",
    redirect: "/wardManagement/扁平管理设置"
  },
  // {
  //   path: '/quality',
  //   redirect: '/quality/qualityControlRecord/3'
  // },

  {
    path: "/",
    redirect: "/home"
  }
];

export default routes;
