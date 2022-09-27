import { getBlank } from '../../util/tool'
import { analysisDetailApi } from '../../../analysisDetail/api';

/**
 * qualificationRate score存在都判断
 * @param obj 
 * @returns 
 */
const formatStatus1 = (obj: Record<string, any>) => {
  let text = '不达标'
  if (obj.standardStatus || (!obj.qualificationRate && !obj.score)) return obj.standardStatus
  if (obj.qualificationRate && obj.score) {
    Number(obj.qualificationRate) >= 90 && Number(obj.score) >= 90 && (text = '达标')
  }
  return text
}
/**
 * passRate averageScore存在都判断
 * averageScore为空 只判断passRate
 * @param obj 
 * @returns 
 */
const formatStatus2 = (obj: Record<string, any>) => {
  let text = '不达标'
  if (obj.standardStatus || (!obj.passRate && !obj.averageScore)) return obj.standardStatus
  if (obj.passRate && !obj.averageScore) {
    Number(obj.passRate) >= 90 && (text = '达标')
    return text
  }
  Number(obj.passRate) >= 90 && Number(obj.averageScore) >= 90 && (text = '达标')
  return text
}
export const obj = {
  getData() {
    return {
      fieldData1:{
        lastProblem: '',
        item: '',
        checkPeople: '',
      },
    };
  },
  formatData() {
    (this as any).getSectionData("1").value = (this as any).allData.fieldData1;
    (this as any).getSectionData("2").list = (this as any).allData.tableDataMap ? (this as any).allData.tableDataMap.summaryDepartmentProblems : [] || [];
    (this as any).getSectionData("2").tempList = (this as any).configData.tableTempList ? (this as any)?.configData?.tableTempList?.summaryDepartmentProblems : [] || [];
    (this as any).getSectionData("3").list = (this as any).allData.tableDataMap ? (this as any).allData.tableDataMap.indexMonitoringResults : [] || [];
    (this as any).getSectionData("3").tempList = (this as any).configData.tableTempList ? (this as any)?.configData?.tableTempList?.indexMonitoringResults : [] || [];
  },
  /**初始化自动提取 */
  async initRender(reportId:number, data: Record<string, any>) {
    const { renderData, tableTempList } = data
    const obj: Record<string, any> = {}
    Object.keys(renderData).forEach((v: string) => {
      if (renderData[v].length == 0) return
      obj[v] = []
      const blank = getBlank(tableTempList[v])
      renderData[v].forEach((v3: any) => {
        if (v === 'summaryDepartmentProblems') {
          const standardStatus = formatStatus1(v3)
          obj[v].push({ ...blank, ...v3, standardStatus })
          return
        } else if (v === 'indexMonitoringResults') {
          const standardStatus = formatStatus2(v3)
          obj[v].push({ ...blank, ...v3, standardStatus })
          return
        }
        obj[v].push({ ...blank, ...v3 })
      })
    });
    
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