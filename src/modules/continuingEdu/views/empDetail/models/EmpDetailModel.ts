import { action, observable, computed } from 'mobx'
import { appStore } from 'src/stores'
import moment from 'moment'

class EmpDetailModel {
  defaultQuery = {
    type: '',
    startDate: '',
    endDate: '',
    pageIndex: 1,
    pageSize: 15,
  }

  @observable query = { ...this.defaultQuery } as any
  @observable tableData = [] as any[]
  @observable baseInfo = {
    sumText: ''
  }
  @observable loading = false
  @observable dataTotal = 0

  @action public init() {
    let newQuery = {
      startDate: `${moment().format('YYYY')}-01-01`,
      endDate: `${moment().format('YYYY')}-12-31`,
      type: '',
      pageIndex: 1,
      pageSize: 15,
    }

    this.setQuery(newQuery)
  }

  @action public setQuery(newQuery: any, needData?: boolean) {
    this.query = { ...newQuery }

    if (needData) this.getTabelData()
  }

  public getTabelData(callback?: Function) {
    console.log(appStore.match.params?.pannelName || '')
    callback && callback()
  }

  @action getBaseInfo() {

  }
}

export const empDetailModel = new EmpDetailModel()