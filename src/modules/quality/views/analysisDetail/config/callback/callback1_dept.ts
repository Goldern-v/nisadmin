import { getBlank, replenishList } from "./../../util/tool";
import { analysisModal } from '../../../analysisWhyx/AnalysisModal';
import { appStore } from "src/stores";

export const obj = {
  getData() {
    return {
      key2_2: [
        {
          xm: "分级护理表质量",
          zlhgf: "合格分90分",
          hgl: ">=90%",
          hgsccs: "9/10",
          pjf: "92",
          hgl2: "93%",
          wdb: "达标",
        },
        {
          xm: "分级护理表质量",
          zlhgf: "合格分90分",
          hgl: ">=90%",
          hgsccs: "9/10",
          pjf: "92",
          hgl2: "93%",
          wdb: "达标",
        },
        {
          xm: "分级护理表质量",
          zlhgf: "合格分90分",
          hgl: ">=90%",
          hgsccs: "9/10",
          pjf: "92",
          hgl2: "93%",
          wdb: "达标",
        },
        {
          xm: "分级护理表质量",
          zlhgf: "合格分90分",
          hgl: ">=90%",
          hgsccs: "9/10",
          pjf: "92",
          hgl2: "93%",
          wdb: "达标",
        },
        {
          xm: "分级护理表质量",
          zlhgf: "合格分90分",
          hgl: ">=90%",
          hgsccs: "9/10",
          pjf: "92",
          hgl2: "93%",
          wdb: "达标",
        },
      ],
      key2_3: {
        conclusion: {
          zb: 100,
          db: 80,
          wdb: 20,
        },
        tableData: [
          {
            zb: "护理指标高评分",
            zywt: "护理部门主要问题是红红火火恍恍惚惚或",
            yyfx: "原因分析原因分析原因分析哈哈哈",
            zgcs: "整改护理部署的措施",
            xgpj: "满意满意继续努力",
          },
          {
            zb: "护理指标高评分",
            zywt: "护理部门主要问题是红红火火恍恍惚惚或",
            yyfx: "原因分析原因分析原因分析哈哈哈",
            zgcs: "整改护理部署的措施",
            xgpj: "满意满意继续努力",
          },
          {
            zb: "护理指标高评分",
            zywt: "护理部门主要问题是红红火火恍恍惚惚或",
            yyfx: "原因分析原因分析原因分析哈哈哈",
            zgcs: "整改护理部署的措施",
            xgpj: "满意满意继续努力",
          },
        ],
      },

      report: {
        key1_1: "2",
        key2_1: "2",
        key2_2: "2",
        key2_3: "2",
        key4_8: "2",
        key5_1: "2",
        key5_2: "1",
      },
      fieldData: {
        ultQuestion: '',
        improveFeedback: '',
        monthWorkPlan: "",
        trainingPlanOfTheMonth: "",
        monthWorkDoneCase: "",
        monthTrainDoneCase: "",
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
        lowRiskMortality: "",
        specialEventSolvedProblem: "",
        livePictures: "",
        deptWorkPlanForNextMonth: "",
        nextMonthDeptTrainingPlan: "",
        reportAdverseEvents: "",
        eventTypeAndLevel: "",
        overallIndicator: "",
        standardIndicators: "",
        nonComplianceIndicators: "",
        rw1: "",
        rw2: "",
        causeAnalysisPeople: "",
        homeServiceRate: "",
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
    (this as any).getSectionData("1_1").value = (this as any).allData.fieldData;
    (this as any).getSectionData("2_1").value = (this as any).allData.fieldData;
    (this as any).getSectionData("2_1").list = (this as any).allData["key2_1"];
    (this as any).getSectionData("2_2").list = (this as any).allData["key2_2"];
    (this as any).getSectionData("2_3").value = (this as any).allData.fieldData;
    (this as any).getSectionData("2_3").list = replenishList({ data: (this as any).allData.tableDataMap, config: (this as any).configData, name: 'deptNotPassIndexImprove', len: 3 });
    (this as any).getSectionData("3_1").value = (this as any).allData.fieldData;
    (this as any).getSectionData("3_2").value = (this as any).allData.fieldData;
    (this as any).getSectionData("3_2").pageInfo= (this as any).allData.pageInfo;

    (this as any).getSectionData("3_3").list = (this as any).allData.tableDataMap ? (this as any).allData.tableDataMap.monthCareProblemImprove : [] || [];
    (this as any).getSectionData("3_3").tempList = (this as any).configData.tableTempList ? (this as any)?.configData?.tableTempList?.monthCareProblemImprove : [] || [];

    (this as any).getSectionData("3_4").value = (this as any).allData.fieldData;
    (this as any).getSectionData("3_5").value = (this as any).allData.fieldData;
    (this as any).getSectionData("5_1").value = (this as any).allData.fieldData;
    (this as any).getSectionData("5_2").value = (this as any).allData.fieldData;
  },
  /**初始化自动提取 */
  async initRender() {
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
            v1.mainProblem && (data[v1.item] += v1.mainProblem + '/n')
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
    });
    let proList: any[] = []
    const reportId = appStore.queryObj.id
    Object.keys(obj).map((v4: string) => {
      if (!obj[v4]) return
      const params = {
        reportId,
        tableName: v4,
        data: obj[v4]
      }
      proList.push((this as any).saveReportTableData(params))
    })
    try {
      await Promise.all(proList)
      analysisModal.clearRenderData()
      console.log('test-1', 1)
      return true
    } catch (e) {
    }
  }
}
