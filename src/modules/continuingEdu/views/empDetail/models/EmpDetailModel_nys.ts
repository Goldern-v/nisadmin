import { action, observable, computed } from 'mobx'
import { appStore } from 'src/stores'
import { empManageService } from '../api/EmpManageService'
import moment from 'moment'
import { message } from 'antd'

class EmpDetailModel {
  defaultQuery = {
    type: '',
    startDate: ``,
    endDate: ``,
    pageIndex: 1,
    pageSize: 20,
  }

  @observable query = { ...this.defaultQuery } as any
  @observable tableData = [] as any[]
  // @observable baseInfo = {
  //   sumText: ''
  // }
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
      pageSize: 20,
    }

    this.setQuery(newQuery)
  }

  @computed get pannelName() {
    return appStore.match.params?.pannelName || appStore.match.params?.type || '' as string
  }

  @action public setQuery(newQuery: any, needData?: boolean, callback?: Function) {
    this.query = { ...newQuery }

    if (needData) this.getTabelData(callback)
  }

  public getTabelData(callback?: Function) {
    this.creditsDesc = ''
    this.classHoursDesc = ''
    let pannelName: string = this.pannelName
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
        reqMethod =
          empManageService
            .queryCreditRecordPageList({
              ...params,
              creditType: type,
            })

        empManageService
          .countCreditByParams({
            ...params,
            creditType: type,
          }).then(res => {
            // this.creditsDesc = `合计： 
            // 院级学分：${res.data.hospitalCreditTotal || 0}分    
            // 片区学分：${res.data.areaCreditTotal || 0}分    
            // 病区学分：${res.data.deptCreditTotal || 0}分
            // `
            this.creditsDesc = `合计：${(res.data || []).map((item: any) => {
              return `${item.creditName}：${item.totalCredit}`
            }).join('    ')}`
          })
        break
      case '学时记录':
        reqMethod =
          empManageService
            .queryClassHourRecordPageList({
              ...params,
              teachingMethod: type,
            })

        empManageService
          .countClassHoursByParams({
            ...params,
            teachingMethod: type,
          }).then(res => {
            this.classHoursDesc = `合计： ${res.data.totalClassHours || 0}`
          })
        break
      case '学习记录':
        reqMethod =
          empManageService
            .queryStudyRecordPageList({
              ...params,
              firstLevelMenuId: type,
            })
        break
      case '培训记录':
        reqMethod =
          empManageService
            .queryTrainRecordPageList({
              ...params,
              firstLevelMenuId: type,
            })
        break
      case '考试记录':
        reqMethod =
          empManageService
            .queryExamRecordPageList({
              ...params,
              firstLevelMenuId: type,
            })
        break
      case '练习记录':
        reqMethod =
          empManageService
            .queryExerciseRecordPageList({
              ...params,
              firstLevelMenuId: type,
            })
        break
      case '实操记录':
        reqMethod =
          empManageService
            .queryPractiseRecordPageList({
              ...params,
              firstLevelMenuId: type,
            })
        break
      case '演练记录':
        reqMethod =
          empManageService
            .queryWtRecordPageList({
              ...params,
              firstLevelMenuId: type,
            })
        break
      case '实践记录':
        reqMethod =
          empManageService
            .querySocialPractiseRecordPageList({
              ...params,
              firstLevelMenuId: type,
            })
        break
      case '讲课记录':
        reqMethod = empManageService.
          queryTeachingRecordPageList({
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
        this.tableData = this.formatTableList(res.data.list)
        this.dataTotal = res.data.totalCount || 0
      }
      callback && callback(res.data)
    }, err => this.loading = false)
  }

  private formatTableList(originList: any[]): any[] {
    let fommatedList = [] as any[]
    if (this.pannelName === '考试记录') {
      fommatedList = originList.map((item: any) => ({
        ...item,
        editing: false,
        modified: false,
      }))
    } else {
      fommatedList = [...originList] || []
    }
    return fommatedList
  }

  public handleTableRowChange = (newRecord: any, idx: number) => {
    this.tableData[idx] = newRecord
  }

  public handleSaveTableRow = (saveRecord: any, idx: number) => {
    if (!saveRecord.modified) return

    empManageService.updateExamRecordOther({
      cetpId: saveRecord.cetpId,
      empNo: appStore.queryObj.empNo,
      other: saveRecord.other,
    })
      .then(res => {
        message.success('修改成功')
        this.handleTableRowChange({
          ...saveRecord,
          modified: false,
          editing: false,
        }, idx)
      })
  }
}

export const empDetailModel = new EmpDetailModel()