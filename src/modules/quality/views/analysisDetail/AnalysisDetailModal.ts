import { sectionList } from './../../../badEventsNew/views/BadEventReport/config/sectionList';
import { appStore } from 'src/stores';
import { observable, computed, action } from 'mobx'
import React from 'react'

import createModal from 'src/libs/createModal'
import BaseModal from './components/base/BaseModal'

import { sectionList as sectionList1Dept } from './config/sectionList1_dept'
import { sectionList as sectionList1Em } from './config/sectionList1_em'
import { sectionList as sectionList2 } from './config/sectionList2'
import { obj as obj1Dept } from './config/callback/callback1_dept'
import { obj as obj1Em } from './config/callback/callback1_em'
import { obj as obj2 } from './config/callback/callback2'
import { analysisDetailApi } from './api'
import { AllData, DeptItem, DetailItem } from './types'
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

export class AnalysisDetailModal {
  @observable baseModal: ModalCase | null = null
  @observable public sectionList: SectionListItem[] = []
  @observable public allData: Partial<AllData> = {
    report: {}
  }
  private formatData: Function = () => {}
  private getData: Function = () => {}

  constructor({
    sectionList,
    formatData,
    getData
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
      return true
    } else {
      return false
    }
  }

  /** 提取总数据 */
  getDataInAllData(key: string) {
    return this.allData[key] || {}
  }

  get report() {
    return this.getDataInAllData('report') || {}
  }

  /** 数据初始化 */
  initData() {
    // 实例化并使用bind绑定数据
    // let { data } = await this.getData()
    let data = this.getData()
    this.allData = data
    // 拼接数据
    this.formatData()
  }
  init() {
    this.initData()
    this.baseModal = createModal(BaseModal)
  }
}
// 根据不同的列表进行实例化

// 病区
export const analysisDetailModal1Dept = new AnalysisDetailModal({ sectionList: sectionList1Dept, ...obj1Dept})
// 急诊
export const analysisDetailModal1Em = new AnalysisDetailModal({ sectionList: sectionList1Em, ...obj1Em})
// 二级
export const analysisDetailModal2 = new AnalysisDetailModal({ sectionList: sectionList2, ...obj2})

export const getModal = ()=> {
  const queryObj = appStore.queryObj
  // level=1&deptName=病区
  if (queryObj?.level == '2') {
    return analysisDetailModal2
  }
  if (queryObj?.level == '1' && queryObj.deptName == '急诊') return analysisDetailModal1Em
  return analysisDetailModal1Dept
}