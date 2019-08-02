import { setLayout } from 'src/utils/route/route-utils'
import layouts from 'src/layouts'

// import NurseFilesListView from 'src/modules/nurseFiles/views/nurseFilesList/NurseFilesListView'
// import NurseAudit from 'src/modules/nurseFiles/views/nurseAudit/NurseAudit'

// import AuditsManagementView from 'src/modules/auditsManagement/AuditsManagementView'
// /**武汉 */
// import NurseFilesListView_wh from 'src/modules/nurseFiles-wh/views/nurseFilesList/NurseFilesListView'
// import NurseAudit_wh from 'src/modules/nurseFiles-wh/views/nurseAudit/NurseAudit'

import AuditsManagementView_wh from 'src/modules/auditsManagement-wh/AuditsManagementView'
import HomeView from 'src/modules/home/HomeView'
import HomeView_wh from 'src/modules/home-wh/HomeView'
import AuditsManagementView from 'src/modules/auditsManagement/AuditsManagementView'
import NurseFileDetailView from 'src/modules/nurseFiles/view/nurseFiles-hj/views/nurseFileDetail/NurseFileDetailView'
import NurseFileDetailView_wh from 'src/modules/nurseFiles/view/nurseFiles-wh/views/nurseFileDetail/NurseFileDetailView'

let specialModule: any[] = []

if (process.env.REACT_APP_HOSPITAL_ID == 'hj') {
  specialModule = [
    // setLayout('/nurseFilesList', NurseFilesListView, layouts.MainLayout),
    // setLayout('/nurseAudit', NurseAudit, layouts.MainLayout),
    setLayout('/nurseFileDetail/:type', NurseFileDetailView, layouts.MainLayout),
    setLayout('/auditsManagement', AuditsManagementView, layouts.MainLayout),
    setLayout('/home', HomeView, layouts.MainLayout)
  ]
} else if (process.env.REACT_APP_HOSPITAL_ID == 'wh') {
  specialModule = [
    // setLayout('/nurseFilesList', NurseFilesListView_wh, layouts.MainLayout),
    // setLayout('/nurseAudit', NurseAudit_wh, layouts.MainLayout),
    setLayout('/nurseFileDetail/:type', NurseFileDetailView_wh, layouts.MainLayout),
    setLayout('/auditsManagement', AuditsManagementView_wh, layouts.MainLayout),
    setLayout('/home', HomeView_wh, layouts.MainLayout)
  ]
}

export { specialModule }
