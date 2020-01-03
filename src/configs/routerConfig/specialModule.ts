import { setLayout } from "src/utils/route/route-utils";
import layouts from "src/layouts";
import React, { lazy } from "react";
import { appStore } from "src/stores";

// import NurseFilesListView from 'src/modules/nurseFiles/views/nurseFilesList/NurseFilesListView'

// import AuditsManagementView from 'src/modules/auditsManagement/AuditsManagementView'
// /**武汉 */
// import NurseFilesListView_wh from 'src/modules/nurseFiles-wh/views/nurseFilesList/NurseFilesListView'

import AuditsManagementView_wh from "src/modules/auditsManagement-wh/AuditsManagementView";
import HomeView from "src/modules/home/HomeView";
import HomeView_wh from "src/modules/home-wh/HomeView";
import AuditsManagementView from "src/modules/auditsManagement/AuditsManagementView";
import NurseAudit from "src/modules/nurseFiles/view/nurseFiles-hj/views/nurseAudit/NurseAudit";
import NurseAudit_wh from "src/modules/nurseFiles/view/nurseFiles-wh/views/nurseAudit/NurseAudit";
import NurseFileDetailView from "src/modules/nurseFiles/view/nurseFiles-hj/views/nurseFileDetail/NurseFileDetailView";
import NurseFileDetailView_wh from "src/modules/nurseFiles/view/nurseFiles-wh/views/nurseFileDetail/NurseFileDetailView";

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

let specialModule: any[] = [];

if (
  process.env.REACT_APP_HOSPITAL_ID == "hj" ||
  process.env.REACT_APP_HOSPITAL_ID == "ys"
) {
  specialModule = [
    // setLayout('/nurseFilesList', NurseFilesListView, layouts.MainLayout),
    setLayout("/nurseAudit", NurseAudit, layouts.MainLayout),
    setLayout(
      "/nurseFileDetail/:type",
      NurseFileDetailView,
      layouts.MainLayout
    ),
    setLayout("/auditsManagement", AuditsManagementView, layouts.MainLayout),
    setLayout("/home", HomeView, layouts.MainLayout),
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
    setLayout("/home", HomeView_wh, layouts.MainLayout)
  ];

  //武汉护理制度
  if (appStore.isDev) {
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
  } else {
    specialModule = specialModule.concat([
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
    ]);
  }
}

export { specialModule };
