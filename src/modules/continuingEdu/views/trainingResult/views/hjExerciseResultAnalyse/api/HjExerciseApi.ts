import BaseApiService from "src/services/api/BaseApiService";
import qs from "qs";

export default class HjExerciseApi extends BaseApiService {
  /** 厚街-查看结果-练习详情 */
  public getInfo(id: string) {
    return this.post(
      `/studyAndTrain/teachingPlanManage/viewSummaryInfo`,
      qs.stringify({ id })
    );
  }

  /** 厚街-查看结果-练习情况统计 */
  public queryExerciseResultStatsByPage(obj: any) {
    return this.post(
      `/studyAndTrain/teachingPlanManage/hj/queryExerciseResultStatsByPage`,
      obj
    );
  }

  /** 厚街-查看结果-练习情况分析 */
  public queryExerciseResultAnalyseByPage(obj: any) {
    return this.post(
      `/studyAndTrain/teachingPlanManage/hj/queryExerciseResultAnalyseByPage`,
      obj
    );
  }

  /** 厚街-查看结果-试题分析 */
  public queryExercisePaperAnalyse(cetpId: any) {
    return this.post(
      `/studyAndTrain/teachingPlanManage/hj/queryExercisePaperAnalyse`,
      { cetpId }
    );
  }

  /** 厚街-查看结果-练习分析报表 */
  // 按分数
  public queryExerciseResultAnalyseReportByScoresSection(cetpId: any) {
    return this.post(
      `/studyAndTrain/teachingPlanManage/hj/queryExerciseResultAnalyseReportByScoresSection`,
      { cetpId }
    );
  }
  // 按层级
  public queryExerciseResultAnalyseReportByHierarch(cetpId: any) {
    return this.post(
      `/studyAndTrain/teachingPlanManage/hj/queryExerciseResultAnalyseReportByHierarchy`,
      { cetpId }
    );
  }
  // 按职称
  public queryExerciseResultAnalyseReportByTitle(cetpId: any) {
    return this.post(
      `/studyAndTrain/teachingPlanManage/hj/queryExerciseResultAnalyseReportByTitle`,
      { cetpId }
    );
  }
  // 按科室
  public queryExerciseResultAnalyseReportByDept(cetpId: any) {
    return this.post(
      `/studyAndTrain/teachingPlanManage/hj/queryExerciseResultAnalyseReportByDept`,
      { cetpId }
    );
  }

  //导出
  public exportExam(cetpId: any, urlName: string, exportType?: any) {
    //统计exportExerciseResultStats  分析exportExerciseResultAnalyse  报表exportExerciseResultAnalyseReport
    return this.post(
      `/studyAndTrain/teachingPlanManage/hj/${urlName}`,
      { cetpId, exportType },
      {
        responseType: "blob"
      }
    );
  }
}

export const hjExerciseApi = new HjExerciseApi();
