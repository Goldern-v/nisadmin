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
import AuditsManagementNewView from "src/modules/auditsManagementNew/AuditsManagementView";
//档案个人审核页
import NurseAudit from "src/modules/nurseFiles/view/nurseFiles-hj/views/nurseAudit/NurseAudit";
import NurseAudit_nys from "src/modules/nurseFiles/view/nurseFiles-nys/views/nurseAudit/NurseAudit";
import NurseAudit_gzhd from "src/modules/nurseFiles/view/nurseFiles-gzhd/views/nurseAudit/NurseAudit";
import NurseAudit_wh from "src/modules/nurseFiles/view/nurseFiles-wh/views/nurseAudit/NurseAudit";
import NurseAudit_jmfy from "src/modules/nurseFiles/view/nurseFiles-jmfy/views/nurseAudit/NurseAudit";
import NurseHandBookAudit_jmfy from "src/modules/nurseFiles/view/nurseFiles-jmfy/views/nurseHandBookAudit/NurseHandBookAudit";
import NurseAuditNew from "src/modules/auditNurseFileNew/NurseAudit";
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
import NurseFileDetailView_jmfy
  from "src/modules/nurseFiles/view/nurseFiles-jmfy/views/nurseFileDetail/NurseFileDetailView";
import NurseFileDetailView_dghl
  from "src/modules/nurseFiles/view/nurseFiles-dghl/views/nurseFileDetail/NurseFileDetailView";
import NurseFileDetailView_dgxg
  from "src/modules/nurseFiles/view/nurseFiles-dgxg/views/nurseFileDetail/NurseFileDetailView";
import NurseFileDetailView_yczyy
  from "src/modules/nurseFiles/view/nurseFiles-yczyy/views/nurseFileDetail/NurseFileDetailView";
import NurseFileDetailView_nfzxy
  from "src/modules/nurseFiles/view/nurseFiles-nfzxy/views/nurseFileDetail/NurseFileDetailView";
import NurseFileDetailView_xzsn
  from "src/modules/nurseFiles/view/nurseFiles-xzsn/views/nurseFileDetail/NurseFileDetailView";
import NurseFileDetailView_fqfybjy
  from "src/modules/nurseFiles/view/nurseFiles-fqfybjy/views/nurseFileDetail/NurseFileDetailView";
import NurseFileDetailView_wjgdszd from "src/modules/nurseFiles/view/nurseFiles-wjgdszd/views/nurseFileDetail/NurseFileDetailView";

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

