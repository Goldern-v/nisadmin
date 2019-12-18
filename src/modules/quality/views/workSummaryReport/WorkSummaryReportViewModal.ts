import { observable, computed, action } from 'mobx'
import React from 'react'

import createModal from 'src/libs/createModal'
import BaseModal from './components/base/BaseModal'

import { sectionList } from './config/sectionList'

import { workSummaryReportService } from './services/WorkSummaryReportService'
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

class WorkSummaryReportViewModal {
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
  async initData(query?: any) {
    let { data } = await workSummaryReportService.getReport(query)
    this.allData = data
    /** 本月 */
    let currentYear: any = this.allData!.report!.year
    let currentMonth: any = this.allData!.report!.indexInType
    /** 下月 */
    let nextMonth = currentMonth == 12 ? 1 : currentMonth + 1
    /** 上月 */
    let lastMonth = currentMonth == 1 ? 12 : currentMonth - 1

    console.log(data)
    this.getSectionData('报告名称')!.text = this.allData.report!.reportName || ''
    this.getSectionData('本月片区人力资源调配')!.list = this.allData.hrAllocationList || [];
    this.getSectionData('本月片区不良事件汇总表')!.list = this.allData.badEventList || [];
    this.getSectionData('本月护理质量检查问题及持续改进')!.list = this.allData.improveItemList || [];
    this.getSectionData('下月工作重点')!.list = this.allData.keyItemList || [];
    this.getSectionData('本月片区团队建设活动').text = this.allData.report!.teamBuildingDesc || ''
    this.getSectionData('片区团队建设活动附件')!.list = this.allData.attchmentList || [];
  }
  async init(query?: any) {
    await this.initData(query)
    this.baseModal = createModal(BaseModal)
  }
}

export const EventTypeList = [
  {
    code: 'QCWET001',
    name: '压疮不良事件'
  },
  {
    code: 'QCWET002',
    name: '给药/治疗错误不良事件'
  },
  {
    code: 'QCWET003',
    name: '操作不当不良事件'
  },
  {
    code: 'QCWET004',
    name: '跌倒/坠床不良事件'
  },
  {
    code: 'QCWET005',
    name: '非计划性拔管不良事件'
  },
  {
    code: 'QCWET006',
    name: '输液/输血渗透不良事件'
  },
  {
    code: 'QCWET007',
    name: '烫伤不良事件'
  },
  {
    code: 'QCWET008',
    name: '走失不良事件'
  },
  {
    code: 'QCWET009',
    name: '自杀'
  }
]

export const getEventTypeNameByCode = (code: string) => {
  let obj = EventTypeList.find((item: any) => item.code == code)
  return obj ? obj.name : code
}

export const workSummaryReportViewModal = new WorkSummaryReportViewModal()
