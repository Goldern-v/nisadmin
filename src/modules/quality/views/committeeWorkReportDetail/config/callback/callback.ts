import { replenishList } from '../../util/tool'

export const obj = {
  getData() {
    return {
      fieldData1_1:{
        problemAnalysisImprove: ''
      },

      fieldData3:{
        workTechnicalImprove: ''
      },
      fieldData5:{
        coordinateMatters: ''
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
    (this as any).getSectionData("3").value = (this as any).allData.fieldData3;
    (this as any).getSectionData("5").value = (this as any).allData.fieldData5;
    
    (this as any).getSectionData("1").list = replenishList({ data: (this as any).allData.tableDataMap, config: (this as any).configData, name: 'monitorQualityIndicators', len: 2 });
    (this as any).getSectionData("1").tempList = (this as any).configData.tableTempList ? (this as any)?.configData?.tableTempList?.monitorQualityIndicators : [] || [];
    (this as any).getSectionData("2").list = replenishList({ data: (this as any).allData.tableDataMap, config: (this as any).configData, name: 'workPlanFinishCase', len: 2 });
    (this as any).getSectionData("2").tempList = (this as any).configData.tableTempList ? (this as any)?.configData?.tableTempList?.workPlanFinishCase : [] || [];
    (this as any).getSectionData("4").list = replenishList({ data: (this as any).allData.tableDataMap, config: (this as any).configData, name: 'nextQuarterMajorWorkPlan', len: 2 });
    (this as any).getSectionData("4").tempList = (this as any).configData.tableTempList ? (this as any)?.configData?.tableTempList?.nextQuarterMajorWorkPlan : [] || [];
   
  },
}