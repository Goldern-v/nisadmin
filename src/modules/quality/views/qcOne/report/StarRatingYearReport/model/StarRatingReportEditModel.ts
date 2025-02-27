import { observable, computed, action } from 'mobx'
import React from 'react'

import createModal from 'src/libs/createModal'
import BaseModal from './../components/base/BaseModal'

import { sectionList } from './../config/sectionList'

import { starRatingYearReportService } from '../api/StarRatingYearReportService'
import { AllData, DeptItem, DetailItem } from './../types'
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

class StarRatingReportEditModel {
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
    let { data } = await starRatingYearReportService.getReport(query)
    this.allData = data
    /** 本月 */
    // let currentYear: any = this.allData!.report!.year
    // let currentMonth: any = this.allData!.report!.indexInType
    /** 下月 */
    // let nextMonth = currentMonth == 12 ? 1 : currentMonth + 1
    /** 上月 */
    // let lastMonth = currentMonth == 1 ? 12 : currentMonth - 1

    // console.log(data)
    this.getSectionData('报告名称')!.text = this.allData.report!.reportName || ''
    this.getSectionData('星级考核')!.list = (this.allData.starRatingYearList || [])
      .map((item: any) => {
        let nursingDeduct = -Number(item.nursingDeduct)
        if (isNaN(nursingDeduct)) nursingDeduct = 0

        let workloadDeduct = -Number(item.workloadDeduct)
        if (isNaN(workloadDeduct)) workloadDeduct = 0

        let satisfactionDeduct = -Number(item.satisfactionDeduct)
        if (isNaN(satisfactionDeduct)) satisfactionDeduct = 0

        return {
          ...item,
          nursingDeduct,
          workloadDeduct,
          satisfactionDeduct
        }
      }) || [];
  }

  async init(query?: any) {
    await this.initData(query)
    this.baseModal = createModal(BaseModal)
  }
}

export const starRatingReportEditModel = new StarRatingReportEditModel()
