import { observable, computed, action } from 'mobx'
import { sheetViewModal } from '../viewModal/SheetViewModal'
let timer: any = null
/** 用于存放筛选条件等基础数据 */
class SelectViewModal {
  constructor() {
    if (!this.params.startTime && sessionStorage.arrangeParams) {
      this.params = JSON.parse(sessionStorage.arrangeParams)
    }
  }

  @observable public params = {
    startTime: '', // 开始时间
    endTime: '', // 截止时间
    // copyStartTime: '', // 贵州复制排班 开始时间
    // copyEndTime: '', // 贵州复制排班截止时间
    copyTime: '', // 贵州复制排班时间
    deptCode: null, // 科室
    group: '', // 分组
    groupList: [] // 分组
  }

  @computed
  public get getParams() {
    return this.params
  }
  @action
  public setParams = (type: any, value: any) => {
    ; (this.params as any)[type] = value

    sessionStorage.arrangeParams = JSON.stringify(this.params)

    timer && clearTimeout(timer)
    timer = setTimeout(() => {
      sheetViewModal.getSheetTableData()
    }, 100)
  }
}

export const selectViewModal = new SelectViewModal()
