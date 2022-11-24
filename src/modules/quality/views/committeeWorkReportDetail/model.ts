import createModal from 'src/libs/createModal'
import { appStore } from 'src/stores'
import { action, computed, observable } from 'mobx'

import BaseModal from './components/base/BaseModal'
import { analysisDetailApi } from '../analysisDetail/api'
import { AllData } from './types'

export interface SectionListItem extends Record<string, any> {
  sectionId?: string

  sectionTitle?: string | undefined
  modalTitle?: string | undefined
  data?: any
  modal?: any
  section?: any
  modalWidth?: any
  onSave?: Function
  keyName?: string,
}
interface ModalCase {
  show: (...arr: any) => void
  hide(): void
  Component: any
}

interface SectionCase {
  sectionId?: string
  sectionTitle?: string
  modalTitle?: string
  modalWidth?: any
  data?: any
  modal?: any
  section?: any
  keyName?: string
  maxLength?: number
}

interface Constr {
  sectionList: SectionListItem[]
  formatData: Function
  getData: Function
  initRender?: Function
}
interface ReportFieldData {
  reportId: number,
  tableName?: string,
  data?: any
}
export class ReportDetail {
  @observable baseModal: ModalCase | null = null
  @observable public sectionList: SectionListItem[] = []
  @observable public allData: Partial<AllData> = {}
  // 模板数据
  @observable public configData: Record<string, any> = {}
  private formatData: Function = () => { }
  private getData: Function = () => { }
  @observable public initRender: Function = () => { }
  public id: string = ''

  constructor({
    sectionList,
    formatData,
    getData,
    initRender
  }: Constr) {
    this.sectionList = sectionList
    this.formatData = formatData.bind(this)
    this.getData = getData
    initRender && (this.initRender = initRender)
  }

  /** 返回组件实例 */
  @action
  getSection(sectionId: string): SectionCase | null {
    let obj = this.sectionList.find((item) => item.sectionId == sectionId)
    if (obj) {
      return obj
    } else {
      return null
    }
  }

  /** 打开弹窗 */
  @action
  openEditModal(sectionId: string) {
    let obj = this.getSection(sectionId)
    this.baseModal &&
      obj &&
      this.baseModal.show({
        Component: obj.modal,
        sectionData: this.getSection(sectionId)
      })
  }

  /** 获取组件数据 */
  @action
  getSectionData(sectionId: string) {
    let obj = this.getSection(sectionId)
    if (obj) {
      return obj.data
    } else {
      return null
    }
  }
  /** 设置组件数据 */
  @action
  async setSectionData(sectionId: string, data: any, formatFun?: Function) {
    let obj = this.getSection(sectionId)
    if (obj) {
      //保存数据
      try {
        if (obj.data.value) {
          const value = formatFun ? formatFun(data.value) : data.value
          const saveData: ReportFieldData = {
            reportId: appStore.queryObj.id || this.id,
            data: value,
          }
          await this.saveReportFieldData(saveData)
        }
        else if (obj.data.list) {
          const value = formatFun ? formatFun(data.list) : data.list
          const saveData: ReportFieldData = {
            reportId: appStore.queryObj.id || this.id,
            tableName: obj.data.tableName || '',
            data: value,
          }
          await this.saveReportTableData(saveData)
        }
        Object.assign(obj.data, data)
        return true
      } catch (e) {
        return false
      }
    } else {
      return false
    }
  }
  /*设置组件数据 不做请求 */
  @action
  async setStaticSectionData(sectionId: string, data: any) {
    let obj = this.getSection(sectionId)
    if (obj) {
      Object.assign(obj.data, data)
    }
  }
  /** 提取总数据 */
  getDataInAllData(key: string) {
    return this.allData[key] || {}
  }
  /** 保存属性类型报告数据集 */
  saveReportFieldData(data: ReportFieldData) {
    analysisDetailApi.saveReportFieldData(data)
  }

  /**报告表格编辑 */
  saveReportTableData(data: ReportFieldData) {
    analysisDetailApi.saveReportTableData(data)
  }

  get report() {
    return this.getDataInAllData('report') || {}
  }

  /** 数据初始化 */
  async initData() {
    try {
      // 实例化并使用bind绑定数据
      this.allData = this.getData()
      const res = await analysisDetailApi.getPageDetaile(appStore.queryObj.id || this.id)
      console.log('接口数据======》', res.data)
      if (res.code != 200) return
      let { fieldDataMap } = res.data
      let {
        createTime,
        creatorName,
        creatorNo,
        publisherName,
        status,
        reportName,
        reportMonth,
        updateTime,
        tableDataMap,
        reportYear,
        reportTemplateDto,
        summaryFormCode = '',
        summaryFormName = '',
        reportQuarter = '',
      } = res.data
      for (let keys of Object.keys(this.allData)) {
        for (let item of Object.keys(this.allData[keys])) {
          if (fieldDataMap.hasOwnProperty(item)) {
            this.allData[keys][item] = fieldDataMap[item]
          }
        }
      }
      this.allData.pageInfo = {
        createTime,
        creatorName,
        creatorNo,
        publisherName,
        status,
        reportMonth,
        reportYear,
        reportName,
        updateTime,
        summaryFormCode,
        summaryFormName,
        reportQuarter,
        templateName: reportTemplateDto?.name || ''
      }
      this.allData.tableDataMap = tableDataMap
      this.configData = {
        tableTempList: reportTemplateDto?.reportTableFieldTemplateList || ({} as Record<string, any>)
      }
      this.formatData()
    } catch (error) {

    }
  }
  async init(id?: string) {
    if (id) {
      this.id = id
    }
    await this.initData()
    this.baseModal = createModal(BaseModal)
  }
}
