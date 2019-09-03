import { observable, computed, action } from 'mobx'
import { sheetViewModal } from '../viewModal/SheetViewModal'

/** 用于存放筛选条件等基础数据 */
class SelectViewModal {
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
    setTimeout(() => {
      if (
        this.params.startTime &&
        this.params.endTime &&
        this.params.deptCode
        //  && this.params.group
      ) {
        sheetViewModal.getSheetTableData()
      }
    }, 100)
  }
}

export const selectViewModal = new SelectViewModal()
