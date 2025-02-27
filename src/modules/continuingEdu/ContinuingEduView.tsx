import styled from "styled-components";
import React, { useState, useLayoutEffect, lazy, Suspense, useEffect, useMemo } from "react";
import { RouteComponentProps } from "react-router";
import LeftMenu from "src/components/LeftMenu";
import { meunSettingApi } from "./views/menuSettings/api/MeunSettingApi";
import { continuningEduAuth } from "./data/continuningEduAuth";
import { ReactComponent as RYGL } from "./assets/icon_svg/RYGL.svg";
import { ReactComponent as YNXXB } from "./assets/icon_svg/YNXXB.svg";
import { ReactComponent as JXJH } from "./assets/icon_svg/JXJH.svg";
import { ReactComponent as LXGL } from "./assets/icon_svg/LXGL.svg";
import { ReactComponent as KSGL } from "./assets/icon_svg/KSGL.svg";
import { ReactComponent as SPXX } from "./assets/icon_svg/SPXX.svg";
import { ReactComponent as TKGL } from "./assets/icon_svg/TKGL.svg";
import { ReactComponent as PXGL } from "./assets/icon_svg/PXGL.svg";
import { ReactComponent as JJSZ } from "./assets/icon_svg/JJGL.svg";
import { ReactComponent as JSGL } from "./assets/icon_svg/JSGL.svg";
import { ReactComponent as TZGL } from "./assets/icon_svg/TZGL.svg";

import 人员管理 from "./人员管理";
import 其他人员 from "./views/其他人员/其他人员";
import 人员分组设置 from "./views/人员分组设置/人员分组设置";
import 审核发布 from "./views/auditEduPlant/AuditEduPlan";
import 评分管理 from "./views/scoreManage/ScoreManage";
import 菜单设置 from "./views/menuSettings/MenuSettings";
import 主列表页 from "./views/mainTablePage/MainPage";
import 无权限 from "./views/noAuthority/NoAuthority";
import 通知管理 from "./views/notificationManagement/Notification";
import FormMaintenance from "./views/gaugePearson/formMaintenance/Index";
import TemplateMaintenance from "./views/gaugePearson/templateMaintenance/Index";
import 晋升管理 from "./views/promotionSetting/PromotionSetting";
import 晋升管理_hj from "./views/promotionSetting_hj/PromotionSetting_hj";
import 类型管理 from "./views/typeManagement/TypeManagement";
import 题库管理 from "src/modules/questionBankManagement/QuestionBankManagement";
import 培训统计分析 from "./views/allMenus/AllMenus";
import 在线学习 from "./views/onlineLearning/OnlineLearning";
import 培训手册 from "./views/onlineLearning/OnlineLearning-hj";
// 厚街资质准入表单
import FormApply from "./views/trainingSetting/formApply/FormApply";
//题库管理
import ChoiceQustionEdit from "../questionBankManagement/views/ChoiceQuestionEdit";
import FillingQuestionEdit from "../questionBankManagement/views/FillingQuestionEdit";
import ShortQuestionEdit from "../questionBankManagement/views/ShortQuestionEdit";
import LabelQuestionBank from "../questionBankManagement/views/LabelQuestionBank";
import UploadRecordQuestionBank from "../questionBankManagement/views/UploadRecordQuestionBank";
import UploadQuestionBank from "../questionBankManagement/views/UploadQuestionBank";
import WrongQuestionBank from "../questionBankManagement/views/WrongQuestionBank";
//厚街院级共享考试资源库
import ChoiceQustionEdit_hj1 from "../院级共享考试资源库/views/ChoiceQuestionEdit";
import FillingQuestionEdit_hj1 from "../院级共享考试资源库/views/FillingQuestionEdit";
import ShortQuestionEdit_hj1 from "../院级共享考试资源库/views/ShortQuestionEdit";
import LabelQuestionBank_hj1 from "../院级共享考试资源库/views/LabelQuestionBank";
import UploadRecordQuestionBank_hj1 from "../院级共享考试资源库/views/UploadRecordQuestionBank";
import UploadQuestionBank_hj1 from "../院级共享考试资源库/views/UploadQuestionBank";
import WrongQuestionBank_hj1 from "../院级共享考试资源库/views/WrongQuestionBank";
import 院级共享考试资源库 from "src/modules/院级共享考试资源库/QuestionBankManagement";
//厚街科室考试资源库
import ChoiceQustionEdit_hj2 from "../科室考试资源库/views/ChoiceQuestionEdit";
import FillingQuestionEdit_hj2 from "../科室考试资源库/views/FillingQuestionEdit";
import ShortQuestionEdit_hj2 from "../科室考试资源库/views/ShortQuestionEdit";
import LabelQuestionBank_hj2 from "../科室考试资源库/views/LabelQuestionBank";
import UploadRecordQuestionBank_hj2 from "../科室考试资源库/views/UploadRecordQuestionBank";
import UploadQuestionBank_hj2 from "../科室考试资源库/views/UploadQuestionBank";
import WrongQuestionBank_hj2 from "../科室考试资源库/views/WrongQuestionBank";
import 科室考试资源库 from "src/modules/科室考试资源库/QuestionBankManagement";
import myFavorites from "src/modules/myFavorites/index";
//厚街审核管理
import 审核集中管理 from "./views/审核集中管理/审核集中管理";

// 亚心实习生管理基本信息
import BacisManagement from "./views/InternManagement/bacisInformation/BacisManagement"
import TeachingProgramme from "./views/InternManagement/bacisTeachingProgramme/TeachingProgramme"
import InterntraineeRound from "./views/InternManagement/traineeShift/TraineeShift"
import ClinicalEvaluation from "./views/InternManagement/clinicalEvaluation/ClinicalEvaluation"

// 亚心进修生管理
import BaciPostgraduate from './views/InternPostgraduate/bacisPostgraduate/PostgraduateManagement'
import TeachingPostgraduate from './views/InternPostgraduate/PostgraduateTeachingProgramme/TeachingPostgraduate'

// 实操评分管理
import PracticalOperationScore from './views/practicalOperationScore/PracticalOperationScore'
import PracticalOperationScoreFSXT from './views/practicalOperationScore-FSXT/PracticalOperationScore'
// 培训日历
import TariningCalendars from './views/trainingCalendar/TariningCalendars'

// 晋升申请
import PromotionApplication from './views/promotionApplication/PromotionApplication'
// 亚心晋升管理
import PromotionManagement from './views/promotionManagement/PromotionManagement'
// 亚心规培生管理
import gaugePearson_BacisManagement from "./views/gaugePearson/bacisInformation/BacisManagement"
import gaugePearson_TraineeShift from "./views/gaugePearson/traineeShift/TraineeShift"
import gaugePearson_evaluate from "./views/gaugePearson/evaluate/evaluateTable"

import { appStore, authStore } from "src/stores";
import NavBar from "src/layouts/components/NavBar";
import { Icon } from "antd";
import DynamicRouting from "./DynamicRouting";
import PreJobList from "./views/preJobTraining/list/PreJobList";
import PreJobTrainingPlan from "./views/preJobTraining/trainingPlan/PreJobTrainingPlan";
import TheoryExam from "./views/preJobTraining/theoryExam/TheoryExam";
import ImplementRecord from "./views/preJobTraining/implementRecord/ImplementRecord";
import TrainingExamManage from "./views/preJobManage/trainingExamManage/TrainingExamManage";
import TrainingPlanManage from "./views/preJobManage/trainingPlanManage/TrainingPlanManage";
import fixedTable from "./views/gaugePearson/fixed-table";
import attachment from "./views/gaugePearson/attachment";

