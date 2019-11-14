import { observable, computed, action } from 'mobx'
import React from 'react'

import createModal from 'src/libs/createModal'
import BaseModal from '../components/base/BaseModal'

import { sectionList } from '../config/sectionList'
import { appStore, authStore } from 'src/stores'

import { safetyCheckReportService } from '../api/SafetyCheckReportService'
import { AllData, DeptItem, DetailItem } from '../types'
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

class SafetyCheckEditModel {
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
    let { data } = await safetyCheckReportService.getReport(query)
    this.allData = data
    /** 本月 */
    let currentYear: any = this.allData!.report!.year
    let currentMonth: any = this.allData!.report!.indexInType
    /** 下月 */
    let nextMonth = currentMonth == 12 ? 1 : currentMonth + 1
    /** 上月 */
    let lastMonth = currentMonth == 1 ? 12 : currentMonth - 1

    const wardInfo = authStore.deptList.find((item: any) => item.code == appStore.queryObj.wardCode)
    const wardName = wardInfo && wardInfo.name || ''

    console.log(data)
    this.getSectionData('报告名称')!.text = this.allData.report!.reportName || ''

    let safetyCheckList = [
      {
        name: '需大科协调问题',
        code: 'contentWithBigDeptList',
        list: [{
          "id": "",
          "reportCode": "qc_safety_check",
          "wardCode": "",
          "year": appStore.queryObj.year,
          "month": appStore.queryObj.month,
          "indexNo": 0,
          "wardName": "",
          "contentType": "contentWithBigDept",
          "content": ""
        }] as any[]
      }, //需大科协助
      {
        name: '需护理部协调问题',
        code: 'contentWithNdList',
        list: [{
          "id": "",
          "reportCode": "qc_safety_check",
          "wardCode": "",
          "year": appStore.queryObj.year,
          "month": appStore.queryObj.month,
          "indexNo": 0,
          "wardName": "",
          "contentType": "contentWithNdList",
          "content": ""
        }] as any[]
      }, //需护理部协助内容
      {
        name: '查新及建议',
        code: 'suggetionsList',
        list: [{
          "id": "",
          "reportCode": "qc_safety_check",
          "wardCode": "",
          "year": appStore.queryObj.year,
          "month": appStore.queryObj.month,
          "indexNo": 0,
          "wardName": "",
          "contentType": "suggetionsList",
          "content": ""
        }] as any[]
      } //建议
    ]

    if (this.allData.contentWithBigDeptList && this.allData.contentWithBigDeptList.length > 0)
      safetyCheckList[0].list = this.allData.contentWithBigDeptList

    if (this.allData.contentWithNdList && this.allData.contentWithNdList.length > 0)
      safetyCheckList[1].list = this.allData.contentWithNdList

    if (this.allData.suggetionsList && this.allData.suggetionsList.length > 0)
      safetyCheckList[2].list = this.allData.suggetionsList

    this.getSectionData('安全隐患排查')!.safetyCheckList = safetyCheckList

    //问题类型条目
    let safetyCheckRecordList = [
      {
        "id": "",
        "reportCode": "qc_safety_check",
        "wardCode": "",
        "year": appStore.queryObj.year,
        "month": appStore.queryObj.month,
        "indexNo": 0,
        "wardName": "",
        "assistWardCode": "",
        "assistWardName": "",
        "problemType": "",
        "content": "",
        "cause": "",
        "measure": ""
      }
    ]

    if (this.allData.safetyCheckRecordList && this.allData.safetyCheckRecordList.length > 0)
      safetyCheckRecordList = this.allData.safetyCheckRecordList

    this.getSectionData('安全隐患排查')!.safetyCheckRecordList = safetyCheckRecordList
  }
  async init(query?: any) {
    await this.initData(query)
    this.baseModal = createModal(BaseModal)
  }
}

export const safetyCheckEditModel = new SafetyCheckEditModel()
