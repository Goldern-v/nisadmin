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
  @observable public pageLoading: boolean = false
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
    this.pageLoading = true
    let { data } = await qualityAnalysisReportService.getReport()
    this.pageLoading = false
    this.allData = data
    this.getSectionData(`报告名称`).text = this.allData.instance!.title || ''
    this.getSectionData(`数据概况`).obj = this.allData.overview || {}
    this.getSectionData(`数据分析`).list = this.allData.graphs || []
    this.getSectionData(`数据统计`).list = this.allData.barChart || []
    this.getSectionData(`月度趋势`).list = this.allData.trendMap || []
    this.getSectionData(`科室排名`).list = this.allData.deptTopTenId || []
    this.getSectionData(`护士排名`).list = this.allData.empTopTenId || []
  }
  async init() {
    await this.initData()
    this.baseModal = createModal(BaseModal)
  }
}

export const qualityAnalysisReportViewModal = new QualityAnalysisReportViewModal()
