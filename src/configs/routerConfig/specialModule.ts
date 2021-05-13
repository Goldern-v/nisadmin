import { setLayout } from "src/utils/route/route-utils";
import layouts from "src/layouts";
import React, { lazy } from "react";
import { appStore } from "src/stores";

import HomeView from "src/modules/home/HomeView";
import HomeView_wh from "src/modules/home-wh/HomeView";
//审核列表页
import AuditsManagementView_nys from "src/modules/auditsManagement-nys/AuditsManagementView";
import AuditsManagementView_jmfy from "src/modules/auditsManagement-jmfy/AuditsManagementView";
import AuditsManagementView_wh from "src/modules/auditsManagement-wh/AuditsManagementView";
import AuditsManagementView_gzhd from "src/modules/auditsManagement-gzhd/AuditsManagementView";
import AuditsManagementView from "src/modules/auditsManagement/AuditsManagementView";
//档案个人审核页
import NurseAudit from "src/modules/nurseFiles/view/nurseFiles-hj/views/nurseAudit/NurseAudit";
import NurseAudit_nys from "src/modules/nurseFiles/view/nurseFiles-nys/views/nurseAudit/NurseAudit";
import NurseAudit_gzhd from "src/modules/nurseFiles/view/nurseFiles-gzhd/views/nurseAudit/NurseAudit";
import NurseAudit_wh from "src/modules/nurseFiles/view/nurseFiles-wh/views/nurseAudit/NurseAudit";
import NurseAudit_jmfy from "src/modules/nurseFiles/view/nurseFiles-jmfy/views/nurseAudit/NurseAudit";
//档案详情
import NurseFileDetailView from "src/modules/nurseFiles/view/nurseFiles-hj/views/nurseFileDetail/NurseFileDetailView";
import NurseFileDetailView_wh
  from "src/modules/nurseFiles/view/nurseFiles-wh/views/nurseFileDetail/NurseFileDetailView";
import NurseFileDetailView_nys
  from "src/modules/nurseFiles/view/nurseFiles-nys/views/nurseFileDetail/NurseFileDetailView";
import NurseFileDetailView_gzhd
  from "src/modules/nurseFiles/view/nurseFiles-gzhd/views/nurseFileDetail/NurseFileDetailView";
import NurseFileDetailView_lcey
  from "src/modules/nurseFiles/view/nurseFiles-lcey/views/nurseFileDetail/NurseFileDetailView";
import NurseFileDetailView_gzsrm
  from "src/modules/nurseFiles/view/nurseFiles-gzsrm/views/nurseFileDetail/NurseFileDetailView";
import NurseFileDetailView_jmfy
  from "src/modules/nurseFiles/view/nurseFiles-jmfy/views/nurseFileDetail/NurseFileDetailView";
import NurseFileDetailView_dghl
  from "src/modules/nurseFiles/view/nurseFiles-dghl/views/nurseFileDetail/NurseFileDetailView";

const NursingRulesNew = lazy(() =>
  import("src/modules/nursingRulesNew/NursingRulesNew")
);
const NursingRulesNewDetail = lazy(() =>
  import("src/modules/nursingRulesNew/views/NursingRulesNewDetail")
);
const NursingRulesPagePreview = lazy(() =>
  import("src/modules/nursingRulesNew/views/NursingRulesPagePreview")
);
const NursingRulesNewEdit = lazy(() =>
  import("src/modules/nursingRulesNew/views/NursingRulesNewEdit")
);

const NursingRulesNew_wh = lazy(() =>
  import("src/modules/nursingRulesNew-wh/NursingRulesNew")
);
const NursingRulesNewDetail_wh = lazy(() =>
  import("src/modules/nursingRulesNew-wh/views/NursingRulesNewDetail")
);
const NursingRulesPagePreview_wh = lazy(() =>
  import("src/modules/nursingRulesNew-wh/views/NursingRulesPagePreview")
);
const NursingRulesNewEdit_wh = lazy(() =>
  import("src/modules/nursingRulesNew-wh/views/NursingRulesNewEdit")
);

const SettingView = lazy(() => import("src/modules/setting/SettingView"))

//不良事件视图
const BadEventsNewList = lazy(() => import("src/modules/badEventsNew/BadEventsNewList"))
import BadEventsRouters from "src/modules/badEventsNew/BadEventsRouters"
import IndicatorNew from "src/modules/indicator/IndicatorNew";

let specialModule: any[] = [];

//根据是否只展示不良事件指定页面
const homeRouter = (view: any): any[] => {
  if (appStore.onlyBadEvent) {
    return [
      //首页为不良事件的路由
      setLayout("/home", BadEventsRouters, layouts.MainLayout)
    ]
  } else {
    return [
      //包含不良事件的路由
      setLayout("/home", view, layouts.MainLayout),
      setLayout("/badEventsNewList", BadEventsNewList, layouts.MainLayout)
    ]
  }
}

