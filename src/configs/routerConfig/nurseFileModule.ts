import { setLayout } from 'src/utils/route/route-utils'
import layouts from 'src/layouts'

import NurseFilesListView from 'src/modules/nurseFiles/views/nurseFilesList/NurseFilesListView'
import NurseAudit from 'src/modules/nurseFiles/views/nurseAudit/NurseAudit'
import NurseFileDetailView from 'src/modules/nurseFiles/views/nurseFileDetail/NurseFileDetailView'
import AuditsManagementView from 'src/modules/auditsManagement/AuditsManagementView'
/**武汉 */
import NurseFilesListView_wh from 'src/modules/nurseFiles-wh/views/nurseFilesList/NurseFilesListView'
import NurseAudit_wh from 'src/modules/nurseFiles-wh/views/nurseAudit/NurseAudit'
import NurseFileDetailView_wh from 'src/modules/nurseFiles-wh/views/nurseFileDetail/NurseFileDetailView'
import AuditsManagementView_wh from 'src/modules/auditsManagement-wh/AuditsManagementView'

let nurseFileModule: any[] = []

if (process.env.REACT_APP_HOSPITAL_ID == 'hj') {
  nurseFileModule = [
    setLayout('/nurseFilesList', NurseFilesListView, layouts.MainLayout),
    setLayout('/nurseAudit', NurseAudit, layouts.MainLayout),
    setLayout('/nurseFileDetail/:type', NurseFileDetailView, layouts.MainLayout),
    setLayout('/auditsManagement', AuditsManagementView, layouts.MainLayout)
  ]
} else if (process.env.REACT_APP_HOSPITAL_ID == 'wh') {
  nurseFileModule = [
    setLayout('/nurseFilesList', NurseFilesListView_wh, layouts.MainLayout),
    setLayout('/nurseAudit', NurseAudit_wh, layouts.MainLayout),
    setLayout('/nurseFileDetail/:type', NurseFileDetailView_wh, layouts.MainLayout),
    setLayout('/auditsManagement', AuditsManagementView_wh, layouts.MainLayout)
  ]
} else {
  nurseFileModule = [
    setLayout('/nurseFilesList', NurseFilesListView, layouts.MainLayout),
    setLayout('/nurseAudit', NurseAudit, layouts.MainLayout),
    setLayout('/nurseFileDetail/:type', NurseFileDetailView, layouts.MainLayout),
    setLayout('/auditsManagement', AuditsManagementView, layouts.MainLayout)
  ]
}

export { nurseFileModule }
