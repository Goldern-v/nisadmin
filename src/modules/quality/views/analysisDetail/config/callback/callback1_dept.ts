import { getBlank, replenishList } from './../../util/tool'
import { analysisModal } from '../../../analysisWhyx/AnalysisModal'
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
      fieldData3_2:{
        nurseCount: "",
        actualNurseCount: "",
        assistantNurseCount: "",
        actualInternNurseCount: "",
        actualDutyNursesCount: "",
        actualDutyInternNurseCount: "",
        averageBedOccupancy: "",
        bedTurnovers: "",
        deptAverageInDepartment: "",
        existingPatientCount: "",
        admissions: "",
        transferredPatientCount: "",
        dischargedPeopleCount: "",
        transferredOutPatientCount: "",
        deathToll: "",
        interventionalProcedureCount: "",
        numberOfSurgicalOperations: "",
        deptNursingWorkloadScore: "",
        cmi: "",
        lowRiskMortality:"",
        rw1: "",
        rw2: "",
        homeServiceRate: "",

      },
      fieldData3_4:{
        causeAnalysisPeople: "",
        question: "",
        causeAnalysisMachine: "",
        causeAnalysisThing: "",
        causeAnalysisLaw: "",
        causeAnalysisRing: "",
        causeAnalysisQuestion: "",
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
      fieldData3_5:{
        specialEventSolvedProblem: "",
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
    (this as any).getSectionData("3_2").value = (this as any).allData.fieldData3_2;
    (this as any).getSectionData("3_4").value = (this as any).allData.fieldData3_4;
    (this as any).getSectionData("3_5").value = (this as any).allData.fieldData3_5;
    (this as any).getSectionData("5_1").value = (this as any).allData.fieldData5_1;
    (this as any).getSectionData("5_2").value = (this as any).allData.fieldData5_2;
    (this as any).getSectionData("2_1").list = (this as any).allData.tableDataMap ? (this as any).allData.tableDataMap.deptOneQualityIndexResult : [] || [];
    (this as any).getSectionData("2_2").list = replenishList({data: (this as any).allData.tableDataMap, config: (this as any).configData, name: 'deptCareMonitorIndexResult', len: 5});
    (this as any).getSectionData("2_3").list = replenishList({ data: (this as any).allData.tableDataMap, config: (this as any).configData, name: 'deptNotPassIndexImprove', len: 3 });
    (this as any).getSectionData("3_3").list = (this as any).allData.tableDataMap ? (this as any).allData.tableDataMap.monthCareProblemImprove : [] || [];
    (this as any).getSectionData("4").list = (this as any).allData.tableDataMap ? (this as any).allData.tableDataMap.attachment : [] || [];
    (this as any).getSectionData("3_2").pageInfo= (this as any).allData.pageInfo;
    (this as any).getSectionData("3_3").tempList = (this as any).configData.tableTempList ? (this as any)?.configData?.tableTempList?.monthCareProblemImprove : [] || [];
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
            Object.keys(v1).forEach((v2: any) => {
              if (v2 !== 'item' && v1[v2]) {
                if (data[v1.item][v2].length == 0) {
                  data[v1.item][v2] = (`1.${v1[v2]}`)
                  return
                }
                let len = data[v1.item][v2].split('\n').length
                data[v1.item][v2] += (`\n${len == 0 ? 2 : len + 1}.${v1[v2]}`)
              }
            })
            return
          }
          let {item, ...val} = v1
          for(let key in val) {
            if(val[key]) {
              val[key] = '1.' + val[key]
              continue
            }
            val[key] = ''
          }
          data[item] = val
        })
        let blank = getBlank(tableTempList[v])
        Object.keys(data).map((v2: any) => {
          obj[v].push({ ...blank, item: v2, ...data[v2] })
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
