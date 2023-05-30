import { Obj } from 'src/libs/types'
import { getMonthOfQuarter } from 'src/utils/date/season'
import { quarterAndYear1 } from 'src/enums/date'

import ThDiagonal from '../../components/common/thDiagonal'
import { analysisDetailApi } from '../../../analysisDetail/api'
import { EXTRA_QUARTER } from '../../../qcThreeMQSummary/enums'

export const obj = {
  getData() {
    return {
      fieldData1: {
        explain: '',
      },
      fieldData5: {
        improvementMeasure: '',
      },
    };
  },
  formatData() {

    const self: any = this
    // 第一
    const list = self.allData.tableDataMap ? self.allData.tableDataMap.qcScoreSum : [] || [];
    const { summaryFormCode, summaryFormName, reportQuarter, templateName, } = self.allData.pageInfo
    let newObj: Obj = {}
    const curMonthList: string[] = getMonthOfQuarter(Number(reportQuarter) - 1)
    const curQuarter = quarterAndYear1[reportQuarter]
    // 增加平均分
    const curMonthList1 = [...curMonthList]
    curMonthList.push('平均分')
    list.forEach((v: Obj) => {
      const index = curMonthList.findIndex((v1: string) => v.month === v1)
      const { deptName, deptCode } = v
      if (!(deptCode in newObj))
        newObj[deptCode] = { deptName, deptCode }
      newObj[deptCode]['score' + index] = v.score
    });
    self.getSectionData("2").list = Object.values(newObj)
    self.getSectionData("2").tempList = [
      {
        title: '',
        key: 'deptName',
        titleRender: () => {
          return ThDiagonal({})
        }
      },
      ...curMonthList.map((v, i) => ({
        title: v,
        key: 'score' + i
      })),
    ];
    self.getSectionConfig('2').title = `${curQuarter}各科综合得分情况`
    self.getSectionConfig('2').title1 = `${curQuarter}各科综合质控分析对比报告`

    const codeList: string[] = summaryFormCode.split(',')
    const nameList: string[] = summaryFormName.split(',')
    // 第二
    // if (templateName === EXTRA_QUARTER) {
    // 显示月份 不显示平均分
    const list1 = self.allData.tableDataMap ? self.allData.tableDataMap.qcFormSum : [] || [];
    let newObj1: Obj = {}
    list1.forEach((v: Obj) => {
      const index = codeList.findIndex((v1: string) => v.formCode === v1)
      const index1 = curMonthList1.findIndex((v1: string) => v.month === v1)
      const { deptName, deptCode } = v
      if (!(deptCode in newObj1))
        newObj1[deptCode] = { deptName, deptCode }
      newObj1[deptCode][`score${index}-${index1}`] = v.score
    });
    self.getSectionConfig("3").title = `${curQuarter}各护理质控项目得分情况`
    self.getSectionData("3").list = Object.values(newObj1)
    self.getSectionData("3").tempList = [
      {
        title: '',
        key: 'deptName',
        titleRender: () => {
          return ThDiagonal({})
        }
      },
      ...nameList.map((v, i) => ({
        title: v,
        key: 'score' + i,
        children: curMonthList1.map((v1, i1) => ({
          title: v1,
          key: `score${i}-${i1}`,
        }))
      }))
    ];
    // } 
    // else if (codeList.length === 1) {

    //   // 一张表
    //   const list = self.allData.tableDataMap ? self.allData.tableDataMap.qcFormSum : [] || [];
    //   self.getSectionData("3").list = list
    //   const formName = nameList[0] || ''
    //   self.getSectionData("3").tempList = [
    //     {
    //       title: '',
    //       key: 'deptName',
    //       titleRender: () => {
    //         return ThDiagonal({})
    //       }
    //     },
    //     {
    //       title: formName,
    //       key: 'score'
    //     },
    //   ];
    // } else {
    //   // 多张表
    //   const list = self.allData.tableDataMap ? self.allData.tableDataMap.qcFormSum : [] || [];
    //   let newObj: Obj = {}
    //   list.forEach((v: Obj) => {
    //     const index = codeList.findIndex((v1: string) => v.formCode === v1)
    //     const { deptName, deptCode } = v
    //     if (!(deptCode in newObj))
    //       newObj[deptCode] = { deptName, deptCode }
    //     newObj[deptCode]['score' + index] = v.score
    //   });
    //   self.getSectionData("4").list = Object.values(newObj)
    //   self.getSectionData("4").tempList = [
    //     {
    //       title: '',
    //       key: 'deptName',
    //       titleRender: () => {
    //         return ThDiagonal({})
    //       }
    //     },
    //     ...nameList.map((v, i) => ({
    //       title: v,
    //       key: 'score' + i
    //     }))
    //   ];
    // }
    self.getSectionData("1").value = self.allData.fieldData1;
    const list2 = self.allData.tableDataMap ? self.allData.tableDataMap.qcResult : [] || [];

    self.getSectionData("4").list = list2;
    self.getSectionData("5").value = self.allData.fieldData5;

  },
  /**初始化自动提取 */
  async initRender(reportId: number, data: Obj) {
    const { renderData } = data
    const obj: Obj = renderData
    let proList: any[] = []
    if (Object.keys(obj).length === 0) return
    Object.keys(obj).forEach((v4: string) => {
      if (!obj[v4]) return
      const params = {
        reportId,
        tableName: v4,
        data: obj[v4]
      }
      proList.push(analysisDetailApi.saveReportTableData(params))
    })
    try {
      const res = await Promise.all(proList)
      return res
    } catch (e) {
    }
  }
}