import { observable, computed, action } from 'mobx'
import React from 'react'

import createModal from 'src/libs/createModal'
import BaseModal from './components/base/BaseModal'

import { sectionList } from './config/sectionList'

import { badEventReportService } from './services/BadEventReportService'
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

class BadEventReportModel {
  @observable baseModal: ModalCase | null = null
  @observable public sectionList: SectionListItem[] = sectionList
  @observable public allData: Partial<AllData> = {
    report: {}
  }

  @observable public chartColors = [
    '#FF4400',
    '#FF8101',
    '#FFD000',
    '#F4FA17',
    '#D9EF50',
    '#B7E295',
    '#9AD6D2',
    '#87CEFA',
    '#63B9EE',
    '#7D95EB',
    '#9478D4',
    '#8F5DC0',
    '#B548C6',
    '#EF37A5',
    '#AB9086',
    '#C5BB90',
    '#D5CFB4',
    '#B1C891',
    '#85B574',
    '#75C3A5',
    '#829CA7',
    '#5C7D9F',
    '#6386C5',
    '#B1ABBA',
    '#DD96DF',
    '#E89F89',
    '#5B808A',
    '#A6A6A6',
  ]

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
    let { data } = await badEventReportService.getReport(query)
    this.allData = data
    /** 本月 */
    let currentYear: any = this.allData!.report!.year
    let currentMonth: any = this.allData!.report!.month
    /** 下月 */
    let nextMonth = currentMonth == 12 ? 1 : currentMonth + 1
    /** 上月 */
    let lastMonth = currentMonth == 1 ? 12 : currentMonth - 1
    // this.getSectionData('报告名称')!.text = this.allData.report!.reportName || {}
    // this.getSectionData('护理工作计划')!.list = this.allData.workScheduleList || []
    // this.getSectionData('病区护理质量检查')!.list = this.allData.wardCheckList || []
    // this.getSectionData('护士会议记录')!.list = this.allData.nurseMeetingList || []
    // this.getSectionData('不良事件')!.list = this.allData.badEventList || []
    // this.getSectionData('人力资源调配')!.list = this.allData.hrAllocationList || []
    // this.getSectionData('检查形式')!.report = this.allData.report || {}
    // this.getSectionData('护理工作计划')!.list = []
  }
  async init(query?: any) {
    return
    await this.initData(query)
    this.baseModal = createModal(BaseModal)
  }
}

export const badEventReportModel = new BadEventReportModel()
