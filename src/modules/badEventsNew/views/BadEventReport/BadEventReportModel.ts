import { observable, computed, action } from 'mobx'
import React from 'react'

import createModal from 'src/libs/createModal'
import BaseModal from './components/base/BaseModal'

import { sectionList } from './config/sectionList'

import { badEventReportService } from './services/BadEventReportService'
import { AllData, DeptItem, DetailItem } from './types'
import qs from 'qs'
import { numToChinese } from 'src/utils/number/numToChinese'
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

  @observable timeObj = {
    currentYear: '' as string | number,
    currentMonth: '' as string | number,
    nextMonth: '' as string | number,
    prevMonth: '' as string | number,
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
    let { data } = await badEventReportService.getReport({ id: query.id })

    this.allData = data
    /** 本月 */
    let currentYear: any = parseInt(this.allData!.report!.year || ''.replace('年', '') || moment().format('YYYY'))
    let currentMonth: any = parseInt(this.allData!.report!.timeSection.replace('月', '') || '1')
    /** 下月 */
    let nextMonth = currentMonth == 12 ? 1 : currentMonth + 1
    /** 上月 */
    let prevMonth = currentMonth == 1 ? 12 : currentMonth - 1

    this.timeObj = {
      currentYear,
      nextMonth,
      currentMonth,
      prevMonth
    }

    this.getSectionData('报告名称')!.text = this.allData.report!.name || '报告名称'

    this.getSectionData('不良事件分类')!.list = this.allData.beTotalHappenList || []

    this.getSectionData('上报例数比较')!.list = this.allData.beContrastBeforeList || []

    let beTrendChart = this.allData.beTrendChartDto

    this.getSectionData('上报趋势图')!.obj = {
      beforeYearList: beTrendChart.beforeYearList || [],
      lastYearList: beTrendChart.lastYearList || [],
      curYearList: beTrendChart.curYearList || [],
    }

    let beReportSituation = this.allData.beReportSituationDto

    let rateMapText = ''
    if (beReportSituation.rateMap) {
      let keyArr = Object.keys(beReportSituation.rateMap)
      let key = keyArr[0]
      if (keyArr.length > 0)
        rateMapText = `，主要为${key}上报总数${beReportSituation.rateMap[key]}，其他事件基本持平`
    }

    this.getSectionData('上报情况比较')!.text =
      beReportSituation.reportDesc || `${currentYear}年${currentMonth}月不良事件上报总数与去年同期相比${beReportSituation.lastYearCompare}，与上月相比${beReportSituation.lastSectionCompare}${rateMapText}。`

    this.getSectionData('上报情况比较图表')!.list = beReportSituation.list || []

    this.getSectionData('不良事件分类比较')!.list = this.allData.beClassifyContrastList || []

    const beInjuryDegree = this.allData.beInjuryDegreeDto

    let beCount = beInjuryDegree.beCount || 0
    //造成伤害例数，比例
    let causeInjury = beInjuryDegree.dataMap.causeInjury || 0
    let causeInjuryRate = beInjuryDegree.dataMap.causeInjuryRate || '0%'
    //轻度伤害例数，比例
    let minorInjury = beInjuryDegree.dataMap.minorInjury || 0
    let minorInjuryRate = beInjuryDegree.dataMap.minorInjuryRate || '0%'
    //无伤害伤害例数，比例
    let noInjury = beInjuryDegree.dataMap.noInjury || 0
    let noInjuryRate = beInjuryDegree.dataMap.noInjuryRate || '0%'
    //伤害程度分类描述
    let beInjuryDegreeDesc = beInjuryDegree.reportDesc || ''
    //伤害程度列表
    let beInjuryDegreeList = beInjuryDegree.beInjuryDegreeList || []

    if (beInjuryDegreeDesc) {
      this.getSectionData('伤害程度分类')!.text = beInjuryDegreeDesc
    } else {
      this.getSectionData('伤害程度分类')!.text = `按护理不良事件上报指引，发生护理不良事件后对病人造成的影响程度和伤害分类，本月共${beCount}次不良事件，造成伤害共${causeInjury}例，占${causeInjuryRate}，其中无伤害的${noInjury}例，占${noInjuryRate}，轻度伤害${minorInjury}例，占${minorInjuryRate}。`
    }

    this.getSectionData('伤害程度分类图表')!.list = beInjuryDegreeList

    //发生时间段
    let beHappenTime = this.allData.beHappenTimeDto
    let beHappenTimeDesc = beHappenTime.reportDesc || ''
    if (!beHappenTimeDesc) {
      beHappenTimeDesc = `本月护理不良事件上报科室主要${beHappenTime.wardName || '...'}为主，共上报${beHappenTime.happenNum || '...'}例次，主要发生事件段在${beHappenTime.timeSection || '...'}时间段`
    }
    this.getSectionData('不良事件发生时段').text = beHappenTimeDesc


    //发生科室分布
    let beDeptDistribution = this.allData.beDeptDistributionDto
    let beDeptDistributionList = beDeptDistribution.beDeptDistributionList || []
    let beDeptDistributionDesc = beDeptDistribution.reportDesc || ''
    if (!beDeptDistributionDesc) {
      beDeptDistributionDesc = '按发生不良事件的科室进行分类，'
      let moreThan5WardName = beDeptDistribution.moreThan5WardName.join('、') || ''
      if (moreThan5WardName.length > 0) {
        beDeptDistributionDesc += `其中大于5例的有${moreThan5WardName || ''}等科室。`
      } else {
        beDeptDistributionDesc += '没有大于5例的科室。'
      }
    }

    this.getSectionData('科室分布')!.text = beDeptDistributionDesc

    this.getSectionData('科室分布图表')!.list = beDeptDistributionList

    //相关人员
    let beRelevantPerson = this.allData.beRelevantPersonDto
    let beRelevantPersonDesc = beRelevantPerson.reportDesc
    if (!beRelevantPersonDesc) {
      beRelevantPersonDesc = beRelevantPerson.rePerson
    }
    this.getSectionData('相关人员')!.text = beRelevantPersonDesc
    //发生阶段及可能原因
    this.getSectionData('发生阶段及可能原因')
  }

  async init(query?: any) {
    await this.initData(query)
    this.baseModal = createModal(BaseModal)
  }
}

export const badEventReportModel = new BadEventReportModel()
