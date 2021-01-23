import BaseApiService from "src/services/api/BaseApiService";
import axios from "axios";
import { fileDownload } from "src/utils/file/file";
import qs from "qs";

export default class TrainingInfoReviewService extends BaseApiService {
  //获取信息
  public getBaseInfo(id: string, taskRoleCode?: number) {
    return this.post(
      "/studyAndTrain/teachingPlanManage/viewSummaryInfo",
      qs.stringify({ id, taskRoleCode })
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

  /***.题库管理--预览 */
  public KKTKpreviewPaper(obj: any) {
    //questionIdList（问题id []）
    return this.post(
      `/studyAndTrain/questionBankManage/exam/previewPaper`,
      obj
    );
  }

  //下载文件重新处理
  public downloadPage(url: string, name?: string) {
    axios
      .get(url, { responseType: "blob" })
      .then(res => fileDownload(res, name));
  }

  //查看试卷(视频插入)
  public async getAllQuestionList(obj: any) {
    /** taskCode attachmentId*/
    return this.post(
      `/studyAndTrain/videoInsertion/task/queryAllQuestionList`,
      obj
    );
  }

  // 试卷预览添加记录（厚街 南医三多套试卷）
  public async HjPreviewPaperByPertId(pertId: any) {
    /** taskCode attachmentId*/
    return this.post(
      `/studyAndTrain/teachingPlanManage/hj/editRunTime/previewPaperByPertId/exam`,
      qs.stringify({ pertId })
    );
  }

  // 试卷预览查看信息（厚街 南医三多套试卷）
  public async HjPreviewPaperByPertIdCheck(paperId: any) {
    /** taskCode attachmentId*/
    return this.post(
      `/studyAndTrain/teachingPlanManage/hj/previewPaperByPaperId`,
      qs.stringify({ paperId })
    );
  }
}

export const trainingInfoReviewService = new TrainingInfoReviewService();