/**单点登录 */
const SingleSignOnWh = lazy(() => import("src/modules/SingleSignOn/wh/SingleSignOnWh"))

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
} else if (process.env.REACT_APP_HOSPITAL_ID == "wh" || appStore.HOSPITAL_ID == 'gxjb' || appStore.HOSPITAL_ID == 'fssdy' || appStore.HOSPITAL_ID == 'fsxt') {
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
    setLayout("/wh_single_point_login", SingleSignOnWh),
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
    setLayout("/indicator/:name", IndicatorNew, layouts.MainLayout),//敏感指标
    setLayout("/indicator", IndicatorNew, layouts.MainLayout),
    setLayout("/nurseAudit", NurseAuditNew, layouts.MainLayout),
    setLayout(
      "/nurseFileDetail/:type",
      NurseFileDetailView_lcey,
      layouts.MainLayout
    ),
    // 新版审核管理
    setLayout("/auditsManagement", AuditsManagementNewView, layouts.MainLayout),
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
    setLayout("/indicator/:name", IndicatorNew, layouts.MainLayout),//南医三版本敏感指标
    setLayout("/indicator", IndicatorNew, layouts.MainLayout),
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
    setLayout("/indicator/:name", IndicatorNew, layouts.MainLayout),
    setLayout("/indicator", IndicatorNew, layouts.MainLayout),
    // setLayout('/nurseFilesList', NurseFilesListView, layouts.MainLayout),
    setLayout("/nurseAudit", NurseAudit_jmfy, layouts.MainLayout),
    setLayout("/auditsManagementNurseHandBook", NurseHandBookAudit_jmfy, layouts.MainLayout),
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
    // 新版审核界面
    setLayout("/nurseAudit", NurseAuditNew, layouts.MainLayout),
    setLayout(
      "/nurseFileDetail/:type",
      NurseFileDetailView_dghl,
      layouts.MainLayout
    ),
    // 新版审核管理
    setLayout("/auditsManagement", AuditsManagementNewView, layouts.MainLayout),
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
} else if (appStore.HOSPITAL_ID == 'dgxg') {
  specialModule = [
    // 新版审核界面
    setLayout("/nurseAudit", NurseAuditNew, layouts.MainLayout),
    setLayout(
      "/nurseFileDetail/:type",
      NurseFileDetailView_dgxg,
      layouts.MainLayout
    ),
    // 新版审核管理
    setLayout("/auditsManagement", AuditsManagementNewView, layouts.MainLayout),
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
} else if (appStore.HOSPITAL_ID == 'yczyy') {
  specialModule = [
    // 新版审核界面
    setLayout("/nurseAudit", NurseAuditNew, layouts.MainLayout),
    setLayout(
      "/nurseFileDetail/:type",
      NurseFileDetailView_yczyy,
      layouts.MainLayout
    ),
    // 新版审核管理
    setLayout("/auditsManagement", AuditsManagementNewView, layouts.MainLayout),
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
} else if (appStore.HOSPITAL_ID == 'nfzxy') {
  specialModule = [
    // 新版审核界面
    setLayout("/nurseAudit", NurseAuditNew, layouts.MainLayout),
    setLayout(
      "/nurseFileDetail/:type",
      NurseFileDetailView_nfzxy,
      layouts.MainLayout
    ),
    // 新版审核管理
    setLayout("/auditsManagement", AuditsManagementNewView, layouts.MainLayout),
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
  ]
} else if (appStore.HOSPITAL_ID == 'xzsn') {
  specialModule = [
    ...homeRouter(HomeView),
    setLayout(
      "/nurseFileDetail/:type",
      NurseFileDetailView_xzsn,
      layouts.MainLayout
    ),
    // 新版审核界面
    setLayout("/nurseAudit", NurseAuditNew, layouts.MainLayout),
    // 新版审核管理
    setLayout("/auditsManagement", AuditsManagementNewView, layouts.MainLayout),
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
  ]
} else if (appStore.HOSPITAL_ID == 'fqfybjy') {
  specialModule = [
    // 新版敏感指标
    setLayout("/indicator/:name", IndicatorNew, layouts.MainLayout),
    setLayout("/indicator", IndicatorNew, layouts.MainLayout),
    // 新版审核界面
    setLayout("/nurseAudit", NurseAuditNew, layouts.MainLayout),
    setLayout(
      "/nurseFileDetail/:type",
      NurseFileDetailView_fqfybjy,
      layouts.MainLayout
    ),
    // 新版审核管理
    setLayout("/auditsManagement", AuditsManagementNewView, layouts.MainLayout),
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
} else if (appStore.HOSPITAL_ID == 'wjgdszd') {
  specialModule = [
    // 新版敏感指标
    setLayout("/indicator/:name", IndicatorNew, layouts.MainLayout),
    setLayout("/indicator", IndicatorNew, layouts.MainLayout),
    // 新版审核界面
    setLayout("/nurseAudit", NurseAuditNew, layouts.MainLayout),
    setLayout(
      "/nurseFileDetail/:type",
      NurseFileDetailView_wjgdszd,
      layouts.MainLayout
    ),
    // 新版审核管理
    setLayout("/auditsManagement", AuditsManagementNewView, layouts.MainLayout),
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
} else if (appStore.HOSPITAL_ID == 'bhsrm') {
  specialModule = [...homeRouter(SettingView)]
} else if (appStore.HOSPITAL_ID == 'qzxyy') {
  specialModule = [...homeRouter(SettingView)]
} else if (process.env.REACT_APP_HOSPITAL_ID == "whyx") {//武汉亚心
  specialModule = [
    setLayout("/indicator/:name", IndicatorNew, layouts.MainLayout),
    setLayout("/indicator", IndicatorNew, layouts.MainLayout),
    setLayout("/nurseAudit", NurseAudit, layouts.MainLayout),
    setLayout(
      "/selfNurseFile/:type",
      NurseFileDetailView_wh,
      layouts.MainLayout
    ),
    setLayout(
      "/nurseFileDetail/:type",
      NurseFileDetailView,
      layouts.MainLayout
    ),
    setLayout("/auditsManagement", AuditsManagementView_wh, layouts.MainLayout),//武汉版本审核管理
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
// else if (process.env.REACT_APP_HOSPITAL_ID == "fssdy") {
//   specialModule = [
//     // setLayout('/nurseFilesList', NurseFilesListView_wh, layouts.MainLayout),
//     setLayout("/nurseAudit", NurseAudit_wh, layouts.MainLayout),
//     setLayout(
//       "/nurseFileDetail/:type",
//       NurseFileDetailView_wh,
//       layouts.MainLayout
//     ),
//     setLayout(
//       "/selfNurseFile/:type",
//       NurseFileDetailView_wh,
//       layouts.MainLayout
//     ),
//     setLayout("/auditsManagement", AuditsManagementView_wh, layouts.MainLayout),
//     setLayout("/wh_single_point_login", SingleSignOnWh),
//     ...homeRouter(HomeView_wh),
//   ];

//   //武汉护理制度
//   specialModule = specialModule.concat([
//     setLayout("/nursingRulesNew", NursingRulesNew_wh, layouts.MainLayout),
//     setLayout(
//       "/nursingRulesNewDetail",
//       NursingRulesNewDetail_wh,
//       layouts.MainLayout
//     ),
//     setLayout(
//       "/NursingRulesPagePreView",
//       NursingRulesPagePreview_wh,
//       layouts.MainLayout
//     ),
//     setLayout(
//       "/nursingRulesNewEdit",
//       NursingRulesNewEdit_wh,
//       layouts.MainLayout
//     )
//   ]);
// }

export { specialModule };
