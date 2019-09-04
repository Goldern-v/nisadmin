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

  @observable public params: any = {
    startTime: null, // 开始时间
    endTime: null, // 截止时间
    deptCode: null, // 科室
    group: null // 分组
  }

  @computed
  public get getParams() {
    return this.params
  }
  @action
  public setParams = (type: any, value: any) => {
    this.params[type] = value

    sessionStorage.arrangeParams = JSON.stringify(this.params)

    timer && clearTimeout(timer)
    timer = setTimeout(() => {
      sheetViewModal.init()
    }, 100)
  }
}

export const selectViewModal = new SelectViewModal()
