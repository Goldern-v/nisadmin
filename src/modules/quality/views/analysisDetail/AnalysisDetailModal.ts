import { appStore } from 'src/stores';
import { observable, computed, action } from 'mobx'

import createModal from 'src/libs/createModal'
import BaseModal from './components/base/BaseModal'

import { sectionList as sectionList1Dept } from './config/sectionList1_dept'
import { sectionList as sectionList1Em } from './config/sectionList1_em'
import { sectionList as sectionList2 } from './config/sectionList2'
import { obj as obj1Dept } from './config/callback/callback1_dept'
import { obj as obj1Em } from './config/callback/callback1_em'
import { obj as obj2 } from './config/callback/callback2'
import { analysisDetailApi } from './api'
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
  maxLenght?:number,
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
  maxLenght?:number
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
export class AnalysisDetailModal {
  @observable baseModal: ModalCase | null = null
  @observable public sectionList: SectionListItem[] = []
  @observable public allData: Partial<AllData> = {}
  // 模板数据
  @observable public configData: Record<string, any> = {}
  private formatData: Function = () => { }
  private getData: Function = () => { }
  private initRender: Function = () => { }

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
 async setSectionData(sectionId: string, data: any) {
    let obj = this.getSection(sectionId)
    if (obj) {
      Object.assign(obj.data, data)
      //保存数据
      if (obj.data.value) {
        const saveData: ReportFieldData = {
          reportId: appStore.queryObj.id,
          data: obj.data.value
        }
       await this.saveReportFieldData(saveData)
      }
      if (obj.data.list) {
        const saveData: ReportFieldData = {
          reportId: appStore.queryObj.id,
          tableName: obj.data.tableName || '',
          data: obj.data.list
        }
       await this.saveReportTableData(saveData)
      }

      return true
    } else {
      return false
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
      // this.initRender && (await this.initRender())
      // 实例化并使用bind绑定数据
      this.allData = this.getData()
      const res = await analysisDetailApi.getPageDetaile(appStore.queryObj.id)
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
        reportTemplateDto
      } = res.data
      for(let keys of Object.keys(this.allData)){
          for(let item of Object.keys(this.allData[keys])){
       if(fieldDataMap.hasOwnProperty(item)) {
        this.allData[keys][item]=fieldDataMap[item]
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
        updateTime
      }
      this.allData.tableDataMap = tableDataMap
      this.configData = {
        tableTempList: reportTemplateDto?.reportTableFieldTemplateList || ({} as Record<string, any>)
      }
      this.formatData()
    } catch (error) {

    }
  }
  async init() {
    await this.initData()
    this.baseModal = createModal(BaseModal)
  }
}
// 根据不同的列表进行实例化

// 病区
export const analysisDetailModal1Dept = new AnalysisDetailModal({ sectionList: sectionList1Dept, ...obj1Dept })
// 急诊
export const analysisDetailModal1Em = new AnalysisDetailModal({ sectionList: sectionList1Em, ...obj1Em })
// 二级
export const analysisDetailModal2 = new AnalysisDetailModal({ sectionList: sectionList2, ...obj2 })

//url链接数据
export const getModal = () => {
  const queryObj = appStore.queryObj
  // level=1&deptName=病区
  if (queryObj?.level == '2') {
    return analysisDetailModal2
  }
  if (queryObj?.level == '1' && queryObj.deptName && queryObj.deptName.indexOf('急诊') > -1) return analysisDetailModal1Em

  return analysisDetailModal1Dept
}