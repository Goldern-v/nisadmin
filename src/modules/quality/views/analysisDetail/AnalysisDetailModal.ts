import { authStore } from './../../../../stores/index';
import { observer } from 'mobx-react-lite';
import { appStore } from 'src/stores';
import { observable, computed, action } from 'mobx'
import React from 'react'
const queryObj = appStore.queryObj

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
  keyName?: string
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
}

interface Constr {
  sectionList: SectionListItem[]
  formatData: Function
  getData: Function
}
interface ReportFieldData {
  reportId: number,
  tableName?: string,
  data?: any
}
export class AnalysisDetailModal {
  @observable baseModal: ModalCase | null = null
  @observable public sectionList: SectionListItem[] = []
  @observable public allData: Partial<AllData> = {
    report: {}
  }
  private formatData: Function = () => { }
  private getData: Function = () => { }

  constructor({
    sectionList,
    formatData,
    getData,
  }: Constr) {
    this.sectionList = sectionList
    this.formatData = formatData.bind(this)
    this.getData = getData
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
  setSectionData(sectionId: string, data: any) {
    let obj = this.getSection(sectionId)
    if (obj) {
      Object.assign(obj.data, data)
      //保存数据
      if (obj.data.value) {
        const saveData: ReportFieldData = {
          reportId: queryObj.id,
          data: obj.data.value
        }
        this.saveReportFieldData(saveData)
      }
      if (obj.data.list) {
        const saveData: ReportFieldData = {
          reportId: queryObj.id,
          tableName: obj.data.tableName || '',
          data: obj.data.list
        }
        this.saveReportTableData(saveData)
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

  @observable private queryObj: any = appStore.queryObj

  /**路由路径 */
  @computed
  get routePath() {
    let { id, level, type } = this.queryObj
    if (level == 1) return '/qcOneWhyx/analysis?level=1'
    if (level == 2) return '/qcTwo/analysis?level=2'
    return ''
  }

  // 审核权限
  public get checkRole() {
    let { level } = this.queryObj
    if (level == 1) return authStore.level2Watch
    return authStore.level3Check
  }

  /** 数据初始化 */
  initData() {
    // 实例化并使用bind绑定数据
    this.allData = this.getData()
    analysisDetailApi.getPageDetaile(1).then((res) => {
      console.log('接口数据======》', res.data)
      if (res.code == 200) {
        let { fieldDataMap } = res.data
        let {
          createTime,
          creatorName,
          creatorNo,
          publisherName,
          status,
          reportName,
          updateTime
        } = res.data
        this.allData.fieldData = { ...this.allData.fieldData, ...fieldDataMap }
        this.allData.pageInfo = {
          createTime,
          creatorName,
          creatorNo,
          publisherName,
          status,
          reportName,
          updateTime
        }
        this.formatData()
      }
    })
  }
  init() {
    this.initData()
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
  if (queryObj?.level == '1' && queryObj.deptName == '急诊') return analysisDetailModal1Em
  return analysisDetailModal1Dept
}