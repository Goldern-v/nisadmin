import { appStore } from 'src/stores'

import { analysisModal } from './../../../analysisWhyx/AnalysisModal'
import { getBlank, replenishList } from './../../util/tool'
import { analysisDetailApi } from '../../api'

/**固定渲染数据 */
const FIXED_ITEMS = [
  '采血扫描合格率',
  '长期口服药扫描合格率',
  '长期静脉给药扫描合格率',
  '静脉炎发生例数',
  '药液渗出发生例数',
  '各类导管非计划拔管例数',
  '锐器伤发生例数',
  '',
  '',
  ''
]
const emrNursing = [
  '接诊人数',
  '收入院人数',
  '抢救人数',
'留观人数',
 ' 120人数',
  '死亡人数',
  '急诊PCI人数',
  '',
  ''
]
const yearList=[
  '2021','2022'
]
const emrMonthCare=[
  "（一）急诊护理质量",
"（二）消毒隔离管理",
"（三）护理安全管理",
"（四）疫情常态化管理",
"（五）发热诊室护理管理",
"（六）急诊120急救车质量管理",
"",
]
const dayMontCare= [
  "（一）日间病房护理质量",
  "（二）消毒隔离管理",
  "（三）护理安全管理",
  "（四）疫情常态化管理",
  "（五）护理文件书写",
  ""
]
export const obj = {
  getData() {
    return {
      fieldData1_1:{
        ultQuestion: '',
        improveFeedback: '',
      },
      fieldData2_1:{
        reportAdverseEvents: "",
        eventTypeAndLevel: "",
      },
      fieldData2_3:{
        overallIndicator: "",
        standardIndicators: "",
        nonComplianceIndicators: "",
      },
      fieldData3_1:{
        monthWorkPlan: "",
        trainingPlanOfTheMonth: "",
        monthWorkDoneCase: "",
        monthTrainDoneCase: "",
      },
      fieldData3_4:{
        emergencyAreaCount: "",
        actualEmergencyCount: "",
        actualEmergencyDutyCount: "",
        emergencyResignNurse: "",
        notRectifiedNurse: "",
        regularPracticeNurse: "",
        nurseTurnoverRate: "",
        dayWardCount:"",
        nursingWorkloadScore: '',
        actualDayWardDutyCount:'',
        actualDayWardCount:"",
      },
      fieldData3_6:{
        // causeAnalysisPeople: "",
        question: "",
        fishboneDiagram: '',
        // causeAnalysisMachine: "",
        // causeAnalysisThing: "",
        // causeAnalysisLaw: "",
        // causeAnalysisRing: "",
        // causeAnalysisQuestion: "",
        mainReason: "",
        setGoal: "",
        planPrincipal: "",
        planImplementationSite: "",
        planImplementationTime: "",
        planCountermeasures: "",
        planMainReason: "",
        planQuestion: "",
        implementation: "",
        effectConfirmed: "",
        standardizedContent: "",
      },
      fieldData3_7:{
        specialEventSolvedProblem:"",
      },
      fieldData5_1:{
        deptWorkPlanForNextMonth: "",
      },
      fieldData5_2:{
        nextMonthDeptTrainingPlan: "",
      },
      pageData: {
        id: null,
        isDeleted: null,
        publisherName: "",
        publisherNo: "",
        publisherTime: "",
        renderTableDataMap: null,
        reportLevel: "",
        reportMonth: "",
        reportYear:"",
        reportName: "",
        updateTime: "",
        updaterName: "",
        updaterNo: "",
        wardCode: "",
        wardName: "",
      }
    };
  },
  formatData() {
    (this as any).getSectionData("1_1").value = (this as any).allData.fieldData1_1;
    (this as any).getSectionData("2_1").value = (this as any).allData.fieldData2_1;
    (this as any).getSectionData("2_3").value = (this as any).allData.fieldData2_3;
    (this as any).getSectionData("3_1").value = (this as any).allData.fieldData3_1;
    (this as any).getSectionData("3_4").value = (this as any).allData.fieldData3_4;
    (this as any).getSectionData("3_6").value = (this as any).allData.fieldData3_6;
    (this as any).getSectionData("3_7").value = (this as any).allData.fieldData3_7;
    (this as any).getSectionData("5_1").value = (this as any).allData.fieldData5_1;
    (this as any).getSectionData("5_2").value = (this as any).allData.fieldData5_2;
    (this as any).getSectionData("2_1").list = (this as any).allData.tableDataMap ? (this as any).allData.tableDataMap.deptOneQualityIndexResult : [] || [];
    (this as any).getSectionData("2_2").list = replenishList({data: (this as any).allData.tableDataMap, config: (this as any).configData, name: 'deptCareMonitorIndexResult', len: 5});
    (this as any).getSectionData("2_3").list = replenishList({ data: (this as any).allData.tableDataMap, config: (this as any).configData, name: 'deptNotPassIndexImprove', len: 3 });
    (this as any).getSectionData("3_2").list = replenishList({ data: (this as any).allData.tableDataMap, config: (this as any).configData, name: 'emrNursingWorkStatistics', len: 7 });
    (this as any).getSectionData("3_3").list = replenishList({ data: (this as any).allData.tableDataMap, config: (this as any).configData, name: 'dayNursingWorkStatistics', len: 2 });
    (this as any).getSectionData("3_5_1").list = replenishList({ data: (this as any).allData.tableDataMap, config: (this as any).configData, name: 'emrMonthCareProblemImprove', len: 7 });
    (this as any).getSectionData("3_5_2").list = replenishList({ data: (this as any).allData.tableDataMap, config: (this as any).configData, name: 'dayMonthCareProblemImprove', len: 6});
    (this as any).getSectionData("4_0").list = (this as any).allData.tableDataMap ? (this as any).allData.tableDataMap.attachment : [] || [];
    (this as any).getSectionData("3_4").pageInfo= (this as any).allData.pageInfo;
    (this as any).getSectionData("3_2").pageInfo= (this as any).allData.pageInfo;
    (this as any).getSectionData("3_2").tempList = (this as any).configData.tableTempList ? (this as any)?.configData?.tableTempList?.emrNursingWorkStatistics : [] || [];
    (this as any).getSectionData("3_3").tempList = (this as any).configData.tableTempList ? (this as any)?.configData?.tableTempList?.dayNursingWorkStatistics : [] || [];
    (this as any).getSectionData("3_5_1").tempList = (this as any).configData.tableTempList ? (this as any)?.configData?.tableTempList?.emrMonthCareProblemImprove : [] || [];
    (this as any).getSectionData("3_5_2").tempList = (this as any).configData.tableTempList ? (this as any)?.configData?.tableTempList?.dayMonthCareProblemImprove : [] || [];
    

  },
  /**初始化自动提取 */
  async initRender(reportId:number) {
    if (!(analysisModal.renderData && analysisModal.tableTempList)) return
    const { renderData, tableTempList } = analysisModal
    const obj: Record<string, any> = {}
    Object.keys(renderData).map((v: string) => {
      obj[v] = []
      // 本月护理主要问题分析改进 提取
      if (v == 'monthCareProblemImprove') {
        const data: Record<string, any> = {}
        renderData[v].map((v1: any) => {
          if (data[v1.item] != undefined) {
            v1.mainProblem && (data[v1.item] += v1.mainProblem + '\n')
            return
          }
          data[v1.item] = v1.mainProblem || ''
        })
        let blank = getBlank(tableTempList[v])
        Object.keys(data).map((v2: any) => {
          obj[v].push({ ...blank, item: v2, mainProblem: data[v2] })
        })
        return
      }
      const blank = getBlank(tableTempList[v])
      renderData[v].map((v3: any) => {
        obj[v].push({ ...blank, ...v3 })
      })
      if (v == 'deptOneQualityIndexResult') {
        FIXED_ITEMS.map((v4: string) => {
          obj[v].push({ ...blank, item: v4 })
        })
      }

    });
    const blankEmr = getBlank(tableTempList['emrNursingWorkStatistics'])
    const blankDayNur = getBlank(tableTempList['dayNursingWorkStatistics'])
    const blankemg = getBlank(tableTempList['emrMonthCareProblemImprove'])
    const blankDayMonth = getBlank(tableTempList['dayMonthCareProblemImprove'])
    obj['emrNursingWorkStatistics'] = []
    obj['dayNursingWorkStatistics'] = []
    obj['emrMonthCareProblemImprove'] = []
    obj['dayMonthCareProblemImprove'] = []

    emrNursing.map((x:any)=>{
        obj['emrNursingWorkStatistics'].push({ ...blankEmr,item:x})
      })
      yearList.map((x:any)=>{
        obj['dayNursingWorkStatistics'].push({ ...blankDayNur,year:x})
      })
      emrMonthCare.map((x:any)=>{
        obj['emrMonthCareProblemImprove'].push({ ...blankemg,item:x})
      })
      dayMontCare.map((x:any)=>{
        obj['dayMonthCareProblemImprove'].push({ ...emrMonthCare,item:x})
      })
    let proList: any[] = []
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
      analysisModal.clearRenderData()
      return res
    } catch (e) {
    }
  }
}
