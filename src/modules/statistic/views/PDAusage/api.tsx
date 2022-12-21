import BaseApiService from "src/services/api/BaseApiService";
import qs from "qs";
export default class PdaUsageApi extends BaseApiService {
  public async getPdaUsage(obj: any) {
		return this.post(`/qcRegisterCount/pdaCommentsCount`,obj);
	}
  public async exportData(obj: any) {
		return this.get(`/goodEvent/clinicalIndicators/exportMonthlyForDeptCode?${qs.stringify(obj)}`, {
			responseType: "blob"
		});
	}
}
export const pdaUsageApi = new PdaUsageApi();