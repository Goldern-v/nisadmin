import { observable, computed, action } from 'mobx'
import React from 'react'

import createModal from 'src/libs/createModal'
import BaseModal from './../components/base/BaseModal'

import { sectionList } from './../config/sectionList'

import { starRatingReportService } from './../api/StarRatingReportService'
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

  /**层级对应的年度加分明细 */
  @observable scoreDetailMap = {} as any

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
    /**获取年度评分明细 */
    this.getScoreDetailMap()
    let { data } = await starRatingReportService.getReport(query)
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
    this.getSectionData('星级考核')!.list = (this.allData.starRatingList || [])
      .map((item: any) => {
        let nursingDeduct = -Number(item.nursingDeduct)
        if (isNaN(nursingDeduct)) nursingDeduct = 0

        let workloadDeduct = -Number(item.workloadDeduct)
        if (isNaN(workloadDeduct)) workloadDeduct = 0

        let satisfactionDeduct = -Number(item.satisfactionDeduct)
        if (isNaN(satisfactionDeduct)) satisfactionDeduct = 0

        let classHoursDeduct = -Number(item.classHoursDeduct)
        if (isNaN(classHoursDeduct)) classHoursDeduct = 0

        return {
          ...item,
          nursingDeduct,
          workloadDeduct,
          satisfactionDeduct,
          classHoursDeduct
        }
      }) || [];
  }

  async init(query?: any) {
    await this.initData(query)
    this.baseModal = createModal(BaseModal)
  }

  private getScoreDetailMap() {
    this.scoreDetailMap = {}

    let dataMap = {} as any
    starRatingReportService.getAllLevel()
      .then((res) => {
        if (res.data && res.data.nurse_hierarchy) {
          let reqArr = res.data.nurse_hierarchy.map((item: any) => {
            dataMap[item.code] = []
            return starRatingReportService.getAddScoreDetail(item.code)
          })

          return Promise.all(reqArr)
        }
      })
      .then(resArr => {
        if (resArr && resArr instanceof Array) {
          let keys = Object.keys(dataMap)
          for (let i = 0; i < keys.length; i++) {
            let res = resArr[i] as any
            let key = keys[i]
            if (res && res.data) {
              dataMap[key] = (res.data || []).map((item: any) => {
                const { code, name, expand } = item
                return { itemCode: code, itemName: name, expand }
              })
            }
          }

          this.scoreDetailMap = dataMap
        }
      })
  }
}

export const starRatingReportEditModel = new StarRatingReportEditModel()
