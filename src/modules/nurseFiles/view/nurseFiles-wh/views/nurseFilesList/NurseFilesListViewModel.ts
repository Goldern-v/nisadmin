import { appStore } from 'src/stores/index'
import { observable, computed, action, reaction } from 'mobx'
import { nurseFilesService, NurseQuery } from '../../services/NurseFilesService'
import { authStore } from 'src/stores'
import { DictItem } from 'src/services/api/CommonApiService'
import { reverseKeyValue } from 'src/utils/object/object'
import service from 'src/services/api'
import { statisticsViewModal } from '../../../statistics/StatisticsViewModal'
import { fileDownload } from 'src/utils/file/file'
import { message } from 'src/vendors/antd'

class NurseFilesListViewModel {
  /** 筛选条件 */
  @observable public pageIndex: number = 1
  @observable public pageSize: number = 20
  @observable public totalCount: number = 0
  @observable public listSpinning: boolean = false
  @observable public nurseList: any = []

  /** 搜索条件 */
  @observable public postObj: any = {}
  /**字典对象 */
  @observable public dict: { [P: string]: DictItem[] } = {}
  @action
  public loadNursingList = () => {
    this.listSpinning = true
    nurseFilesService
      .getByFormCodePC({
        ...this.postObj,
        // ...{ deptCode: statisticsViewModal.selectedDeptCode },
        ...{
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
          totalCount: this.totalCount
        }
      })
      .then((res) => {
        this.pageIndex = res.data.pageIndex
        this.totalCount = res.data.totalCount
        this.nurseList = res.data.list
        this.listSpinning = false
      })
  }

  exportExcel() {
    // appStore.openFullLoadingBar({
    //   aside: '正在下载',
    //   duration: 10000
    // })
    nurseFilesService
      .countExcel({
        ...this.postObj,
        // ...{ deptCode: statisticsViewModal.selectedDeptCode },
        ...{
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
          totalCount: this.totalCount
        }
      })
      .then((res) => {
        // appStore.closeFullLoadingBar()
        fileDownload(res)
      })
  }
  init() {
    return statisticsViewModal.init()
  }
}

export const nurseFilesListViewModel = new NurseFilesListViewModel()
