import BaseApiService from "src/services/api/BaseApiService";
import { traineeShiftModal } from "../TraineeShiftModal";
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

  // 添加分组
  public async createRotateGroup(groupNum: any) {
    let obj: any = {
      sheetId: traineeShiftModal.sheetId,
      groupNum
    };
    return this.post(
      `/studyAndTrain/intern/deptRotationSchedule/createRotateGroup
      `,
      obj
    );
  }

  // 查询轮科主页信息
  public async querySheetCompleteInfo(obj: any) {
    return this.post(
      `/studyAndTrain/planTrain/deptRotationSchedule/querySheetCompleteInfo`,
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
    return this.post(
      `/studyAndTrain/intern/deptRotationSchedule/queryGraduateInternListWithGoupYaXinInfo`,
      obj
    );
  }
  // 查询已有实习生
  public async queryAllRotatePersonsBySheetId() {
    let obj: any = {
      sheetId: traineeShiftModal.sheetId,
      groupId: traineeShiftModal.groupId
    };
    return this.post(
      `/studyAndTrain/intern/deptRotationSchedule/queryAllRotatePersonsByGroupId`,
      obj
    );
  }

  // 保存轮科实习生
  public async saveAllRotatePersons(obj: any) {
    return this.post(
      `/studyAndTrain/intern/deptRotationSchedule/addRotatePersonsToRotateGroup`,
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
  // 获取所有的已选科室
  public async queryAllRorateDepts() {
    return this.post(
      `/studyAndTrain/intern/deptRotationSchedule/queryAllRorateDepts`,
      qs.stringify({ sheetId: traineeShiftModal.sheetId })
    );
  }
  // 增加科室
  public async addRotateDepts(rotateDeptList: any) {
    let obj: any = {
      sheetId: traineeShiftModal.sheetId,
      rotateDeptList
    };
    return this.post(
      `/studyAndTrain/intern/deptRotationSchedule/addRotateDepts`,
      obj
    );
  }
  // 保存轮换科室的排序
  public async saveRotateDeptSorts(deptSortList: any) {
    let obj: any = {
      sheetId: traineeShiftModal.sheetId,
      deptSortList
    };
    return this.post(
      `/studyAndTrain/intern/deptRotationSchedule/saveRotateDeptSorts`,
      obj
    );
  }
  // 删除科室
  public async deleteRotateDepts(deptCodeList: any) {
    let obj: any = {
      sheetId: traineeShiftModal.sheetId,
      deptCodeList
    };
    return this.post(
      `/studyAndTrain/intern/deptRotationSchedule/deleteRotateDepts`,
      obj
    );
  }

  //保存备注实习生
  public async saveOrUpDateByGroupYaXin(obj: any) {
    return this.post(
      `/studyAndTrain/intern/deptRotationSchedule/saveOrUpDateByGroupYaXin`,
      obj
    );
  }

  // 导出
  // public exportSheetCompleteInfo(obj?: any) {
  //   return this.post(
  //     `/studyAndTrain/intern/deptRotationSchedule/exportSheetCompleteInfo`,
  //     obj,
  //     {
  //       responseType: "blob"
  //     }
  //   );
  // }

  // 删除某个轮科小组的实习生
  public async deleteRotatePersonsFromRotateGroup(empNoList: any) {
    let obj: any = {
      sheetId: traineeShiftModal.sheetId,
      groupId: traineeShiftModal.groupId,
      empNoList
    };
    return this.post(
      `/studyAndTrain/intern/deptRotationSchedule/deleteRotatePersonsFromRotateGroup`,
      obj
    );
  }

  /**
   * 实习生轮课表导入模版
   */
  public exportSheetTemplate(sheetId: string | number) {
    return this.post('/studyAndTrain/intern/deptRotationSchedule/exportSheetTemplate', { sheetId }, { responseType: 'blob' })
  }


  // 规培生管理  start
  // 规培生轮转计划 查询计划
  public getSheetCompleteInfo(obj: any) {
    return this.post('/studyAndTrain/planTrain/deptRotationSchedule/querySheetCompleteInfo', obj)
  }
  // 创建规培轮转计划
  public createScheduleSheet(obj: any) {
    return this.post('/studyAndTrain/planTrain/deptRotationSchedule/createRotationScheduleSheet', obj)
  }
  // 获取规培计划列表
  public getScheduleSheetList(obj?: any) {
    return this.get('/studyAndTrain/planTrain/deptRotationSchedule/queryAllRotationScheduleSheets')
  }
  // 添加规培生
  public addRotatePersonsToRotate(obj: any) {
    return this.post('/studyAndTrain/planTrain/deptRotationSchedule/addRotatePersonsToRotate', obj)
  }
   // 添加科室
   public addRotateDeptsForTrain(obj: any) {
    return this.post('/studyAndTrain/planTrain/deptRotationSchedule/addRotateDepts', obj)
  }
   // 获取可添加的规培生
   public queryStudentInfoListWithoutCheck(obj: any) {
    return this.post('/studyAndTrain/planTrain/deptRotationSchedule/queryStudentInfoListWithoutCheck', obj)
  }
   // 科室排序
   public saveRotateDeptSortsForTrain(obj: any) {
    return this.post('/studyAndTrain/planTrain/deptRotationSchedule/saveRotateDeptSorts', obj)
  }
  // 查询所有已添加科室
  public queryAllRorateDeptsForTrain(obj: any) {
    return this.post('/studyAndTrain/planTrain/deptRotationSchedule/queryAllRorateDepts', qs.stringify(obj))
  }
  // 查询所有备选科室
  public queryAllDeptsAndRotateDeptsForTrain(obj: any) {
    return this.post('/studyAndTrain/planTrain/deptRotationSchedule/queryAllDeptsAndRotateDepts', qs.stringify(obj))
  }
  
  // 删除轮转科室
  public deleteRotateDeptsYaXin(obj: any) {
    return this.post('/studyAndTrain/planTrain/deptRotationSchedule/deleteRotateDeptsYaXin', obj)
  }
  // 保存轮转生计划信息
  public saveAllRotateTimesYaXin(obj: any) {
    return this.post('/studyAndTrain/planTrain/deptRotationSchedule/saveAllRotateTimesYaXin', obj)
  }
   // 查询所有备选科室
   public deletePersonYaXin(obj: any) {
    return this.post('/studyAndTrain/planTrain/deptRotationSchedule/deletePersonYaXin', qs.stringify(obj))
  }
  // 导出规培生计划
  public exportSheetCompleteInfo(obj?: any) {
    return this.post(
      `studyAndTrain/planTrain/deptRotationSchedule/exportSheetCompleteInfo`,
      obj,
      {
        responseType: "blob"
      }
    );
  }
  // 下载导入模板模板
  public exportSheetTemplateYaXin(obj?: any) {
    return this.post(
      `studyAndTrain/planTrain/deptRotationSchedule/exportSheetTemplateYaXin`,
      obj,
      {
        responseType: "blob"
      }
    );
  }
   /**
   * 导入规培生轮科表
   * @param filename 文件
   * @param sheetId 论课表id
   */
    public importSheetTemplateYaXin(filename: any, sheetId: any) {
      let newFormData = new FormData()
      newFormData.set('filename', filename)
      newFormData.set('sheetId', sheetId)
  
      return this.post('/studyAndTrain/planTrain/deptRotationSchedule/importSheetTemplateYaXin', newFormData)
    }
  

  // 规培生管理  end



  /**
   * 导入实习生轮科表
   * @param filename 文件
   * @param sheetId 论课表id
   */
  public importSheetFromFile(filename: any, sheetId: any) {
    let newFormData = new FormData()
    newFormData.set('filename', filename)
    newFormData.set('sheetId', sheetId)

    return this.post('/studyAndTrain/intern/deptRotationSchedule/importSheetTemplate', newFormData)
  }
}
export const traineeShiftApi = new TraineeShiftApi();
