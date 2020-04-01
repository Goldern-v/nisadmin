import { action, observable, computed } from 'mobx'
import { appStore } from 'src/stores'
import { empManageService } from './../api/EmpManageService'
import moment from 'moment'

class EmpDetailModel {
  defaultQuery = {
    type: '',
    startDate: ``,
    endDate: ``,
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
  @observable creditsDesc = ''
  @observable classHoursDesc = ''

  @action public init() {
    let newQuery = {
      startDate: ``,
      endDate: ``,
      type: '',
      pageIndex: 1,
      pageSize: 15,
    }

    this.setQuery(newQuery)
  }

  @action public setQuery(newQuery: any, needData?: boolean, callback?: Function) {
    this.query = { ...newQuery }

    if (needData) this.getTabelData(callback)
  }

  public getTabelData(callback?: Function) {
    this.creditsDesc = ''
    this.classHoursDesc = ''
    let pannelName: string = appStore.match.params?.pannelName || ''
    let empNo = appStore.queryObj.empNo

    let { startDate, endDate, type, pageIndex, pageSize } = this.query
    let reqMethod = null
    this.tableData = []
    let params = {
      empNo,
      beginTime: startDate,
      endTime: endDate,
      pageIndex,
      pageSize,
    }
    switch (pannelName) {
      case '学分记录':
        reqMethod = empManageService
          .queryCreditRecordPageList({
            ...params,
            creditType: type,
          })

        empManageService
          .countCreditByParams({
            ...params,
            creditType: type,
          }).then(res => {
            this.creditsDesc = `合计： 
            院级学分：${res.data.hospitalCreditTotal || 0}分    
            片区学分：${res.data.areaCreditTotal || 0}分    
            病区学分：${res.data.deptCreditTotal || 0}分
            `
          })
        break
      case '学时记录':
        reqMethod = empManageService
          .queryClassHourRecordPageList({
            ...params,
            teachingMethod: type,
          })

        empManageService
          .countClassHoursByParams({
            ...params,
            creditType: type,
          }).then(res => {
            this.classHoursDesc = `合计： ${res.data.totalClassHours || 0}`
          })
        break
      case '学习记录':
        reqMethod = empManageService
          .queryStudyRecordPageList({
            ...params,
            firstLevelMenuId: type,
          })
        break
      case '培训记录':
        reqMethod = empManageService
          .queryTrainRecordPageList({
            ...params,
            firstLevelMenuId: type,
          })
        break
      case '考试记录':
        reqMethod = empManageService
          .queryExamRecordPageList({
            ...params,
            firstLevelMenuId: type,
          })
        break
      case '练习记录':
        reqMethod = empManageService
          .queryExerciseRecordPageList({
            ...params,
            firstLevelMenuId: type,
          })
        break
      case '实操记录':
        reqMethod = empManageService
          .queryPractiseRecordPageList({
            ...params,
            firstLevelMenuId: type,
          })
        break
      case '演练记录':
        reqMethod = empManageService
          .queryWtRecordPageList({
            ...params,
            firstLevelMenuId: type,
          })
        break
      default:
        return
    }



    this.loading = true
    reqMethod?.then(res => {
      this.loading = false
      if (res.data) {
        this.tableData = res.data.list || []
        this.dataTotal = res.data.totalCount || 0
      }
      callback && callback(res.data)
    }, err => this.loading = false)
  }

  @action getBaseInfo() {

  }
}

export const empDetailModel = new EmpDetailModel()