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
  public loadNursingList = () => { //getByFormCodePcNFZXY
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
    if (appStore.fullLoadingBarObj) {
      return message.warning('只能同时下载一个文件')
    }
    appStore.openFullLoadingBar({
      aside: '正在打包数据，请稍候',
      progress: '0%'
    })
    nurseFilesService
      .countExcel(
        {
          ...this.postObj,
          // ...{ deptCode: statisticsViewModal.selectedDeptCode },
          ...{
            pageIndex: this.pageIndex,
            pageSize: this.pageSize,
            totalCount: this.totalCount
          }
        },
        (progressEvent: any) => {
          // console.log(progressEvent, 'progressEvent')
          appStore.openFullLoadingBar({
            aside: '正在下载数据，请稍候',
            progress: `${Number(Math.min(progressEvent.loaded / (progressEvent.total * 10000 || 1), 1) * 100).toFixed(
              0
            )}%`
          })
        }
      )
      .then((res) => {
        appStore.closeFullLoadingBar('下载完成')
        fileDownload(res)
      })
      .catch(() => {
        appStore.closeFullLoadingBarInFail('下载失败')
      })
  }
  init() {
    return statisticsViewModal.init()
  }
}

export const nurseFilesListViewModel = new NurseFilesListViewModel()
