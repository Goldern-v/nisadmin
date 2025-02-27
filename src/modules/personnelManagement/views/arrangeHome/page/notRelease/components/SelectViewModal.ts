import { observable, computed, action } from 'mobx'
import { sheetViewModal } from '../../../viewModal/SheetViewModal'
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
      sheetViewModal.getData()
    }, 100)
  }
}

export const notSelectViewModal = new SelectViewModal()