/**厚街学习资源 */
//学习的网站链接
const 学习的网站链接 = lazy(() =>
  import("./views/学习资源/学习的网站链接/学习的网站链接")
);
//循证护理实践证据集合
const 循证护理实践证据集合 = lazy(() =>
  import("./views/学习资源/循证护理实践证据集合/循证护理实践证据集合")
);
const 循证护理记录集合详情 = lazy(() =>
  import("./views/学习资源/循证护理实践证据集合/循证护理记录集合详情")
);
const 循证护理记录集合修改 = lazy(() =>
  import("./views/学习资源/循证护理实践证据集合/循证护理记录集合修改")
);
//常用的学习软件介绍
const 常用的学习软件介绍 = lazy(() =>
  import("./views/学习资源/常用的学习软件介绍/常用的学习软件介绍")
);
const 常用的学习软件介绍详情 = lazy(() =>
  import("./views/学习资源/常用的学习软件介绍/常用的学习软件介绍详情")
);
const 常用的学习软件介绍修改 = lazy(() =>
  import("./views/学习资源/常用的学习软件介绍/常用的学习软件介绍修改")
);
//管理工具学习合集
const 管理工具学习合集 = lazy(() =>
  import("./views/学习资源/管理工具学习合集/管理工具学习合集")
);
const 管理工具学习合集详情 = lazy(() =>
  import("./views/学习资源/管理工具学习合集/管理工具学习合集详情")
);
const 管理工具学习合集修改 = lazy(() =>
  import("./views/学习资源/管理工具学习合集/管理工具学习合集修改")
);
//应急预案学习
const 应急预案学习 = lazy(() =>
  import("./views/学习资源/应急预案学习/应急预案学习")
);
const 应急预案学习详情 = lazy(() =>
  import("./views/学习资源/应急预案学习/应急预案学习详情")
);
const 应急预案学习修改 = lazy(() =>
  import("./views/学习资源/应急预案学习/应急预案学习修改")
);
//医院应知应会
const 医院应知应会 = lazy(() =>
  import("./views/学习资源/医院应知应会/医院应知应会")
);
const 医院应知应会详情 = lazy(() =>
  import("./views/学习资源/医院应知应会/医院应知应会详情")
);
const 医院应知应会修改 = lazy(() =>
  import("./views/学习资源/医院应知应会/医院应知应会修改")
);
//护理专栏
const 护理专栏 = lazy(() => import("./views/学习资源/护理专栏/护理专栏"));
const 护理专栏详情 = lazy(() =>
  import("./views/学习资源/护理专栏/护理专栏详情")
);
const 护理专栏修改 = lazy(() =>
  import("./views/学习资源/护理专栏/护理专栏修改")
);
//典型案例
const 典型案例库 = lazy(() => import("./views/学习资源/典型案例库/典型案例库"));

//教学质量管理
//教学质量评价
const 教学质量评价 = lazy(() =>
  import("./views/教学质量管理/教学质量评价/教学质量评价")
);
const 教学质量评价详情 = lazy(() =>
  import("./views/教学质量管理/教学质量评价/views/教学质量评价详情")
);
const 实操评分 = lazy(() => import("./views/教学质量管理/实操评分/实操评分"));
const 实操评分详情 = lazy(() =>
  import("./views/教学质量管理/实操评分/views/实操评分详情")
);
const 进修临床实践管理 = lazy(() =>
  import("./views/教学质量管理/进修临床实践管理/进修临床实践管理")
);
const 进修临床实践详情 = lazy(() =>
  import("./views/教学质量管理/进修临床实践管理/进修临床实践详情")
);

// 培训图表统计分析
const TrainingChartAnalysis = lazy(() =>
  import("./views/trainingChartAnalysis/trainingChartAnalysis")
);
// 课件库
const CourseLibrary = lazy(() => import("./views/courseLibrary/CourseLibrary"));

export interface Props extends RouteComponentProps {}

const peixunWHYX = ()=>{
  const user = JSON.parse(sessionStorage.getItem('user') || '{}')
  return !user.roleManageCodeList.find((code:any)=>['WHYX_QCR5001','WHYX_QCR5002','WHYX_QCR5003','QCR0004'].includes(code))
}
const canEdit = ()=>{
  const user = JSON.parse(sessionStorage.getItem('user') || '{}')
  return user.empNo === "353"
}

