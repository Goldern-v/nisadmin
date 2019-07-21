import { observable, computed, action, reaction } from 'mobx'
import { qualityControlRecordApi, NurseQuery } from './api/QualityControlRecordApi'
import { authStore } from 'src/stores'
import moment from 'moment'

class QualityControlRecordVM {
  @observable public formSelectCode = ''
  @observable public formSelectList: any = []
  @observable public stateSelectCode = ''
  @observable public stateSelectList: any = []
  @observable public deptName = ''

  /** 筛选条件 */
  @observable public filterDate: any = [moment(moment().format('YYYY-MM') + '-01'), moment()]
  @observable public filterForm: any = ''
  @observable public filterState: any = ''

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
      formSelectList[0].name = ''
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
      formSelectList[0].name = ''
    }
    return formSelectList[0].name
  }

  init() {
    this.filterDate = [moment(moment().format('YYYY-MM') + '-01'), moment()]
    this.filterForm = ''
    this.filterState = ''
  }
}

export const qualityControlRecordVM = new QualityControlRecordVM()
