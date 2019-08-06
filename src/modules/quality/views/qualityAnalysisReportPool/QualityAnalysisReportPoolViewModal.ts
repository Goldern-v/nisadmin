import { observable, computed, action } from 'mobx'
import React from 'react'

import createModal from 'src/libs/createModal'
import BaseModal from './components/base/BaseModal'

import { sectionList } from './config/sectionList'

import { qualityAnalysisReportPoolService } from './services/QualityAnalysisReportPoolService'
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
    let { data } = await qualityAnalysisReportPoolService.getReport()
    this.allData = data
    /** 本月 */
    let currentYear: any = this.allData!.report!.year
    let currentMonth: any = this.allData!.report!.indexInType
    /** 下月 */
    let nextMonth = currentMonth == 12 ? 1 : currentMonth + 1
    /** 上月 */
    let lastMonth = currentMonth == 1 ? 12 : currentMonth - 1
    this.getSectionData('报告名称')!.text = this.allData.report!.reportName || {}
    this.getSectionData('查房内容')!.text = this.allData.report || {}
    this.getSectionData('检查形式')!.text = this.allData.report || {}
    this.getSectionData('亮点')!.list = this.allData.highlightItemList || []
    this.getSectionData('本月总扣分')!.list = this.allData.groupItemList || []
    this.getSectionData('扣分比较')!.list = this.allData.groupCompareList || []

    this.getSectionData('病区质量考核前十')!.report = this.allData.report || {}
    this.getSectionData('病区质量扣分前十')!.list = this.allData.topRankDeptItemList || []
    this.getSectionData('特殊科室质量扣分')!.list = this.allData.specialDeptItemList || []
    this.getSectionData('特殊监护病房质量扣分')!.list = this.allData.icuDeptItemList || []
    this.getSectionData('门诊科室质量扣分')!.list = this.allData.opdDeptItemList || []

    this.getSectionData('4')!.text = `四、${currentMonth}月各组质量问题反馈`
    this.getSectionData('6')!.text = `六、各组重点问题${currentMonth}月整改情况反馈`
    this.getSectionData('7')!.text = `七、${currentYear}年${nextMonth}月护理质量工作重点`
    for (let i = 0; i < 10; i++) {
      this.getSectionData(`4_${i + 1}`)!.list = this.allData!.detailItemList![i]!.childrenItemList || []
      this.getSectionData(`4_${i + 1}`)!.contentKey = 'content'
    }
    for (let i = 0; i < 10; i++) {
      this.getSectionData(`5_${i + 1}`)!.list = this.allData!.improveItemList![i]!.childrenItemList || []
      this.getSectionData(`5_${i + 1}`)!.contentKey = 'itemImproveDesc'
    }
    this.getSectionData(`6_1`)!.list = this.allData!.improveResultList || []
    this.getSectionData(`6_1`)!.contentKey = 'itemImproveDesc'
    this.getSectionData(`7_1`)!.list = this.allData!.keyItemList || []
    this.getSectionData(`7_1`)!.contentKey = 'content'
  }
  async init() {
    await this.initData()
    this.baseModal = createModal(BaseModal)
  }
}

export const qualityAnalysisReportViewModal = new QualityAnalysisReportViewModal()
