import BaseApiService from "src/services/api/BaseApiService";
import { authStore } from "../../../../../../../stores/index";
export default class TubeBedService extends BaseApiService {
  //获取科室床号信息
  public async getBedRec(wardCode: string) {
    let formData = new FormData()
    formData.append('wardCode', wardCode)
    return this.post('/sysNurseBedRec/getList', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
  }
  //获取科室人员信息
  public async TubeBedList(data: any) {
    return this.post('/schTubeBed/getList', data)
  }
  //保存
  public async saveOrUpdate(data: any) {
    return this.post('/schTubeBed/saveOrUpdate',data)
  }
  //
  public async schTubeBedExport(data: any) {
    return this.post('/schTubeBed/export', data, { responseType: "blob" });
  }
  public async schTubeSyncEmp(data:any) {
    return this.post('/schTubeBed/syncEmp',data)
  }
}

export const tubeBedService = new TubeBedService();
