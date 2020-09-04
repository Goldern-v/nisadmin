import BaseApiService from "src/services/api/BaseApiService";
import qs from "qs";

export default class TraineeShiftApi extends BaseApiService {
  // 创建实习生轮科
  public async createRotationScheduleSheet(obj: any) {
    return this.post(
      `/studyAndTrain/intern/deptRotationSchedule/createRotationScheduleSheet`,
      obj
    );
  }
  // 查询二级子菜单
  public async queryAllRotationScheduleSheets() {
    return this.get(
      `/studyAndTrain/intern/deptRotationSchedule/queryAllRotationScheduleSheets`
    );
  }

  // 查询轮科主页信息
  public async querySheetCompleteInfo(obj: any) {
    return this.post(
      `/studyAndTrain/intern/deptRotationSchedule/querySheetCompleteInfo`,
      obj
    );
  }
  // 保存轮科时间
  public async saveAllRotateTimes(obj: any) {
    return this.post(
      `/studyAndTrain/intern/deptRotationSchedule/saveAllRotateTimes`,
      obj
    );
  }
  // 删除轮科小组(单条数据)
  public async deleteGroup(groupId: any) {
    return this.post(
      `/studyAndTrain/intern/deptRotationSchedule/deleteGroup`,
      qs.stringify({ groupId })
    );
  }
  // 删除轮科表(暂时不用)
  public async deleteSheet(sheetId: any) {
    return this.post(
      `/studyAndTrain/intern/deptRotationSchedule/deleteSheet`,
      qs.stringify({ sheetId })
    );
  }

  // 查询全部实习生
  public async queryGraduateInternPageList(obj: any) {
    // "year":"2020",
    // "keyWord":"",
    // "pageIndex":1,
    // "pageSize":2
    return this.post(
      `/studyAndTrain/intern/deptRotationSchedule/queryGraduateInternPageList`,
      obj
    );
  }
  // 查询已有实习生
  public async queryAllRotatePersonsBySheetId(sheetId: any) {
    // "year":"2020",
    // "keyWord":"",
    // "pageIndex":1,
    // "pageSize":2
    return this.post(
      `/ studyAndTrain/intern/deptRotationSchedule/queryAllRotatePersonsBySheetId`,
      qs.stringify({ sheetId })
    );
  }
  // 保存轮科实习生
  public async saveAllRotatePersons(obj: any) {
    //   {
    //     "sheetId": 19,
    //     "rotatePersonsList": [{
    //         "empName": "333",
    //         "groupNum": 1,
    //         "empNo": "admin"
    //     },{
    //         "empName": "333",
    //         "groupNum": 1,
    //         "empNo": "6859"
    //     }]
    // }
    return this.post(
      `/studyAndTrain/intern/deptRotationSchedule/saveAllRotatePersons`,
      obj
    );
  }

  // 查询全部科室（已勾选）
  public async queryAllDeptsAndRotateDepts(sheetId: any) {
    return this.post(
      `/studyAndTrain/intern/deptRotationSchedule/queryAllDeptsAndRotateDepts`,
      qs.stringify({ sheetId })
    );
  }
  //保存轮换科室
  public async saveAllRotateDepts(obj: any) {
    //   {
    //     "sheetId": 19,
    //     "rotateDeptList": [{
    //         "sort":1,
    //         "deptName": "外科",
    //         "deptCode": "030702",
    //         "isChecked":1
    //     },
    //     {
    //         "sort": 2,
    //         "deptName": "内科",
    //         "deptCode": "030701",
    //         "isChecked":1
    //     }, {
    //         "sort": 3,
    //         "deptName": "综合科",
    //         "deptCode": "901693",
    //         "isChecked":1
    //     }]
    // }
    return this.post(
      `/studyAndTrain/intern/deptRotationSchedule/saveAllRotateDepts`,
      obj
    );
  }

  // 导出
  public exportSheetCompleteInfo(obj?: any) {
    return this.post(
      `/studyAndTrain/intern/deptRotationSchedule/exportSheetCompleteInfo`,
      obj,
      {
        responseType: "blob"
      }
    );
  }
}
export const traineeShiftApi = new TraineeShiftApi();
