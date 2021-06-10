import BaseApiService from "src/services/api/BaseApiService";

export default class OnlineLearningApi extends BaseApiService {
  // 主列表查询
  public async queryPageList(obj: any) {
    return this.post(`/studyAndTrain/onlineLearn/pc/queryPageList`, obj);
  }

  // 工作反思 获取列表
  public async getMyWorkList(obj: any) {
    return this.post(`/studyAndTrain/workReviewManage/queryMyWorkReviewsByPage`, obj);
  }

  // 工作反思 获取单项
  public async getMyWorkItem(id: string) {
    return this.post(`/studyAndTrain/workReviewManage/viewWorkReviewDetailInfo`, { id });
  }

  // 工作反思 新增
  public async updateMyWorkList(obj: any) {
    return this.post(`/studyAndTrain/workReviewManage/saveWorkReview`, obj);
  }

  // 统计任务数
  public async getTaskCount(obj: any) {
    const params = { ...obj }
    if (![0, 1].includes(params.taskStatus)) {
      params.taskStatus = ''
    }
    return this.post(`/studyAndTrain/onlineLearn/pc/getTaskCount`, params);
  }

  // 统计任务数
  public async getWorkTaskCount(obj: any) {
    return this.post(`/studyAndTrain/workReviewManage/queryMyWorkReviewsConut`, obj);
  }
}
export const onlineLearningApi = new OnlineLearningApi();
