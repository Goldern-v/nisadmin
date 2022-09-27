import BaseApiService from "src/services/api/BaseApiService";
import qs from "qs";

export default class HjExamApi extends BaseApiService {
  /** 厚街-查看结果-考试详情 */
  public getInfo(id: string) {
    return this.post(
      `/studyAndTrain/teachingPlanManage/viewSummaryInfo`,
      qs.stringify({ id })
    );
  }

  /** 厚街-查看结果-考试情况统计 */
  public queryExamResultStatsByPage(obj: any) {
    return this.post(
      `/studyAndTrain/teachingPlanManage/hj/queryExamResultStatsByPage`,
      obj
    );
  }

  /** 厚街-查看结果-考试情况分析 */
  public queryExamResultAnalyseByPage(obj: any) {
    return this.post(
      `/studyAndTrain/teachingPlanManage/hj/queryExamResultAnalyseByPage`,
      obj
    );
  }

  /** 厚街-查看结果-考试分析报表 */
  // 按分数
  public queryExamResultAnalyseReportByScoresSection(cetpId: any) {
    return this.post(
      `/studyAndTrain/teachingPlanManage/hj/queryExamResultAnalyseReportByScoresSection`,
      { cetpId }
    );
  }
  // 按层级
  public queryExamResultAnalyseReportByHierarchy(cetpId: any) {
    return this.post(
      `/studyAndTrain/teachingPlanManage/hj/queryExamResultAnalyseReportByHierarchy`,
      { cetpId }
    );
  }
  // 按职称
  public queryExamResultAnalyseReportByTitle(cetpId: any) {
    return this.post(
      `/studyAndTrain/teachingPlanManage/hj/queryExamResultAnalyseReportByTitle`,
      { cetpId }
    );
  }
  // 按科室
  public queryExamResultAnalyseReportByDept(cetpId: any) {
    return this.post(
      `/studyAndTrain/teachingPlanManage/hj/queryExamResultAnalyseReportByDept`,
      { cetpId }
    );
  }
  // 按科室
  public getAnalyCorrectRate(cetpId: any) {
    return this.get(
        `/studyAndTrain/teachingPlanManage/analyCorrectRate?cetpId=${cetpId}`,
    );
  }
  //导出(南医三新增exportType入参)
  public exportExam(cetpId: any, urlName: string, exportType?: any) {
    //统计exportExamResultStats  分析exportExamResultAnalyse  报表exportExamResultAnalyseReport
    return this.post(
      `/studyAndTrain/teachingPlanManage/hj/${urlName}`,
      { cetpId, exportType },
      {
        responseType: "blob"
      }
    );
  }
}

export const hjExamApi = new HjExamApi();