export default function ContinuingEdu(props: Props) {
  // const [dataList, setDataList] = useState([] as any); // 动态菜单树
  const [authList, setAuthList] = useState<any>([]); // 固定菜单权限
  const { getList, dataList, listLen } = DynamicRouting()
  // 通知管理
  const noticeCon = {
    title: "通知管理",
    icon: <TZGL />,
    path: "/continuingEdu/通知管理",
    component: 通知管理,
    hide: () =>
      queyMenuAuthInfo("nm_lat_noticemanage") || authStore.isOnlyInternsManage,
  };
  //晋升管理 根据医院切换
  const PromotionSettingCons = appStore.hisMatch({
    map: {
      "hj,lyyz,qhwy,nfsd,dglb,qzde,dghm": [
        {
          title: "晋升管理", 
          icon: <JSGL />,
          path: "/continuingEdu/晋升管理",
          component: 晋升管理_hj,
          hide: () =>
            queyMenuAuthInfo("nm_lat_promotemanage") ||
            authStore.isOnlyInternsManage,
        },
      ],
      "dgxg": [
        {
          title: "晋升", 
          icon: <JSGL />,
          children: [
            {
              title: "晋升管理", 
              icon: <JSGL />,
              path: "/continuingEdu/晋升管理",
              component: 晋升管理_hj,
              hide: () =>
                queyMenuAuthInfo("nm_lat_promotemanage") ||
                authStore.isOnlyInternsManage,
            },
            {
              title: "晋升申请",
              icon: <JSGL />,
              path: "/continuingEdu/PromotionApplication",
              component: PromotionApplication,
            },
          ]
        },
      ],
      
      other: [
        {
          title: "晋升管理",
          icon: <JSGL />,
          path: "/continuingEdu/晋升管理",
          component: 晋升管理,
          hide: () =>
            queyMenuAuthInfo("nm_lat_promotemanage") ||
            authStore.isOnlyInternsManage,
        },
      ],
    },
    vague: true,
  });
  //题库管理 根据医院切换
  const QuestionBankManagementCon = appStore.hisMatch({
    map: {
      'hj,lyyz,qhwy,nfsd,dglb,qzde,dghm,fssdy': [
        {
          title: "学习资源",
          icon: <TKGL />,
          children: [
            {
              title: "学习的网站链接",
              path: "/continuingEdu/学习的网站链接",
              component: 学习的网站链接,
            },
            {
              title: "循证护理记录集合详情",
              path: "/continuingEdu/循证护理记录集合详情",
              hide: true,
              component: 循证护理记录集合详情,
            },
            {
              title: "循证护理记录集合修改",
              path: "/continuingEdu/循证护理记录集合修改",
              hide: true,
              component: 循证护理记录集合修改,
            },
            {
              title: "循证护理实践证据集合",
              path: "/continuingEdu/循证护理实践证据集合",
              component: 循证护理实践证据集合,
            },
            {
              title: "常用的学习软件介绍详情",
              path: "/continuingEdu/常用的学习软件介绍详情",
              hide: true,
              component: 常用的学习软件介绍详情,
            },
            {
              title: "常用的学习软件介绍修改",
              path: "/continuingEdu/常用的学习软件介绍修改",
              hide: true,
              component: 常用的学习软件介绍修改,
            },
            {
              title: "常用的学习软件介绍",
              path: "/continuingEdu/常用的学习软件介绍",
              component: 常用的学习软件介绍,
            },
            {
              title: "管理工具学习合集详情",
              path: "/continuingEdu/管理工具学习合集详情",
              hide: true,
              component: 管理工具学习合集详情,
            },
            {
              title: "管理工具学习合集修改",
              path: "/continuingEdu/管理工具学习合集修改",
              hide: true,
              component: 管理工具学习合集修改,
            },
            {
              title: "管理工具学习合集",
              path: "/continuingEdu/管理工具学习合集",
              component: 管理工具学习合集,
            },
            {
              title: "应急预案学习修改",
              path: "/continuingEdu/应急预案学习修改",
              hide: true,
              component: 应急预案学习修改,
            },
            {
              title: "应急预案学习详情",
              path: "/continuingEdu/应急预案学习详情",
              hide: true,
              component: 应急预案学习详情,
            },
            {
              title: "应急预案学习",
              path: "/continuingEdu/应急预案学习",
              component: 应急预案学习,
            },
            {
              title: "医院应知应会详情",
              path: "/continuingEdu/医院应知应会详情",
              hide: true,
              component: 医院应知应会详情,
            },
            {
              title: "医院应知应会修改",
              path: "/continuingEdu/医院应知应会修改",
              hide: true,
              component: 医院应知应会修改,
            },
            {
              title: "医院应知应会",
              path: "/continuingEdu/医院应知应会",
              component: 医院应知应会,
            },
            {
              title: "护理专栏详情",
              path: "/continuingEdu/护理专栏详情",
              hide: true,
              component: 护理专栏详情,
            },
            {
              title: "护理专栏修改",
              path: "/continuingEdu/护理专栏修改",
              hide: true,
              component: 护理专栏修改,
            },
            {
              title: "护理专栏",
              path: "/continuingEdu/护理专栏",
              component: 护理专栏,
            },
            {
              title: "典型案例库",
              path: "/continuingEdu/典型案例库",
              component: 典型案例库,
            },
          ],
        },
        {
          title: "资源库",
          icon: <TKGL />,
          children: [
            {
              title: "选择题新建和编辑",
              hide: true,
              path: "/continuingEdu/choiceQuestionEdit_hj1",
              component: ChoiceQustionEdit_hj1,
            },
            {
              title: "填空题新建和编辑",
              hide: true,
              path: "/continuingEdu/fillingQuestionEdit_hj1",
              component: FillingQuestionEdit_hj1,
            },
            {
              title: "问答题新建和编辑",
              hide: true,
              path: "/continuingEdu/shortQuestionEdit_hj1",
              component: ShortQuestionEdit_hj1,
            },
            {
              title: "标签题库",
              hide: true,
              path: "/continuingEdu/labelQuestionBank_hj1",
              component: LabelQuestionBank_hj1,
            },
            {
              title: "导入题库",
              hide: true,
              path: "/continuingEdu/uploadRecordQuestionBank_hj1",
              component: UploadRecordQuestionBank_hj1,
            },
            {
              title: "上传新题库",
              hide: true,
              path: "/continuingEdu/uploadQuestionBank_hj1",
              component: UploadQuestionBank_hj1,
            },
            {
              title: "错题反馈",
              hide: true,
              path: "/continuingEdu/wrongQuestionBank_hj1",
              component: WrongQuestionBank_hj1,
            },
            {
              title: "院级共享考试资源库",
              path: "/continuingEdu/院级共享考试资源库",
              component: 院级共享考试资源库,
            },
            {
              title: "选择题新建和编辑",
              hide: true,
              path: "/continuingEdu/choiceQuestionEdit_hj2",
              component: ChoiceQustionEdit_hj2,
            },
            {
              title: "填空题新建和编辑",
              hide: true,
              path: "/continuingEdu/fillingQuestionEdit_hj2",
              component: FillingQuestionEdit_hj2,
            },
            {
              title: "问答题新建和编辑",
              hide: true,
              path: "/continuingEdu/shortQuestionEdit_hj2",
              component: ShortQuestionEdit_hj2,
            },
            {
              title: "标签题库",
              hide: true,
              path: "/continuingEdu/labelQuestionBank_hj2",
              component: LabelQuestionBank_hj2,
            },
            {
              title: "导入题库",
              hide: true,
              path: "/continuingEdu/uploadRecordQuestionBank_hj2",
              component: UploadRecordQuestionBank_hj2,
            },
            {
              title: "上传新题库",
              hide: true,
              path: "/continuingEdu/uploadQuestionBank_hj2",
              component: UploadQuestionBank_hj2,
            },
            {
              title: "错题反馈",
              hide: true,
              path: "/continuingEdu/wrongQuestionBank_hj2",
              component: WrongQuestionBank_hj2,
            },
            {
              title: "科室考试资源库",
              path: "/continuingEdu/科室考试资源库",
              component: 科室考试资源库,
            },
            {
              title: "我的收藏",
              path: "/continuingEdu/myFavorites",
              component: myFavorites,
            },
          ],
        },
      ],
      dgxg: [
        {
          title: "资源库",
          icon: <TKGL />,
          children: [
            {
              title: "选择题新建和编辑",
              hide: true,
              path: "/continuingEdu/choiceQuestionEdit_hj1",
              component: ChoiceQustionEdit_hj1,
            },
            {
              title: "填空题新建和编辑",
              hide: true,
              path: "/continuingEdu/fillingQuestionEdit_hj1",
              component: FillingQuestionEdit_hj1,
            },
            {
              title: "问答题新建和编辑",
              hide: true,
              path: "/continuingEdu/shortQuestionEdit_hj1",
              component: ShortQuestionEdit_hj1,
            },
            {
              title: "标签题库",
              hide: true,
              path: "/continuingEdu/labelQuestionBank_hj1",
              component: LabelQuestionBank_hj1,
            },
            {
              title: "导入题库",
              hide: true,
              path: "/continuingEdu/uploadRecordQuestionBank_hj1",
              component: UploadRecordQuestionBank_hj1,
            },
            {
              title: "上传新题库",
              hide: true,
              path: "/continuingEdu/uploadQuestionBank_hj1",
              component: UploadQuestionBank_hj1,
            },
            {
              title: "错题反馈",
              hide: true,
              path: "/continuingEdu/wrongQuestionBank_hj1",
              component: WrongQuestionBank_hj1,
            },
            {
              title: "院级共享考试资源库",
              path: "/continuingEdu/院级共享考试资源库",
              component: 院级共享考试资源库,
            },
            {
              title: "选择题新建和编辑",
              hide: true,
              path: "/continuingEdu/choiceQuestionEdit_hj2",
              component: ChoiceQustionEdit_hj2,
            },
            {
              title: "填空题新建和编辑",
              hide: true,
              path: "/continuingEdu/fillingQuestionEdit_hj2",
              component: FillingQuestionEdit_hj2,
            },
            {
              title: "问答题新建和编辑",
              hide: true,
              path: "/continuingEdu/shortQuestionEdit_hj2",
              component: ShortQuestionEdit_hj2,
            },
            {
              title: "标签题库",
              hide: true,
              path: "/continuingEdu/labelQuestionBank_hj2",
              component: LabelQuestionBank_hj2,
            },
            {
              title: "导入题库",
              hide: true,
              path: "/continuingEdu/uploadRecordQuestionBank_hj2",
              component: UploadRecordQuestionBank_hj2,
            },
            {
              title: "上传新题库",
              hide: true,
              path: "/continuingEdu/uploadQuestionBank_hj2",
              component: UploadQuestionBank_hj2,
            },
            {
              title: "错题反馈",
              hide: true,
              path: "/continuingEdu/wrongQuestionBank_hj2",
              component: WrongQuestionBank_hj2,
            },
            {
              title: "科室考试资源库",
              path: "/continuingEdu/科室考试资源库",
              component: 科室考试资源库,
            },
            {
              title: "我的收藏",
              path: "/continuingEdu/myFavorites",
              component: myFavorites,
            },
          ],
        },
      ],
      other: [
        {
          title: "选择题新建和编辑",
          hide: true,
          path: "/continuingEdu/choiceQuestionEdit",
          component: ChoiceQustionEdit,
        },
        {
          title: "填空题新建和编辑",
          hide: true,
          path: "/continuingEdu/fillingQuestionEdit",
          component: FillingQuestionEdit,
        },
        {
          title: "问答题新建和编辑",
          hide: true,
          path: "/continuingEdu/shortQuestionEdit",
          component: ShortQuestionEdit,
        },
        {
          title: "标签题库",
          hide: true,
          path: "/continuingEdu/labelQuestionBank",
          component: LabelQuestionBank,
        },
        {
          title: "导入题库",
          hide: true,
          path: "/continuingEdu/uploadRecordQuestionBank",
          component: UploadRecordQuestionBank,
        },
        {
          title: "上传新题库",
          hide: true,
          path: "/continuingEdu/uploadQuestionBank",
          component: UploadQuestionBank,
        },
        {
          title: "错题反馈",
          hide: true,
          path: "/continuingEdu/wrongQuestionBank",
          component: WrongQuestionBank,
        },
        ...appStore.hisMatch({
          map: {
            jmfy: [
              {
                title: "题库管理",
                icon: <TKGL />,
                path: "/continuingEdu/questionBankManagement",
                component: 题库管理,
                hide: () =>
                  queyMenuAuthInfo("nm_lat_questionbankmanage") ||
                  !authStore.isDepartment,
              },
            ],
            nys: [
              {
                title: "题库管理",
                icon: <TKGL />,
                hide: () =>
                  queyMenuAuthInfo("nm_lat_questionbankmanage") ||
                  authStore.isOnlyInternsManage,
                children: [
                  {
                    title: "全院题库",
                    path: "/continuingEdu/allQuestionBank",
                    component: 院级共享考试资源库,
                  },
                  {
                    title: "科室题库",
                    path: "/continuingEdu/deptQuestionBank",
                    component: 科室考试资源库,
                  },
                ],
              },
            ],
            other: [
              {
                title: "题库管理",
                icon: <TKGL />,
                path: "/continuingEdu/questionBankManagement",
                component: 题库管理,
                hide: () =>
                  queyMenuAuthInfo("nm_lat_questionbankmanage") ||
                  authStore.isOnlyInternsManage,
              },
            ],
          },
        }),
      ],
    },
    vague: true,
  });
  // 教学质量管理
  const teachingCon = {
    title: "教学质量管理",
    icon: <JXJH />,
    hide:
      !["hj",'lyyz','qhwy', 'nfsd', 'dglb', 'qzde', 'dghm'].includes(appStore.HOSPITAL_ID) || authStore.isOnlyInternsManage,
    children: [
      {
        title: "教学质量评价详情",
        path: "/continuingEdu/教学质量评价详情",
        component: 教学质量评价详情,
        hide: true,
      },
      {
        title: "教学质量评价",
        path: "/continuingEdu/教学质量评价",
        component: 教学质量评价,
      },
      {
        title: "评分管理",
        path: "/continuingEdu/评分管理",
        component: 评分管理,
        hide: () =>
          ["hj", 'qzde'].includes(appStore.HOSPITAL_ID)
            ? queyMenuAuthInfo("nm_lat_scoremanage") ||
              authStore.isOnlyInternsManage
            : false,
      },
      {
        title: "进修临床实践详情",
        path: "/continuingEdu/进修临床实践详情",
        hide: true,
        component: 进修临床实践详情,
      },
      {
        title: "进修临床实践管理",
        path: "/continuingEdu/进修临床实践管理",
        hide: !appStore.isDev,
        component: 进修临床实践管理,
      },
      {
        title: "实操评分详情",
        path: "/continuingEdu/实操评分详情",
        component: 实操评分详情,
        hide: true,
      },
      {
        title: "实操评分",
        path: "/continuingEdu/实操评分",
        component: 实操评分,
      },
    ],
  };

  const AllMenusCon = {
    title: "培训统计分析",
    icon: <JSGL />,
    path: "/continuingEdu/培训统计分析",
    component: 培训统计分析,
    // hide: () => queyMenuAuthInfo("nm_lat_teachingPlanManage") || authStore.isOnlyInternsManage
    hide: () =>
      !["hj", "gxjb",'lyyz','qhwy', 'nfsd', 'dglb', 'qzde', 'dghm'].includes(appStore.HOSPITAL_ID) ||
      authStore.isOnlyInternsManage,
  };
  const TrainingChartAnalysisCon = {
    title: "培训图表统计分析",
    icon: <JSGL />,
    path: "/continuingEdu/trainingChartAnalysis",
    component: TrainingChartAnalysis,
    hide: () => !["hj",'lyyz','qhwy', 'nfsd', 'dglb', 'qzde', 'dghm'].includes(appStore.HOSPITAL_ID),
  };

  const PracticalOperation = [
    {
      title: "实操评分管理",
      icon: <TKGL />,
      path: "/continuingEdu/PracticalOperationScore",
      component: PracticalOperationScore,
    },
    {
      title: "实操评分管理",
      icon: <TKGL />,
      path: "/continuingEdu/PracticalOperationScorFSXT",
      component: PracticalOperationScoreFSXT,
      hide: !['fsxt','925','fssdy', 'zjhj'].includes(appStore.HOSPITAL_ID)
    },
  ]
// 获取icon
const getIcon = (icon: any) => {
  switch (icon) {
    case 1:
      return <JXJH />;
    case 2:
      return <LXGL />;
    case 3:
      return <SPXX />;
    case 4:
      return <TKGL />;
    case 5:
      return <PXGL />;
    case 6:
      return <JJSZ />;
    default:
      return <JXJH />;
  }
};
/**
 * 初始化动态路由，(解决返回刷新或者页面刷新空白)
 * 静态管理：返回刷新有路由
 * 存储：页面刷新有路由
 * @returns Array
 */
  const initDynamicRouting = useMemo(()=>{
    let newRouter = []
    if(localStorage.getItem("continuDynamicRouter")){
      newRouter = JSON.parse(localStorage.getItem("continuDynamicRouter") || 'null') || []
    }else if(dataList.length>0){
      newRouter = dataList
    }
    newRouter.forEach((it:any)=>{
      it.icon = getIcon(it.sort)
      it.hide=authStore.isOnlyInternsManage
      it.component = 无权限
      if(it.children && it.children.length>0){
        it.children.forEach((ij:any) => {
          ij.component = 主列表页
        })
      }
    })
    return newRouter
  }, [dataList])

  const LEFT_MENU_CONFIG_DEFAULT = [
    {
      title: "培训日历",
      icon: <RYGL />,
      path: "/continuingEdu/TariningCalendars",
      component: TariningCalendars,
    },
    ...appStore.hisMatch({
      map: {
        "hj,lyyz,qhwy,nfsd,dglb,qzde,dghm": [
          {
            title: "人员管理",
            icon: <RYGL />,
            hide: () =>
              queyMenuAuthInfo("nm_lat_personelManage") ||
              authStore.isOnlyInternsManage,
            children: [
              {
                title: "正式人员",
                path: "/continuingEdu/人员管理",
                component: 人员管理,
              },
              {
                title: "其他人员",
                path: "/continuingEdu/其他人员",
                component: 其他人员,
              },
              {
                title: "分组设置",
                path: "/continuingEdu/人员分组设置",
                component: 人员分组设置,
                hide: true,
              },
            ],
          },
          {
            title: "培训手册",
            icon: <JSGL />,
            path: "/continuingEdu/培训手册",
            component: 培训手册,
          },
          {
            title: "审核发布",
            icon: <YNXXB />,
            path: "/continuingEdu/审核发布",
            component: 审核集中管理,
            hide: () =>
              queyMenuAuthInfo("nm_lat_auditmanage") ||
              authStore.isOnlyInternsManage,
          },
        ],
        "dgxg": [
          {
            title: "人员管理",
            icon: <RYGL />,
            hide: () =>
              queyMenuAuthInfo("nm_lat_personelManage") ||
              authStore.isOnlyInternsManage,
            children: [
              {
                title: "护理人员",
                path: "/continuingEdu/人员管理",
                component: 人员管理,
              },
              {
                title: "分组设置",
                path: "/continuingEdu/人员分组设置",
                component: 人员分组设置,
                hide: true,
              },
            ],
          },
          {
            title: "培训手册",
            icon: <JSGL />,
            path: "/continuingEdu/培训手册",
            component: 培训手册,
          },
          {
            title: "审核发布",
            icon: <YNXXB />,
            path: "/continuingEdu/审核发布",
            component: 审核集中管理,
            hide: () =>
              queyMenuAuthInfo("nm_lat_auditmanage") ||
              authStore.isOnlyInternsManage,
          },
        ],
        other: [
          {
            title: "人员管理",
            icon: <RYGL />,
            path: "/continuingEdu/人员管理",
            component: 人员管理,
            hide: () =>
              queyMenuAuthInfo("nm_lat_personelManage") ||
              authStore.isOnlyInternsManage,
          },
          {
            title: "在线学习",
            icon: <JSGL />,
            path: "/continuingEdu/在线学习",
            component: 在线学习,
          },
          {
            title: "审核发布",
            icon: <YNXXB />,
            path: "/continuingEdu/审核发布",
            component: 审核发布,
            hide: () =>
              queyMenuAuthInfo("nm_lat_auditmanage") ||
              authStore.isOnlyInternsManage,
          },
        ],
      },
      vague: true,
    }),
    {
      title: "评分管理",
      icon: <LXGL />,
      path: "/continuingEdu/评分管理",
      component: 评分管理,
      hide: () =>
        !["hj",'lyyz','qhwy', 'nfsd', 'dglb', 'qzde', 'dghm'].includes(appStore.HOSPITAL_ID)
          ? queyMenuAuthInfo("nm_lat_scoremanage") ||
            authStore.isOnlyInternsManage
          : true,
    },
    ...appStore.hisMatch({
      map: {
        dgxg: [],
        other: [AllMenusCon, TrainingChartAnalysisCon],
      },
    }),
    {
      title: "课件库",
      icon: <JSGL />,
      path: "/continuingEdu/courseLibrary",
      component: CourseLibrary,
      hide: () => !["lcey","zzwy"].includes(appStore.HOSPITAL_ID),
    },

    ...initDynamicRouting,
    ...appStore.hisMatch({
      map: {
        other: [],
        dgxg: [AllMenusCon, TrainingChartAnalysisCon],
      },
    }),
    {
      title: "培训设置管理",
      path: "/continuingEdu",
      icon: <JXJH />,
      hide:
        !["hj", "dgxg",'lyyz','qhwy', 'nfsd', 'dglb', 'qzde', 'dghm'].includes(appStore.HOSPITAL_ID) ||
        authStore.isOnlyInternsManage,
      children: [
        ...appStore.hisMatch({
          map: {
            dgxg: [],
            other: [
              {
                title: "临床带教资质准入",
                formName: "护理临床带教资质准入申请表",
                path: "/continuingEdu/临床带教资质准入",
                formCode: "FQA00001",
                component: FormApply,
              },
              {
                title: "护理人员执业/夜班准入",
                formName: appStore.HOSPITAL_ID==='hj'?"护理人员执业/夜班准入资格申请表":"护师人员执业/夜班准入资格申请表",
                path: "/continuingEdu/护理人员执业/夜班准入",
                formCode: "FQA00002",
                component: FormApply,
              },
              {
                title:appStore.HOSPITAL_ID==='hj'?"高风险高难度技术操作人员资质申请表":"高风险诊疗技术操作技术人员准入",
                formName: appStore.HOSPITAL_ID==='hj'?"高风险高难度技术操作人员资质申请表":"高风险诊疗技术操作技术人员准入",
                path: "/continuingEdu/高风险诊疗技术操作技术人员准入",
                formCode: "FQA00003",
                component: FormApply,
              },
              {
                title: "护理会诊人员资质认定",
                formName: "护理会诊人员资质认定表",
                path: "/continuingEdu/护理会诊人员资质认定",
                formCode: "FQA00004",
                component: FormApply,
              },
              {
                title: "护理人员岗位层级晋升",
                formName: "护理人员岗位层级晋升申请表",
                path: "/continuingEdu/护理人员岗位层级晋升",
                formCode: "FQA00005",
                component: FormApply,
              },
              {
                title: "特殊护理岗位资质准入",
                formName: "特殊护理岗位资质准入申请表",
                path: "/continuingEdu/特殊护理岗位资质准入",
                formCode: "FQA00006",
                component: FormApply,
              },
              {
                title: "护理人员院内进修备案",
                formName: "护理人员院内进修备案简表",
                path: "/continuingEdu/护理人员院内进修备案",
                formCode: "FQA00007",
                component: FormApply,
              },
            ],
          },
        }),
        {
          title: "类型管理",
          path: "/continuingEdu/TypeManagement",
          component: 类型管理,
        },
        {
          title: "菜单设置",
          path: "/continuingEdu/菜单设置",
          component: 菜单设置,
        },
      ],
    },
    {
      title: "实习生管理",
      path: "/continuingEdu",
      icon: <JXJH />,
      hide: () => ["dgxg","ytll"].includes(appStore.HOSPITAL_ID),
      children: [
        ...appStore.hisMatch({
          map: {
            other: [
              {
                title: "实习人员基本信息汇总表",
                path: "/continuingEdu/实习人员基本信息汇总表",
                component: BacisManagement,
              },
              {
                title: "实习生教学计划",
                path: "/continuingEdu/实习生教学计划",
                component: TeachingProgramme,
                hide: () => !authStore.isTeachingNurse,
              },
              {
                title: "实习生轮转计划",
                path: "/continuingEdu/实习生轮转计划",
                component: InterntraineeRound,
              },
              {
                title: "实习生临床评定",
                path: "/continuingEdu/实习生临床评定",
                component: ClinicalEvaluation,
              },
            ],
          },
        })
      ],
    },
    {
      title: "规培生管理",
      path: "/continuingEdu",
      icon: <JXJH />,
      hide: () => ["dgxg","ytll"].includes(appStore.HOSPITAL_ID),
      children: [
        {
          title: "规培生基本信息汇总表",
          path: "/continuingEdu/规培生基本信息汇总表",
          component: gaugePearson_BacisManagement,
        },
        {
          title: "规培生轮转计划",
          path: "/continuingEdu/规培生轮转计划",
          component: gaugePearson_TraineeShift,
        },
        {
          title: "规培生出科评价",
          path: "/continuingEdu/规培生出科评价",
          component: gaugePearson_evaluate,
        },
      ],
    },
    {
      title: "进修生管理",
      path: "/continuingEdu",
      icon: <JXJH />,
      hide: () => ["dgxg","ytll"].includes(appStore.HOSPITAL_ID),
      children: [
        ...appStore.hisMatch({
          map: {
            other: [
              {
                title: "进修生基本信息汇总表",
                path: "/continuingEdu/进修生基本信息汇总表",
                component: BaciPostgraduate,
              },
              {
                title: "进修生教学计划",
                path: "/continuingEdu/进修生教学计划",
                component: TeachingPostgraduate,
                hide: () => !authStore.isTeachingNurse,
              },
            ],
          },
        })
      ],
    },
    
    ...appStore.hisMatch({
      map:{
        'ytll':[
          {
            title: "实操评分管理",
            icon: <TKGL />,
            path: "/continuingEdu/PracticalOperationScorFSXT",
            component: PracticalOperationScoreFSXT,
          },
        ],
        other:[
          ...PracticalOperation,
        ]
      }
    }),
    ...appStore.hisMatch({
      map: {
        dgxg: [
          ...QuestionBankManagementCon,
          ...PromotionSettingCons,
          noticeCon,
        ],
        other: [
          teachingCon,
          noticeCon,
          ...PromotionSettingCons,
          ...QuestionBankManagementCon,
        ],
      },
    }),
    {
      title: "晋升申请",
      icon: <JSGL />,
      path: "/continuingEdu/PromotionApplication",
      component: PromotionApplication,
      hide: () => ["dgxg","ytll"].includes(appStore.HOSPITAL_ID)
    },
    {
      title: "类型管理",
      icon: <TKGL />,
      path: "/continuingEdu/TypeManagement",
      component: 类型管理,
      hide: () =>
        queyMenuAuthInfo("nm_lat_typemanage") ||
        ["hj", "dgxg",'lyyz','qhwy', 'nfsd', 'dglb', 'qzde', 'dghm'].includes(appStore.HOSPITAL_ID) ||
        authStore.isOnlyInternsManage,
    },

    {
      title: "菜单设置",
      icon: <KSGL />,
      path: "/continuingEdu/菜单设置",
      component: 菜单设置,
      hide: () =>
        queyMenuAuthInfo("nm_lat_menusetting") ||
        ["hj", "dgxg",'lyyz','qhwy', 'nfsd', 'dglb', 'qzde', 'dghm'].includes(appStore.HOSPITAL_ID) ||
        authStore.isOnlyInternsManage,
    },
    // ...appStore.hisMatch({
    //   map: {
    //     'gxjb': [
    //       {
    //         title: "审核设置",
    //         icon: <KSGL />,
    //         path: "/continuingEdu/auditSettings",
    //         component: lazy(() =>
    //           import('./views/auditSettings/index')
    //         ),
    //       }
    //     ],
    //     other: []
    //   },
    //   vague: true
    // })
  ];

  const 新护士管理岗前培训 = appStore.hisMatch({
    map: {
      whyx:[
        {
          title: "新护士管理-岗前培训",
          path: "/continuingEdu",
          icon: <YNXXB />,
          hide: peixunWHYX(),
          children: [
            {
              title: "人员名单",
              path: "/continuingEdu/preJobList",
              component: PreJobList,
              canEdit:canEdit()
            },
            {
              title: "培训计划",
              path: "/continuingEdu/preJobTrainingPlan",
              canEdit:canEdit(),
              component: PreJobTrainingPlan,
            },
            {
              title: "岗前理论考核",
              path: "/continuingEdu/preJobTheory",
              canEdit:canEdit(),
              component: TheoryExam,
            },
            {
              title: "岗前实操考核",
              path: "/continuingEdu/preJobPractice",
              canEdit:canEdit(),
              component: TheoryExam,
            },
            {
              title: "实施记录",
              path: "/continuingEdu/preJobRecord",
              canEdit:canEdit(),
              component: ImplementRecord,
            },
          ],
        },
      ],
      default:[
        {
          title: "新护士管理-岗前培训",
          path: "/continuingEdu",
          icon: <YNXXB />,
          hide: ['whhk'].includes(appStore.HOSPITAL_ID),
          children: [
            {
              title: "人员名单",
              path: "/continuingEdu/preJobList",
              component: PreJobList,
            },
            {
              title: "培训计划",
              path: "/continuingEdu/preJobTrainingPlan",
              component: PreJobTrainingPlan,
            },
            {
              title: "岗前理论考核",
              path: "/continuingEdu/preJobTheory",
              component: TheoryExam,
            },
            {
              title: "岗前实操考核",
              path: "/continuingEdu/preJobPractice",
              component: TheoryExam,
            },
            {
              title: "实施记录",
              path: "/continuingEdu/preJobRecord",
              component: ImplementRecord,
            },
          ],
        },
      ]
    }
  })

  const 新护士管理临床培训 = appStore.hisMatch({
    map: {
      whyx:[
        {
          title: "新护士管理-临床培训",
          path: "/continuingEdu",
          icon: <YNXXB />,
          hide: peixunWHYX(),
          children: [
            {
              title: "培训计划",
              path: "/continuingEdu/trainingPlanManage",
              component: TrainingPlanManage,
            },
            {
              title: "临床培训考核",
              path: "/continuingEdu/trainingExamManage",
              component: TrainingExamManage,
            },
            {
              title: "临床实操考核",
              path: "/continuingEdu/practiceExamManage",
              component: TrainingExamManage,
            },
          ],
        },
      ],
      default:[
        {
          title: "新护士管理-临床培训",
          path: "/continuingEdu",
          icon: <YNXXB />,
          hide: ['whhk'].includes(appStore.HOSPITAL_ID),
          children: [
            {
              title: "培训计划",
              path: "/continuingEdu/trainingPlanManage",
              component: TrainingPlanManage,
            },
            {
              title: "临床培训考核",
              path: "/continuingEdu/trainingExamManage",
              component: TrainingExamManage,
            },
            {
              title: "临床实操考核",
              path: "/continuingEdu/practiceExamManage",
              component: TrainingExamManage,
            },
          ],
        },
      ]
    }
  })
  
  const LEFT_MENU_CONFIG_WHYX = [
    {
      title: "人员管理",
      icon: <RYGL />,
      path: "/continuingEdu/人员管理",
      component: 人员管理,
      hide: () =>
        queyMenuAuthInfo("nm_lat_personelManage") ||
        authStore.isOnlyInternsManage,
    },
    {
      title: "在职护士管理",
      path: "/continuingEdu",
      icon: <JSGL />,
      children: [
        {
          title: "培训日历",
          path: "/continuingEdu/TariningCalendars",
          component: TariningCalendars,
        },
        {
          title: "晋升申请",
          path: "/continuingEdu/PromotionApplication",
          component: PromotionApplication,
        },
        {
          title: "晋升管理",
          path: "/continuingEdu/PromotionManagement",
          component: PromotionManagement,
        }
        
      ],
    },
    ...新护士管理岗前培训,
    ...新护士管理临床培训,
    {
      title: "规培生管理",
      path: "/continuingEdu",
      icon: <TKGL />,
      children: [
        {
          title: "规培生基本信息汇总表",
          path: "/continuingEdu/规培生基本信息汇总表",
          component: gaugePearson_BacisManagement,
        },
        {
          title: "规培生轮转计划",
          path: "/continuingEdu/规培生轮转计划",
          component: gaugePearson_TraineeShift,
        },
        {
          title: "规培生出科评价",
          path: "/continuingEdu/规培生出科评价",
          component: gaugePearson_evaluate,
        },
      ],
    },
    {
      title: "实习生管理",
      path: "/continuingEdu",
      icon: <YNXXB />,
      children: [
        {
          title: "实习人员基本信息汇总表",
          path: "/continuingEdu/实习人员基本信息汇总表",
          component: BacisManagement,
        },
        {
          title: "实习生教学计划",
          path: "/continuingEdu/实习生教学计划",
          component: TeachingProgramme,
          hide: () => !authStore.isTeachingNurse,
        },
        {
          title: "实习生轮转计划",
          path: "/continuingEdu/实习生轮转计划",
          component: InterntraineeRound,
        },
        {
          title: "实习生临床评定",
          path: "/continuingEdu/实习生临床评定",
          component: ClinicalEvaluation,
        },   
      ],
    },
    {
      title: "进修生管理",
      path: "/continuingEdu",
      icon: <LXGL />,
      children: [
        {
          title: "进修生基本信息汇总表",
          path: "/continuingEdu/进修生基本信息汇总表",
          component: BaciPostgraduate,
        },
        {
          title: "进修生教学计划",
          path: "/continuingEdu/进修生教学计划",
          component: TeachingPostgraduate,
          hide: () => !authStore.isTeachingNurse,
        },   
      ],
    },
    {
      title: "培训管理",
      path: "/continuingEdu",
      icon: <KSGL />,
      children: [
        {
          title: "在线学习",
          path: "/continuingEdu/在线学习",
          component: 在线学习,
        },
        {
          title: "审核发布",
          path: "/continuingEdu/审核发布",
          component: 审核发布,
          hide: () =>
            queyMenuAuthInfo("nm_lat_auditmanage") ||
            authStore.isOnlyInternsManage,
        },
        {
          title: "评分管理",
          path: "/continuingEdu/评分管理",
          component: 评分管理,
          hide: () =>queyMenuAuthInfo("nm_lat_scoremanage") ||
                authStore.isOnlyInternsManage
        },
        {
          title: "实操评分管理",
          path: "/continuingEdu/PracticalOperationScore",
          component: PracticalOperationScore,
        },
        {
          title: "题库管理",
          path: "/continuingEdu/questionBankManagement",
          component: 题库管理,
          hide: () =>
            queyMenuAuthInfo("nm_lat_questionbankmanage") ||
            authStore.isOnlyInternsManage,
        },
        {
          title: "类型管理",
          path: "/continuingEdu/TypeManagement",
          component: 类型管理,
          hide: () =>
            queyMenuAuthInfo("nm_lat_typemanage") ||
            authStore.isOnlyInternsManage,
        },
        {
          title: "选择题新建和编辑",
          hide: true,
          path: "/continuingEdu/choiceQuestionEdit",
          component: ChoiceQustionEdit,
        },
        {
          title: "上传新题库",
          hide: true,
          path: "/continuingEdu/uploadQuestionBank",
          component: UploadQuestionBank,
        },
        {
          title: "填空题新建和编辑",
          hide: true,
          path: "/continuingEdu/fillingQuestionEdit",
          component: FillingQuestionEdit,
        },
        {
          title: "问答题新建和编辑",
          hide: true,
          path: "/continuingEdu/shortQuestionEdit",
          component: ShortQuestionEdit,
        },
        {
          title: "菜单设置",
          path: "/continuingEdu/菜单设置",
          component: 菜单设置,
          hide: () =>
            queyMenuAuthInfo("nm_lat_menusetting") ||
            authStore.isOnlyInternsManage,
        },
        {
          title: "通知管理",
          path: "/continuingEdu/通知管理",
          component: 通知管理,
          hide: () =>
            queyMenuAuthInfo("nm_lat_noticemanage") || authStore.isOnlyInternsManage,
        },
        {
          title: "手册表单维护",
          path: "/continuingEdu/formMaintenance",
          component: FormMaintenance,
           hide: !['whyx','gdsfy'].includes(appStore.HOSPITAL_ID)
        },
        {
          title: "手册模板维护",
          path: "/continuingEdu/templateMaintenance",
          component: TemplateMaintenance,
          hide: !['whyx','gdsfy'].includes(appStore.HOSPITAL_ID)
        },
        {
          title: "手册附件维护",
          path: "/continuingEdu/手册附件维护",
          component: attachment,
          hide: !['whyx','gdsfy'].includes(appStore.HOSPITAL_ID)
        },
        {
          title: "手册固定表维护",
          path: "/continuingEdu/手册固定表维护",
          component: fixedTable,
          hide: !['whyx','gdsfy'].includes(appStore.HOSPITAL_ID)
        },
      ],
    },
    ...initDynamicRouting,
  ];

  const LEFT_MENU_CONFIG_FSSDY = [
    {
      title: "人员管理",
      icon: <RYGL />,
      path: "/continuingEdu/人员管理",
      component: 人员管理,
      hide: () =>
        queyMenuAuthInfo("nm_lat_personelManage") ||
        authStore.isOnlyInternsManage,
    },
    {
      title: "在职护士管理",
      path: "/continuingEdu",
      icon: <JSGL />,
      children: [
        {
          title: "培训日历",
          path: "/continuingEdu/TariningCalendars",
          component: TariningCalendars,
        },
        {
          title: "晋升申请",
          path: "/continuingEdu/PromotionApplication",
          component: PromotionApplication,
        },
        {
          title: "晋升管理",
          path: "/continuingEdu/PromotionManagement",
          component: PromotionManagement,
        }
        
      ],
    },
    {
      title: "新护士管理-岗前培训",
      path: "/continuingEdu",
      icon: <YNXXB />,
      children: [
        {
          title: "人员名单",
          path: "/continuingEdu/preJobList",
          component: PreJobList,
        },
        {
          title: "培训计划",
          path: "/continuingEdu/preJobTrainingPlan",
          component: PreJobTrainingPlan,
        },
        {
          title: "岗前理论考核",
          path: "/continuingEdu/preJobTheory",
          component: TheoryExam,
        },
        {
          title: "岗前实操考核",
          path: "/continuingEdu/preJobPractice",
          component: TheoryExam,
        },
        {
          title: "实施记录",
          path: "/continuingEdu/preJobRecord",
          component: ImplementRecord,
        },
      ],
    },
    {
      title: "新护士管理-临床培训",
      path: "/continuingEdu",
      icon: <YNXXB />,
      children: [
        {
          title: "培训计划",
          path: "/continuingEdu/trainingPlanManage",
          component: TrainingPlanManage,
        },
        {
          title: "临床培训考核",
          path: "/continuingEdu/trainingExamManage",
          component: TrainingExamManage,
        },
        {
          title: "临床实操考核",
          path: "/continuingEdu/practiceExamManage",
          component: TrainingExamManage,
        },
      ],
    },
    {
      title: "在线学习",
      icon: <JSGL />,
      path: "/continuingEdu/在线学习",
      component: 在线学习,
    },
    {
      title: "审核发布",
      icon: <YNXXB />,
      path: "/continuingEdu/审核发布",
      component: 审核发布,
      hide: () =>
        queyMenuAuthInfo("nm_lat_auditmanage") ||
        authStore.isOnlyInternsManage,
    },
    {
      title: "评分管理",
      icon: <LXGL />,
      path: "/continuingEdu/评分管理",
      component: 评分管理,
      hide: () => queyMenuAuthInfo("nm_lat_scoremanage") || authStore.isOnlyInternsManage,
    },
    ...[AllMenusCon, TrainingChartAnalysisCon],
    ...initDynamicRouting,
    {
      title: "实习生管理",
      path: "/continuingEdu",
      icon: <JXJH />,
      children: [
        {
          title: "实习人员基本信息汇总表",
          path: "/continuingEdu/实习人员基本信息汇总表",
          component: BacisManagement,
        },
        {
          title: "实习生教学计划",
          path: "/continuingEdu/实习生教学计划",
          component: TeachingProgramme,
          hide: () => !authStore.isTeachingNurse,
        },
        {
          title: "实习生轮转计划",
          path: "/continuingEdu/实习生轮转计划",
          component: InterntraineeRound,
        },
        {
          title: "实习生临床评定",
          path: "/continuingEdu/实习生临床评定",
          component: ClinicalEvaluation,
        },
      ],
    },
    {
      title: "规培生管理",
      path: "/continuingEdu",
      icon: <JXJH />,
      children: [
        {
          title: "规培生基本信息汇总表",
          path: "/continuingEdu/规培生基本信息汇总表",
          component: gaugePearson_BacisManagement,
        },
        {
          title: "规培生轮转计划",
          path: "/continuingEdu/规培生轮转计划",
          component: gaugePearson_TraineeShift,
        },
        {
          title: "规培生出科评价",
          path: "/continuingEdu/规培生出科评价",
          component: gaugePearson_evaluate,
        },
      ],
    },
    {
      title: "进修生管理",
      path: "/continuingEdu",
      icon: <JXJH />,
      children: [
        {
          title: "进修生基本信息汇总表",
          path: "/continuingEdu/进修生基本信息汇总表",
          component: BaciPostgraduate,
        },
        {
          title: "进修生教学计划",
          path: "/continuingEdu/进修生教学计划",
          component: TeachingPostgraduate,
          hide: () => !authStore.isTeachingNurse,
        },
      ],
    },
    ...PracticalOperation,
    ...[
      teachingCon,
      noticeCon,
      ...PromotionSettingCons,
      ...QuestionBankManagementCon,
    ],
    {
      title: "类型管理",
      icon: <TKGL />,
      path: "/continuingEdu/TypeManagement",
      component: 类型管理,
      hide: () =>
        queyMenuAuthInfo("nm_lat_typemanage") || authStore.isOnlyInternsManage,
    },

    {
      title: "菜单设置",
      icon: <KSGL />,
      path: "/continuingEdu/菜单设置",
      component: 菜单设置,
      hide: () =>
        queyMenuAuthInfo("nm_lat_menusetting") || authStore.isOnlyInternsManage,
    },
  ];

  const LEFT_MENU_CONFIG = appStore.hisMatch({
    map: {
      'whyx,whhk,gdsfy,jmfy': LEFT_MENU_CONFIG_WHYX,
      'fssdy': LEFT_MENU_CONFIG_FSSDY,
      default:LEFT_MENU_CONFIG_DEFAULT
    },
    vague: true,
  })
 
  // 查询获取动态菜单列表
  // const getList = () => {
  //   meunSettingApi.getData().then((res: any) => {
  //     let newArr: any = [];
  //     if (res.data) {
  //       let arr = res.data || [];
  //       if (arr && arr.length) {
  //         arr.map((item: any, index: number) => {
  //           var obj1: any = {
  //             id: item.id,
  //             title: item.name,
  //             icon: getIcon(item.sort),
  //             component: 无权限,
  //             path: `/continuingEdu/${item.name}?Pid=${item.id}`,
  //             hide: authStore.isOnlyInternsManage,
  //           };
  //           if (item.childList && item.childList.length) {
  //             let Pid = item.id;
  //             let arr: any = [];
  //             item.childList.map((childItem: any, index: any) => {
  //               var obj2: any = {
  //                 parentsName: item.name,
  //                 id: childItem.id,
  //                 title: childItem.name,
  //                 component: 主列表页,
  //                 path: `/continuingEdu/${Pid}/${childItem.id}?Pid=${Pid}&id=${
  //                   childItem.id
  //                 }`,
  //               };
  //               arr.push(obj2);
  //               obj1.children = arr;
  //             });
  //           }
  //           newArr.push(obj1);
  //         });
  //         setDataList(newArr);
  //       } else {
  //         setDataList([]);
  //       }
  //     }
  //   });
  // };

  // 获取固定菜单权限
  const queyMenuAuthInfo = (val: any) => {
    let isOk: any = authList.filter((item: any) => item.menuCode === val);
    return !(isOk && isOk.length);
  };
  const getAuth = () => {
    meunSettingApi.queyMenuAuthInfo().then((res: any) => {
      setAuthList(res.data);
    });
  };

  // 路由跳转
  // const routerTo = () => {
  //   let data = LEFT_MENU_CONFIG.find((item: any, index: any) => {
  //     return typeof item.hide === "boolean" ? !item.hide : !!!item.hide();
  //   });
  //   let url: any =
  //     data && data.children ? data.children[0].path : data && data.path;
  //   appStore.history.push(url);
  // };

  const baseInitMethods = async () => {
    getAuth();
    // getList();
    await getList()
  };
  //初始化的方法
  let initMethods = appStore.hisMatch({
    map: {
      "hj,dgxg,lyyz,qhwy,nfsd,dglb,qzde,dghm": () => {
        baseInitMethods();
        //初始化学习培训权限
        continuningEduAuth.initAuth();
      },
      other: () => baseInitMethods(),
    },
    vague: true,
  });
  useLayoutEffect(() => {
    // 初始化动态菜单 菜单权限
    initMethods();
    // console.log('初始化？')
    return () => {
      localStorage.removeItem("continuDynamicRouter")
    }
  }, [])

  const [currentRoute, setCurrentRoute] = useState<any>(null)
  useLayoutEffect(() => {
    const path = `${props.history.location.pathname}${props.history.location.search}`

    setCurrentRoute(getTargetObj(LEFT_MENU_CONFIG, "path", path));
  }, [props.history.location.pathname, listLen]);
  /** 筛选目标对象 */
  function getTargetObj(listDate: any, targetKey: string, targetName: string) {
    let chooseRoute = listDate.find((item: any) => {
      if (item.children) {
        return item.children.find(
          (item1: any) => targetName.indexOf(item1[targetKey]) >= 0
        );
      } else {
        return targetName.indexOf(item[targetKey]) >= 0;
      }
    });
    if (chooseRoute && chooseRoute.children) {
      chooseRoute = chooseRoute.children.find(
        (item1: any) => targetName.indexOf(item1[targetKey]) >= 0
      );
    }
    return chooseRoute;
  }

  return (
    <Wrapper>
      <LeftWrapper>
        <LeftMenu config={LEFT_MENU_CONFIG} menuTitle="学习培训" />
      </LeftWrapper>
      <MainWrapper>
        {currentRoute && currentRoute.component && (
          <Suspense
            fallback={
              <React.Fragment>
                <NavBar
                  style={{ position: "fixed", top: -1, left: 0, right: 0 }}
                />
                <LoadingCon>
                  <Icon type="loading" />
                </LoadingCon>
              </React.Fragment>
            }
          >
            <currentRoute.component
              getTitle={currentRoute && currentRoute.title} //菜单标题
              getId={currentRoute && currentRoute.id} //菜单id
              getFormCode={currentRoute && currentRoute.formCode} //表单code值
              getFormName={currentRoute && currentRoute.formName} //表单code值
              getList={getList} // 动态菜单树
              getParentsName={currentRoute && currentRoute.parentsName}
              canEdit={currentRoute && currentRoute?.canEdit}
            />
          </Suspense>
        )}
      </MainWrapper>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;
const LeftWrapper = styled.div`
  #left-menu-con {
    overflow-x: hidden;
  }
`;
const MainWrapper = styled.div`
  position: absolute;
  left: 200px;
  top: 0;
  right: 0;
  height: calc(100vh - 50px);
`;
const LoadingCon = styled.div`
  position: fixed;
  left: 0;
  top: 48px;
  width: 100%;
  bottom: 0;
  background-color: #eee;
  color: #999;
  cursor: wait;
  .anticon {
    font-size: 50px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`;
