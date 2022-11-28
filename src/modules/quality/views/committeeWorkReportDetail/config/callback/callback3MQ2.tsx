import { analysisDetailApi } from '../../../analysisDetail/api';
import ThDiagonal from '../../components/common/thDiagonal';
import { Obj } from 'src/libs/types';
import { getMonthOfQuarter } from 'src/utils/date/season';
import { EXTRA_QUARTER } from '../../../qcThreeMQSummary/enums';

export const obj = {
  getData() {
    return {
      fieldData3: {
        checkTime: '',
      },
      fieldData4: {
        checkDept: '',
      },
      fieldData5: {
        checkPeople: '',
      },
      fieldData6: {
        checkFeedback: '',
      },
      fieldData7: {
        reasonAnalysis: '',
      },
      fieldData8: {
        correctiveMeasures: '',
      },
    };
  },
  formatData() {

    const self: any = this
    // 第一
    const list = self.allData.tableDataMap ? self.allData.tableDataMap.qcScoreSum : [] || [];
    const { summaryFormCode, summaryFormName, reportQuarter, templateName } = self.allData.pageInfo
    let newObj: Obj = {}
    const curMonthList: string[] = getMonthOfQuarter(Number(reportQuarter) - 1)
    // 增加平均分
    curMonthList.push('平均分')
    list.forEach((v: Obj) => {
      const index = curMonthList.findIndex((v1: string) => v.month === v1)
      const { deptName, deptCode } = v
      if (!(deptCode in newObj))
        newObj[deptCode] = { deptName, deptCode }
      newObj[deptCode]['score' + index] = v.score
    });
    self.getSectionData("1").list = Object.values(newObj)
    self.getSectionData("1").tempList = [
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
    const codeList: string[] = summaryFormCode.split(',')
    const nameList: string[] = summaryFormName.split(',')
    // 第二
    if (templateName === EXTRA_QUARTER) {
      // 显示月份
      const list = self.allData.tableDataMap ? self.allData.tableDataMap.qcFormSum : [] || [];
      let newObj: Obj = {}
      list.forEach((v: Obj) => {
        const index = codeList.findIndex((v1: string) => v.formCode === v1)
        const index1 = curMonthList.findIndex((v1: string) => v.month === v1)
        const { deptName, deptCode } = v
        if (!(deptCode in newObj))
          newObj[deptCode] = { deptName, deptCode }
        newObj[deptCode][`score${index}-${index1}`] = v.score
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
        ...nameList.map((v, i) => ({
          title: v,
          key: 'score' + i,
          children: curMonthList.map((v1, i1) => ({
            title: v1,
            key: `score${i}-${i1}`,
          }))
        }))
      ];
    } 
    else if (codeList.length === 1) {
      
      // 一张表
      const list = self.allData.tableDataMap ? self.allData.tableDataMap.qcFormSum : [] || [];
      self.getSectionData("2").list = list
      const formName = nameList[0] || ''
      self.getSectionData("2").tempList = [
        {
          title: '',
          key: 'deptName',
          titleRender: () => {
            return ThDiagonal({})
          }
        },
        {
          title: formName,
          key: 'score'
        },
      ];
    } else {
      // 多张表
      const list = self.allData.tableDataMap ? self.allData.tableDataMap.qcFormSum : [] || [];
      let newObj: Obj = {}
      list.forEach((v: Obj) => {
        const index = codeList.findIndex((v1: string) => v.formCode === v1)
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
        ...nameList.map((v, i) => ({
          title: v,
          key: 'score' + i
        }))
      ];
    }
    self.getSectionData("3").value = self.allData.fieldData3;
    self.getSectionData("4").value = self.allData.fieldData4;
    self.getSectionData("5").value = self.allData.fieldData5;
    self.getSectionData("6").value = self.allData.fieldData6;
    self.getSectionData("7").value = self.allData.fieldData7;
    self.getSectionData("8").value = self.allData.fieldData8;
  },
  /**初始化自动提取 */
  async initRender(reportId: number, data: Obj) {
    const { renderData } = data
    const obj: Obj = renderData
    let proList: any[] = []
    if (Object.keys(obj).length == 0) return
    Object.keys(obj).map((v4: string) => {
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