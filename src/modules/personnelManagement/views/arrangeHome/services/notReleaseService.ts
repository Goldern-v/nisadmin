import { appStore, authStore } from "src/stores";
import BaseApiService from "src/services/api/BaseApiService";
import { notSelectViewModal } from "../page/notRelease/components/SelectViewModal";
import moment from "moment";

export default class ArrangeService extends BaseApiService {

  // 未发布排班记录查询 聊城二院
  // 获取所有科室
  /** 获取排班信息 */
  public countSettingByStatus(obj?: any) {
    obj = {
      startTimeWeek: notSelectViewModal.params.startTime,
      endTimeWeek: notSelectViewModal.params.endTime,
      deptCode: notSelectViewModal.params.deptCode === '全院' ? '' : notSelectViewModal.params.deptCode,
    };
    const url = `/schedulingLc/countSettingByStatus`
    return this.post(url, obj);
  }

  // 聊城导出 未发布排班
  public async exportRoster() {
    const postData = {
      startTimeWeek: notSelectViewModal.params.startTime,
      endTimeWeek: notSelectViewModal.params.endTime,
      deptCode: notSelectViewModal.params.deptCode === '全院' ? '' : notSelectViewModal.params.deptCode,
    };
    const url = `/schedulingLc/exportSettingByStatus`

    return this.post(url, postData, { responseType: "blob" });
  }

  /** 获取排班班次 */
  public getArrangeMenu(obj?: any) {
    obj = {
      deptCode: notSelectViewModal.params.deptCode,
      status: true
    };
    return this.post(`/schShiftSetting/getByDeptCode`, this.stringify(obj));
  }

}

export const notArrangeService = new ArrangeService();
