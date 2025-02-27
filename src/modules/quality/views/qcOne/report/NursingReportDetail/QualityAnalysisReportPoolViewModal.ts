import { observable, computed, action } from 'mobx'
import React from 'react'

import createModal from 'src/libs/createModal'
import BaseModal from './components/base/BaseModal'

import { sectionList } from './config/sectionList'

import { qualityAnalysisReportPoolService } from './services/QualityAnalysisReportPoolService'
import { AllData, DeptItem, DetailItem } from './types'
import qs from 'qs'
import { numToChinese } from 'src/utils/number/numToChinese'

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
  openEditModal(sectionId: string, index?: any) {
    let obj = this.getSection(sectionId)
    this.baseModal &&
      obj &&
      this.baseModal.show({
        Component: obj.modal,
        sectionData: this.getSection(sectionId),
        index
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
  async initData(query?: any) {
    let { data } = await qualityAnalysisReportPoolService.getReport(query)
    this.allData = data
    /** 本月 */
    let currentYear: any = this.allData!.report!.year
    let currentMonth: any = this.allData!.report!.month
    /** 下月 */
    let nextMonth = currentMonth == 12 ? 1 : currentMonth + 1
    /** 上月 */
    let lastMonth = currentMonth == 1 ? 12 : currentMonth - 1
    this.getSectionData('报告名称')!.text = this.allData.report!.reportName || {}
    this.getSectionData('护理工作计划')!.list = this.allData.workScheduleList || []
    this.getSectionData('病区护理质量检查')!.list = this.allData.wardCheckList || []
    this.getSectionData('护士会议记录')!.list = this.allData.nurseMeetingList || []
    this.getSectionData('不良事件')!.list = this.allData.badEventList || []
    this.getSectionData('人力资源调配')!.list = this.allData.hrAllocationList || []
    // this.getSectionData('检查形式')!.report = this.allData.report || {}
    // this.getSectionData('护理工作计划')!.list = []
  }
  async init(query?: any) {
    await this.initData(query)
    this.baseModal = createModal(BaseModal)
  }
}

export const qualityAnalysisReportViewModal = new QualityAnalysisReportViewModal()
