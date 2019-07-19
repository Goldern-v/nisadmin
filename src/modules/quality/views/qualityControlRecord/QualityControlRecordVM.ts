import { observable, computed, action, reaction } from 'mobx'
import { qualityControlRecordApi, NurseQuery } from './api/QualityControlRecordApi'
import { authStore } from 'src/stores'

class QualityControlRecordVM {
  @observable public formSelectCode = ''
  @observable public formSelectList: any = []
  @observable public stateSelectCode = ''
  @observable public stateSelectList: any = []
  @observable public deptName = ''
  public constructor() {
    /** 监听 */
    reaction(() => {}, () => {})
  }
  /** 筛选条件 */
  @observable public filterText: string = ''
  @computed
  public get getDefaultName() {
    let formSelectList = [...this.formSelectList]
    if (!formSelectList[0]) {
      formSelectList[0] = {}
    }
    if (!formSelectList[0].name) {
      formSelectList[0].name = '基础护理质量评价表'
    }
    return formSelectList[0].name
  }
  @computed
  public get getDefaultStateName() {
    let formSelectList = [...this.stateSelectList]
    if (!formSelectList[0]) {
      formSelectList[0] = {}
    }
    if (!formSelectList[0].name) {
      formSelectList[0].name = '已提交'
    }
    return formSelectList[0].name
  }
}

export const qualityControlRecordVM = new QualityControlRecordVM()
