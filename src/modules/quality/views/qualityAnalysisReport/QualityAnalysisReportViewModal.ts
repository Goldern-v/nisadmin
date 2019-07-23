import { observable, computed, action } from 'mobx'
import React from 'react'

import createModal from 'src/libs/createModal'
import BaseModal from './components/base/BaseModal'

import { sectionList } from './config/sectionList'

import { qualityAnalysisReportService } from './services/QualityAnalysisReportService'
import { AllData, DeptItem, DetailItem } from './types'

export interface SectionListItem {
  sectionId?: string

  sectionTitle?: string | undefined
  modalTitle?: string | undefined
  data?: any
  modal?: any
  section?: any
  modalWidth?: any
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
}

class QualityAnalysisReportViewModal {
  @observable baseModal: ModalCase | null = null
  @observable public sectionList: SectionListItem[] = sectionList
  @observable public allData: Partial<AllData> = {}

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

  /** 数据初始化 */
  async initData() {
    let { data } = await qualityAnalysisReportService.getReport()
    this.allData = data
    this.sectionList[0].data.text = this.allData.report!.reportName || {}
    this.sectionList[2].data.list = this.allData!.lastImproveItemList || []
    this.sectionList[5].data.list = (this.allData!.typeCompareList || []).map((item: any) => {
      return Object.assign(item, {
        currentDeductScore: Number(item.currentDeductScore.toFixed(1)),
        lastDeductScore: Number(item.lastDeductScore.toFixed(1))
      })
    })
    this.sectionList[6].data.list = (this.allData!.deptItemList || []).map((item: DeptItem) => {
      return Object.assign(item, {
        deductScore: Number(Number(item.deductScore).toFixed(1))
      })
    })
    this.sectionList[7].data.list = (this.allData!.detailItemList || []).map((item: any) => {
      return Object.assign(item, {
        totalDeductScore: Number(Number(item.totalDeductScore).toFixed(1))
      })
    })
    this.sectionList[8].data.list = (this.allData!.highlightItemList || []).map((item: any) => {
      return Object.assign(item, {
        totalDeductScore: Number(Number(item.totalDeductScore).toFixed(1))
      })
    })
    this.sectionList[9].data.list = (this.allData!.keyItemList || []).map((item: any) => {
      return Object.assign(item, {
        totalDeductScore: Number(Number(item.totalDeductScore).toFixed(1))
      })
    })
    this.sectionList[10].data.list = this.allData!.currentImproveItemList || []
  }
  async init() {
    await this.initData()
    this.baseModal = createModal(BaseModal)
  }
}

export const qualityAnalysisReportViewModal = new QualityAnalysisReportViewModal()
