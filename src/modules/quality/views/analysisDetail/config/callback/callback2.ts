import { getBlank, replenishList } from "./../../util/tool";
import { analysisModal } from '../../../analysisWhyx/AnalysisModal';
import { analysisDetailApi } from '../../api'

/**固定渲染数据 */
const FIXED_ITEMS = [
  '疫情常态化管理',
  '静脉炎发生例数',
  '药业渗出发生例数',
  '各类管道滑脱发生例数',
  '人工气道脱出例数',
  '各类导管非计划拔管例数',
  '锐器伤发生例数',
  '',
  '',
  '',
]
export const obj = {
  getData() {
    return {
      fieldData1_1: {
        ultQuestion: '',
        improveFeedback: '',
      },
      fieldData2_1: {
        reportAdverseEvents: "",
        eventTypeAndLevel: "",
      },
      fieldData2_3: {
        overallIndicator: "",
        standardIndicators: "",
        nonComplianceIndicators: "",
      },
      fieldData3_1: {
        monthWorkPlan: "",
        trainingPlanOfTheMonth: "",
        monthWorkDoneCase: "",
        monthTrainDoneCase: "",
      },
      fieldData3_2: {
        areaNurseCount: "",
        assistantNurseCount: "",
        careWorkerCount: "",
        clerkCount: "",
        actualNurseCount: "",
        actualAssistantNurseCount: "",
        actualCareWorkerCount: "",
        actualClerkCount: "",
        dutyNurseCount: "",
        dutyAssistantNurseCount: "",
        dutyCareWorkerCount: "",
        dutyClerkCount: "",
        resignNurseCount: "",
        notRectifiedNurseCount: "",
        regularPracticeNurseCount: "",
        nurseTurnoverRate: "",
        actualOpenBedArea: "",
        bedNurseRatio: "",
        avgNursePatientRatio: "",
        dayNursePatientRatio: "",
        nightNursePatientRatio: "",
        avgBedUsage: "",
        bedTurnoversCount: "",
        deptAvgHospitalDay: "",
        existingPatientCount: "",
        admissionCount: "",
        transferDiseaseCount: "",
        leaveHospitalCount: "",
        outDiseaseCount: "",
        deadCount: "",
        interventionSurgeryCount: "",
        surgicalSurgeryCount: "",
        homeCountCompletionCase: "",
      },
      fieldData3_4: {
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
      fieldData3_8: {
        specialEventSolvedProblem: "",
      },
      fieldData4_1: {
        deptWorkPlanForNextMonth: "",
      },
      fieldData4_2: {
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
    (this as any).getSectionData("3_8").value = (this as any).allData.fieldData3_8;
    (this as any).getSectionData("4_1").value = (this as any).allData.fieldData4_1;
    (this as any).getSectionData("4_2").value = (this as any).allData.fieldData4_2;
    (this as any).getSectionData("2_1").list = (this as any).allData.tableDataMap ? (this as any).allData.tableDataMap.deptSecondQualityIndexResult : [] || [];
    (this as any).getSectionData("2_2").list = replenishList({ data: (this as any).allData.tableDataMap, config: (this as any).configData, name: 'areaCareMonitorIndexResult', len: 5 });
    (this as any).getSectionData("2_3").list = replenishList({ data: (this as any).allData.tableDataMap, config: (this as any).configData, name: 'areaNotPassIndexImprove', len: 3 });
    (this as any).getSectionData("3_3").list = replenishList({ data: (this as any).allData.tableDataMap, config: (this as any).configData, name: 'monthCareProblemImprove', len: 3 });
    (this as any).getSectionData("3_5").list = replenishList({ data: (this as any).allData.tableDataMap, config: (this as any).configData, name: 'areaNursingAdverseEvents', len: 2 });
    (this as any).getSectionData("3_6").list = replenishList({ data: (this as any).allData.tableDataMap, config: (this as any).configData, name: 'joinSafetyDiscussAndBedside', len: 3 });
    (this as any).getSectionData("3_7").list = replenishList({ data: (this as any).allData.tableDataMap, config: (this as any).configData, name: 'headNurseWorkAssessResults', len: 3 });
    (this as any).getSectionData("3_2").pageInfo = (this as any).allData.pageInfo;
    (this as any).getSectionData("3_3").tempList = (this as any).configData.tableTempList ? (this as any)?.configData?.tableTempList?.monthCareProblemImprove : [] || [];
    (this as any).getSectionData("3_5").tempList = (this as any).configData.tableTempList ? (this as any)?.configData?.tableTempList?.areaNursingAdverseEvents : [] || [];
    (this as any).getSectionData("3_6").tempList = (this as any).configData.tableTempList ? (this as any)?.configData?.tableTempList?.joinSafetyDiscussAndBedside : [] || [];
    (this as any).getSectionData("3_7").tempList = (this as any).configData.tableTempList ? (this as any)?.configData?.tableTempList?.headNurseWorkAssessResults : [] || [];
  },
  /**初始化自动提取 */
  async initRender(reportId: number) {
    if (!(analysisModal.renderData && analysisModal.tableTempList)) return
    const { renderData, tableTempList } = analysisModal
    const obj: Record<string, any> = {}
    Object.keys(renderData).map((v: string) => {

      const blank = getBlank(tableTempList[v])
      renderData[v].map((v3: any) => {
        obj[v].push({ ...blank, ...v3 })
      })
      if (v == 'deptSecondQualityIndexResult') {
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
