import BaseApiService from "src/services/api/BaseApiService";
import qs from "qs";

export default class TrainingInfoReviewService extends BaseApiService {
  //获取信息
  public getBaseInfo(id: string) {
    return this.post(
      "/studyAndTrain/teachingPlanManage/viewSummaryInfo",
      qs.stringify({ id })
    );
  }

  //获取考卷信息
  public previewPaper(cetpId: string) {
    return this.post(
      "/studyAndTrain/teachingPlanManage/previewPaper",
      qs.stringify({ cetpId })
    );
  }

  //获取审核信息
  public getAuditInfo(cetpId: string) {
    return this.post(
      "/studyAndTrain/auditManage/getFlowTaskHisByCetpId",
      qs.stringify({ cetpId })
    );
  }

  // 添加修改弹窗获取考卷信息(新增--teachingMethod，taskCode  修改--cetpId，taskCode)
  public getPreviewPaper(taskCode: any, teachingMethod?: any, cetpId?: any) {
    return this.post(
      "/studyAndTrain/teachingPlanManage/previewPaperByTaskCode",
      qs.stringify({ teachingMethod, taskCode, cetpId })
    );
  }
}

export const trainingInfoReviewService = new TrainingInfoReviewService();
