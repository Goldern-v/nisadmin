import { appStore, authStore } from "src/stores";
import BaseApiService from "src/services/api/BaseApiService";
import { notSelectViewModal } from "../page/notRelease/components/SelectViewModal";
import moment from "moment";

export default class ArrangeService extends BaseApiService {

  // 未发布排班记录查询 聊城二院
  // 获取所有科室
  /** 获取排班信息 */
  public countSettingByStatus(obj?: any) {
    console.log(notSelectViewModal.params.deptCode, 11)
    obj = {
      startTime: notSelectViewModal.params.startTime,
      endTime: notSelectViewModal.params.endTime,
      deptCode: notSelectViewModal.params.deptCode === '全院' ? '' : notSelectViewModal.params.deptCode,
      // nurseGroup: notSelectViewModal.params.group,
      startTimeWeek: moment(notSelectViewModal.params.startTime)
        .weekday(0)
        .format("YYYY-MM-DD"),
      endTimeWeek: moment(notSelectViewModal.params.endTime)
        .weekday(6)
        .format("YYYY-MM-DD")
    };
    const url = `/schedulingLc/countSettingByStatus`
    return this.post(url, obj);
  }

  // 聊城导出 未发布排班
  public async exportRoster() {
    const list = authStore.deptList;
    const current = list.find((item: any) => item.code === notSelectViewModal.params.deptCode) || { name: '' }
    const postData = {
      startTime: notSelectViewModal.params.startTime,
      endTime: notSelectViewModal.params.endTime,
      deptCode: notSelectViewModal.params.deptCode === '全院' ? '' : notSelectViewModal.params.deptCode,
      deptName: current.name,
      // nurseGroup: notSelectViewModal.params.group,
      startTimeWeek: moment(notSelectViewModal.params.startTime)
        .weekday(0)
        .format("YYYY-MM-DD"),
      endTimeWeek: moment(notSelectViewModal.params.endTime)
        .weekday(6)
        .format("YYYY-MM-DD"),
      // excelType: type
    };
    const url = `/schedulingLc/exportSettingByStatus`

    return this.post(url, postData, { responseType: "blob" });
  }
}

export const notArrangeService = new ArrangeService();
