import { observable, computed, action } from 'mobx'
import React from 'react'

import createModal from 'src/libs/createModal'
import BaseModal from './components/base/BaseModal'

import { sectionList } from './config/sectionList'

import { checkWardReportService } from './services/CheckWardReportService'
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

class CheckWardReportViewModal {
  @observable baseModal: ModalCase | null = null
  @observable public sectionList: SectionListItem[] = sectionList
  @observable public allData: Partial<AllData> = {
    report: {}
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
  async initData() {
    let { data } = await checkWardReportService.getReport()
    this.allData = data
    this.getSectionData(`报告名称`).text = this.allData.report!.reportName || {}
    this.getSectionData(`上月质量问题`).list = this.allData!.lastImproveItemList || []
    this.getSectionData(`2-1`).report = this.allData!.report || {}
    this.getSectionData(`本月质量检查扣分情况`).report = this.allData!.report || {}
    this.getSectionData(`质量扣分比较`).list = (this.allData!.typeCompareList || []).map((item: any) => {
      return Object.assign(item, {
        currentDeductScore: Number((item.currentDeductScore || 0).toFixed(2)),
        lastDeductScore: Number((item.lastDeductScore || 0).toFixed(2)),
        compareScore: Number(item.compareScore.toFixed(2)),
        compareScorePercent: Number(item.compareScorePercent.toFixed(2))
      })
    })
    this.getSectionData(`本月质量扣分科室排序`).list = (this.allData!.deptItemList || []).map((item: DeptItem) => {
      return Object.assign(item, {
        deductScore: Number(Number(item.deductScore).toFixed(2))
      })
    })
    this.getSectionData(`本月主要质量问题`).list = (this.allData!.detailItemList || []).map((item: any) => {
      return Object.assign(item, {
        totalDeductScore: Number(Number(item.totalDeductScore).toFixed(2))
      })
    })
    this.getSectionData(`本月质量检查亮点`).list = this.allData!.highlightItemList || []
    this.getSectionData(`重点问题`).list = this.allData!.keyItemList || []
    this.getSectionData(`持续改进`).list = this.allData!.currentImproveItemList || []
    this.getSectionData(`追踪督导`).report = data!.report || {}
    this.getSectionData(`检查重点`).report = data!.report || {}
    this.getSectionData(`问题及建议`).report = data!.report || {}
  }
  async init() {
    await this.initData()
    this.baseModal = createModal(BaseModal)
  }
}

export const checkWardReportViewModal = new CheckWardReportViewModal()
