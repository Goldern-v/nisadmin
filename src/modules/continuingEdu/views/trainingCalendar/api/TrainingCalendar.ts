import BaseApiService from "src/services/api/BaseApiService";

class TrainingCalendar  extends BaseApiService {
  // 培训日志查询接口
  
  public async getListTrainingCalendar(obj: any) {
    return this.post(
      `/studyAndTrain/teachingPlanManage/listTrainingCalendar`,
      obj,
    );
  }
  // 培训日志导出接口
  
  public async exportPageList(obj: any) {
    return this.post(
      `/studyAndTrain/teachingPlanManage/exportTrainingCalendar`,
      obj,
      {
        responseType: "blob"
      }
    );
  }

  // 获取所有科室
  public getAllDeptList() {
    return this.get(`/user/nursingUnit`)
  }
}

export const TrainingCalendarApi = new TrainingCalendar()