if (process.env.REACT_APP_HOSPITAL_ID == "hj") {
  specialModule = [
    setLayout("/indicator/:name", IndicatorNew, layouts.MainLayout),
    setLayout("/indicator", IndicatorNew, layouts.MainLayout),
    setLayout("/nurseAudit", NurseAudit, layouts.MainLayout),
    setLayout(
      "/nurseFileDetail/:type",
      NurseFileDetailView,
      layouts.MainLayout
    ),
    setLayout("/auditsManagement", AuditsManagementView, layouts.MainLayout),
    ...homeRouter(HomeView),
    //厚街护理制度
    setLayout("/nursingRulesNew", NursingRulesNew, layouts.MainLayout),
    setLayout(
      "/nursingRulesNewDetail",
      NursingRulesNewDetail,
      layouts.MainLayout
    ),
    setLayout(
      "/NursingRulesPagePreView",
      NursingRulesPagePreview,
      layouts.MainLayout
    ),
    setLayout("/nursingRulesNewEdit", NursingRulesNewEdit, layouts.MainLayout)
  ];
} else if (
  process.env.REACT_APP_HOSPITAL_ID == "ys" ||
  process.env.REACT_APP_HOSPITAL_ID == "gyd"
) {
  specialModule = [
    setLayout("/nurseAudit", NurseAudit, layouts.MainLayout),
    setLayout(
      "/nurseFileDetail/:type",
      NurseFileDetailView,
      layouts.MainLayout
    ),
    setLayout("/auditsManagement", AuditsManagementView, layouts.MainLayout),
    ...homeRouter(HomeView),
    //厚街护理制度
    setLayout("/nursingRulesNew", NursingRulesNew, layouts.MainLayout),
    setLayout(
      "/nursingRulesNewDetail",
      NursingRulesNewDetail,
      layouts.MainLayout
    ),
    setLayout(
      "/NursingRulesPagePreView",
      NursingRulesPagePreview,
      layouts.MainLayout
    ),
    setLayout("/nursingRulesNewEdit", NursingRulesNewEdit, layouts.MainLayout)
  ];
} else if (process.env.REACT_APP_HOSPITAL_ID == "nys") {
  specialModule = [
    setLayout("/indicator/:name", IndicatorNew, layouts.MainLayout),
    setLayout("/indicator", IndicatorNew, layouts.MainLayout),
    setLayout("/nurseAudit", NurseAudit_nys, layouts.MainLayout),
    setLayout(
      "/nurseFileDetail/:type",
      NurseFileDetailView_nys,
      layouts.MainLayout
    ),
    setLayout("/auditsManagement", AuditsManagementView_nys, layouts.MainLayout),
    ...homeRouter(HomeView_wh),
    //厚街护理制度
    setLayout("/nursingRulesNew", NursingRulesNew, layouts.MainLayout),
    setLayout(
      "/nursingRulesNewDetail",
      NursingRulesNewDetail,
      layouts.MainLayout
    ),
    setLayout(
      "/NursingRulesPagePreView",
      NursingRulesPagePreview,
      layouts.MainLayout
    ),
    setLayout("/nursingRulesNewEdit", NursingRulesNewEdit, layouts.MainLayout)
  ];
} else if (process.env.REACT_APP_HOSPITAL_ID == "wh") {
  specialModule = [
    // setLayout('/nurseFilesList', NurseFilesListView_wh, layouts.MainLayout),
    setLayout("/nurseAudit", NurseAudit_wh, layouts.MainLayout),
    setLayout(
      "/nurseFileDetail/:type",
      NurseFileDetailView_wh,
      layouts.MainLayout
    ),
    setLayout(
      "/selfNurseFile/:type",
      NurseFileDetailView_wh,
      layouts.MainLayout
    ),
    setLayout("/auditsManagement", AuditsManagementView_wh, layouts.MainLayout),
    ...homeRouter(HomeView_wh),
  ];

  //武汉护理制度
  specialModule = specialModule.concat([
    setLayout("/nursingRulesNew", NursingRulesNew_wh, layouts.MainLayout),
    setLayout(
      "/nursingRulesNewDetail",
      NursingRulesNewDetail_wh,
      layouts.MainLayout
    ),
    setLayout(
      "/NursingRulesPagePreView",
      NursingRulesPagePreview_wh,
      layouts.MainLayout
    ),
    setLayout(
      "/nursingRulesNewEdit",
      NursingRulesNewEdit_wh,
      layouts.MainLayout
    )
  ]);
} else if (appStore.HOSPITAL_ID == 'dzlc') {
  specialModule = [...homeRouter(SettingView)]
} else if (appStore.HOSPITAL_ID == 'gzhd') {
  specialModule = [
    // setLayout('/nurseFilesList', NurseFilesListView, layouts.MainLayout),
    setLayout("/nurseAudit", NurseAudit_gzhd, layouts.MainLayout),
    setLayout(
      "/nurseFileDetail/:type",
      NurseFileDetailView_gzhd,
      layouts.MainLayout
    ),
    setLayout(
      "/selfNurseFile/:type",
      NurseFileDetailView_gzhd,
      layouts.MainLayout
    ),
    setLayout("/auditsManagement", AuditsManagementView_gzhd, layouts.MainLayout),
    ...homeRouter(HomeView),
    //厚街护理制度
    setLayout("/nursingRulesNew", NursingRulesNew, layouts.MainLayout),
    setLayout(
      "/nursingRulesNewDetail",
      NursingRulesNewDetail,
      layouts.MainLayout
    ),
    setLayout(
      "/NursingRulesPagePreView",
      NursingRulesPagePreview,
      layouts.MainLayout
    ),
    setLayout("/nursingRulesNewEdit", NursingRulesNewEdit, layouts.MainLayout)
  ];
} else if (appStore.HOSPITAL_ID == 'lcey') {
  specialModule = [
    // setLayout('/nurseFilesList', NurseFilesListView, layouts.MainLayout),
    setLayout("/nurseAudit", NurseAudit, layouts.MainLayout),
    setLayout(
      "/nurseFileDetail/:type",
      NurseFileDetailView_lcey,
      layouts.MainLayout
    ),
    setLayout("/auditsManagement", AuditsManagementView, layouts.MainLayout),
    ...homeRouter(HomeView),
    //厚街护理制度
    setLayout("/nursingRulesNew", NursingRulesNew, layouts.MainLayout),
    setLayout(
      "/nursingRulesNewDetail",
      NursingRulesNewDetail,
      layouts.MainLayout
    ),
    setLayout(
      "/NursingRulesPagePreView",
      NursingRulesPagePreview,
      layouts.MainLayout
    ),
    setLayout("/nursingRulesNewEdit", NursingRulesNewEdit, layouts.MainLayout)
  ];
} else if (appStore.HOSPITAL_ID == 'gzsrm') {
  specialModule = [
    // setLayout('/nurseFilesList', NurseFilesListView_wh, layouts.MainLayout),
    setLayout("/nurseAudit", NurseAudit_wh, layouts.MainLayout),
    setLayout(
      "/nurseFileDetail/:type",
      NurseFileDetailView_wh,
      layouts.MainLayout
    ),
    setLayout(
      "/selfNurseFile/:type",
      NurseFileDetailView_wh,
      layouts.MainLayout
    ),
    setLayout("/auditsManagement", AuditsManagementView_wh, layouts.MainLayout),
    ...homeRouter(HomeView_wh),
  ];

  specialModule = specialModule.concat([
    setLayout("/nursingRulesNew", NursingRulesNew_wh, layouts.MainLayout),
    setLayout(
      "/nursingRulesNewDetail",
      NursingRulesNewDetail_wh,
      layouts.MainLayout
    ),
    setLayout(
      "/NursingRulesPagePreView",
      NursingRulesPagePreview_wh,
      layouts.MainLayout
    ),
    setLayout(
      "/nursingRulesNewEdit",
      NursingRulesNewEdit_wh,
      layouts.MainLayout
    )
  ]);
} else if (appStore.HOSPITAL_ID == 'jmfy') {
  specialModule = [
    // setLayout('/nurseFilesList', NurseFilesListView, layouts.MainLayout),
    setLayout("/nurseAudit", NurseAudit_jmfy, layouts.MainLayout),
    setLayout(
      "/nurseFileDetail/:type",
      NurseFileDetailView_jmfy,
      layouts.MainLayout
    ),
    setLayout("/auditsManagement", AuditsManagementView_jmfy, layouts.MainLayout),
    ...homeRouter(HomeView),
    //厚街护理制度
    setLayout("/nursingRulesNew", NursingRulesNew, layouts.MainLayout),
    setLayout(
      "/nursingRulesNewDetail",
      NursingRulesNewDetail,
      layouts.MainLayout
    ),
    setLayout(
      "/NursingRulesPagePreView",
      NursingRulesPagePreview,
      layouts.MainLayout
    ),
    setLayout("/nursingRulesNewEdit", NursingRulesNewEdit, layouts.MainLayout)
  ];
} else if (appStore.HOSPITAL_ID == 'dghl') {
  specialModule = [
    // setLayout('/nurseFilesList', NurseFilesListView, layouts.MainLayout),
    setLayout("/nurseAudit", NurseAudit, layouts.MainLayout),
    setLayout(
      "/nurseFileDetail/:type",
      NurseFileDetailView_dghl,
      layouts.MainLayout
    ),
    setLayout("/auditsManagement", AuditsManagementView, layouts.MainLayout),
    ...homeRouter(HomeView),
    //厚街护理制度
    setLayout("/nursingRulesNew", NursingRulesNew, layouts.MainLayout),
    setLayout(
      "/nursingRulesNewDetail",
      NursingRulesNewDetail,
      layouts.MainLayout
    ),
    setLayout(
      "/NursingRulesPagePreView",
      NursingRulesPagePreview,
      layouts.MainLayout
    ),
    setLayout("/nursingRulesNewEdit", NursingRulesNewEdit, layouts.MainLayout)
  ];
}

export { specialModule };
