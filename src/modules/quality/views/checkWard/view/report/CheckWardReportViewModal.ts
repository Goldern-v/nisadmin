import { observable, computed, action } from 'mobx'
import React from 'react'
import createModal from 'src/libs/createModal'
import BaseModal from './components/base/BaseModal'
import { sectionList } from './config/sectionList'
import { AllData, DeptItem, DetailItem } from './types'
import { checkWardService } from '../../services/CheckWardService'
import moment from 'moment'

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
  @observable public selectedYear: any = moment() // 查房年份
  @observable public selectedMonth: any = Number(moment().format('MM')) // 查房月份
  @observable public dataList = [] // 报告内容
  @observable public specialData = [] // 特殊时段查房数据
  @observable public nightData = [] // 中夜班查房
  @observable public year = '' // 报告年份
  @observable public month = '' // 报告月份
  @observable public searchRoom1 = '' // 特查房次数
  @observable public searchRoom2 = '' // 夜查房次数
  @observable public pageLoading = false


  @computed
  get postObj() {
    let dataTime = (new Date(moment(this.selectedYear).year(), this.selectedMonth, 0)).getDate()
    return {
      startDate: `${moment(this.selectedYear).year()}-${this.selectedMonth}-01`,
      endDate: `${moment(this.selectedYear).year()}-${this.selectedMonth}-${dataTime}`,
    }
  }

  onload() {
    this.pageLoading = true
    checkWardService.searchRoomTotal(this.postObj).then((res) => {
      let specialData: any = []
      let nightData: any = []
      this.dataList = res.data.srRecordList.map((item: any) => {
        if (item.record.type == '特殊时段查房') {
          specialData.push(item)
        }
        if (item.record.type == '中夜班查房') {
          nightData.push(item)
        }
      })
      this.specialData = specialData
      this.nightData = nightData
      this.year = res.data.year
      this.month = res.data.month
      this.searchRoom1 = res.data.searchRoom1
      this.searchRoom2 = res.data.searchRoom2
      this.pageLoading = false
    })
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
    let { data } = await checkWardService.searchRoomTotal(this.postObj)
    this.allData = data
  }
  async init() {
    await this.initData()
    this.onload()
    this.baseModal = createModal(BaseModal)
  }
}

export const checkWardReportViewModal = new CheckWardReportViewModal()
