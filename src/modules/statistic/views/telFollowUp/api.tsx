import BaseApiService from "src/services/api/BaseApiService";
import qs from "qs";
export default class TelFollowUpApi extends BaseApiService {
  public async getTelList(obj: any) {
		return this.post(`/qcRegisterCount/phoneCallBackCount`,obj);
	}
	public async exportData(obj: any) {
		return this.get(`/qcRegisterCount/exportPhoneCallBackCount?${qs.stringify(obj)}`, {
			responseType: "blob"
		});
	}
}
export const telFollowUpApi = new TelFollowUpApi();